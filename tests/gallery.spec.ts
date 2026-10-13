import { expect, test } from "@playwright/test";

test("project links work, including newly added and preserved project pages", async ({
  page,
}) => {
  for (const slug of [
    "machine-learning-refined",
    "meme-search",
    "ytgify",
    "job-apply",
    "logo-designer",
    "debt-is-fun",
    "deckchecker",
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 1366, height: 768 },
  { width: 390, height: 844 },
  { width: 375, height: 667 },
  { width: 844, height: 390 },
  { width: 320, height: 568 },
]) {
  test(`homepage sections fill the screen without clipping at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const header = await page.locator(".studio-header").boundingBox();
    if (viewport.height >= 568) {
      for (const section of await page.locator("main section").all()) {
        expect(Math.abs((await section.boundingBox())!.height - (viewport.height - header!.height))).toBeLessThanOrEqual(1);
      }
    }
    const hero = await page.locator(".studio-hero").boundingBox();
    expect(hero!.height + header!.height).toBeGreaterThanOrEqual(
      viewport.height - 1,
    );
    const studio = await page.locator("#contact").boundingBox();
    expect(studio!.height).toBeGreaterThanOrEqual(
      viewport.height - header!.height - 1,
    );
    for (const showcase of await page.locator(".project-showcase").all()) {
      const bounds = await showcase.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(
        viewport.height - header!.height - 1,
      );
    }
    for (const selector of [
      ".studio-hero",
      ".project-showcase:first-child",
      "#contact",
    ]) {
      expect(
        await page
          .locator(selector)
          .evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
      ).toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
