import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });
for (const width of [320, 375, 390, 1440]) {
  test(`business positioning and direct inquiry at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 390 ? 667 : 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Better websites.");
    await expect(page.locator(".studio-intro")).toContainText("Phoenix");
    await expect(page.locator(".home-services-offers p").first()).toBeVisible();
    await expect(page.locator(".gallery-description").first()).toBeVisible();
    if (width <= 800) await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Request a consultation" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByLabel("Your name", { exact: true })).toBeInViewport();
    await expect(page.getByLabel("Business name")).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto("/contact?service=Custom%20app%20or%20integration");
    await expect(page.getByLabel("What would you like help with?")).toHaveValue("Custom app or integration");
    await page.goto("/contact?service=unknown");
    await expect(page.getByLabel("What would you like help with?")).toHaveValue("New business website");
  });
}

test("optional details stay optional, validate when collapsed, and reach the inquiry endpoint", async ({ page }) => {
  await page.goto("/contact");
  let calls = 0;
  await page.route("**/api/inquiries", async route => {
    calls++;
    const fields = route.request().postDataJSON();
    expect(fields.business).toBe("Preview business");
    expect(fields.website).toBe("https://example.com");
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.getByLabel("Your name", { exact: true }).fill("Preview Visitor");
  await page.getByLabel("Email", { exact: true }).fill("preview@example.com");
  await page.getByLabel("What would you like to improve?").fill("Help customers request a quote.");
  await page.getByText("Add business details", { exact: false }).click();
  await page.getByLabel("Business name").fill("Preview business");
  await page.getByLabel("Current website").fill("not-a-url");
  await page.getByText("Add business details", { exact: false }).click();
  await page.getByRole("button", { name: "Request a consultation" }).click();
  await expect(page.getByLabel("Current website")).toBeVisible();
  expect(calls).toBe(0);
  await page.getByLabel("Current website").fill("https://example.com");
  await page.getByRole("button", { name: "Request a consultation" }).click();
  await expect(page.getByRole("status")).toContainText("your inquiry has been sent");
  expect(calls).toBe(1);
});

test("server-rendered form cannot submit before its client handler is ready", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/contact");
  await expect(page.getByLabel("Your name", { exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Request a consultation" })).toBeDisabled();
  await expect(page.getByText("Loading the inquiry form.", { exact: false })).toBeVisible();
  await context.close();
});

test("an undecided visitor can retry without losing answers", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  let calls = 0;
  await page.route("**/api/inquiries", async route => {
    calls++;
    expect(route.request().postDataJSON().service).toBe("Not sure yet");
    await route.fulfill({ status: calls === 1 ? 500 : 200, contentType: "application/json", body: JSON.stringify({ ok: calls > 1 }) });
  });
  await page.getByLabel("Your name", { exact: true }).fill("Business owner");
  await page.getByLabel("Email", { exact: true }).fill("owner@example.com");
  await page.getByLabel("What would you like help with?").selectOption("Not sure yet");
  await page.getByLabel("What would you like to improve?").fill("We need more local customers.");
  await page.getByRole("button", { name: "Request a consultation" }).click();
  await expect(page.locator(".service-form").getByRole("alert")).toContainText("Your details are still here");
  await expect(page.getByLabel("What would you like to improve?")).toHaveValue("We need more local customers.");
  await page.getByRole("button", { name: "Request a consultation" }).click();
  await expect(page.getByRole("status")).toContainText("your inquiry has been sent");
  await expect(page.getByRole("button", { name: "Request sent" })).toBeDisabled();
  expect(calls).toBe(2);
});
