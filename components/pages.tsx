import Link from "next/link";
import { experience, localizedPath, skills, type Lang } from "@/content/site";
import { ContactPanel, SelectedWork } from "./home";
import { IntroductionMedia, ProfilePortrait } from "./media";
import { SectionHeading, SiteShell } from "./shell";

export type StaticPageType = "about" | "experience" | "projects" | "contact";

const pageHeaders: Record<StaticPageType, { eyebrow: Record<Lang, string>; title: Record<Lang, string>; intro: Record<Lang, string> }> = {
  about: {
    eyebrow: { en: "Profile", pl: "Profil" },
    title: { en: "Business needs, translated into requirements, processes and decisions.", pl: "Potrzeby biznesowe przełożone na wymagania, procesy i decyzje." },
    intro: { en: "A Warsaw-based Business Analyst profile combining structured discovery, process and data analysis, and technical fluency.", pl: "Profil Analityka Biznesowego z Warszawy łączący uporządkowaną analizę potrzeb, procesów i danych z biegłością techniczną." },
  },
  experience: {
    eyebrow: { en: "Experience", pl: "Doświadczenie" },
    title: { en: "Experience, shown in its real business context.", pl: "Doświadczenie pokazane w rzeczywistym kontekście biznesowym." },
    intro: { en: "Operational data, management reporting, research and stakeholder coordination—presented without turning internships or community work into client consulting.", pl: "Dane operacyjne, raportowanie zarządcze, badania i koordynacja interesariuszy — bez przedstawiania staży lub działalności społecznościowej jako konsultingu dla klientów." },
  },
  projects: {
    eyebrow: { en: "Case studies", pl: "Projekty" },
    title: { en: "Completed analysis with visible evidence.", pl: "Ukończone analizy z widocznymi dowodami." },
    intro: { en: "Each case connects the business question, Onur’s role, governed measures, concrete artifacts and responsible interpretation.", pl: "Każdy projekt łączy pytanie biznesowe, rolę Onura, kontrolowane miary, konkretne artefakty i odpowiedzialną interpretację." },
  },
  contact: {
    eyebrow: { en: "Contact", pl: "Kontakt" },
    title: { en: "A direct route to a professional conversation.", pl: "Bezpośrednia droga do rozmowy zawodowej." },
    intro: { en: "For Business Analyst, Junior Business Systems Analyst and data-oriented Business Analyst opportunities in Warsaw, Poland or international teams.", pl: "W sprawie stanowisk Analityka Biznesowego, Junior Business Systems Analyst i Data-oriented Business Analyst w Warszawie, Polsce lub zespołach międzynarodowych." },
  },
};

export function StaticPage({ lang, type }: { lang: Lang; type: StaticPageType }) {
  const header = pageHeaders[type];
  return (
    <SiteShell lang={lang}>
      <section className="page-hero section-shell">
        <p className="eyebrow">{header.eyebrow[lang]}</p>
        <h1>{header.title[lang]}</h1>
        <p>{header.intro[lang]}</p>
      </section>
      {type === "about" ? <AboutPage lang={lang} /> : null}
      {type === "experience" ? <ExperiencePage lang={lang} /> : null}
      {type === "projects" ? <SelectedWork lang={lang} showAll /> : null}
      {type === "contact" ? <ContactPanel lang={lang} /> : null}
    </SiteShell>
  );
}

