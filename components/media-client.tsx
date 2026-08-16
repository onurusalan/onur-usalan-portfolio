"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Lang, Project } from "@/content/site";

type Artifact = Project["artifacts"][number];

function ArtifactVisual({ artifact, imageSrc, lang, expanded = false }: { artifact: Artifact; imageSrc?: string; lang: Lang; expanded?: boolean }) {
  if (artifact.kind === "dashboard" && imageSrc) {
    return (
      <div className={`artifact-dashboard${expanded ? " is-expanded" : ""}`}>
        <Image
          src={imageSrc}
          alt={`${artifact.title[lang]}. ${artifact.caption[lang]}`}
          fill
          sizes={expanded ? "(max-width: 900px) 94vw, 1240px" : "(max-width: 700px) 92vw, (max-width: 1100px) 70vw, 760px"}
          quality={85}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`artifact-document artifact-${artifact.kind}${expanded ? " is-expanded" : ""}`} aria-label={artifact.title[lang]}>
      <div className="artifact-document-head"><span>{artifact.type[lang]}</span><i>OU / {artifact.id.toUpperCase()}</i></div>
      <strong>{artifact.title[lang]}</strong>
      {artifact.columns && artifact.rows ? (
        <div className="artifact-table" role="table" aria-label={artifact.title[lang]}>
          <div className="artifact-table-row is-head" role="row">
            {artifact.columns.map((column) => <span role="columnheader" key={column.en}>{column[lang]}</span>)}
          </div>
          {artifact.rows.map((row, index) => (
            <div className="artifact-table-row" role="row" key={`${artifact.id}-${index}`}>
              {row[lang].map((cell) => <span role="cell" key={cell}>{cell}</span>)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ArtifactGalleryClient({ artifacts, dashboard, lang }: { artifacts: Artifact[]; dashboard: string; lang: Lang }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);

  function open(index: number) {
    setSelected(index);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  const active = artifacts[selected];

  return (
    <>
      <div className="artifact-gallery" data-reveal>
        {artifacts.map((artifact, index) => (
          <article className={index === 0 ? "artifact-card artifact-feature" : "artifact-card"} key={artifact.id}>
            <button type="button" className="artifact-open" onClick={() => open(index)} aria-label={`${lang === "en" ? "Open artifact" : "Otwórz artefakt"}: ${artifact.title[lang]}`}>
              <ArtifactVisual artifact={artifact} imageSrc={artifact.kind === "dashboard" ? dashboard : undefined} lang={lang} />
              <span className="artifact-expand" aria-hidden="true">↗</span>
            </button>
            <div className="artifact-copy">
              <p className="eyebrow">{artifact.type[lang]}</p>
              <h3>{artifact.title[lang]}</h3>
              <p>{artifact.caption[lang]}</p>
              <small><b>{lang === "en" ? "Why it matters" : "Dlaczego to ważne"}</b>{artifact.why[lang]}</small>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="artifact-lightbox"
        aria-labelledby="artifact-dialog-title"
        aria-describedby="artifact-dialog-description"
        onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialogRef.current?.close();
          }
        }}
      >
        <div className="lightbox-shell">
          <div className="lightbox-toolbar">
            <p><span>{String(selected + 1).padStart(2, "0")}</span>{active?.type[lang]}</p>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label={lang === "en" ? "Close artifact preview" : "Zamknij podgląd artefaktu"}>×</button>
          </div>
          {active ? <ArtifactVisual artifact={active} imageSrc={active.kind === "dashboard" ? dashboard : undefined} lang={lang} expanded /> : null}
          <div className="lightbox-caption"><strong id="artifact-dialog-title">{active?.title[lang]}</strong><p id="artifact-dialog-description">{active?.why[lang]}</p></div>
          <div className="lightbox-pagination">
            <button type="button" onClick={() => setSelected((selected - 1 + artifacts.length) % artifacts.length)}>{lang === "en" ? "Previous" : "Poprzedni"}</button>
            <button type="button" onClick={() => setSelected((selected + 1) % artifacts.length)}>{lang === "en" ? "Next" : "Następny"}</button>
          </div>
        </div>
      </dialog>
    </>
  );
}

type ReelSlide = {
  id: string;
  project: string;
  label: string;
  artifact: Artifact;
  imageSrc?: string;
};

export function EvidenceReelClient({ slides, lang }: { slides: ReelSlide[]; lang: Lang }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduced || !visible) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 3600);
    return () => window.clearInterval(timer);
  }, [paused, reduced, slides.length, visible]);

  return (
    <div className="evidence-reel" ref={rootRef} data-reveal>
      <div className="reel-stage">
        {slides.map((slide, index) => (
          <div className={`reel-slide${index === active ? " is-active" : ""}`} aria-hidden={index !== active} key={slide.id}>
            <ArtifactVisual artifact={slide.artifact} imageSrc={slide.imageSrc} lang={lang} />
          </div>
        ))}
        <div className="reel-status">
          <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? (lang === "en" ? "Play evidence reel" : "Odtwórz przegląd dowodów") : (lang === "en" ? "Pause evidence reel" : "Wstrzymaj przegląd dowodów")}>
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </div>
      <div className="reel-copy">
        <p className="eyebrow">{slides[active].project}</p>
        <h3>{slides[active].label}</h3>
        <p>{slides[active].artifact.why[lang]}</p>
        <div>{slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} onClick={() => { setActive(index); setPaused(true); }} key={slide.id} aria-pressed={index === active} aria-label={`${lang === "en" ? "Show" : "Pokaż"} ${slide.label}`} />)}</div>
      </div>
    </div>
  );
}

export function DecisionTrace({ lang }: { lang: Lang }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [manuallySelected, setManuallySelected] = useState(false);
  const stages = lang === "en"
    ? [
      ["Business question", "Define the decision and who needs to make it."],
      ["Requirements", "Turn the need into scope, rules and acceptance criteria."],
      ["Process", "Understand the current flow, friction and change points."],
      ["Evidence", "Validate the data, measures and assumptions."],
      ["Recommendation", "Connect findings to a clear and traceable next step."],
    ]
    : [
      ["Pytanie biznesowe", "Określenie decyzji i osób, które muszą ją podjąć."],
      ["Wymagania", "Przełożenie potrzeby na zakres, reguły i kryteria akceptacji."],
      ["Proces", "Zrozumienie obecnego przepływu, problemów i punktów zmiany."],
      ["Dowody", "Walidacja danych, miar i założeń."],
      ["Rekomendacja", "Połączenie ustaleń z jasnym i możliwym do prześledzenia kolejnym krokiem."],
    ];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced || coarsePointer || manuallySelected) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % stages.length), 2600);
    return () => window.clearInterval(timer);
  }, [coarsePointer, manuallySelected, reduced, stages.length, visible]);

  function pointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    event.currentTarget.style.setProperty("--trace-x", `${x.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--trace-y", `${y.toFixed(2)}px`);
  }

  return (
    <div className="decision-trace hero-sequence lens-sequence" ref={rootRef} onPointerMove={pointerMove} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--trace-x", "0px"); event.currentTarget.style.setProperty("--trace-y", "0px"); }}>
      <div className="trace-heading"><span>Decision Trace</span><span>{coarsePointer ? (lang === "en" ? "Tap a stage" : "Dotknij etapu") : (lang === "en" ? "Question to recommendation" : "Od pytania do rekomendacji")}</span></div>
      <div className="trace-board">
        <div className="trace-document" aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")} / 05</span>
          <p>{stages[active][0]}</p>
          <strong>{stages[active][1]}</strong>
          <i aria-hidden="true">OU</i>
        </div>
        <ol aria-label={lang === "en" ? "Decision trace stages" : "Etapy ścieżki decyzyjnej"}>
          {stages.map(([title], index) => (
            <li className={index <= active ? "is-active" : ""} key={title}>
              <button type="button" onClick={() => { setActive(index); setManuallySelected(true); }} aria-pressed={index === active}><span>{String(index + 1).padStart(2, "0")}</span>{title}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
