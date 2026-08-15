import Link from "next/link";
import { notFound } from "next/navigation";
import { localizedPath, projects, siteUrl, type Lang, type Localized } from "@/content/site";
import { ArtifactGallery } from "./media";
import { Arrow, JsonLd, SiteShell } from "./shell";

export function CaseStudy({ lang, slug }: { lang: Lang; slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const sourceSection = (name: string) => project.sections.find((section) => section.title.en === name)?.body;
  const fallback = (en: string, pl: string): Localized => ({ en, pl });
  const requirements = sourceSection("Requirements and Acceptance Criteria") ?? fallback("Requirements and acceptance criteria define the expected output.", "Wymagania i kryteria akceptacji określają oczekiwany wynik.");

  const narrative: { title: Localized; body: Localized; emphasis?: boolean }[] = [
    { title: { en: "Executive Summary", pl: "Podsumowanie zarządcze" }, body: project.summary, emphasis: true },
    { title: { en: "Business Question", pl: "Pytanie biznesowe" }, body: project.question },
    { title: { en: "Business Context", pl: "Kontekst biznesowy" }, body: project.proof.why },
    { title: { en: "Scope and Role", pl: "Zakres i rola" }, body: { en: `${project.proof.scope.en} ${project.proof.role.en}`, pl: `${project.proof.scope.pl} ${project.proof.role.pl}` } },
    { title: { en: "Stakeholders and Intended Users", pl: "Interesariusze i użytkownicy" }, body: project.proof.users },
    { title: { en: "Requirements", pl: "Wymagania" }, body: requirements },
    { title: { en: "Data or Process Sources", pl: "Źródła danych lub procesu" }, body: sourceSection("Data Source") ?? fallback("The verified repository documents the source and its limitations.", "Zweryfikowane repozytorium dokumentuje źródło i jego ograniczenia.") },
    { title: { en: "Analytical Approach", pl: "Podejście analityczne" }, body: sourceSection("Analytical Approach") ?? fallback("A reproducible analytical approach connects requirements to evidence.", "Odtwarzalne podejście analityczne łączy wymagania z dowodami.") },
    { title: { en: "Process and Data Model", pl: "Model procesu i danych" }, body: sourceSection("Data Model") ?? fallback("The model keeps analytical perspectives consistent.", "Model zachowuje spójność perspektyw analitycznych.") },
    { title: { en: "KPI Definitions", pl: "Definicje KPI" }, body: sourceSection("KPI Definitions") ?? fallback("Measures are documented with explicit calculation rules.", "Miary są opisane wraz z jawnymi regułami obliczeń.") },
    { title: { en: "Artifacts and Evidence", pl: "Artefakty i dowody" }, body: { en: project.proof.evidence.en.join(". ") + ".", pl: project.proof.evidence.pl.join(". ") + "." } },
    { title: { en: "Key Findings", pl: "Kluczowe ustalenia" }, body: sourceSection("Key Findings") ?? project.proof.keyResult, emphasis: true },
    { title: { en: "Decision Support", pl: "Wsparcie decyzji" }, body: sourceSection("Decision Support") ?? project.proof.keyResult },
    { title: { en: "Data Quality and Guardrails", pl: "Jakość danych i zabezpieczenia" }, body: sourceSection("Data Quality and Guardrails") ?? project.proof.guardrail, emphasis: true },
    { title: { en: "Acceptance Criteria", pl: "Kryteria akceptacji" }, body: requirements },
    { title: { en: "UAT and Traceability", pl: "UAT i śledzenie wymagań" }, body: sourceSection("UAT and Traceability") ?? fallback("UAT connects each requirement to verifiable evidence.", "UAT łączy każde wymaganie z możliwym do zweryfikowania dowodem.") },
    { title: { en: "Deliverables", pl: "Rezultaty" }, body: sourceSection("Deliverables") ?? fallback("The repository contains analytical and business-facing deliverables.", "Repozytorium zawiera rezultaty analityczne i biznesowe.") },
    { title: { en: "Limitations", pl: "Ograniczenia" }, body: sourceSection("Limitations") ?? project.proof.guardrail },
    { title: { en: "What I Learned", pl: "Czego się nauczyłem" }, body: sourceSection("What I Learned") ?? fallback("Traceability improves both analysis and communication.", "Możliwość prześledzenia usprawnia analizę i komunikację.") },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[lang],
    description: project.summary[lang],
    url: `${siteUrl}${localizedPath(lang, `/projects/${project.slug}`)}`,
    creator: { "@type": "Person", name: "Onur Usalan", url: siteUrl },
    genre: project.category[lang],
    keywords: project.tools.join(", "),
    inLanguage: lang,
    isBasedOn: project.repo,
  };

  return (
    <SiteShell lang={lang}>
      <JsonLd data={structuredData} />
      <article className={`case-study case-${project.slug}`}>
        <header className="case-hero section-shell">
          <div className="case-index"><span>{project.index}</span><i /></div>
          <div>
            <p className="eyebrow">{project.category[lang]}</p>
            <h1>{project.title[lang]}</h1>
            <p>{project.summary[lang]}</p>
            <div className="case-actions"><Link className="text-link" href={localizedPath(lang, "/projects")}><span className="arrow back-arrow" aria-hidden="true">←</span>{lang === "en" ? "All case studies" : "Wszystkie projekty"}</Link><a className="text-link" href={project.repo} target="_blank" rel="noreferrer">{lang === "en" ? "Repository" : "Repozytorium"}<Arrow /></a></div>
          </div>
        </header>

        <section className="case-scan" aria-labelledby="case-scan-title">
          <div className="section-shell">
            <header><p className="eyebrow">{lang === "en" ? "60–90 second overview" : "Podsumowanie w 60–90 sekund"}</p><h2 id="case-scan-title">{lang === "en" ? "The case at a glance." : "Projekt w skrócie."}</h2></header>
            <dl>
              <div><dt>{lang === "en" ? "Business question" : "Pytanie biznesowe"}</dt><dd>{project.question[lang]}</dd></div>
              <div><dt>{lang === "en" ? "Scope and role" : "Zakres i rola"}</dt><dd>{project.proof.role[lang]}</dd></div>
              <div><dt>{lang === "en" ? "Intended users" : "Użytkownicy"}</dt><dd>{project.proof.users[lang]}</dd></div>
              <div><dt>{lang === "en" ? "Key result" : "Kluczowy wynik"}</dt><dd>{project.proof.keyResult[lang]}</dd></div>
              <div className="scan-guardrail"><dt>{lang === "en" ? "Guardrail" : "Ograniczenie"}</dt><dd>{project.proof.guardrail[lang]}</dd></div>
            </dl>
          </div>
        </section>

        {project.metrics.length ? <section className="case-metrics" aria-label={lang === "en" ? "Verified project metrics" : "Zweryfikowane wskaźniki projektu"}>{project.metrics.map((metric) => <div key={metric.value}><strong>{metric.value}</strong><span>{metric.label[lang]}</span></div>)}</section> : null}

        <section className="analytical-chain section-shell" aria-label={lang === "en" ? "Analytical chain" : "Łańcuch analityczny"}>
          <p className="eyebrow">{lang === "en" ? "Analytical chain" : "Łańcuch analityczny"}</p>
          <div>{project.chain.map((step, index) => <span key={step.en}><i>{String(index + 1).padStart(2, "0")}</i>{step[lang]}{index < project.chain.length - 1 ? <b aria-hidden="true">→</b> : null}</span>)}</div>
        </section>

        <section className="case-artifacts section-shell" id="artifacts">
          <div className="case-artifacts-heading" data-reveal><p className="eyebrow">{lang === "en" ? "Project evidence" : "Dowody projektu"}</p><h2>{lang === "en" ? "Artifacts that make the work reviewable." : "Artefakty, które umożliwiają weryfikację pracy."}</h2><p>{lang === "en" ? "The dashboard is a real repository output. The traceability and UAT previews reproduce verified rows from the project documentation." : "Dashboard jest rzeczywistym wynikiem repozytorium. Podglądy traceability i UAT odtwarzają zweryfikowane wiersze z dokumentacji projektu."}</p></div>
          <ArtifactGallery project={project} lang={lang} />
        </section>

        <div className="case-story section-shell">
          <aside>
            <p>{lang === "en" ? "Case navigation" : "Nawigacja projektu"}</p>
            <ol><li><a href="#artifacts"><span>00</span>{lang === "en" ? "Project evidence" : "Dowody projektu"}</a></li>{narrative.map((section, index) => <li key={section.title.en}><a href={`#stage-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title[lang]}</a></li>)}</ol>
          </aside>
          <div className="case-sections">
            {narrative.map((section, index) => (
              <section id={`stage-${index + 1}`} className={section.emphasis ? "is-emphasis" : ""} key={section.title.en} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title[lang]}</h2>
                <p>{section.body[lang]}</p>
              </section>
            ))}
            <section id="technologies" data-reveal><span>{String(narrative.length + 1).padStart(2, "0")}</span><h2>{lang === "en" ? "Technologies and Repository" : "Technologie i repozytorium"}</h2><div className="tag-list">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><a className="text-link case-repository" href={project.repo} target="_blank" rel="noreferrer">{lang === "en" ? "Review the complete repository" : "Zobacz pełne repozytorium"}<Arrow /></a></section>
          </div>
        </div>

        <section className="next-case section-shell" data-reveal>
          <p className="eyebrow">{lang === "en" ? "Continue exploring" : "Zobacz dalej"}</p>
          {(() => {
            const next = projects[(projects.indexOf(project) + 1) % projects.length];
            return <Link href={localizedPath(lang, `/projects/${next.slug}`)}><span>{lang === "en" ? "Next case study" : "Następny projekt"}</span><strong>{next.title[lang]}</strong><i aria-hidden="true">→</i></Link>;
          })()}
        </section>
      </article>
    </SiteShell>
  );
}
