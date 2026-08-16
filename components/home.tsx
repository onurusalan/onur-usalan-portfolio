import Image from "next/image";
import Link from "next/link";
import { contact, experience, localizedPath, profile, projects, siteUrl, skills, type Lang } from "@/content/site";
import { media } from "@/config/media";
import { DecisionTrace } from "./media-client";
import { CVDownload, EvidenceReel, ProfilePortrait, ProjectDashboard } from "./media";
import { Arrow, JsonLd, SectionHeading, SiteShell } from "./shell";

const capabilities = [
  {
    title: { en: "Requirements & stakeholder discovery", pl: "Wymagania i analiza interesariuszy" },
    body: { en: "Business needs, structured requirements, user stories and acceptance criteria.", pl: "Potrzeby biznesowe, uporządkowane wymagania, user stories i kryteria akceptacji." },
    output: { en: "Scope · requirements · acceptance", pl: "Zakres · wymagania · akceptacja" },
  },
  {
    title: { en: "Process analysis & improvement", pl: "Analiza i usprawnianie procesów" },
    body: { en: "Current-state understanding, friction identification and evidence-based future-state recommendations.", pl: "Zrozumienie stanu obecnego, identyfikacja problemów i rekomendacje przyszłego stanu oparte na dowodach." },
    output: { en: "Current state · gaps · priorities", pl: "Stan obecny · luki · priorytety" },
  },
  {
    title: { en: "KPI & management reporting", pl: "KPI i raportowanie zarządcze" },
    body: { en: "Measures that connect operational performance with the decision a stakeholder needs to make.", pl: "Miary łączące wyniki operacyjne z decyzją, którą musi podjąć interesariusz." },
    output: { en: "KPI logic · dashboard · management pack", pl: "Logika KPI · dashboard · pakiet zarządczy" },
  },
  {
    title: { en: "Data quality & SQL analysis", pl: "Jakość danych i analiza SQL" },
    body: { en: "Reliable datasets, validation rules, anomaly handling and calculations that remain traceable.", pl: "Wiarygodne zbiory, reguły walidacji, obsługa anomalii i możliwe do prześledzenia obliczenia." },
    output: { en: "Quality checks · SQL model · findings", pl: "Kontrole jakości · model SQL · wnioski" },
  },
  {
    title: { en: "UAT & requirements traceability", pl: "UAT i śledzenie wymagań" },
    body: { en: "Testable requirements, acceptance evidence and a controlled route from need to final output.", pl: "Testowalne wymagania, dowody akceptacji i kontrolowana droga od potrzeby do końcowego wyniku." },
    output: { en: "Test scenarios · RTM · validation", pl: "Scenariusze testowe · RTM · walidacja" },
  },
  {
    title: { en: "Business–technical collaboration", pl: "Współpraca biznes–technologia" },
    body: { en: "Clear communication across business, data and technical teams without losing the original objective.", pl: "Jasna komunikacja między biznesem, danymi i zespołami technicznymi bez utraty pierwotnego celu." },
    output: { en: "Functional logic · handover · alignment", pl: "Logika funkcjonalna · przekazanie · uzgodnienia" },
  },
];

