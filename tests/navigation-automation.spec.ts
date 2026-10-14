import { expect, test } from '@playwright/test';
test.use({ reducedMotion: 'reduce' });
for (const width of [320, 390, 820, 1440]) {
  test(`service menu, automation inquiry, and pricing chapters at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    if (width <= 800) await page.getByRole('button', { name: 'Menu', exact: true }).click();
    const nav = page.getByRole('navigation', { name: 'Primary navigation' });
    await nav.getByRole('button', { name: 'Services', exact: true }).click();
    await nav.getByRole('link', { name: 'AI automation', exact: true }).click();
    await expect(page).toHaveURL(/\/services#automation$/);
    await expect(page.locator('#automation')).toBeVisible();
    await page.locator('#automation').getByRole('link', { name: 'Discuss an automation' }).click();
    await expect(page.locator('select[name="service"]')).toHaveValue('AI automation');
    await page.goto('/pricing');
    const chapters = page.locator('.pricing-chapter');
    await expect(chapters).toHaveCount(4);
    const colors = [];
    for (const chapter of await chapters.all()) {
      expect((await chapter.boundingBox())!.height).toBeGreaterThanOrEqual(800);
      colors.push(await chapter.evaluate(el => getComputedStyle(el).backgroundColor));
    }
    expect(new Set(colors).size).toBe(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
