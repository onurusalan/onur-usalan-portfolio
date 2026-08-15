import Image from "next/image";
import { contact, projects, type Lang, type Project } from "@/content/site";
import { media } from "@/config/media";
import { ArtifactGalleryClient, EvidenceReelClient } from "./media-client";

export function CVDownload({ lang, className = "text-link", compact = false }: { lang: Lang; className?: string; compact?: boolean }) {
  const available = Boolean(media.resume);
  const label = available
    ? (lang === "en" ? "Download CV" : "Pobierz CV")
    : (lang === "en" ? "Request CV" : "Poproś o CV");
  const href = media.resume ?? `mailto:${contact.email}?subject=${encodeURIComponent("Onur Usalan — CV request")}`;

  return <a className={className} href={href} download={available || undefined}>{label}{compact ? null : <span aria-hidden="true">{available ? "↓" : "↗"}</span>}</a>;
}

export function ProfilePortrait({ lang }: { lang: Lang }) {
  if (media.headshot) {
    return (
      <figure className="profile-portrait">
        <Image src={media.headshot} fill sizes="(max-width: 650px) 100vw, 280px" alt={lang === "en" ? "Portrait of Onur Usalan" : "Portret Onura Usalana"} />
        <figcaption>{lang === "en" ? "Onur Usalan · Warsaw" : "Onur Usalan · Warszawa"}</figcaption>
      </figure>
    );
  }

  return (
    <div className="profile-mark" role="img" aria-label={lang === "en" ? "Onur Usalan monogram and decision trace" : "Monogram Onura Usalana i ścieżka decyzji"}>
      <span>OU</span>
      <div aria-hidden="true"><i /><i /><i /><i /></div>
      <small>{lang === "en" ? "Warsaw, Poland" : "Warszawa, Polska"}</small>
    </div>
  );
}

export function IntroductionMedia({ lang }: { lang: Lang }) {
  if (!media.introduction.webm && !media.introduction.mp4) return null;
  return (
    <section className="introduction-media section-shell" data-reveal>
      <div><p className="eyebrow">{lang === "en" ? "Introduction" : "Przedstawienie"}</p><h2>{lang === "en" ? "A short introduction to how I work." : "Krótkie przedstawienie mojego sposobu pracy."}</h2></div>
      <video controls muted playsInline preload="metadata" poster={media.introduction.poster ?? undefined}>
        {media.introduction.webm ? <source src={media.introduction.webm} type="video/webm" /> : null}
        {media.introduction.mp4 ? <source src={media.introduction.mp4} type="video/mp4" /> : null}
        {media.introduction.captions ? <track src={media.introduction.captions} kind="captions" srcLang="en" label="English" /> : null}
        {lang === "en" ? "Your browser does not support this video." : "Twoja przeglądarka nie obsługuje tego filmu."}
      </video>
    </section>
  );
}

export function ProjectDashboard({ project, lang, className = "project-dashboard" }: { project: Project; lang: Lang; className?: string }) {
  const src = media.projectDashboards[project.slug];
  return (
    <figure className={className}>
      <Image src={src} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 92vw, 760px" quality={85} alt={`${project.artifacts[0].title[lang]}. ${project.artifacts[0].caption[lang]}`} loading="lazy" />
      <figcaption><span>{project.artifacts[0].type[lang]}</span><b>{lang === "en" ? "Verified repository output" : "Zweryfikowany wynik repozytorium"}</b></figcaption>
    </figure>
  );
}

export function ArtifactGallery({ project, lang }: { project: Project; lang: Lang }) {
  return <ArtifactGalleryClient artifacts={project.artifacts} dashboard={media.projectDashboards[project.slug]} lang={lang} />;
}

export function EvidenceReel({ lang }: { lang: Lang }) {
  const eu = projects[0];
  const ecommerce = projects[1];
  const slides = [
    { id: eu.artifacts[0].id, project: eu.title[lang], label: eu.artifacts[0].title[lang], artifact: eu.artifacts[0], imageSrc: media.projectDashboards[eu.slug] },
    { id: eu.artifacts[1].id, project: eu.title[lang], label: eu.artifacts[1].title[lang], artifact: eu.artifacts[1] },
    { id: ecommerce.artifacts[0].id, project: ecommerce.title[lang], label: ecommerce.artifacts[0].title[lang], artifact: ecommerce.artifacts[0], imageSrc: media.projectDashboards[ecommerce.slug] },
    { id: ecommerce.artifacts[2].id, project: ecommerce.title[lang], label: ecommerce.artifacts[2].title[lang], artifact: ecommerce.artifacts[2] },
  ];
  return <EvidenceReelClient slides={slides} lang={lang} />;
}
