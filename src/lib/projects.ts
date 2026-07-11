export type ProjectStatus =
  | "Live"
  | "Public beta"
  | "Waitlist"
  | "In the works";

export type ProjectHighlight = {
  title: string;
  description: string;
};

export type Project = {
  name: string;
  slug?: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  url?: string;
  status: ProjectStatus;
  cta?: string;
  category?: string;
  audience?: string;
  headline?: string;
  introduction?: string;
  problem?: string;
  approach?: string;
  distinction?: string;
  highlights?: ProjectHighlight[];
  snapshot?: {
    eyebrow: string;
    headline: string;
    detail: string;
    signals: string[];
  };
};

export type PublishedProject = Project &
  Required<
    Pick<
      Project,
      | "slug"
      | "url"
      | "category"
      | "audience"
      | "headline"
      | "introduction"
      | "problem"
      | "approach"
      | "distinction"
      | "highlights"
      | "snapshot"
    >
  >;

export const liveProjects: PublishedProject[] = [
  {
    name: "BugDrop",
    slug: "bugdrop",
    description:
      "Open-source website feedback that turns annotated screenshots and browser context into GitHub Issues ready for triage.",
    icon: "🐞",
    color: "bg-sky-500",
    borderColor: "border-sky-200 dark:border-sky-900",
    url: "https://bugdrop.dev",
    status: "Live",
    cta: "Open BugDrop",
    category: "Developer tools",
    audience: "Product teams and developers who already manage work in GitHub",
    headline: "Visual website feedback, already shaped for GitHub.",
    introduction:
      "BugDrop is a free, open-source feedback widget that captures what someone saw, what their browser was doing, and what they wanted changed—then sends the report to the place the development team already works.",
    problem:
      "A report like “this looks broken” starts a scavenger hunt. Developers still need the page, viewport, browser, screenshot, and a clear indication of what looked wrong before they can act.",
    approach:
      "BugDrop collects that evidence at the moment of feedback. Reporters can capture and annotate the page, redact sensitive areas, and submit the result as a structured GitHub Issue instead of opening another feedback dashboard.",
    distinction:
      "The product stays close to the existing engineering workflow: one script tag on the website, GitHub Issues on the other side, and a self-hosting path for teams that want full control.",
    highlights: [
      {
        title: "Annotated evidence",
        description:
          "Capture the page, draw attention to the problem, and redact private information before submitting.",
      },
      {
        title: "Browser context",
        description:
          "Attach the URL, viewport, browser details, and other useful context that is easily lost in a written report.",
      },
      {
        title: "GitHub-native triage",
        description:
          "Create structured GitHub Issues with labels and metadata instead of asking the team to monitor a separate inbox.",
      },
      {
        title: "Open by default",
        description:
          "Install the lightweight widget quickly, inspect the source, customize it, or self-host it when the workflow demands it.",
      },
    ],
    snapshot: {
      eyebrow: "Feedback captured",
      headline: "The button clips on smaller screens.",
      detail: "Screenshot, annotation, page URL, viewport, and browser context are ready to become a GitHub Issue.",
      signals: ["Annotated screenshot", "1440 × 900", "GitHub Issue"],
    },
  },
  {
    name: "Foil for Mac",
    slug: "foil",
    description:
      "Destination-aware Mac dictation with app-specific cleanup and flexible routes for transcription and processing.",
    icon: "🎙️",
    color: "bg-indigo-500",
    borderColor: "border-indigo-200 dark:border-indigo-900",
    url: "https://sayfoil.com",
    status: "Public beta",
    cta: "Try Foil",
    category: "Mac productivity",
    audience: "People who dictate into both human-facing apps and agent workflows",
    headline: "Dictation that understands where the words are going.",
    introduction:
      "Foil is a Mac dictation workspace built around context. It can polish language for people, preserve direct intent for agents, and apply different cleanup behavior depending on the destination app.",
    problem:
      "Most dictation tools treat every text field the same. A message to a colleague, a document paragraph, and an instruction to an agent have different needs—but generic transcription flattens them into one style.",
    approach:
      "Foil makes the destination part of the workflow. Users can shape app-specific cleanup and decide where transcription and processing run, including provider-backed and local-compatible routes.",
    distinction:
      "It is less a universal microphone button than a configurable layer between spoken intent and the software receiving it.",
    highlights: [
      {
        title: "Destination-aware cleanup",
        description:
          "Apply different treatment when words are headed to a person, a document, or an AI agent.",
      },
      {
        title: "Provider choice",
        description:
          "Choose where audio is transcribed and where text cleanup runs instead of accepting a single fixed pipeline.",
      },
      {
        title: "Mac-native workflow",
        description:
          "Keep dictation close at hand from the menu bar and insert text where work is already happening.",
      },
      {
        title: "Open development",
        description:
          "Follow releases, reliability work, and setup guidance through the public GitHub project.",
      },
    ],
    snapshot: {
      eyebrow: "Destination detected",
      headline: "Words shaped for the app in front of you.",
      detail: "A configurable transcription and cleanup route keeps the spoken intent appropriate for its destination.",
      signals: ["Mac menu bar", "App-specific", "Provider routes"],
    },
  },
  {
    name: "Debt Is Fun",
    slug: "debt-is-fun",
    description:
      "An interactive public-data project comparing federal student borrowing with university endowment wealth.",
    icon: "⏱️",
    color: "bg-amber-500",
    borderColor: "border-amber-200 dark:border-amber-900",
    url: "https://debtisfun.com",
    status: "Live",
    cta: "Watch the clock",
    category: "Public-interest data",
    audience: "Students, graduates, families, journalists, and anyone examining higher-education finance",
    headline: "Put student debt beside the wealth of the institution.",
    introduction:
      "Debt Is Fun turns university finance data into a personal, visual comparison. Pick a school and see federal student borrowing alongside institutional endowment wealth through live clocks, rankings, and shareable cards.",
    problem:
      "Large financial totals are easy to publish and hard to feel. Student borrowing and university wealth are usually discussed in separate tables, leaving the relationship between them abstract.",
    approach:
      "The project places the figures on the same surface and gives them motion. A user can choose an institution, compare the measures, explore rankings, and make a card that carries the comparison into a conversation.",
    distinction:
      "It treats public data as something to experience and share—not merely another spreadsheet to download.",
    highlights: [
      {
        title: "School-level comparisons",
        description:
          "Choose a university and bring its borrowing and endowment figures into one focused view.",
      },
      {
        title: "Live clocks",
        description:
          "Use motion to make the scale and pace of large financial values easier to perceive.",
      },
      {
        title: "Rankings and advanced views",
        description:
          "Move beyond one card to compare institutions and inspect the underlying relationships from other angles.",
      },
      {
        title: "Shareable cards",
        description:
          "Turn an individual comparison into a designed artifact made for sharing and discussion.",
      },
    ],
    snapshot: {
      eyebrow: "University selected",
      headline: "Two financial realities, one card.",
      detail: "Federal student borrowing and institutional endowment wealth become a direct, shareable comparison.",
      signals: ["Live values", "School rankings", "Shareable card"],
    },
  },
  {
    name: "Bleep That Sh*t",
    slug: "bleep-that-shit",
    description:
      "Browser and cloud workflows for finding, reviewing, and cleaning profanity from audio and video.",
    icon: "🔇",
    color: "bg-rose-500",
    borderColor: "border-rose-200 dark:border-rose-900",
    url: "https://bleepthat.sh",
    status: "Live",
    cta: "Bleep something",
    category: "Media tools",
    audience: "Creators, podcasters, educators, and teams preparing audience-safe media",
    headline: "Find the words, review the moments, export the clean cut.",
    introduction:
      "Bleep That Sh*t is a transcript-first profanity cleanup tool for audio and video. It offers a fast, private browser workflow for short files and a cloud studio for longer, saved, repeatable projects.",
    problem:
      "Cleaning a few words from a long recording should not require scrubbing an entire timeline in a heavyweight editor or trusting an automatic filter without reviewing what it found.",
    approach:
      "The product transcribes the media, identifies likely words, and lets the user review each bleep before export. The workflow scales from a no-account browser demo to saved cloud projects and reusable word lists.",
    distinction:
      "It combines automation with an explicit review step, while making the privacy and processing tradeoffs of browser and cloud workflows understandable.",
    highlights: [
      {
        title: "Transcript-first review",
        description:
          "Find likely profanity through speech-to-text and inspect the exact moments before changing the media.",
      },
      {
        title: "Private browser mode",
        description:
          "Process short files on-device without creating an account when speed and privacy matter most.",
      },
      {
        title: "Cloud studio",
        description:
          "Handle longer uploads, save projects, and return to repeat work with a more durable workflow.",
      },
      {
        title: "Reusable cleanup",
        description:
          "Carry repeatable word lists across creator, podcast, classroom, and team workflows.",
      },
    ],
    snapshot: {
      eyebrow: "Transcript reviewed",
      headline: "Three moments marked for a clean export.",
      detail: "Detected language stays visible and editable so the final cut remains a human decision.",
      signals: ["Audio + video", "Review first", "Clean export"],
    },
  },
  {
    name: "Seatify",
    slug: "seatify",
    description:
      "A collaborative seating-chart workspace for arranging guests, relationships, and event constraints without spreadsheet sprawl.",
    icon: "💺",
    color: "bg-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    url: "https://seatify.app",
    status: "Waitlist",
    cta: "Preview Seatify",
    category: "Event planning",
    audience: "People planning weddings, galas, company events, dinners, and other assigned-seating occasions",
    headline: "Plan the room without losing the relationships inside it.",
    introduction:
      "Seatify is a seating-chart workspace for arranging guests, tables, and interpersonal constraints visually. It is designed to replace spreadsheet sprawl with a collaborative, purpose-built planning surface.",
    problem:
      "Seating plans are not just lists of names. Planners balance relationships, conflicts, accessibility, table capacities, and last-minute changes—context that becomes fragile across spreadsheets and sticky notes.",
    approach:
      "Seatify brings the room and the guest list together in a drag-and-drop editor, with tools for constraints, optimization, RSVP context, and export.",
    distinction:
      "The product treats seating as a relationship problem as much as a layout problem, while emphasizing that event data stays under the planner’s control.",
    highlights: [
      {
        title: "Visual arrangement",
        description:
          "Build the room and move guests between tables in a workspace designed around the actual plan.",
      },
      {
        title: "Relationship constraints",
        description:
          "Keep preferences, conflicts, and other human considerations attached to the people they affect.",
      },
      {
        title: "Smart assistance",
        description:
          "Use optimization to help with the combinatorial work while keeping the planner in control of the result.",
      },
      {
        title: "Practical handoff",
        description:
          "Connect RSVP context to the plan and export a usable PDF when the room is ready.",
      },
    ],
    snapshot: {
      eyebrow: "Room in progress",
      headline: "Every guest, table, and constraint in one plan.",
      detail: "A visual workspace turns relationship-heavy seating decisions into something the planning team can share and adjust.",
      signals: ["Drag + drop", "Smart constraints", "PDF export"],
    },
  },
  {
    name: "DeckChecker",
    slug: "deckchecker",
    description:
      "Conference presentation collection, automated review, revision tracking, and approved-file handoff for event teams.",
    icon: "📊",
    color: "bg-violet-500",
    borderColor: "border-violet-200 dark:border-violet-900",
    url: "https://deckchecker.app",
    status: "Waitlist",
    cta: "Preview DeckChecker",
    category: "Event operations",
    audience: "Conference producers and event teams managing speaker presentations before show time",
    headline: "Get every speaker deck checked and show-ready.",
    introduction:
      "DeckChecker is a presentation-operations workspace for collecting speaker decks, running automated checks, managing revisions, and handing approved files to the show team.",
    problem:
      "Conference decks arrive through scattered email threads, often late and in inconsistent formats. Event teams then repeat the same manual checks while trying to identify which revision is actually approved.",
    approach:
      "DeckChecker gives speakers and organizers one process from submission through review. Automated checks surface common problems, revisions remain traceable, and approved files move toward a controlled show-time handoff.",
    distinction:
      "It is built around presentation operations rather than generic file sharing: the submission state, review findings, revision history, and final delivery all belong to the same workflow.",
    highlights: [
      {
        title: "Speaker collection",
        description:
          "Give presenters a clear submission path instead of assembling the show from attachments and transfer links.",
      },
      {
        title: "Automated review",
        description:
          "Check decks for common compliance and readiness problems before they reach a manual review queue.",
      },
      {
        title: "Revision control",
        description:
          "Track feedback and resubmissions so organizers know which file is current and what still needs attention.",
      },
      {
        title: "Show-time handoff",
        description:
          "Move approved presentations into a predictable final collection for the team running the room.",
      },
    ],
    snapshot: {
      eyebrow: "Submission reviewed",
      headline: "42 decks approved. 6 need attention.",
      detail: "Automated checks and revision status give the event team one view of what is ready before show time.",
      signals: ["Speaker intake", "Automated checks", "Approved files"],
    },
  },
];

export const buildingProjects: Project[] = [
  {
    name: "BugDrop Board",
    description:
      "A hosted board for collecting, triaging, and mirroring customer feedback into GitHub.",
    icon: "🧭",
    color: "bg-orange-500",
    borderColor: "border-orange-200 dark:border-orange-900",
    url: "https://bugdrop.dev/board/",
    status: "In the works",
    cta: "Preview the board",
  },
  {
    name: "Lineage",
    description:
      "A local-first creative asset lineage and review workspace for seeing how work changed.",
    icon: "🧬",
    color: "bg-cyan-500",
    borderColor: "border-cyan-200 dark:border-cyan-900",
    status: "In the works",
  },
  {
    name: "Limner",
    description:
      "An agent-guided visual fidelity workbench for tightening interfaces against a target.",
    icon: "🎚️",
    color: "bg-fuchsia-500",
    borderColor: "border-fuchsia-200 dark:border-fuchsia-900",
    status: "In the works",
  },
];

export const publishedProjects = liveProjects;
export const allProjects = [...liveProjects, ...buildingProjects];

export function getPublishedProject(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
