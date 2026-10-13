import { createHash } from "node:crypto";
import { parseInquiry } from "../../../lib/inquiry";

export const runtime = "nodejs";
const recipient = "jeremy@mean-weasel.com";
const failure =
  "Your inquiry could not be sent. Please try again, or email jeremy@mean-weasel.com directly.";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next.js may use its bind address in request.url; Host retains the public authority.
  const publicOrigin = `${requestUrl.protocol}//${request.headers.get("host") || requestUrl.host}`;
  if (!origin || origin !== publicOrigin) {
    return Response.json(
      { error: "Please submit the form from this website." },
      { status: 403 },
    );
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Invalid request format." }, { status: 415 });
  }
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32_768) {
        await reader.cancel();
        return Response.json(
          { error: "Your inquiry is too long. Please shorten it." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }
  const inquiry = parseInquiry(raw);
  if (!inquiry || inquiry.companyFax) {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from)
    return Response.json({ error: failure }, { status: 503 });

  const text = [
    "New website inquiry from mean-weasel.com",
    "",
    `Name: ${inquiry.name}`,
    `Reply email: ${inquiry.email}`,
    `Business: ${inquiry.business || "Not provided"}`,
    `Current website: ${inquiry.website || "Not provided"}`,
    `Service: ${inquiry.service}`,
    "",
    inquiry.description,
  ].join("\n");
  // Bind retries to both the submission ID and its contents, without exposing PII in the key.
  const idempotencyKey = createHash("sha256")
    .update(JSON.stringify(inquiry))
    .digest("hex");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry/${idempotencyKey}`,
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: inquiry.email,
        subject: `Project inquiry: ${inquiry.service}`,
        text,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return Response.json({ error: failure }, { status: 502 });
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id)
      return Response.json({ error: failure }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: failure }, { status: 502 });
  }
}
