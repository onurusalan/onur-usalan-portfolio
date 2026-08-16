import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/experience", "/projects", "/contact", ...projects.map(({ slug }) => `/projects/${slug}`)];
  const lastModified = new Date("2026-08-16T00:00:00.000Z");
  return paths.flatMap((path) => [
    { url: `${siteUrl}${path}`, lastModified, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8, alternates: { languages: { en: `${siteUrl}${path}`, pl: `${siteUrl}/pl${path}`, "x-default": `${siteUrl}${path}` } } },
    { url: `${siteUrl}/pl${path}`, lastModified, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8, alternates: { languages: { en: `${siteUrl}${path}`, pl: `${siteUrl}/pl${path}`, "x-default": `${siteUrl}${path}` } } },
  ]);
}
