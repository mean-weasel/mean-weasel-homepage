import { expect, test } from "@playwright/test";
test.use({ reducedMotion: "reduce" });

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`homepage examples switch categories and scroll at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const web = page.getByRole("region", { name: "Our work", exact: true });
    await expect(web.getByRole("article")).toHaveCount(4);
    await expect(page.locator("main section")).toHaveCount(4);
    const track = web.locator(".showcase-track");
    const next = web.getByRole("button", { name: "Next Web apps projects" });
    const previous = web.getByRole("button", { name: "Previous Web apps projects" });
    await expect(previous).toBeEnabled();
    await expect(next).toHaveText("→");
    await expect(previous).toHaveText("←");
    await expect(web.getByRole("status")).toHaveText(viewport.width === 1440 ? "1–3 of 4" : "1 of 4");
    await expect(web.getByRole("link", { name: "View BugDrop project", exact: true })).toHaveAttribute("href", "/projects/bugdrop");
    const sectionBox = (await web.boundingBox())!;
    const cardBox = (await track.boundingBox())!;
    if (viewport.width === 390) expect(cardBox.y - sectionBox.y).toBeLessThan(300);
    const trackOffset = await track.evaluate(el => el.getBoundingClientRect().top - el.closest("section")!.getBoundingClientRect().top);
    const trackHeight = await track.evaluate(el => el.getBoundingClientRect().height);
    const controlsBox = (await next.boundingBox())!;
    const initialTrackBox = (await track.boundingBox())!;
    expect(controlsBox.height).toBeGreaterThanOrEqual(44);
    expect(controlsBox.y).toBeGreaterThan(initialTrackBox.y);
    expect(controlsBox.x + controlsBox.width / 2).toBeGreaterThan(initialTrackBox.x + initialTrackBox.width - 12);
    const previousBox = (await previous.boundingBox())!;
    expect(previousBox.x + previousBox.width / 2).toBeLessThan(initialTrackBox.x + 12);
    // Every step advances one project, including mixed last/first desktop views.
    const ranges = viewport.width === 1440
      ? ["2–4 of 4", "3, 4, 1 of 4", "4, 1, 2 of 4", "1–3 of 4"]
      : ["2 of 4", "3 of 4", "4 of 4", "1 of 4"];
    for (let round = 0; round < 2; round++) {
      for (const range of ranges) {
        await next.click();
        await expect(web.getByRole("status")).toHaveText(range);
      }
    }
    await previous.click();
    await expect(web.getByRole("status")).toHaveText(viewport.width === 1440 ? "4, 1, 2 of 4" : "4 of 4");
    const viewportEl = web.locator(".showcase-viewport");
    await viewportEl.focus();
    await page.keyboard.press("ArrowRight");
    await expect(web.getByRole("status")).toHaveText(ranges[3]);
    await page.keyboard.press("ArrowLeft");
    await expect(web.getByRole("status")).toHaveText(viewport.width === 1440 ? "4, 1, 2 of 4" : "4 of 4");
    await page.getByRole("group", { name: "Choose examples" }).getByRole("button", { name: "Apps & extensions", exact: false }).click();
    await expect(page.locator(".showcase-track article")).toHaveCount(2);
    await expect(page.locator(".showcase-track")).toContainText("Foil");
    await expect(page.locator(".showcase-track")).toContainText("YTgify");
    await expect(web.getByRole("status")).toHaveText(viewport.width === 1440 ? "1–2 of 2" : "1 of 2");
    const tools = page.getByRole("group", { name: "Choose examples" }).getByRole("button", { name: "Developer tools", exact: false });
    await tools.focus(); await page.keyboard.press("Enter");
    await expect(tools).toBeFocused();
    await expect(tools).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".showcase-track")).toContainText("Job Apply");
    await expect(page.locator(".showcase-track")).toContainText("Logo Designer");
    await page.getByRole("group", { name: "Choose examples" }).getByRole("button", { name: "Books & learning", exact: false }).click();
    await expect(page.locator(".showcase-track article")).toHaveCount(1);
    await expect(page.locator(".showcase-track")).toContainText("Machine Learning Refined");
    await expect(web.locator(".showcase-controls")).toHaveCount(0);
    expect(await track.evaluate(el => el.getBoundingClientRect().top - el.closest("section")!.getBoundingClientRect().top)).toBeCloseTo(trackOffset, 0);
    expect(await track.evaluate(el => el.getBoundingClientRect().height)).toBeCloseTo(trackHeight, 0);
    await page.getByRole("group", { name: "Choose examples" }).getByRole("button", { name: "Web apps", exact: false }).click();
    await expect(page.locator(".showcase-track article")).toHaveCount(4);
    const backgrounds = await page.locator(".home-band").evaluateAll(els => els.map(el => getComputedStyle(el).backgroundColor));
    expect(new Set(backgrounds).size).toBe(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("gallery is a dedicated destination", async ({ page }) => {
  await page.goto("/gallery?category=native-apps");
  await expect(page).toHaveURL(/\/gallery\?category=native-apps$/);
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Our work", exact: true })).toHaveAttribute("href", "/gallery");
  await expect(page.getByRole("link", { name: "Gallery", exact: true })).toHaveCount(0);
});

test("all four homepage sections offer a direct path to the inquiry form", async ({ page }) => {
  await page.goto("/");
  const sections = page.locator("main section");
  await expect(sections).toHaveCount(4);
  for (const section of await sections.all()) {
    await expect(section.locator('a[href="/contact"]').first()).toBeVisible();
  }
  await expect(page.locator("#studio")).toHaveCount(0);
  await page.locator("#contact").getByRole("link", { name: "Tell us about your project" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("textbox", { name: "Your name", exact: true })).toBeVisible();
});

for (const width of [390, 1440]) {
  test(`loop boundaries animate continuously in both directions at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/#products");
    const next = page.getByRole("button", { name: "Next Web apps projects" });
    const previous = page.getByRole("button", { name: "Previous Web apps projects" });
    await expect(next).toBeVisible();
    const viewport = page.locator(".showcase-viewport");
    // Last slide starts immediately left of the first, and enters smoothly.
    const last = page.locator(".showcase-track article").last();
    await previous.click();
    await expect(page.getByRole("status")).toHaveText(width === 1440 ? "4, 1, 2 of 4" : "4 of 4");
    const samples = await last.evaluate(async el => {
      const points: number[] = [];
      for (let i = 0; i < 50; i++) {
        await new Promise(requestAnimationFrame);
        points.push(el.getBoundingClientRect().x);
      }
      return points;
    });
    expect(samples.at(-1)!).toBeGreaterThan(samples[0] + 20);
    expect(new Set(samples.map(x => Math.round(x))).size).toBeGreaterThan(5);
    expect(samples.slice(1).every((x, i) => x >= samples[i] - 1)).toBe(true);
    const first = page.locator(".showcase-track article").first();
    const firstBefore = (await first.boundingBox())!.x;
    await next.click();
    const forward = await first.evaluate(async el => {
      const points: number[] = [];
      for (let i = 0; i < 50; i++) {
        await new Promise(requestAnimationFrame);
        points.push(el.getBoundingClientRect().x);
      }
      return points;
    });
    expect(forward.at(-1)!).toBeLessThan(firstBefore - 50);
    expect(new Set(forward.map(x => Math.round(x))).size).toBeGreaterThan(5);
    expect(forward.slice(1).every((x, i) => x <= forward[i] + 1)).toBe(true);
    expect(Math.abs(forward.at(-1)! - (await viewport.boundingBox())!.x)).toBeLessThan(4);
  });
}

test("dragging through the boundary preserves project order", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#products");
  const previous = page.getByRole("button", { name: "Previous Web apps projects" });
  await previous.click();
  await expect(page.getByRole("status")).toHaveText("4 of 4");
  const box = (await page.locator(".showcase-viewport").boundingBox())!;
  await page.mouse.move(box.x + box.width - 35, box.y + 80);
  await page.mouse.down();
  await page.mouse.move(box.x + 35, box.y + 80, { steps: 20 });
  await page.mouse.up();
  await expect(page.getByRole("status")).toHaveText("1 of 4");
  await expect(page).toHaveURL(/#products$/);
});
