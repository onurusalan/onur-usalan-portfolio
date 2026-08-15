import Link from "next/link";
import { contact, localizedPath, profile, type Lang } from "@/content/site";
import { media } from "@/config/media";
import { Header, MotionProvider } from "./client";

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const resumeHref = media.resume ?? `mailto:${contact.email}?subject=${encodeURIComponent("Onur Usalan — CV request")}`;
  return (
    <>
      <a className="skip-link" href="#main-content">{lang === "en" ? "Skip to content" : "Przejdź do treści"}</a>
      <MotionProvider />
      <Header lang={lang} resumeHref={resumeHref} resumeAvailable={Boolean(media.resume)} />
      <main id="main-content">{children}</main>
      <Footer lang={lang} />
    </>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="monogram" aria-hidden="true">OU</span>
          <p>{profile.role[lang]}</p>
        </div>
        <nav aria-label={lang === "en" ? "Footer navigation" : "Nawigacja w stopce"}>
          <Link href={localizedPath(lang, "/about")}>{lang === "en" ? "Profile" : "Profil"}</Link>
          <Link href={localizedPath(lang, "/experience")}>{lang === "en" ? "Experience" : "Doświadczenie"}</Link>
          <Link href={`${localizedPath(lang)}#company-impact`}>{lang === "en" ? "How I help" : "Jak pomagam"}</Link>
          <Link href={localizedPath(lang, "/projects")}>{lang === "en" ? "Case studies" : "Projekty"}</Link>
          <Link href={localizedPath(lang, "/contact")}>{lang === "en" ? "Contact" : "Kontakt"}</Link>
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={media.resume ?? `mailto:${contact.email}?subject=${encodeURIComponent("Onur Usalan — CV request")}`} download={Boolean(media.resume) || undefined}>{media.resume ? (lang === "en" ? "Download CV ↓" : "Pobierz CV ↓") : (lang === "en" ? "Request CV ↗" : "Poproś o CV ↗")}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Onur Usalan</span>
        <span>{lang === "en" ? "Designed around clarity." : "Zaprojektowano z myślą o przejrzystości."}</span>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </div>
  );
}

export function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
