import { expect, test } from "@playwright/test";
test.use({ reducedMotion: "reduce" });

for (const width of [320, 390, 768, 1440]) {
  for (const route of ["/services", "/how-we-work"]) {
    test(`${route} reads and navigates at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://mean-weasel.com${route}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator("main")).not.toContainText(/\$\s?\d/);
      await expect(page.locator("main")).not.toContainText("Pricing to be confirmed");
      for (const link of await page.locator(".service-picker a").all()) {
        const hash = await link.getAttribute("href");
        await link.click();
        const top = await page.locator(hash!).evaluate(el => el.getBoundingClientRect().top);
        const headerBottom = await page.locator(".studio-header").evaluate(el => el.getBoundingClientRect().bottom);
        expect(top).toBeGreaterThanOrEqual(headerBottom - 2);
      }
      const cta = page.locator(".service-closing").getByRole("link", { name: "Request a consultation" });
      await cta.click();
      await expect(page).toHaveURL(/\/contact$/);
      await expect(page.getByRole("textbox", { name: "Your name", exact: true })).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
}

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
  test(`service chapters fill the viewport and navigation stays accessible at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/services");
    const nav = page.getByRole("navigation", { name: "Service sections" });
    const header = await page.locator(".studio-header").boundingBox();
    const navBox = await nav.boundingBox();
    for (const section of await page.locator("main > section").all()) {
      expect((await section.boundingBox())!.height).toBeGreaterThanOrEqual(viewport.height - header!.height - navBox!.height - 2);
    }
    for (const link of await nav.getByRole("link").all()) {
      await link.click();
      await expect(link).toHaveAttribute("aria-current", "location");
      const target = page.locator((await link.getAttribute("href"))!);
      const targetBox = (await target.boundingBox())!;
      const currentNav = (await nav.boundingBox())!;
      expect(targetBox.y).toBeGreaterThanOrEqual(currentNav.y + currentNav.height - 2);
      expect(currentNav.y).toBeCloseTo(header!.height, 0);
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("service section motion respects user preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/services");
  await expect.poll(() => page.locator(".service-intro > div").evaluate(el => getComputedStyle(el).animationName)).toBe("section-arrival");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("smooth");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  expect(await page.locator(".service-intro > div").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await page.getByRole("navigation", { name: "Service sections" }).getByRole("link", { name: "SEO", exact: true }).click();
  await expect(page.locator("#seo h2")).toBeVisible();
});

test("navigation destinations are consistent across pages", async ({ page }) => {
  for (const route of ["/", "/services", "/about", "/gallery"]) {
    await page.goto(route);
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav.getByRole("link", { name: "Our work", exact: true })).toHaveAttribute("href", "/gallery");
    await nav.getByRole("button", { name: "Services", exact: true }).click();
    await expect(nav.getByRole("link", { name: "How we work" })).toBeVisible();
    await nav.getByRole("link", { name: "How we work", exact: true }).click();
    await expect(page).toHaveURL(/\/how-we-work$/);
  }
});

test("process page motion stays optional", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/how-we-work");
  await expect.poll(() => page.locator(".service-intro > div").evaluate(el => getComputedStyle(el).animationName)).toBe("section-arrival");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("smooth");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".service-intro > div").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("consolidated pages preserve old links and connect proof to services", async ({ page, request }) => {
  for (const [oldPath, newPath] of [["/pricing", "/how-we-work"], ["/pricing/", "/how-we-work"], ["/use-cases", "/services"], ["/use-cases/", "/services"]]) {
    const response = await request.get(oldPath, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(newPath);
  }
  await page.goto('/services');
  await expect(page.locator('.service-example').first()).toContainText('landscaper');
  await page.locator('#business-website summary').click();
  await expect(page.locator('#business-website')).toContainText('Up to five pages');
  await page.goto('/gallery');
  await page.getByRole('link', { name: 'See our SEO results' }).click();
  await page.getByRole('link', { name: 'Explore SEO results' }).click();
  await expect(page).toHaveURL(/\/seo-results$/);
});