const companyImpact = [
  {
    signal: {
      en: "When every stakeholder describes the initiative differently",
      pl: "Gdy każdy interesariusz inaczej opisuje inicjatywę",
    },
    title: {
      en: "Create one shared definition of the problem.",
      pl: "Stworzyć jedną, wspólną definicję problemu.",
    },
    body: {
      en: "I can structure discovery, identify decision owners, surface assumptions and translate conversations into scope, business requirements, user stories and acceptance criteria.",
      pl: "Mogę uporządkować discovery, wskazać właścicieli decyzji, ujawnić założenia i przełożyć rozmowy na zakres, wymagania biznesowe, user stories oraz kryteria akceptacji.",
    },
    value: {
      en: "Business value · clearer alignment before design, delivery or reporting work expands.",
      pl: "Wartość biznesowa · większa zgodność przed rozszerzeniem prac projektowych, wdrożeniowych lub raportowych.",
    },
    outputs: {
      en: ["Discovery brief", "Stakeholder map", "Requirements pack", "Acceptance criteria"],
      pl: ["Brief discovery", "Mapa interesariuszy", "Pakiet wymagań", "Kryteria akceptacji"],
    },
  },
  {
    signal: {
      en: "When work depends on hand-offs, workarounds and unclear ownership",
      pl: "Gdy praca zależy od przekazań, obejść i niejasnej odpowiedzialności",
    },
    title: {
      en: "Make process friction visible and actionable.",
      pl: "Uwidocznić problemy procesu i przełożyć je na działania.",
    },
    body: {
      en: "I can map the current state, locate delays and control gaps, distinguish symptoms from root causes and shape a practical future-state recommendation with priorities.",
      pl: "Mogę zmapować stan obecny, wskazać opóźnienia i luki kontrolne, oddzielić objawy od przyczyn oraz przygotować praktyczną rekomendację przyszłego stanu z priorytetami.",
    },
    value: {
      en: "Business value · a fact-based basis for deciding what to improve first.",
      pl: "Wartość biznesowa · oparta na faktach podstawa do decyzji, co usprawnić najpierw.",
    },
    outputs: {
      en: ["Current-state map", "Gap analysis", "Future-state logic", "Priority backlog"],
      pl: ["Mapa stanu obecnego", "Analiza luk", "Logika przyszłego stanu", "Backlog priorytetów"],
    },
  },
  {
    signal: {
      en: "When leaders have data, but not one trusted view of performance",
      pl: "Gdy liderzy mają dane, ale nie mają jednego wiarygodnego obrazu wyników",
    },
    title: {
      en: "Turn fragmented data into decision-ready reporting.",
      pl: "Przekształcić rozproszone dane w raportowanie gotowe do decyzji.",
    },
    body: {
      en: "I can define KPI logic, investigate data with SQL and Python, document quality rules and build management views that keep definitions, source boundaries and limitations visible.",
      pl: "Mogę zdefiniować logikę KPI, analizować dane w SQL i Pythonie, dokumentować reguły jakości oraz budować widoki zarządcze z widocznymi definicjami, granicami źródeł i ograniczeniami.",
    },
    value: {
      en: "Business value · evidence that can be understood, challenged and used in a decision.",
      pl: "Wartość biznesowa · dowody, które można zrozumieć, zakwestionować i wykorzystać w decyzji.",
    },
    outputs: {
      en: ["KPI dictionary", "SQL analysis", "Quality checks", "Management dashboard"],
      pl: ["Słownik KPI", "Analiza SQL", "Kontrole jakości", "Dashboard zarządczy"],
    },
  },
  {
    signal: {
      en: "When a change is ready to ship, but acceptance is still subjective",
      pl: "Gdy zmiana jest gotowa do wdrożenia, ale akceptacja pozostaje subiektywna",
    },
    title: {
      en: "Connect requirements to UAT and acceptance evidence.",
      pl: "Połączyć wymagania z UAT i dowodami akceptacji.",
    },
    body: {
      en: "I can make requirements testable, design UAT scenarios, maintain traceability and organise acceptance evidence so teams can see what passed, what changed and what remains open.",
      pl: "Mogę uczynić wymagania testowalnymi, zaprojektować scenariusze UAT, utrzymywać traceability i uporządkować dowody akceptacji, aby zespół widział, co przeszło, co się zmieniło i co pozostaje otwarte.",
    },
    value: {
      en: "Business value · a reviewable route from the original need to the delivered output.",
      pl: "Wartość biznesowa · możliwa do przeglądu droga od pierwotnej potrzeby do dostarczonego wyniku.",
    },
    outputs: {
      en: ["UAT scenarios", "Traceability matrix", "Acceptance log", "Handover evidence"],
      pl: ["Scenariusze UAT", "Macierz śledzenia", "Rejestr akceptacji", "Dowody przekazania"],
    },
  },
] as const;

