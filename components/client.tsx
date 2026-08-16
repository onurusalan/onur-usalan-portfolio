"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, localizedPath, routeNames, type Lang } from "@/content/site";

function languageDestination(pathname: string, lang: Lang) {
  if (lang === "en") return `/pl${pathname === "/" ? "" : pathname}`;
  const englishPath = pathname.replace(/^\/pl(?=\/|$)/, "");
  return englishPath || "/";
}

export function Header({ lang, resumeHref, resumeAvailable }: { lang: Lang; resumeHref: string; resumeAvailable: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 12);
        setScrollProgress(available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const navItems = Object.entries(routeNames) as [keyof typeof routeNames, (typeof routeNames)[keyof typeof routeNames]][];
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href={localizedPath(lang)} aria-label="Onur Usalan — home" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">OU</span>
          <span className="brand-copy"><strong>Onur Usalan</strong><small>Warsaw · Business Analysis</small></span>
        </Link>

        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-label={open ? (lang === "en" ? "Close navigation" : "Zamknij nawigację") : (lang === "en" ? "Open navigation" : "Otwórz nawigację")}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? (lang === "en" ? "Close" : "Zamknij") : "Menu"}</span>
          <i aria-hidden="true"><b /><b /></i>
        </button>

        <nav id="primary-navigation" className={open ? "is-open" : ""} aria-label={lang === "en" ? "Primary navigation" : "Główna nawigacja"}>
          <div className="nav-main">
            {navItems.flatMap(([route, label]) => {
              const href = localizedPath(lang, `/${route}`);
              const active = pathname === href || (route === "projects" && pathname.startsWith(`${href}/`));
              const item = <Link key={route} href={href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{label[lang]}</Link>;
              if (route !== "experience") return [item];
              return [item, <Link key="services" href={`${localizedPath(lang)}#company-impact`} onClick={() => setOpen(false)}>{lang === "en" ? "How I help" : "Jak pomagam"}</Link>];
            })}
          </div>
          <div className="nav-utility">
            <Link className="language-link" href={languageDestination(pathname, lang)} aria-label={lang === "en" ? "Przejdź do wersji polskiej" : "Switch to English"} onClick={() => setOpen(false)}>
              <span className={lang === "en" ? "active" : ""}>EN</span><i>/</i><span className={lang === "pl" ? "active" : ""}>PL</span>
            </Link>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="resume-link" href={resumeHref} download={resumeAvailable || undefined} onClick={() => setOpen(false)}>{resumeAvailable ? (lang === "en" ? "Download CV" : "Pobierz CV") : (lang === "en" ? "Request CV" : "Poproś o CV")}</a>
          </div>
        </nav>
      </div>
      <span className="reading-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />
    </header>
  );
}

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("has-js");
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
