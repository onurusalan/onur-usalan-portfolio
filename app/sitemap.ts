import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/experience", "/projects", "/contact", ...projects.map(({ slug }) => `/projects/${slug}`)];
  return paths.flatMap((path) => [
    { url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8, alternates: { languages: { en: `${siteUrl}${path}`, pl: `${siteUrl}/pl${path}` } } },
    { url: `${siteUrl}/pl${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8, alternates: { languages: { en: `${siteUrl}${path}`, pl: `${siteUrl}/pl${path}` } } },
  ]);
}