function AboutPage({ lang }: { lang: Lang }) {
  const principles = lang === "en"
    ? [
      ["Clarify before analysing", "Define the decision, stakeholder and success measure before selecting a method."],
      ["Keep evidence traceable", "Make definitions, exclusions and validation visible enough for another reviewer to challenge."],
      ["Separate fact from recommendation", "State what the data shows, what remains uncertain and what should be tested next."],
    ]
    : [
      ["Wyjaśnij przed analizą", "Zdefiniuj decyzję, interesariusza i miarę sukcesu przed wyborem metody."],
      ["Zachowaj możliwość prześledzenia", "Pokaż definicje, wyłączenia i walidację w sposób umożliwiający weryfikację przez inną osobę."],
      ["Oddziel fakt od rekomendacji", "Wskaż, co pokazują dane, co pozostaje niepewne i co należy sprawdzić dalej."],
    ];

  return (
    <>
      <section className="profile-story section-shell" data-reveal>
        <ProfilePortrait lang={lang} />
        <div>
          <p className="eyebrow">{lang === "en" ? "Professional thesis" : "Teza zawodowa"}</p>
          <h2>{lang === "en" ? "Ambiguity becomes manageable when the need, process and evidence are made explicit." : "Niejasność staje się możliwa do opanowania, gdy potrzeba, proces i dowody są jasno określone."}</h2>
          <p>{lang === "en" ? "Based in Warsaw and studying International Business at SGH, I approach Business Analysis as a translation discipline: from stakeholder language to requirements, from operational activity to an understandable process, and from raw data to evidence that can support a decision." : "Mieszkam w Warszawie i studiuję International Business w SGH. Traktuję analizę biznesową jako pracę translatorską: od języka interesariuszy do wymagań, od działań operacyjnych do zrozumiałego procesu oraz od surowych danych do dowodów wspierających decyzję."}</p>
        </div>
      </section>

      <section className="about-method section-shell">
        <SectionHeading eyebrow={lang === "en" ? "Approach" : "Podejście"} title={lang === "en" ? "How I approach an ambiguous business problem." : "Jak podchodzę do niejasnego problemu biznesowego."} />
        <div className="principles-grid" data-reveal>{principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="technical-thesis">
        <div className="section-shell" data-reveal>
          <p className="eyebrow">{lang === "en" ? "Business analysis + technical fluency" : "Analiza biznesowa + biegłość techniczna"}</p>
          <blockquote>{lang === "en" ? "Technical fluency helps me ask better questions, validate assumptions and communicate clearly with engineering and data teams. It supports my work as a Business Analyst; it does not replace the business problem." : "Biegłość techniczna pomaga mi zadawać lepsze pytania, weryfikować założenia i jasno komunikować się z zespołami inżynieryjnymi oraz danych. Wspiera moją pracę Analityka Biznesowego; nie zastępuje problemu biznesowego."}</blockquote>
          <div className="technical-proof">{skills.map((group) => <article key={group.title.en}><h3>{group.title[lang]}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
        </div>
      </section>

      <IntroductionMedia lang={lang} />

      <section className="education section-shell">
        <SectionHeading eyebrow={lang === "en" ? "Education" : "Wykształcenie"} title={lang === "en" ? "International business perspective. Systems and analytical foundations." : "Perspektywa biznesu międzynarodowego. Podstawy systemowe i analityczne."} />
        <div className="education-grid" data-reveal>
          <article className="current"><p className="eyebrow">{lang === "en" ? "CURRENT · WARSAW" : "OBECNIE · WARSZAWA"}</p><h3>SGH Warsaw School of Economics</h3><strong>{lang === "en" ? "Master’s student · International Business" : "Studia magisterskie · International Business"}</strong><span>{lang === "en" ? "International business & management" : "Biznes międzynarodowy i zarządzanie"}</span><p>{lang === "en" ? "Strengthening commercial, organisational and cross-border business judgement alongside practical requirements, process and data analysis." : "Rozwijam ocenę komercyjną, organizacyjną i międzynarodową, łącząc ją z praktyczną analizą wymagań, procesów i danych."}</p></article>
          <article><p className="eyebrow">2021 — 2025</p><h3>Bartin University</h3><strong>{lang === "en" ? "B.Sc. Management Information Systems" : "Licencjat — Systemy Informacji Zarządczej"}</strong><span>GPA 2.99 / 4.00</span><p>{lang === "en" ? "Relevant coursework: Data Analysis, Business Analytics, Statistics, Project Management and Decision Support Systems." : "Wybrane przedmioty: analiza danych, analityka biznesowa, statystyka, zarządzanie projektami i systemy wspomagania decyzji."}</p></article>
        </div>
      </section>

      <section className="current-direction section-shell" data-reveal>
        <p className="eyebrow">{lang === "en" ? "Current professional direction" : "Obecny kierunek zawodowy"}</p>
        <h2>{lang === "en" ? "Business Analyst roles where requirements, process understanding and evidence need to stay connected." : "Role Analityka Biznesowego, w których wymagania, rozumienie procesu i dowody muszą pozostać ze sobą połączone."}</h2>
        <Link className="button button-primary" href={localizedPath(lang, "/contact")}>{lang === "en" ? "Discuss an analyst opportunity" : "Porozmawiaj o roli analityka"}<span aria-hidden="true">→</span></Link>
      </section>
    </>
  );
}

function ExperiencePage({ lang }: { lang: Lang }) {
  return (
    <section className="experience-timeline section-shell">
      <div className="experience-chain" data-reveal><span>{lang === "en" ? "Operational data" : "Dane operacyjne"}</span><i>→</i><span>{lang === "en" ? "Analysis" : "Analiza"}</span><i>→</i><span>{lang === "en" ? "Visualisation" : "Wizualizacja"}</span><i>→</i><span>{lang === "en" ? "Management reporting" : "Raportowanie zarządcze"}</span></div>
      {experience.map((item, index) => (
        <article className={index === 0 ? "featured" : ""} key={item.company} data-reveal>
          <div className="timeline-date"><span>0{experience.length - index}</span><p>{item.dates[lang]}</p><p>{item.location[lang]}</p></div>
          <div className="timeline-copy">
            <p className="eyebrow">{item.context[lang]}</p><h2>{item.company}</h2><strong>{item.role[lang]}</strong>
            <div className="experience-context-grid">
              <section><h3>{lang === "en" ? "Responsibilities" : "Odpowiedzialność"}</h3><ul>{item.points[lang].map((point) => <li key={point}>{point}</li>)}</ul></section>
              <section><h3>{lang === "en" ? "Analytical work" : "Praca analityczna"}</h3><p>{item.analyticalWork[lang]}</p></section>
              <section><h3>{lang === "en" ? "Outputs" : "Rezultaty"}</h3><p>{item.outputs[lang]}</p></section>
              <section><h3>{lang === "en" ? "Business relevance" : "Znaczenie biznesowe"}</h3><p>{item.businessRelevance[lang]}</p></section>
              <section><h3>{lang === "en" ? "Tools used" : "Narzędzia"}</h3><div className="tag-list">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></section>
              <section><h3>{lang === "en" ? "What I learned" : "Czego się nauczyłem"}</h3><p>{item.learning[lang]}</p></section>
            </div>
          </div>
        </article>
      ))}
      <section className="leadership-detail" data-reveal><p className="eyebrow">{lang === "en" ? "Supporting leadership evidence" : "Uzupełniający dowód przywództwa"}</p><h2>Bartin University Blockchain Club</h2><p>{lang === "en" ? "Management Team · 2021–2024. Helped coordinate partnerships, speakers, events and project delivery for a community of approximately 600 people across 30+ organised events. This is supporting evidence of communication and responsibility—not Business Analyst employment." : "Zespół zarządzający · 2021–2024. Współkoordynowałem partnerstwa, prelegentów, wydarzenia i realizację projektów dla społeczności liczącej około 600 osób podczas ponad 30 wydarzeń. To uzupełniający dowód komunikacji i odpowiedzialności — nie doświadczenie zawodowe Analityka Biznesowego."}</p></section>
    </section>
  );
}
