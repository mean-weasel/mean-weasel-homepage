import { expect, test } from '@playwright/test';

for (const viewport of [{width:1440,height:900}, {width:390,height:844}, {width:320,height:568}]) {
  for (const route of ['/services', '/gallery']) {
    test(`sticky section navigation on ${route} at ${viewport.width}px`, async ({page}) => {
      await page.setViewportSize(viewport);
      await page.goto(route);
      const nav = page.locator('.service-section-nav');
      await expect(nav).toHaveCount(1);
      await expect(nav.getByRole('link')).toHaveCount(4);
      await expect(page.locator('main > section nav')).toHaveCount(0);
      const links = nav.getByRole('link');
      for (const index of [3, 0, 2, 1]) {
        const link = links.nth(index);
        await link.click();
        await expect(link).toHaveAttribute('aria-current', 'location');
        const section = page.locator((await link.getAttribute('href'))!);
        await expect.poll(async () => {
          const bar = (await nav.boundingBox())!;
          return Math.abs((await section.boundingBox())!.y - bar.y - bar.height);
        }).toBeLessThanOrEqual(1);
        const heading = section.locator('h1, h2').first();
        expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual((await nav.boundingBox())!.y + (await nav.boundingBox())!.height);
        await expect.poll(async () => link.evaluate(el => {
          const link = el.getBoundingClientRect();
          const row = el.parentElement!.getBoundingClientRect();
          return link.left >= row.left - 1 && link.right <= row.right + 1;
        })).toBe(true);
      }
      await page.goto(`${route}#automation`);
      await expect(links.last()).toHaveAttribute('aria-current', 'location');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}
