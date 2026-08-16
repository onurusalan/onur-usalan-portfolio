"use client";

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
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");
    const previousMainInert = main?.inert ?? false;
    const previousFooterInert = footer?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = previousMainInert;
      if (footer) footer.inert = previousFooterInert;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const header = buttonRef.current?.closest("header");
    const focusable = () => [...(header?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])]
      .filter((element) => element.getClientRects().length > 0);
    const focusFrame = window.requestAnimationFrame(() => focusable().find((element) => element.tagName === "A")?.focus());
    const handleNavigationKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleNavigationKeys);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleNavigationKeys);
    };
  }, [open]);

  const navItems = Object.entries(routeNames) as [keyof typeof routeNames, (typeof routeNames)[keyof typeof routeNames]][];
  const navDescriptions = {
    about: { en: "Profile, approach and education", pl: "Profil, podejście i wykształcenie" },
    experience: { en: "Work shown in business context", pl: "Praca w kontekście biznesowym" },
    projects: { en: "Reviewable analytical evidence", pl: "Weryfikowalne dowody analityczne" },
    contact: { en: "Start a professional conversation", pl: "Rozpocznij rozmowę zawodową" },
  } as const;
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href={localizedPath(lang)} aria-label="Onur Usalan — home" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">OU</span>
          <span className="brand-copy"><strong>Onur Usalan</strong><small>Warsaw · Business Analysis</small></span>
        </a>

        <div className="header-status" aria-label={lang === "en" ? "Based in Warsaw and open to analyst opportunities" : "Mieszka w Warszawie i jest otwarty na role analityczne"}>
          <i aria-hidden="true" />
          <span>{lang === "en" ? "Warsaw · Open to analyst roles" : "Warszawa · Otwarty na role analityczne"}</span>
        </div>

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
              const item = <a key={route} href={href} aria-label={label[lang]} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><span>{label[lang]}</span><small aria-hidden="true">{navDescriptions[route][lang]}</small></a>;
              if (route !== "experience") return [item];
              return [item, <a key="services" href={`${localizedPath(lang)}#company-impact`} aria-label={lang === "en" ? "How I help" : "Jak pomagam"} onClick={() => setOpen(false)}><span>{lang === "en" ? "How I help" : "Jak pomagam"}</span><small aria-hidden="true">{lang === "en" ? "Problems I can help structure" : "Problemy, które mogę uporządkować"}</small></a>];
            })}
          </div>
          <div className="nav-utility">
            <div className="language-switch" aria-label={lang === "en" ? "Language selection" : "Wybór języka"}>
              <span aria-current="true">{lang.toUpperCase()}</span>
              <a href={languageDestination(pathname, lang)} onClick={() => setOpen(false)} aria-label={lang === "en" ? "Przejdź do wersji polskiej" : "Switch to English"}>{lang === "en" ? "PL" : "EN"}</a>
            </div>
            <a className="header-linkedin" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="header-contact" href={localizedPath(lang, "/contact")} onClick={() => setOpen(false)}>{lang === "en" ? "Let’s talk" : "Porozmawiajmy"}<span aria-hidden="true">↗</span></a>
            <a className="header-resume" href={resumeHref} download={resumeAvailable || undefined} onClick={() => setOpen(false)}>{resumeAvailable ? (lang === "en" ? "Download CV" : "Pobierz CV") : (lang === "en" ? "Request CV" : "Poproś o CV")}</a>
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
