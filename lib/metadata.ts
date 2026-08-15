import type { Metadata } from "next";
import { localizedPath, projects, siteUrl, type Lang } from "@/content/site";
import type { StaticPageType } from "@/components/page";

const pageMeta: Record<StaticPageType, Record<Lang, { title: string; description: string }>> = {
  about: {
    en: { title: "Profile", description: "Onur Usalan’s Business Analyst approach to requirements, process and data analysis, technical collaboration and decision-ready evidence in Warsaw." },
    pl: { title: "Profil", description: "Podejście Onura Usalana do wymagań biznesowych, analizy procesów i danych, współpracy technicznej i dowodów wspierających decyzje w Warszawie." },
  },
  experience: {
    en: { title: "Experience", description: "Onur Usalan's experience across operational data analysis, SQL and Python, Tableau management reporting, research and stakeholder coordination." },
    pl: { title: "Doświadczenie", description: "Doświadczenie Onura Usalana w analizie danych operacyjnych, SQL i Pythonie, raportowaniu zarządczym Tableau, badaniach i koordynacji interesariuszy." },
  },
  projects: {
    en: { title: "Case Studies", description: "Two completed Business Analysis cases with real dashboards, requirements, KPI governance, traceability, UAT and responsible decision support." },
    pl: { title: "Projekty", description: "Dwa ukończone projekty Analizy Biznesowej z prawdziwymi dashboardami, wymaganiami, KPI, traceability, UAT i odpowiedzialnym wsparciem decyzji." },
  },
  contact: {
    en: { title: "Contact", description: "Contact Onur Usalan about Business Analyst, Junior Business Systems Analyst and data-focused analyst opportunities in Warsaw or international teams." },
    pl: { title: "Kontakt", description: "Skontaktuj się z Onurem Usalanem w sprawie stanowisk Analityka Biznesowego, Junior Business Systems Analyst i ról analitycznych w Warszawie lub zespołach międzynarodowych." },
  },
};

function languageAlternates(path: string) {
  return {
    en: path || "/",
    pl: `/pl${path}` || "/pl",
    "x-default": path || "/",
  };
}

export function staticMetadata(type: StaticPageType, lang: Lang): Metadata {
  const current = pageMeta[type][lang];
  const path = `/${type}`;
  const canonical = localizedPath(lang, path);
  return {
    title: current.title,
    description: current.description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: { title: `${current.title} | Onur Usalan`, description: current.description, url: canonical, locale: lang === "en" ? "en_GB" : "pl_PL", type: "website" },
    twitter: { card: "summary_large_image", title: `${current.title} | Onur Usalan`, description: current.description },
  };
}

export function projectMetadata(slug: string, lang: Lang): Metadata {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const path = `/projects/${slug}`;
  const canonical = localizedPath(lang, path);
  return {
    title: project.title[lang],
    description: project.summary[lang],
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: { title: `${project.title[lang]} | Onur Usalan`, description: project.summary[lang], url: `${siteUrl}${canonical}`, locale: lang === "en" ? "en_GB" : "pl_PL", type: "article" },
    twitter: { card: "summary_large_image", title: `${project.title[lang]} | Onur Usalan`, description: project.summary[lang] },
  };
}
