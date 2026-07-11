import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPublishedProject, publishedProjects } from "@/lib/projects";

export const alt = "Mean Weasel project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 82px",
          color: "#17202a",
          background:
            "linear-gradient(135deg, #eef9ff 0%, #f8fbff 45%, #fff3ea 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 74,
              height: 74,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "#e85d04",
              fontSize: 38,
            }}
          >
            {project.icon}
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            Mean Weasel / {project.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#e85d04",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              fontSize: 70,
              lineHeight: 1.04,
              letterSpacing: -3,
              fontWeight: 700,
            }}
          >
            {project.headline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#52616f" }}>
          Independent software. Clear jobs. No ceremony.
        </div>
      </div>
    ),
    size,
  );
}
