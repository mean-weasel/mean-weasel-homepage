import type { PublishedProject } from "@/lib/projects";

export const additionalProjects: PublishedProject[] = [
  {
    name: "Machine Learning Refined",
    slug: "machine-learning-refined",
    kind: "book",
    authors: ["Jeremy Watt", "Reza Borhani", "Aggelos Katsaggelos"],
    description:
      "Learn machine learning from the ground up. A coauthored textbook with visual explanations, Python notebooks, and open learning resources.",
    icon: "📖",
    color: "bg-slate-800",
    borderColor: "border-slate-200 dark:border-slate-700",
    url: "https://www.mlrefined.com/",
    status: "Published",
    cta: "Explore the book",
    category: "Books & learning",
    audience:
      "Independent learners, students, and instructors exploring machine learning",
    headline: "Visualize it. Derive it. Build it yourself.",
    introduction:
      "Machine Learning Refined is a textbook coauthored by Jeremy Watt, Reza Borhani, and Aggelos Katsaggelos. The second edition pairs geometric intuition and mathematical foundations with hands-on Python implementations, supported by freely available chapter PDFs, notebooks, exercises, and lecture slides.",
    problem:
      "Machine learning can feel like a collection of opaque APIs. Learning the ideas beneath them requires a connection between visual intuition, mathematical reasoning, and code you can work through yourself.",
    approach:
      "Each topic moves from a visual explanation to a mathematical derivation and a practical implementation. Companion notebooks, exercises, and teaching materials make that process accessible to independent learners and classrooms alike.",
    distinction:
      "Coauthored by Jeremy Watt, Reza Borhani, and Aggelos Katsaggelos and published by Cambridge University Press, the book teaches the fundamentals by building them from scratch. Its open companion resources let readers explore the material directly.",
    highlights: [
      {
        title: "Visual intuition",
        description:
          "Use figures and animations to understand the geometry behind the methods.",
      },
      {
        title: "From-scratch Python",
        description:
          "Work through notebooks that turn mathematical ideas into executable models.",
      },
      {
        title: "Open learning resources",
        description:
          "Explore free chapter PDFs, exercises, and companion materials in the repository.",
      },
      {
        title: "Ready for teaching",
        description:
          "Bring the material into a course with lecture slides and instructor resources.",
      },
    ],
    snapshot: {
      eyebrow: "Second edition",
      headline: "Foundations, Algorithms, and Applications.",
      detail:
        "By Jeremy Watt, Reza Borhani, and Aggelos Katsaggelos. Published by Cambridge University Press.",
      signals: ["Textbook", "Python notebooks", "Open resources"],
    },
  },
  {
    name: "Meme Search",
    slug: "meme-search",
    description:
      "Find the meme you remember, even when you don't remember its filename. A self-hosted search engine for your collection.",
    icon: "🔎",
    color: "bg-purple-600",
    borderColor: "border-purple-200 dark:border-purple-900",
    url: "https://meme-search.neonwatty.com/",
    status: "Live",
    cta: "Explore Meme Search",
    category: "Web apps",
    audience: "People who collect memes and want to find them by their content",
    headline: "The right meme is in there somewhere. Find it.",
    introduction:
      "Meme Search is an open-source, self-hosted web app that indexes images by their content and text. Search your collection with natural language or keywords instead of trying to remember a filename.",
    problem:
      "A folder full of memes gets harder to use as it grows. Filenames rarely describe what is in an image, and the exact reaction you need can disappear into hundreds of saved pictures.",
    approach:
      "The app generates image descriptions and embeddings, then combines semantic and keyword search to retrieve relevant memes. Its default workflow runs locally, with an optional compatible vision API for descriptions.",
    distinction:
      "Your collection lives in a self-hosted application. A search API, command-line integration, and experimental browser popup extend access beyond the web interface.",
    highlights: [
      {
        title: "Search by meaning",
        description:
          "Describe the scene or idea you remember and find relevant images in your collection.",
      },
      {
        title: "Read the image",
        description:
          "Index visible text alongside image descriptions to make memes easier to retrieve.",
      },
      {
        title: "Run it locally",
        description:
          "Use the Docker setup to keep the collection and default processing on your own machine.",
      },
      {
        title: "Search beyond the app",
        description:
          "Use the documented API and local CLI to connect the collection to other workflows.",
      },
    ],
    snapshot: {
      eyebrow: "A collection, searchable",
      headline: "Find it by what's in it.",
      detail:
        "Image descriptions, visible text, and semantic search bring the right reaction back into reach.",
      signals: ["Self-hosted", "Semantic search", "Open source"],
    },
  },
  {
    name: "YTgify",
    slug: "ytgify",
    description:
      "Turn a YouTube moment into a GIF. Pick a clip, preview the loop, and make it yours. Available by manual install.",
    icon: "🎞️",
    color: "bg-red-600",
    borderColor: "border-red-200 dark:border-red-900",
    url: "https://ytgify.com/",
    status: "Manual install",
    cta: "Explore YTgify",
    category: "Browser extensions",
    audience: "People creating GIFs from YouTube videos in Chrome",
    headline: "That moment deserves a GIF.",
    introduction:
      "YTgify is an open-source Chrome extension that turns moments from YouTube videos into GIFs. Choose a segment inside the player, preview the loop, add text, and export it. It is currently available through manual installation as an unpacked extension.",
    problem:
      "Making a GIF from a video can mean switching tools, copying links, and losing the exact moment you wanted. A separate editing workflow interrupts the simple act of sharing a reaction.",
    approach:
      "YTgify adds GIF creation to the YouTube player. Visual timeline controls help select the segment, a preview shows the loop, and text tools let you customize the result before export.",
    distinction:
      "The workflow stays close to the video you are watching, with a local GIF library and multiple export options. The project is no longer listed in the Chrome Web Store; manual installation does not include automatic updates.",
    highlights: [
      {
        title: "Pick the moment",
        description:
          "Use draggable timeline markers to choose the start and end of your GIF.",
      },
      {
        title: "Preview the loop",
        description:
          "Check the selected clip before creating the final export.",
      },
      {
        title: "Make it yours",
        description: "Add text overlays with adjustable placement and styling.",
      },
      {
        title: "Keep and share",
        description:
          "Download the GIF, copy it to the clipboard, or keep it in your local library.",
      },
    ],
    snapshot: {
      eyebrow: "Inside the player",
      headline: "Pick it. Loop it. Share it.",
      detail:
        "A focused creation workflow for turning YouTube moments into GIFs. Manual Chrome installation is required.",
      signals: ["Chrome extension", "GIF creation", "Manual install"],
    },
  },
];
