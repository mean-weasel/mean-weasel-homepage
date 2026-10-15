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
    await expect(page.locator('.automation-offers h3')).toHaveText(['Inquiry handling & follow-up', 'Forms & everyday admin', 'Content preparation']);
    await expect(page.locator('.automation-examples a').first()).toHaveAttribute('href', '/projects/job-apply');
    await expect(page.locator('.automation-examples a').last()).toHaveAttribute('href', '/projects/foil');
    await page.locator('#automation').getByRole('link', { name: 'Tell us what you’re doing manually' }).click();
    await expect(page.locator('select[name="service"]')).toHaveValue('AI automation');
    await page.goto('/how-we-work');
    const chapters = page.locator('main > section');
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