const recruiterFaq = [
  {
    question: { en: "What roles is Onur targeting?", pl: "Jakich ról szuka Onur?" },
    answer: { en: "Business Analyst, Junior Business Systems Analyst and data-oriented Business Analyst roles where requirements, processes, reporting and acceptance need to stay connected.", pl: "Stanowisk Analityka Biznesowego, Junior Business Systems Analyst oraz ról Business Analyst zorientowanych na dane, w których wymagania, procesy, raportowanie i akceptacja muszą pozostać spójne." },
  },
  {
    question: { en: "How can he contribute to a company?", pl: "Jak może pomóc firmie?" },
    answer: { en: "By structuring ambiguous needs, mapping process friction, defining decision-useful KPIs, investigating data with SQL and Python, and connecting requirements to UAT and traceable acceptance evidence.", pl: "Poprzez porządkowanie niejasnych potrzeb, mapowanie problemów procesowych, definiowanie KPI użytecznych dla decyzji, analizę danych w SQL i Pythonie oraz łączenie wymagań z UAT i możliwymi do prześledzenia dowodami akceptacji." },
  },
  {
    question: { en: "What evidence can a recruiter review?", pl: "Jakie dowody może zweryfikować rekruter?" },
    answer: { en: "Two completed case studies include real dashboards, requirements, KPI definitions, data-quality controls, traceability matrices, UAT evidence and public GitHub repositories.", pl: "Dwa ukończone studia przypadków obejmują prawdziwe dashboardy, wymagania, definicje KPI, kontrole jakości danych, macierze śledzenia, dowody UAT i publiczne repozytoria GitHub." },
  },
  {
    question: { en: "Where is he based and studying?", pl: "Gdzie mieszka i studiuje?" },
    answer: { en: "Onur is based in Warsaw, Poland and is completing a Master’s in International Business at SGH Warsaw School of Economics.", pl: "Onur mieszka w Warszawie i realizuje studia magisterskie International Business w SGH Warsaw School of Economics." },
  },
] as const;

export function HomePage({ lang }: { lang: Lang }) {
  const currentUrl = `${siteUrl}${localizedPath(lang)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Onur Usalan — Business Analyst Portfolio",
        inLanguage: ["en", "pl"],
      },
      {
        "@type": "ProfilePage",
        "@id": `${currentUrl}#profile-page`,
        name: `${profile.name} — ${profile.role[lang]}`,
        description: profile.introduction[lang],
        url: currentUrl,
        isPartOf: { "@id": `${siteUrl}/#website` },
        dateModified: "2026-08-16",
        mainEntity: { "@id": `${siteUrl}/#onur-usalan` },
        hasPart: projects.map((project) => ({ "@id": `${siteUrl}/projects/${project.slug}#case-study` })),
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#onur-usalan`,
      name: profile.name,
      jobTitle: lang === "en" ? "Business Analyst" : "Analityk Biznesowy",
      description: profile.introduction[lang],
      image: `${siteUrl}/images/onur-headshot.jpg`,
      homeLocation: { "@type": "Place", name: "Warsaw, Poland", address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" } },
      url: siteUrl,
      sameAs: [contact.linkedin, contact.github],
      email: `mailto:${contact.email}`,
      knowsAbout: ["Business requirements", "Stakeholder analysis", "Process analysis", "KPI reporting", "SQL analysis", "Data quality", "User acceptance testing", "Requirements traceability", "Decision support"],
      affiliation: { "@type": "CollegeOrUniversity", name: "SGH Warsaw School of Economics" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Bartin University" },
        { "@type": "CollegeOrUniversity", name: "Wrocław University of Science and Technology" },
      ],
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}#recruiter-faq`,
        mainEntity: recruiterFaq.map((item) => ({
          "@type": "Question",
          name: item.question[lang],
          acceptedAnswer: { "@type": "Answer", text: item.answer[lang] },
        })),
      },
    ],
  };

  return (
    <SiteShell lang={lang}>
      <JsonLd data={structuredData} />
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-sequence eyebrow-sequence">{profile.eyebrow[lang]}</p>
          <p className="hero-name hero-sequence name-sequence">{profile.name}</p>
          <h1 className="hero-sequence title-sequence" aria-label={profile.headline[lang]}>
            {profile.headlineLines[lang].map((line, index) => (
              <span className={index === profile.headlineLines[lang].length - 1 ? "hero-title-accent" : undefined} aria-hidden="true" key={line}>{line}{" "}</span>
            ))}
          </h1>
          <p className="hero-role hero-sequence role-sequence">{profile.role[lang]}</p>
          <p className="hero-intro hero-sequence intro-sequence">{profile.introduction[lang]}</p>
          <div className="hero-context hero-sequence intro-sequence">
            <p className="location"><span aria-hidden="true" />{profile.location[lang]}</p>
            <div className="hero-education"><strong>SGH</strong><p>{profile.education[lang]}</p></div>
          </div>
          <div className="hero-actions hero-sequence actions-sequence">
            <a className="button button-primary" href="#selected-work">{lang === "en" ? "View proof of work" : "Zobacz dowody pracy"}<span aria-hidden="true">↓</span></a>
            <CVDownload lang={lang} />
            <a className="text-link quiet-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
          </div>
          <ul className="hero-proofline hero-sequence actions-sequence" aria-label={lang === "en" ? "Portfolio evidence" : "Dowody portfolio"}>
            <li>{lang === "en" ? "2 documented case studies" : "2 udokumentowane studia przypadków"}</li>
            <li>{lang === "en" ? "Real dashboards & UAT" : "Prawdziwe dashboardy i UAT"}</li>
            <li>{lang === "en" ? "Public evidence repositories" : "Publiczne repozytoria dowodów"}</li>
          </ul>
        </div>
        <DecisionTrace lang={lang} />
      </section>

      <RecruiterSnapshot lang={lang} />
      <CompanyImpact lang={lang} />
      <Capabilities lang={lang} />
      <SelectedWork lang={lang} />
      <ExperienceProof lang={lang} />
      <Leadership lang={lang} />
      <SkillSnapshot lang={lang} />
      <WarsawProfile lang={lang} />
      <RecruiterFaq lang={lang} />
      <ContactPanel lang={lang} />
    </SiteShell>
  );
}

