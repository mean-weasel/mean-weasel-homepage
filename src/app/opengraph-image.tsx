import { ImageResponse } from "next/og";
import { buildingProjects, liveProjects } from "@/lib/projects";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const productNames = [...liveProjects, ...buildingProjects]
  .slice(0, 10)
  .map((project) => project.name);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fbff",
          color: "#111827",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#f97316",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            MW
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "34px", fontWeight: 700 }}>
              Mean Weasel
            </div>
            <div style={{ fontSize: "22px", color: "#0f766e" }}>
              Independent software studio
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div
            style={{
              fontSize: "74px",
              lineHeight: 1,
              fontWeight: 700,
              maxWidth: "960px",
            }}
          >
            Focused tools for real work.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              maxWidth: "920px",
            }}
          >
            {productNames.map((name) => (
              <div
                key={name}
                style={{
                  border: "2px solid #d1d5db",
                  borderRadius: "999px",
                  padding: "10px 18px",
                  fontSize: "24px",
                  color: "#374151",
                  background: "white",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
