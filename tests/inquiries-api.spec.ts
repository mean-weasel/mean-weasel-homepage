import { expect, test } from "@playwright/test";
import { POST } from "../src/app/api/inquiries/route";

const origin = "http://mean-weasel-homepage.127.0.0.1.nip.io:3100";
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  business: "Example & Co",
  website: "https://example.com",
  service: "Business Website",
  description: "Help customers request a quote.",
  companyFax: "",
  requestId: "12345678-1234-4234-8234-123456789abc",
};
function request(body: unknown = valid, source = origin) {
  return new Request(`${origin}/api/inquiries`, {
    method: "POST",
    headers: { origin: source, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("Resend delivery fixes recipient and Reply-To, deduplicates retries, and never exposes the key", async () => {
  const fetchBefore = global.fetch;
  const envBefore = {
    key: process.env.RESEND_API_KEY,
    from: process.env.RESEND_FROM_EMAIL,
  };
  process.env.RESEND_API_KEY = "test-only-key";
  process.env.RESEND_FROM_EMAIL = "Mean Weasel <inquiries@example.com>";
  const calls: RequestInit[] = [];
  global.fetch = async (url, init) => {
    expect(url).toBe("https://api.resend.com/emails");
    calls.push(init!);
    return Response.json({ id: "mock-resend-id" });
  };
  try {
    const response = await POST(
      request({ ...valid, to: "attacker@example.com" }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    const payload = JSON.parse(calls[0].body as string);
    expect(payload.to).toEqual(["jeremy@mean-weasel.com"]);
    expect(payload.reply_to).toBe(valid.email);
    expect(payload.text).toContain(valid.description);
    expect(payload.from).toBe(process.env.RESEND_FROM_EMAIL);
    await POST(request());
    expect(new Headers(calls[0].headers).get("Idempotency-Key")).toBe(
      new Headers(calls[1].headers).get("Idempotency-Key"),
    );
    const beforeInvalid = calls.length;
    for (const body of [
      { ...valid, email: "bad\n@example.com" },
      { ...valid, description: " " },
      { ...valid, description: "a".repeat(5001) },
      { ...valid, service: "invented" },
      { ...valid, companyFax: "bot" },
      { ...valid, website: "javascript:alert(1)" },
    ]) {
      expect((await POST(request(body))).status).toBe(400);
    }
    expect(
      (await POST(request(valid, "https://unrelated.example"))).status,
    ).toBe(403);
    expect(calls).toHaveLength(beforeInvalid);
    global.fetch = async () =>
      Response.json({ message: "private provider failure" }, { status: 429 });
    const rejected = await POST(request());
    expect(rejected.status).toBe(502);
    expect(await rejected.text()).not.toContain("private provider failure");
    global.fetch = async () => {
      throw new Error("timeout");
    };
    expect((await POST(request())).status).toBe(502);
    delete process.env.RESEND_API_KEY;
    expect((await POST(request())).status).toBe(503);
  } finally {
    global.fetch = fetchBefore;
    if (envBefore.key === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = envBefore.key;
    if (envBefore.from === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = envBefore.from;
  }
});


test("origin checks use the public Host when Next.js supplies an internal URL", async () => {
  for (const [source, expected] of [[origin, 400], ["https://unrelated.example", 403]]) {
    const response = await POST(new Request("http://0.0.0.0:3100/api/inquiries", {
      method: "POST",
      headers: { origin: String(source), host: new URL(origin).host, "Content-Type": "application/json" },
      body: "{}",
    }));
    expect(response.status).toBe(expected);
  }
});