function CompanyImpact({ lang }: { lang: Lang }) {
  return (
    <section className="company-impact section-shell" id="company-impact">
      <SectionHeading
        eyebrow={lang === "en" ? "How I can help a company" : "Jak mogę pomóc firmie"}
        title={lang === "en" ? "Business problems become easier to solve when the work is clear, testable and traceable." : "Problemy biznesowe łatwiej rozwiązywać, gdy praca jest jasna, testowalna i możliwa do prześledzenia."}
        intro={lang === "en" ? "Four concrete ways I can contribute from discovery and process clarity to governed reporting and acceptance." : "Cztery konkretne sposoby, w jakie mogę wspierać zespół — od discovery i przejrzystości procesu po kontrolowane raportowanie i akceptację."}
      />
      <div className="impact-layout">
        <aside className="impact-thesis" data-reveal>
          <p className="eyebrow">{lang === "en" ? "The contribution" : "Mój wkład"}</p>
          <blockquote>{lang === "en" ? "I connect the business question, the operational reality and the evidence needed for a confident next step." : "Łączę pytanie biznesowe, rzeczywistość operacyjną i dowody potrzebne do podjęcia pewnego kolejnego kroku."}</blockquote>
          <dl>
            <div><dt>{lang === "en" ? "From" : "Od"}</dt><dd>{lang === "en" ? "Ambiguity" : "Niejasności"}</dd><dt>{lang === "en" ? "To" : "Do"}</dt><dd>{lang === "en" ? "Structured scope" : "Uporządkowanego zakresu"}</dd></div>
            <div><dt>{lang === "en" ? "From" : "Od"}</dt><dd>{lang === "en" ? "Raw data" : "Surowych danych"}</dd><dt>{lang === "en" ? "To" : "Do"}</dt><dd>{lang === "en" ? "Decision evidence" : "Dowodów dla decyzji"}</dd></div>
            <div><dt>{lang === "en" ? "From" : "Od"}</dt><dd>{lang === "en" ? "Assumptions" : "Założeń"}</dd><dt>{lang === "en" ? "To" : "Do"}</dt><dd>{lang === "en" ? "Testable acceptance" : "Testowalnej akceptacji"}</dd></div>
          </dl>
          <Link className="button button-light" href={localizedPath(lang, "/contact")}>{lang === "en" ? "Discuss a business problem" : "Porozmawiaj o problemie biznesowym"}<span aria-hidden="true">→</span></Link>
        </aside>
        <div className="impact-scenarios">
          {companyImpact.map((item) => (
            <article key={item.title.en} data-reveal>
              <header><span>{lang === "en" ? "Business situation" : "Sytuacja biznesowa"}</span><p>{item.signal[lang]}</p></header>
              <h3>{item.title[lang]}</h3>
              <p>{item.body[lang]}</p>
              <strong>{item.value[lang]}</strong>
              <div>{item.outputs[lang].map((output) => <span key={output}>{output}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruiterSnapshot({ lang }: { lang: Lang }) {
  const areas = lang === "en"
    ? ["Requirements", "Process analysis", "SQL / data analysis", "Reporting", "UAT & traceability"]
    : ["Wymagania", "Analiza procesów", "SQL / analiza danych", "Raportowanie", "UAT i śledzenie"];
  return (
    <section className="recruiter-snapshot" aria-labelledby="recruiter-snapshot-title">
      <div className="section-shell" data-reveal>
        <header><p className="eyebrow">{lang === "en" ? "Recruiter snapshot" : "Profil dla rekrutera"}</p><h2 id="recruiter-snapshot-title">{lang === "en" ? "A fast read of role fit and evidence." : "Szybki obraz dopasowania do roli i dowodów."}</h2></header>
        <dl>
          <div><dt>{lang === "en" ? "Target roles" : "Docelowe role"}</dt><dd>Business Analyst<br />Junior Business Systems Analyst<br />Data-oriented Business Analyst</dd></div>
          <div><dt>{lang === "en" ? "Location" : "Lokalizacja"}</dt><dd>{profile.location[lang]}</dd></div>
          <div><dt>{lang === "en" ? "Core areas" : "Główne obszary"}</dt><dd className="snapshot-tags">{areas.map((area) => <span key={area}>{area}</span>)}</dd></div>
        </dl>
        <nav aria-label={lang === "en" ? "Recruiter links" : "Linki dla rekrutera"}>
          <CVDownload lang={lang} compact />
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`mailto:${contact.email}`}>{lang === "en" ? "Email ↗" : "E-mail ↗"}</a>
        </nav>
      </div>
    </section>
  );
}

function Capabilities({ lang }: { lang: Lang }) {
  return (
    <section className="business-solutions" id="capabilities">
      <div className="section-shell">
        <SectionHeading
          eyebrow={lang === "en" ? "How the work gets delivered" : "Jak realizuję pracę"}
          title={lang === "en" ? "The analytical methods behind the business outcome." : "Metody analityczne stojące za wynikiem biznesowym."}
          intro={lang === "en" ? "The emphasis is not on a long tool list. It is on the requirements, process, evidence and validation work those tools make possible." : "Najważniejsza nie jest długa lista narzędzi, lecz praca nad wymaganiami, procesem, dowodami i walidacją, którą te narzędzia umożliwiają."}
        />
        <div className="solutions-grid">
          {capabilities.map((capability) => (
            <article key={capability.title.en} data-reveal>
              <div><span aria-hidden="true">—</span><i aria-hidden="true">↗</i></div>
              <h3>{capability.title[lang]}</h3>
              <p>{capability.body[lang]}</p>
              <small>{capability.output[lang]}</small>
            </article>
          ))}
        </div>
        <div className="solutions-cta" data-reveal><p>{lang === "en" ? "Looking for an analyst who can connect business context with evidence?" : "Szukasz analityka, który łączy kontekst biznesowy z dowodami?"}</p><Link className="button button-primary" href={localizedPath(lang, "/contact")}>{lang === "en" ? "Discuss an analyst opportunity" : "Porozmawiaj o roli analityka"}<span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}

export function SelectedWork({ lang, showAll = false }: { lang: Lang; showAll?: boolean }) {
  return (
    <section className={`selected-work section-shell${showAll ? " project-index" : ""}`} id="selected-work">
      <SectionHeading
        eyebrow={lang === "en" ? "Selected case studies" : "Wybrane studia przypadków"}
        title={lang === "en" ? "Proof of analysis, not a list of repositories." : "Dowody analizy, nie lista repozytoriów."}
        intro={lang === "en" ? "Two completed portfolio cases show the full route from a business question and requirements to governed evidence, UAT and a decision-ready output." : "Dwa ukończone projekty portfolio pokazują pełną drogę od pytania biznesowego i wymagań do kontrolowanych dowodów, UAT i wyniku gotowego do decyzji."}
      />

      {!showAll ? (
        <div className="reel-section">
          <div className="reel-intro"><p className="eyebrow">{lang === "en" ? "Animated evidence reel" : "Ruchomy przegląd dowodów"}</p><p>{lang === "en" ? "A controlled sequence of real dashboard, traceability and UAT artifacts from the two repositories." : "Kontrolowana sekwencja rzeczywistych dashboardów, macierzy śledzenia i artefaktów UAT z obu repozytoriów."}</p></div>
          <EvidenceReel lang={lang} />
        </div>
      ) : null}

      <div className="project-list">
        {projects.map((project, index) => (
          <article className={`project-feature project-${index + 1}`} key={project.slug} data-reveal>
            <header className="project-feature-head">
              <div className="project-meta"><span>{project.index}</span><p>{project.category[lang]}</p></div>
              <h3>{project.title[lang]}</h3>
            </header>
            <div className="project-feature-body">
              <div className="project-copy">
                <p className="project-question"><span>{lang === "en" ? "Business question" : "Pytanie biznesowe"}</span>{project.question[lang]}</p>
                <dl className="project-proof-list">
                  <div><dt>{lang === "en" ? "Why it matters" : "Dlaczego to ważne"}</dt><dd>{project.proof.why[lang]}</dd></div>
                  <div><dt>{lang === "en" ? "Onur’s role" : "Rola Onura"}</dt><dd>{project.proof.role[lang]}</dd></div>
                  <div><dt>{lang === "en" ? "Evidence / artifacts" : "Dowody / artefakty"}</dt><dd>{project.proof.evidence[lang].slice(0, 4).join(" · ")}</dd></div>
                  <div><dt>{lang === "en" ? "Guardrail" : "Ograniczenie"}</dt><dd>{project.proof.guardrail[lang]}</dd></div>
                </dl>
                <div className="tag-list">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                <div className="project-actions">
                  <Link className="button button-primary" href={localizedPath(lang, `/projects/${project.slug}`)}>{lang === "en" ? "View case study" : "Zobacz studium przypadku"}<span aria-hidden="true">→</span></Link>
                  <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">{lang === "en" ? "Repository" : "Repozytorium"}<Arrow /></a>
                </div>
              </div>
              <div className="project-visual-column">
                <ProjectDashboard project={project} lang={lang} />
                <div className="project-key-result"><span>{lang === "en" ? "Key result" : "Kluczowy wynik"}</span><p>{project.proof.keyResult[lang]}</p></div>
              </div>
            </div>
            <div className="feature-metrics" aria-label={lang === "en" ? "Verified project metrics" : "Zweryfikowane wskaźniki projektu"}>
              {project.metrics.slice(0, 4).map((metric) => <div key={metric.value}><strong>{metric.value}</strong><span>{metric.label[lang]}</span></div>)}
            </div>
          </article>
        ))}
      </div>
      {showAll ? <div className="project-archive-note" data-reveal><p>{lang === "en" ? "Only completed, business-facing analytical work is featured here. Smaller experiments remain on GitHub without being presented as case studies." : "Prezentowane są wyłącznie ukończone prace analityczne ukierunkowane na biznes. Mniejsze eksperymenty pozostają na GitHubie i nie są przedstawiane jako studia przypadków."}</p><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">{lang === "en" ? "Complete GitHub profile" : "Pełny profil GitHub"}<Arrow /></a></div> : <Link className="section-link" href={localizedPath(lang, "/projects")}>{lang === "en" ? "Review both case studies" : "Zobacz oba studia przypadków"}<span aria-hidden="true">→</span></Link>}
    </section>
  );
}

function ExperienceProof({ lang }: { lang: Lang }) {
  const etisan = experience[0];
  return (
    <section className="experience-proof">
      <div className="section-shell" data-reveal>
        <div className="experience-statement">
          <p className="eyebrow">{lang === "en" ? "Experience proof" : "Doświadczenie w praktyce"}</p>
          <h2>{lang === "en" ? "Operational Data" : "Dane operacyjne"}<i>→</i>{lang === "en" ? "Analysis" : "Analiza"}<i>→</i>{lang === "en" ? "Visualisation" : "Wizualizacja"}<i>→</i>{lang === "en" ? "Management Reporting" : "Raportowanie zarządcze"}</h2>
        </div>
        <article className="experience-feature">
          <div className="experience-meta"><span>{etisan.dates[lang]}</span><span>{etisan.location[lang]}</span></div>
          <p>{etisan.context[lang]}</p>
          <h3>{etisan.company}</h3>
          <strong>{etisan.role[lang]}</strong>
          <p className="experience-output"><span>{lang === "en" ? "Output" : "Wynik"}</span>{etisan.outputs[lang]}</p>
          <Link className="text-link" href={localizedPath(lang, "/experience")}>{lang === "en" ? "Review experience in context" : "Zobacz doświadczenie w kontekście"}<span className="arrow" aria-hidden="true">→</span></Link>
        </article>
      </div>
    </section>
  );
}

function Leadership({ lang }: { lang: Lang }) {
  return (
    <section className="leadership section-shell" data-reveal>
      <div><p className="eyebrow">{lang === "en" ? "Supporting evidence · leadership" : "Dowód uzupełniający · przywództwo"}</p><h2>Bartin University Blockchain Club</h2><p>{lang === "en" ? "Management Team · 2021–2024" : "Zespół zarządzający · 2021–2024"}</p></div>
      <div className="leadership-numbers"><div><strong>≈600</strong><span>{lang === "en" ? "community members" : "członków społeczności"}</span></div><div><strong>30+</strong><span>{lang === "en" ? "organised events" : "zorganizowanych wydarzeń"}</span></div></div>
      <p className="leadership-copy">{lang === "en" ? "Supporting evidence of stakeholder communication, coordination, planning and shared responsibility alongside study." : "Uzupełniający dowód komunikacji z interesariuszami, koordynacji, planowania i współodpowiedzialności podczas studiów."}</p>
    </section>
  );
}

function SkillSnapshot({ lang }: { lang: Lang }) {
  return (
    <section className="skill-snapshot section-shell">
      <SectionHeading eyebrow={lang === "en" ? "Working toolkit" : "Warsztat pracy"} title={lang === "en" ? "Technical fluency supports the analysis." : "Biegłość techniczna wspiera analizę."} intro={lang === "en" ? "A practical toolkit for validating assumptions, investigating data and communicating clearly across business and technical teams." : "Praktyczny zestaw narzędzi do weryfikowania założeń, analizy danych i jasnej współpracy między zespołami biznesowymi i technicznymi."} />
      <div className="skill-grid" data-reveal>{skills.map((group) => <article key={group.title.en}><h3>{group.title[lang]}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
    </section>
  );
}

function WarsawProfile({ lang }: { lang: Lang }) {
  return (
    <section className="warsaw-context section-shell" aria-labelledby="warsaw-profile-title">
      <figure className="warsaw-visual" data-reveal>
        <Image src={media.warsawContext ?? "/images/warsaw-business-context.webp"} fill sizes="(max-width: 650px) 100vw, 1280px" alt={lang === "en" ? "Editorial visual of the Warsaw skyline beside the Vistula river" : "Redakcyjna wizualizacja panoramy Warszawy nad Wisłą"} />
        <figcaption><span>WAW · 52°N</span><strong>{lang === "en" ? "Warsaw business context" : "Warszawski kontekst biznesowy"}</strong></figcaption>
      </figure>
      <div className="warsaw-profile-card" data-reveal>
        <ProfilePortrait lang={lang} />
        <div className="warsaw-profile-copy">
          <p className="eyebrow">{lang === "en" ? "Warsaw base · International perspective" : "Baza w Warszawie · Perspektywa międzynarodowa"}</p>
          <h2 id="warsaw-profile-title">{lang === "en" ? "Close to Poland’s business ecosystem, prepared for international teams." : "Blisko polskiego ekosystemu biznesowego, gotowy do pracy w zespołach międzynarodowych."}</h2>
          <p>{lang === "en" ? "I am based in Warsaw and completing a Master’s in International Business at SGH Warsaw School of Economics. That context strengthens how I think about organisations, markets and cross-functional decisions alongside requirements, process and data analysis." : "Mieszkam w Warszawie i studiuję International Business na poziomie magisterskim w SGH Warsaw School of Economics. Ten kontekst wzmacnia moje spojrzenie na organizacje, rynki i decyzje międzyfunkcyjne obok analizy wymagań, procesów i danych."}</p>
          <dl>
            <div><dt>{lang === "en" ? "Based in" : "Lokalizacja"}</dt><dd>{profile.location[lang]}</dd></div>
            <div><dt>{lang === "en" ? "Current study" : "Obecne studia"}</dt><dd>SGH · International Business MSc</dd></div>
          </dl>
          <div className="warsaw-profile-actions"><Link className="button button-primary" href={localizedPath(lang, "/about")}>{lang === "en" ? "View professional profile" : "Zobacz profil zawodowy"}<span aria-hidden="true">→</span></Link><a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a></div>
        </div>
      </div>
    </section>
  );
}

function RecruiterFaq({ lang }: { lang: Lang }) {
  return (
    <section className="recruiter-faq section-shell" id="recruiter-faq" aria-labelledby="recruiter-faq-title">
      <div className="faq-intro" data-reveal>
        <p className="eyebrow">{lang === "en" ? "Recruiter questions" : "Pytania rekrutera"}</p>
        <h2 id="recruiter-faq-title">{lang === "en" ? "The essentials, answered directly." : "Najważniejsze informacje — bezpośrednio."}</h2>
        <p>{lang === "en" ? "A concise, factual summary for recruiters, hiring managers and teams evaluating role fit." : "Zwięzłe i rzeczowe podsumowanie dla rekruterów, hiring managerów i zespołów oceniających dopasowanie do roli."}</p>
      </div>
      <div className="faq-list" data-reveal>
        {recruiterFaq.map((item, index) => (
          <details key={item.question.en} open={index === 0}>
            <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question[lang]}<i aria-hidden="true" /></summary>
            <p>{item.answer[lang]}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactPanel({ lang }: { lang: Lang }) {
  return (
    <section className="contact-panel">
      <div className="section-shell" data-reveal>
        <p className="eyebrow">{lang === "en" ? "Professional contact" : "Kontakt zawodowy"}</p>
        <h2>{lang === "en" ? "Open to Business Analyst opportunities in Poland and across Europe." : "Otwarty na stanowiska Analityka Biznesowego w Polsce i Europie."}</h2>
        <p>{lang === "en" ? "Based in Warsaw and interested in roles where requirements, processes and data need to become clear, testable and useful for a decision." : "Mieszkam w Warszawie i interesują mnie role, w których wymagania, procesy i dane muszą stać się jasne, testowalne i użyteczne dla decyzji."}</p>
        <dl className="contact-facts"><div><dt>{lang === "en" ? "Location" : "Lokalizacja"}</dt><dd>{profile.location[lang]}</dd></div></dl>
        <div className="contact-actions"><a className="button button-light" href={`mailto:${contact.email}`}>{lang === "en" ? "Email Onur" : "Napisz do Onura"}<span aria-hidden="true">→</span></a><CVDownload lang={lang} className="contact-link" compact /><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
      </div>
    </section>
  );
}
