import { expect, test } from '@playwright/test';
test.use({ reducedMotion: 'reduce' });
for (const viewport of [{width:1440,height:900}, {width:390,height:844}, {width:320,height:568}]) {
 test(`chapters occupy exactly one available screen at ${viewport.width}px`, async ({page}) => {
  await page.setViewportSize(viewport);
  for (const route of ['/seo-results', '/services', '/how-we-work', '/gallery', '/about']) {
   await page.goto(route);
   const header = (await page.locator('.studio-header').boundingBox())!.height;
   const nav = page.locator('.service-section-nav');
   const offset = header + (await nav.count() ? (await nav.boundingBox())!.height : 0);
   const chapters = page.locator('main > section');
   for (const chapter of await chapters.all()) {
    expect(Math.abs((await chapter.boundingBox())!.height - (viewport.height - offset))).toBeLessThanOrEqual(1);
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.goto('/seo-results');
  await page.getByRole('link',{name:'Explore the results'}).click();
  const header = (await page.locator('.studio-header').boundingBox())!;
  await expect.poll(async()=>Math.abs((await page.locator('#results').boundingBox())!.y-header.height)).toBeLessThanOrEqual(1);
  const proof = (await page.locator('#results').boundingBox())!;
  expect(Math.abs(proof.y+proof.height-viewport.height)).toBeLessThanOrEqual(1);
  await page.getByText('About these results and their limits',{exact:true}).click();
  await expect(page.getByText(/All three are our own sites, not client engagements/)).toBeVisible();
  await page.getByRole('link',{name:'Talk with us about SEO'}).click();
  await expect(page).toHaveURL(/contact\?service=SEO%20Foundation%20Project/);
 });
}
