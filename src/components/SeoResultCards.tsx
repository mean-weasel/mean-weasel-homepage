"use client";

import { useState } from "react";

// Google Search Console domain properties, Web search, verified October 14, 2026.
// Each period was queried directly with inclusive start/end dates in Search Console.
// Bleep/BugDrop retain six periods; the blog has four: June 12–October 11, 2026.
const projects = {
  bleep: {
    name: "Bleep That Sh*t", category: "01 / AUDIO & VIDEO", description: "Clean up the language. Keep the content.", url: "https://bleepthat.sh",
    work: "Researched how people search for audio and video censoring, created targeted pages and guides, and optimized titles, descriptions, and internal links.",
    impressions: [9911, 15061, 22309, 29512, 44776, 41634], clicks: [699, 953, 1206, 1944, 1937, 2029],
  },
  bugdrop: {
    name: "BugDrop", category: "02 / DEVELOPER TOOLS", description: "Make reporting bugs the easy part.", url: "https://bugdrop.dev",
    work: "Created product, comparison, and use-case pages that explain the tool, answer questions, and guide visitors toward installation.",
    impressions: [204, 510, 1190, 972, 1284, 1015], clicks: [3, 10, 51, 88, 76, 69],
  },
  blog: {
    name: "neonwatty.com", category: "03 / CONTENT & GUIDES", description: "Useful articles. Found through search.", url: "https://neonwatty.com",
    work: "Researched relevant topics, published practical guides, and optimized articles and related links to help readers discover more.",
    impressions: [103064, 62902, 39328, 33377], clicks: [1712, 1112, 754, 597],
  },
};
const periods = [
  ["Apr 12", "May 11"], ["May 12", "Jun 11"], ["Jun 12", "Jul 11"],
  ["Jul 12", "Aug 11"], ["Aug 12", "Sep 11"], ["Sep 12", "Oct 11"],
];
const format = (value: number) => value.toLocaleString("en-US");

function SearchChart({ values, metric }: { values: number[]; metric: "impressions" | "clicks" }) {
  const recentValues = values.slice(-4);
  const recentPeriods = periods.slice(-4);
  const cumulative = recentValues.map((_, i) => recentValues.slice(0, i + 1).reduce((sum, value) => sum + value, 0));
  const total = cumulative[cumulative.length - 1];
  const peak = total;
  const label = `Cumulative Google Search ${metric} since June 12, 2026: ${cumulative.map((value, i) => `through ${recentPeriods[i][1]} ${format(value)}`).join(", ")}. Bars start at zero; each chart is scaled to its own peak.`;
  return <>
    <h3><span className="result-growth">{format(total)}</span> {metric === "impressions" ? "Impressions" : "Clicks"} from Google</h3>
    <figure className="results-chart">
      <figcaption>Cumulative · Jun 12–Oct 11, 2026</figcaption>
      <div className="results-bars" role="img" aria-label={label}>
        {cumulative.map((value, i) => <div className="results-bar-column" key={recentPeriods[i][0]}><strong title={format(value)}>{value >= 10000 ? `${(value / 1000).toFixed(1)}k` : format(value)}</strong><div className="results-bar" style={{ height: `calc(var(--chart-height) * ${value / peak})` }} /><span className="results-period"><span>Through</span><span>{recentPeriods[i][1]}</span></span></div>)}
      </div>
    </figure>
  </>;
}

