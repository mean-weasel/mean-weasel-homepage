# Bundled typography

Space Grotesk and Crimson Pro are from https://github.com/google/fonts/tree/main/ofl/spacegrotesk and https://github.com/google/fonts/tree/main/ofl/crimsonpro (downloaded 2026-10-12).

Variable fonts are subset to Latin, Latin Extended-A/B, punctuation, and common symbols, and compressed to WOFF2 with fontTools. Both original SIL Open Font Licenses are included alongside the assets. Bundling removes network font requests from the build; Next.js serves the fonts with the site. Crimson Pro includes a real italic face for emphasized headings.
