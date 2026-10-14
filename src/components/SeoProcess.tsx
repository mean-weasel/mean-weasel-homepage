import styles from "./SeoProcess.module.css";

const steps = [
  ["Review", "We look at your website, search data, and how customers get in touch."],
  ["Agree priorities", "You get a focused plan. We agree on scope, timing, and cost before starting."],
  ["Improve", "We make the agreed page, content, and technical improvements."],
  ["Measure", "We compare search performance and available inquiry data, then recommend next steps."],
];

export function SeoProcess({ compact = false }: { compact?: boolean }) {
  return <ol className={`${styles.steps}${compact ? ` ${styles.compact}` : ""}`} aria-label="Our SEO process">
    {steps.map(([title, copy], i) => <li key={title}><span className={styles.number} aria-hidden="true">0{i + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
  </ol>;
}
