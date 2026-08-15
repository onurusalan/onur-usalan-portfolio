import { ImageResponse } from "next/og";

export const alt = "Onur Usalan — Warsaw-based Business Analyst | Requirements, Process & Data Analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F5F5F3", color: "#0B0C0D", padding: "62px 70px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}><div style={{ display: "flex", width: 54, height: 54, alignItems: "center", justifyContent: "center", border: "1px solid #0B0C0D", borderRadius: 999, fontSize: 15 }}>OU</div><span style={{ fontSize: 22, fontWeight: 600 }}>Onur Usalan</span></div>
        <span style={{ color: "#676B70", fontSize: 17 }}>Warsaw · Poland · SGH</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 60 }}>
        <div style={{ display: "flex", maxWidth: 770, flexDirection: "column" }}><span style={{ color: "#2563EB", fontSize: 18, letterSpacing: 2 }}>WARSAW · BUSINESS ANALYSIS · DECISION SUPPORT</span><div style={{ marginTop: 22, fontSize: 64, lineHeight: .98, letterSpacing: -4 }}>Business ambiguity, turned into clear requirements and evidence.</div><span style={{ marginTop: 28, color: "#44484D", fontSize: 24 }}>Requirements · Process · Data · UAT</span></div>
        <div style={{ position: "relative", display: "flex", width: 240, height: 250 }}>
          {[0, 1, 2, 3].map((index) => <div key={index} style={{ position: "absolute", top: index * 31, left: index * 13, display: "flex", width: 184, height: 150, alignItems: "flex-end", padding: 14, border: `1px solid ${index === 3 ? "#2762FF" : "#BEC4CF"}`, borderRadius: 18, background: index === 3 ? "#2762FF" : index === 0 ? "#E8EEFF" : "#FFFFFF", color: index === 3 ? "white" : "#0B0C0D", fontSize: 13 }}>{["Question", "Evidence", "Insight", "Decision"][index]}</div>)}
        </div>
      </div>
    </div>,
    size,
  );
}
