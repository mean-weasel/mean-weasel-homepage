const baseUrl = new URL(
  process.env.SEO_BASE_URL ??
    "http://mean-weasel-homepage.127.0.0.1.nip.io:3000",
);

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)];
}

function attribute(html, tagPattern, name) {
  const tag = html.match(tagPattern)?.[0];
  return tag?.match(new RegExp(`${name}=["']([^"']+)["']`, "i"))?.[1];
}

function localUrl(url) {
  const parsed = new URL(url, baseUrl);
  return new URL(`${parsed.pathname}${parsed.search}`, baseUrl);
}

async function fetchPage(url, options) {
  try {
    return await fetch(url, options);
  } catch (error) {
    failures.push(`Could not fetch ${url}: ${error.message}`);
    return null;
  }
}

const sitemapResponse = await fetchPage(new URL("/sitemap.xml", baseUrl));
if (!sitemapResponse) process.exit(1);

check(sitemapResponse.status === 200, "/sitemap.xml must return 200");
const sitemapXml = await sitemapResponse.text();
const sitemapUrls = matches(sitemapXml, /<loc>([^<]+)<\/loc>/gi).map(
  (match) => match[1],
);

check(sitemapUrls.length > 0, "Sitemap must contain at least one URL");
check(
  !/<lastmod>/i.test(sitemapXml),
  "Sitemap must not publish deployment-time lastmod values",
);

const titles = new Map();
const canonicals = new Map();
const internalPaths = new Set();
const socialImagePaths = new Set();

for (const sitemapUrl of sitemapUrls) {
  const response = await fetchPage(localUrl(sitemapUrl));
  if (!response) continue;

  check(response.status === 200, `${sitemapUrl} must return 200`);
  const html = await response.text();
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const canonical = attribute(
    html,
    /<link\b[^>]*rel=["']canonical["'][^>]*>/i,
    "href",
  );
  const h1s = matches(html, /<h1\b/gi);

  check(Boolean(title), `${sitemapUrl} must have a title`);
  check(Boolean(canonical), `${sitemapUrl} must have a canonical URL`);
  check(h1s.length === 1, `${sitemapUrl} must have exactly one H1`);
  check(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html),
    `${sitemapUrl} must include JSON-LD`,
  );

  if (title) {
    check(!titles.has(title), `${sitemapUrl} duplicates title from ${titles.get(title)}`);
    titles.set(title, sitemapUrl);
  }
  if (canonical) {
    check(
      canonical === sitemapUrl,
      `${sitemapUrl} canonical must equal its sitemap URL (found ${canonical})`,
    );
    check(
      !canonicals.has(canonical),
      `${sitemapUrl} duplicates canonical from ${canonicals.get(canonical)}`,
    );
    canonicals.set(canonical, sitemapUrl);
  }

  for (const match of matches(html, /<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = new URL(match[1], baseUrl);
    if (href.origin === baseUrl.origin) internalPaths.add(`${href.pathname}${href.search}`);
  }

  for (const property of ["og:image", "twitter:image"]) {
    const image = attribute(
      html,
      new RegExp(
        `<meta\\b[^>]*(?:property|name)=["']${property}["'][^>]*>`,
        "i",
      ),
      "content",
    );
    check(Boolean(image), `${sitemapUrl} must include ${property}`);
    if (image) socialImagePaths.add(new URL(image).pathname);
  }
}

for (const path of internalPaths) {
  const response = await fetchPage(new URL(path, baseUrl), { redirect: "manual" });
  if (response) check(response.status < 400, `Internal link ${path} returned ${response.status}`);
}

for (const path of socialImagePaths) {
  const response = await fetchPage(new URL(path, baseUrl));
  if (response) {
    check(response.status === 200, `Social image ${path} must return 200`);
    check(
      response.headers.get("content-type")?.startsWith("image/"),
      `Social image ${path} must return an image content type`,
    );
  }
}

const missingResponse = await fetchPage(
  new URL("/projects/not-a-real-project", baseUrl),
);
if (missingResponse) {
  const html = await missingResponse.text();
  const robots = matches(
    html,
    /<meta\b[^>]*name=["']robots["'][^>]*>/gi,
  ).map((match) => attribute(match[0], /<meta\b[^>]*>/i, "content"));
  check(missingResponse.status === 404, "Unknown project must return 404");
  check(robots.length === 1, "404 page must emit exactly one robots directive");
  check(robots[0]?.includes("noindex"), "404 page robots directive must include noindex");
  check(
    !/<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(html),
    "404 page must not inherit the homepage canonical",
  );
}

for (const sitemapUrl of sitemapUrls) {
  const pathname = new URL(sitemapUrl).pathname;
  if (pathname === "/") continue;
  const response = await fetchPage(new URL(`${pathname}/`, baseUrl), {
    redirect: "manual",
  });
  if (!response) continue;
  check(
    [307, 308].includes(response.status),
    `${pathname}/ must redirect to its canonical path`,
  );
  check(
    response.headers.get("location") === pathname,
    `${pathname}/ must redirect to ${pathname}`,
  );
}

if (failures.length) {
  console.error(`SEO check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO check passed for ${sitemapUrls.length} sitemap URLs, ${internalPaths.size} internal links, and ${socialImagePaths.size} social images.`,
);
