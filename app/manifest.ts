import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Onur Usalan — Business Analyst | Process & Data Analysis",
    short_name: "Onur Usalan",
    description: "Warsaw-based Business Analyst portfolio focused on requirements, process and data analysis, reporting, UAT and decision-ready evidence.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F3",
    theme_color: "#F5F5F3",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