function BleepUsage() {
  // PostHog production completions verified October 15, 2026 at 17:00 UTC.
  // Studio deduplicated by project; public completions by event UUID.
  // Monthly cumulative minutes rounded to whole minutes, not estimated history.
  const values = [9112, 13351, 14826];
  const dates = ["Aug 31", "Sep 30", "Oct 15"];
  return <>
    <h3><span className="result-growth">14,800+</span> Minutes processed by users</h3>
    <figure className="results-chart">
      <figcaption>Cumulative · Aug 1-Oct 15, 2026</figcaption>
      <div className="results-bars" role="img" aria-label={`Recorded media minutes processed across Studio and public Bleep, since August 1, 2026: ${values.map((value, i) => `through ${dates[i]}, ${format(value)}`).join("; ")}. October is a partial month. Bars start at zero. Not attributed to Google.`}>
        {values.map((value, i) => <div className="results-bar-column" key={dates[i]}><strong>{format(value)}</strong><div className="results-bar" style={{ height: `calc(var(--chart-height) * ${value / values[values.length - 1]})` }} /><span>{dates[i]}</span></div>)}
      </div>
    </figure>
  </>;
}

function BugDropUsage() {
  // Retained production installations verified October 14, 2026, by creation date.
  const values = [85, 115, 143, 182];
  const dates = ["Jul 11", "Aug 11", "Sep 11", "Oct 11"];
  return <>
    <h3><span className="result-growth">182</span> Users</h3>
    <figure className="results-chart">
      <figcaption>Cumulative users · Jul-Oct 2026</figcaption>
      <div className="results-bars" role="img" aria-label={`Total BugDrop users: ${values.map((value, i) => `${dates[i]}, ${format(value)}`).join("; ")}. Retained installations by creation date, not individual people or usage attributed to Google. Bars start at zero.`}>
        {values.map((value, i) => <div className="results-bar-column" key={dates[i]}><strong>{format(value)}</strong><div className="results-bar" style={{ height: `calc(var(--chart-height) * ${value / 182})` }} /><span>{dates[i]}</span></div>)}
      </div>
    </figure>
  </>;
}

function ResultCard({ product }: { product: keyof typeof projects }) {
  const [flipped, setFlipped] = useState(false);
  const project = projects[product];
  const bleep = product === "bleep";
  const blog = product === "blog";
  const backLabel = blog ? "Flip to Google clicks" : bleep ? "Flip to product usage" : "Flip to product adoption";
  return <article id={product} className={`result-card ${blog ? "result-card-peach" : bleep ? "result-card-sage" : "result-card-blue"}`} aria-labelledby={`${product}-title`}>
    <header className="result-card-header"><span className="studio-eyebrow">{project.category}</span><h2 id={`${product}-title`}>{project.name}</h2><p>{project.description}</p></header>
    <div className="result-card-perspective">
      <div className={`result-card-turn${flipped ? " is-flipped" : ""}`}>
        <div id={`${product}-impressions`} className="result-card-face result-card-front" inert={flipped} aria-hidden={flipped}>
          <SearchChart values={project.impressions} metric="impressions" />
        </div>
        <div id={`${product}-details`} className="result-card-face result-card-back" inert={!flipped} aria-hidden={!flipped}>
          <p className="result-face-label">{blog ? "Google search traffic" : bleep ? "Product usage" : "Product adoption"}</p>
          {blog ? <SearchChart values={project.clicks} metric="clicks" /> : bleep ? <BleepUsage /> : <BugDropUsage />}
          {!blog && <p className="result-attribution-note">Across the app, not attributed to Google.</p>}
          <a className="studio-text-link" href={project.url}>Visit {project.name} ↗</a>
        </div>
      </div>
    </div>
    <button className="result-flip-button" aria-expanded={flipped} aria-controls={`${product}-details`} aria-label={`${flipped ? "Flip to Google impressions" : backLabel}: ${project.name}`} onClick={() => setFlipped(value => !value)}>{flipped ? "Flip to Google impressions" : backLabel}<span aria-hidden="true">↻</span></button>
    <div className="result-work"><h3>What we did</h3><p>{project.work}</p></div>
  </article>;
}

export function SeoResultCards() {
  return <section className="result-cards studio-container" aria-label="SEO case studies"><ResultCard product="bleep" /><ResultCard product="bugdrop" /><ResultCard product="blog" /></section>;
}
