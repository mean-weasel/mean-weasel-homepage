import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });
for (const width of [1440, 390, 320]) {
  test(`services inquiry flow and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/services/web-design-phoenix");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Small business web design in Phoenix",
    );
    await page
      .getByRole("link", { name: "Ask about Website + Content", exact: true })
      .click();
    await expect(page.getByLabel("What would you like help with?")).toHaveValue(
      "Website + Content",
    );
    await page.getByLabel("Your name", { exact: true }).fill("Preview Visitor");
    await page.getByLabel("Email", { exact: true }).fill("preview@example.com");
    await page
      .getByLabel("What would you like this project to help people do?")
      .fill("Request a quote for my business.");
    const ids: string[] = [];
    let attempts = 0;
    await page.route("**/api/inquiries", async (route) => {
      const fields = route.request().postDataJSON();
      expect(fields.service).toBe("Website + Content");
      expect(fields.email).toBe("preview@example.com");
      ids.push(fields.requestId);
      attempts++;
      await route.fulfill({
        status: attempts === 1 ? 502 : 200,
        contentType: "application/json",
        body: JSON.stringify(
          attempts === 1 ? { error: "Failed" } : { ok: true },
        ),
      });
    });
    const submit = page.getByRole("button", {
      name: "Request a project estimate",
    });
    await submit.click();
    await expect(page.locator("form").getByRole("alert")).toContainText(
      "could not be sent",
    );
    await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
      "Preview Visitor",
    );
    await submit.click();
    await expect(page.getByRole("status")).toContainText(
      "your inquiry has been sent",
    );
    expect(ids[0]).toMatch(/^[0-9a-f-]{36}$/);
    expect(ids[1]).toBe(ids[0]);
    await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(await page.locator("main").innerText()).not.toMatch(/\$\s*\d/);
  });
}

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
  { width: 844, height: 390 },
]) {
  test(`navigation lands below header and sections fill available space at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const header = page.locator(".studio-header");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    for (const [name, id] of [
      ["Services", "#services"],
      ["Examples", "#products"],
    ]) {
      const menu = page.getByRole("button", { name: "Menu", exact: true });
      if (await menu.isVisible()) await menu.click();
      await nav.getByRole("link", { name, exact: true }).click();
      await expect
        .poll(async () => Math.abs((await page.locator(id).boundingBox())!.y - (await header.boundingBox())!.height))
        // Browser anchor scrolling rounds fractional CSS pixels.
        .toBeLessThanOrEqual(1);
      const target = page
        .locator(id === "#products" ? ".project-showcase" : id)
        .first();
      expect((await target.boundingBox())!.height).toBeGreaterThanOrEqual(
        viewport.height - (await header.boundingBox())!.height - 1,
      );
      expect((await header.boundingBox())!.y).toBe(0);
    }
    await page.goto("/services/web-design-phoenix");
    for (const id of ["packages", "seo", "work", "inquiry"]) {
      await page.locator(`.services-jump a[href="#${id}"]`).click();
      const target = page.locator(`#${id}`);
      await expect
        .poll(async () =>
          Math.abs((await target.boundingBox())!.y - (await header.boundingBox())!.height),
        )
        // Browser anchor scrolling rounds fractional CSS pixels.
        .toBeLessThanOrEqual(1);
      expect((await target.boundingBox())!.height).toBeGreaterThanOrEqual(
        viewport.height - (await header.boundingBox())!.height - 1,
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("smooth scrolling respects reduced-motion preferences", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("smooth");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});

test("keyboard skip link and mobile menu remain operable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

for (const width of [390, 1440]) {
  test(`package interest carries into inquiries at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, label, service] of [
      ["/services", "Ask about Website + Content", "Website + Content"],
      ["/services", "Discuss an SEO project", "SEO Foundation Project"],
      ["/services", "Discuss a custom project", "Custom app or integration"],
    ]) {
      await page.goto(route);
      await page.getByRole("link", { name: label }).click();
      await expect(page.getByLabel("What would you like help with?")).toHaveValue(service);
      await expect(page.getByLabel("Your name", { exact: true })).toBeVisible();
    }
    await page.goto("/use-cases");
    await page.locator("#local-services").getByRole("link", { name: "Discuss this kind of project" }).click();
    await expect(page.getByLabel("What would you like help with?")).toHaveValue("Business Website");
    await page.goto("/services/web-design-phoenix?service=invalid#inquiry");
    await expect(page.getByLabel("What would you like help with?")).toHaveValue("New business website");
  });
}

test("inquiry validation and pending state prevent incomplete or duplicate submissions", async ({ page }) => {
  await page.goto("/services/web-design-phoenix#inquiry");
  let calls = 0;
  let finish!: () => void;
  const pending = new Promise<void>(resolve => { finish = resolve; });
  await page.route("**/api/inquiries", async route => {
    calls++;
    await pending;
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  const submit = page.getByRole("button", { name: "Request a project estimate" });
  await submit.click();
  expect(calls).toBe(0);
  await page.getByLabel("Your name", { exact: true }).fill("Preview QA");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.com");
  await page.getByLabel("What would you like this project to help people do?").fill("Check the inquiry workflow.");
  await submit.click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByLabel("Your name", { exact: true })).toBeDisabled();
  expect(calls).toBe(1);
  finish();
  await expect(page.getByRole("status")).toContainText("your inquiry has been sent");
});
