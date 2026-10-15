import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`work examples connect to services at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/gallery');
    await expect(page.locator('#primary-navigation a[href="/seo-results"]')).toHaveCount(0);
    const ids = ['websites', 'search-results', 'apps', 'automation'];
    await expect(page.locator('main > section')).toHaveCount(4);
    for (const id of ids) {
      await page.goto(`/gallery#${id}`);
      const section = page.locator(`main > #${id}`);
      const header = (await page.locator('.studio-header').boundingBox())!.height + (await page.locator('.service-section-nav').boundingBox())!.height;
      await expect.poll(async () => Math.abs((await section.boundingBox())!.y - header)).toBeLessThanOrEqual(1);
      expect(await section.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
    await page.goto('/gallery#search-results');
    const bleep = page.getByRole('article', { name: 'Bleep That Sh*t', exact: true });
    await bleep.getByRole('button').click();
    await expect(bleep.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    await page.goto('/services');
    for (const id of ids) {
      await expect(page.locator(`main a[href="/gallery#${id}"]`)).toHaveCount(1);
    }
  });
}
