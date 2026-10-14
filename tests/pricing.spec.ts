import { expect, test } from "@playwright/test";
test.use({ reducedMotion: "reduce" });

for (const width of [320, 390, 768, 820, 1024, 1440]) {
  test(`core offerings and pricing work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".home-services-offers h3")).toHaveText(["Business websites", "App design & development", "SEO", "AI automation"]);
    await expect(page.locator(".home-services-offers a").nth(1)).toHaveAttribute("href", "/services#custom");
    const footer = page.getByRole("navigation", { name: "Footer navigation" });
    await expect(footer.getByRole("link")).toHaveText(["Services", "Use cases", "Pricing", "SEO results", "Our work", "About"]);
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    if (width <= 800) await page.getByRole("button", { name: "Menu" }).click();
    await navigation.getByRole("button", { name: "Services", exact: true }).click();
    await expect(navigation.getByRole("link", { name: "Use cases", exact: true })).toBeVisible();
    await navigation.getByRole("link", { name: "Pricing & scope", exact: true }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    if (width <= 800) {
      await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
      await page.getByRole("button", { name: "Menu" }).click();
    }
    await navigation.getByRole("button", { name: "Services", exact: true }).click();
    await expect(navigation.getByRole("link", { name: "Pricing & scope", exact: true })).toHaveAttribute("aria-current", "page");
    await expect(navigation.getByRole("link", { name: "Pricing & scope", exact: true })).toBeVisible();
    if (width <= 800) await page.keyboard.press("Escape");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".pricing-chapter .service-price")).toHaveText(Array(4).fill("Pricing to be confirmed"));
    expect(await page.locator("main").innerText()).not.toMatch(/\$\s*\d/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const link of await footer.getByRole("link").all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await page.getByRole("link", { name: "Discuss your app" }).click();
    await expect(page.getByLabel("What would you like help with?")).toHaveValue("Custom app or integration");
    await expect(page.getByLabel("Your name", { exact: true })).toBeVisible();
  });
}
