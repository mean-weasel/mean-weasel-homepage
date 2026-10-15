import { expect, test } from "@playwright/test";

for (const width of [320, 390, 1024, 1440]) {
  test(`SEO stories are readable and lead to an SEO inquiry at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/seo-results');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const chapters = page.locator('.results-main > section');
    const headerHeight = await page.locator('.studio-header').evaluate(el => el.getBoundingClientRect().height);
    const backgrounds = [];
    for (const chapter of await chapters.all()) {
      const dimensions = await chapter.evaluate(el => ({ height: el.getBoundingClientRect().height, width: el.clientWidth, contentWidth: el.scrollWidth, background: getComputedStyle(el).backgroundColor }));
      expect(Math.abs(dimensions.height - (900 - headerHeight))).toBeLessThanOrEqual(1);
      expect(dimensions.contentWidth).toBeLessThanOrEqual(dimensions.width);
      backgrounds.push(dimensions.background);
    }
    expect(new Set(backgrounds).size).toBe(4);
    for (const content of await page.locator('.results-process > .studio-container, .results-closing > .studio-container').all()) {
      const box = (await content.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(20);
      expect(box.x + box.width).toBeLessThanOrEqual(width - 20);
    }
    for (const name of ['Bleep That Sh*t', 'BugDrop', 'neonwatty.com']) {
      const card = page.getByRole('article', { name });
      const flip = card.getByRole('button');
      await expect(card.locator('.result-card-front .results-bar')).toHaveCount(4);
      await expect(card.locator('.result-card-back .results-chart .results-bar')).toHaveCount(name === 'Bleep That Sh*t' ? 3 : 4);
      await expect(card.getByRole('img')).toHaveAccessibleName(/Cumulative Google Search impressions since June 12, 2026: through Jul 11.*through Oct 11/);
      await expect(card.getByRole('heading', { name: name === 'neonwatty.com' ? '238,671 Impressions from Google' : name === 'BugDrop' ? '4,461 Impressions from Google' : '138,231 Impressions from Google', exact: true })).toBeVisible();
      await expect(card.getByRole('link', { name: `Visit ${name}` })).toHaveCount(0);
      await expect(card.getByRole('img')).toBeVisible();
      await flip.focus();
      await page.keyboard.press('Enter');
      await expect(flip).toHaveAttribute('aria-expanded', 'true');
      await expect(card.getByRole('link', { name: `Visit ${name}` })).toBeVisible();
      await expect(flip).toBeFocused();
      await expect(card.getByRole('heading', { name: name === 'neonwatty.com' ? '4,175 Clicks from Google' : name === 'BugDrop' ? '182 Users' : '14,800+ Minutes processed by users', exact: true })).toBeVisible();
      await expect(card.getByRole('img', { name: name === 'neonwatty.com' ? /Cumulative Google Search clicks/ : name === 'BugDrop' ? /Total BugDrop users/ : /Recorded media minutes processed/ })).toBeVisible();
      await expect(card.getByRole('heading', { name: /Clicks from Google/ })).toHaveCount(name === 'neonwatty.com' ? 1 : 0);
      await page.keyboard.press('Space');
      await expect(flip).toHaveAttribute('aria-expanded', 'false');
      await expect(card.getByRole('link', { name: `Visit ${name}` })).toHaveCount(0);
      expect(await card.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
    await page.getByText('About these results and their limits', { exact: true }).click();
    await expect(page.getByText(/All three are our own sites, not client engagements/)).toBeVisible();
    await page.getByRole('link', { name: 'Talk with us about SEO' }).click();
    await expect(page).toHaveURL(/contact\?service=SEO%20Foundation%20Project/);
    await expect(page.locator('select[name="service"]')).toHaveValue('SEO Foundation Project');
  });
}

test('flip is instant with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/seo-results');
  await page.getByRole('button', { name: 'Flip to users: BugDrop', exact: true }).click();
  expect(await page.locator('#bugdrop .result-card-turn').evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
});
