import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 820, height: 900 },
  { width: 844, height: 390 },
  { width: 1440, height: 900 },
]) {
  test(`UX review: fonts, overflow, controls, and page errors at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    const remoteFonts: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => {
      if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) remoteFonts.push(request.url());
    });
    for (const route of ["/", "/services", "/use-cases", "/pricing", "/seo-results", "/contact", "/services/web-design-phoenix", "/projects/bugdrop", "/projects/bleep-that-shit", "/projects/seatify", "/projects/foil", "/projects/job-apply", "/projects/logo-designer", "/projects/machine-learning-refined", "/projects/meme-search", "/projects/ytgify", "/projects/debt-is-fun", "/projects/deckchecker"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => [...document.fonts].some(font => font.status === "loaded"))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const navigation = page.getByRole("navigation", { name: "Primary navigation" });
      if (viewport.width <= 800) await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(navigation.getByRole("link", { name: "Pricing", exact: true })).toBeVisible();
      const boxes = await navigation.getByRole("link").evaluateAll(links => links.map(link => {
        const { x, y, width, height } = link.getBoundingClientRect();
        return { x, y, width, height };
      }));
      for (const box of boxes) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
      }
      if (viewport.width <= 800) await page.keyboard.press("Escape");
      if (route === "/services/web-design-phoenix") {
        const form = (await page.locator(".service-form").boundingBox())!;
        const steps = (await page.locator(".service-next-steps").boundingBox())!;
        if (viewport.width <= 800) expect(steps.y).toBeGreaterThan(form.y + form.height);
        else expect(form.x).toBeGreaterThan(steps.x);
      }
      for (const control of await page.locator(".gallery-card-actions a, .showcase-controls button, .gallery-filters button, .services-jump a").all()) {
        expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }
    }
    expect(errors).toEqual([]);
    expect(remoteFonts).toEqual([]);
  });
}

test("mobile menu dismisses with Escape, outside tap, and keyboard focus leaving header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator(".studio-menu-toggle");
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.locator(".hero-bottom").click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.locator(".home-hero-actions .home-cta-button").focus();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion leaves content visible and disables entrance animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator(".hero-copy");
  expect(await hero.evaluate(el => getComputedStyle(el).opacity)).toBe("1");
  expect(await hero.evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  expect(await page.locator(".showcase-track").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
});
