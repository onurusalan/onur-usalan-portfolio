export type Lang = "en" | "pl";
export type Localized = Record<Lang, string>;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const contact = {
  email: "onurusalan.eth@gmail.com",
  linkedin: "https://www.linkedin.com/in/onurusalan/",
  github: "https://github.com/onurusalan",
} as const;

export const routeNames = {
  about: { en: "Profile", pl: "Profil" },
  experience: { en: "Experience", pl: "Doświadczenie" },
  projects: { en: "Case studies", pl: "Projekty" },
  contact: { en: "Contact", pl: "Kontakt" },
} satisfies Record<string, Localized>;

export const profile = {
  name: "Onur Usalan",
  role: {
    en: "Business Analyst | Requirements, Process & Data Analysis",
    pl: "Analityk Biznesowy | Wymagania, Procesy i Analiza Danych",
  },
  eyebrow: {
    en: "BUSINESS ANALYSIS · REQUIREMENTS · PROCESS · DATA",
    pl: "ANALIZA BIZNESOWA · WYMAGANIA · PROCESY · DANE",
  },
  headline: {
    en: "I turn business ambiguity into clear requirements and decision-ready evidence.",
    pl: "Zamieniam niejasne potrzeby biznesowe w konkretne wymagania i wnioski gotowe do podjęcia decyzji.",
  },
  headlineLines: {
    en: ["I turn business ambiguity into", "clear requirements and", "decision-ready evidence."],
    pl: ["Zamieniam niejasne potrzeby biznesowe w", "konkretne wymagania i", "wnioski gotowe do podjęcia decyzji."],
  },
  introduction: {
    en: "I combine requirements analysis, process thinking and data investigation to help business and technical teams understand what needs to change, why it matters and how success should be measured.",
    pl: "Łączę analizę wymagań, procesów i danych, aby pomagać zespołom biznesowym i technicznym zrozumieć, co należy zmienić, dlaczego ma to znaczenie i jak mierzyć rezultat.",
  },
  location: { en: "Warsaw, Poland", pl: "Warszawa, Polska" },
  education: {
    en: "Master’s student in International Business at SGH Warsaw School of Economics",
    pl: "Student studiów magisterskich International Business w SGH Warsaw School of Economics",
  },
} as const;

export type Project = {
  slug: "eu-procurement" | "ecommerce-decision-system";
  index: string;
  title: Localized;
  category: Localized;
  summary: Localized;
  question: Localized;
  proof: {
    why: Localized;
    role: Localized;
    scope: Localized;
    users: Localized;
    keyResult: Localized;
    guardrail: Localized;
    evidence: Record<Lang, string[]>;
  };
  artifacts: {
    id: string;
    kind: "dashboard" | "traceability" | "uat";
    type: Localized;
    title: Localized;
    caption: Localized;
    why: Localized;
    columns?: Localized[];
    rows?: Record<Lang, string[]>[];
  }[];
  metrics: { value: string; label: Localized }[];
  tools: string[];
  repo: string;
  chain: Localized[];
  sections: { title: Localized; body: Localized }[];
};

export const projects: Project[] = [
  {
    slug: "eu-procurement",
    index: "01",
    title: {
      en: "EU Digital Procurement Competition Monitor",
      pl: "Monitor konkurencji w cyfrowych zamówieniach UE",
    },
    category: {
      en: "Business Analysis · Public Procurement · Data Analytics",
      pl: "Analiza Biznesowa · Zamówienia Publiczne · Analiza Danych",
    },
    summary: {
      en: "An audit-ready decision-support system designed to identify competition patterns and supplier concentration across EU digital procurement notices using official TED data.",
      pl: "System wspierający decyzje, przygotowany z myślą o audycie, służący do identyfikacji wzorców konkurencji i koncentracji dostawców w cyfrowych zamówieniach UE na podstawie oficjalnych danych TED.",
    },
    question: {
      en: "How can public-procurement teams screen digital procurement results for competition patterns while retaining a traceable, reproducible evidence trail?",
      pl: "Jak zespoły zamówień publicznych mogą analizować wyniki cyfrowych postępowań pod kątem konkurencji, zachowując możliwy do prześledzenia i odtworzenia łańcuch dowodowy?",
    },
    proof: {
      why: { en: "Procurement leaders need screening signals that retain their denominator, source boundary and interpretation limits.", pl: "Liderzy zamówień potrzebują wskaźników przesiewowych, które zachowują mianownik, granice źródła i ograniczenia interpretacji." },
      role: { en: "End-to-end Business Analyst portfolio case: requirements, evidence design, data controls, KPI logic, UAT and management outputs.", pl: "Kompleksowy projekt portfolio Analityka Biznesowego: wymagania, projekt dowodów, kontrole danych, logika KPI, UAT i materiały zarządcze." },
      scope: { en: "EU-27 contract-result notices for digital procurement, scoped to CPV divisions 48 and 72 and published from 2025-01-01 to 2026-07-30 in the verified build.", pl: "Ogłoszenia o wynikach zamówień cyfrowych UE-27 w działach CPV 48 i 72, opublikowane od 2025-01-01 do 2026-07-30 w zweryfikowanej wersji." },
      users: { en: "Procurement directors, category managers, supplier-management leads and data-governance reviewers.", pl: "Dyrektorzy zamówień, category managerowie, osoby odpowiedzialne za dostawców oraz zespoły data governance." },
      keyResult: { en: "A reproducible screen across 38,971 notices, including a 47.7% observed single-bid rate within 27,100 competition-evidence notices.", pl: "Odtwarzalny screening 38 971 ogłoszeń, w tym obserwowany wskaźnik jednej oferty 47,7% wśród 27 100 ogłoszeń z danymi o konkurencji." },
      guardrail: { en: "The screen prioritises follow-up questions; it is not evidence of fraud, non-compliance or supplier risk.", pl: "Screening pomaga ustalać priorytety dalszych pytań; nie stanowi dowodu oszustwa, braku zgodności ani ryzyka dostawcy." },
      evidence: {
        en: ["Business requirements and acceptance criteria", "KPI and data dictionaries", "SQLite analytical model", "Executive dashboard and management outputs", "UAT plan and requirements traceability matrix"],
        pl: ["Wymagania biznesowe i kryteria akceptacji", "Słowniki KPI i danych", "Model analityczny SQLite", "Dashboard zarządczy i materiały decyzyjne", "Plan UAT i macierz śledzenia wymagań"],
      },
    },
    artifacts: [
      {
        id: "eu-dashboard",
        kind: "dashboard",
        type: { en: "Executive dashboard", pl: "Dashboard zarządczy" },
        title: { en: "Competition and supplier-concentration decision view", pl: "Widok decyzyjny konkurencji i koncentracji dostawców" },
        caption: { en: "Verified project output generated from official TED result notices.", pl: "Zweryfikowany wynik projektu wygenerowany z oficjalnych ogłoszeń TED." },
        why: { en: "It keeps the evidence cohort, coverage and screening limitations visible beside the headline measures.", pl: "Pokazuje kohortę dowodową, pokrycie i ograniczenia screeningu obok głównych miar." },
      },
      {
        id: "eu-traceability",
        kind: "traceability",
        type: { en: "Traceability matrix excerpt", pl: "Fragment macierzy śledzenia" },
        title: { en: "Requirement → implementation → verification", pl: "Wymaganie → implementacja → weryfikacja" },
        caption: { en: "Excerpt from the repository’s Requirements Traceability Matrix.", pl: "Fragment macierzy śledzenia wymagań z repozytorium." },
        why: { en: "It demonstrates that published measures can be traced back to a requirement and a defined verification route.", pl: "Pokazuje, że opublikowane miary można prześledzić do wymagania i zdefiniowanej ścieżki weryfikacji." },
        columns: [{ en: "Requirement", pl: "Wymaganie" }, { en: "Output", pl: "Wynik" }, { en: "Verification", pl: "Weryfikacja" }],
        rows: [
          { en: ["FR-04 Competition KPI", "Metrics and procedure tables", "Denominator test + UAT-06"], pl: ["FR-04 KPI konkurencji", "Metryki i tabele procedur", "Test mianownika + UAT-06"] },
          { en: ["FR-07 Financial controls", "Raw / screened values", "Anomaly test + UAT-08/09"], pl: ["FR-07 Kontrole finansowe", "Wartości surowe / zweryfikowane", "Test anomalii + UAT-08/09"] },
          { en: ["FR-10 Management outputs", "Dashboard, workbook and deck", "Visual QA + consistency audit"], pl: ["FR-10 Materiały zarządcze", "Dashboard, skoroszyt i prezentacja", "Kontrola wizualna + audyt spójności"] },
        ],
      },
      {
        id: "eu-uat",
        kind: "uat",
        type: { en: "UAT evidence excerpt", pl: "Fragment dowodów UAT" },
        title: { en: "Acceptance checks protect interpretation", pl: "Testy akceptacyjne chronią interpretację" },
        caption: { en: "Representative scenarios from the verified UAT plan.", pl: "Reprezentatywne scenariusze ze zweryfikowanego planu UAT." },
        why: { en: "The tests cover eligibility, denominator reconciliation, anomaly handling and cross-artifact consistency.", pl: "Testy obejmują kwalifikowalność, uzgodnienie mianownika, obsługę anomalii i spójność między artefaktami." },
        columns: [{ en: "Test", pl: "Test" }, { en: "Expected evidence", pl: "Oczekiwany dowód" }],
        rows: [
          { en: ["UAT-06 Reconcile single-bid rate", "12,926 / 27,100 = 47.7%"], pl: ["UAT-06 Uzgodnienie wskaźnika jednej oferty", "12 926 / 27 100 = 47,7%"] },
          { en: ["UAT-09 Reconcile screened EUR value", "SQLite sum matches €72.7B headline"], pl: ["UAT-09 Uzgodnienie zweryfikowanej wartości EUR", "Suma SQLite odpowiada wartości €72,7 mld"] },
        ],
      },
    ],
    metrics: [
      { value: "38,971", label: { en: "EU-27 digital result notices analysed", pl: "ogłoszeń o wynikach cyfrowych zamówień UE-27" } },
      { value: "27,100", label: { en: "competition-evidence notices", pl: "ogłoszeń z danymi o konkurencji" } },
      { value: "47.7%", label: { en: "observed single-bid screening rate", pl: "obserwowany wskaźnik jednej oferty" } },
      { value: "€72.7B", label: { en: "quality-screened known EUR award value", pl: "zweryfikowanej wartości zamówień w EUR" } },
    ],
    tools: ["Python", "SQL", "SQLite", "TED Search API", "Data Quality Controls", "Business Analysis Documentation"],
    repo: "https://github.com/onurusalan/eu-digital-procurement-intelligence",
    chain: [
      { en: "Business question", pl: "Pytanie biznesowe" },
      { en: "Evidence", pl: "Dowody" },
      { en: "Model & KPIs", pl: "Model i KPI" },
      { en: "Decision support", pl: "Wsparcie decyzji" },
    ],
    sections: [
      { title: { en: "Business Question", pl: "Pytanie biznesowe" }, body: { en: "How can official procurement data help teams identify where competition deserves closer examination without confusing screening indicators with compliance findings?", pl: "Jak oficjalne dane o zamówieniach mogą pomóc wskazać obszary wymagające dokładniejszej analizy konkurencji, bez mylenia wskaźników przesiewowych z ustaleniami dotyczącymi zgodności?" } },
      { title: { en: "Why It Matters", pl: "Dlaczego to ważne" }, body: { en: "Competition patterns are useful only when the scope, evidence cohort and analytical assumptions remain visible. The work therefore prioritises traceability as much as the headline findings.", pl: "Wzorce konkurencji są użyteczne tylko wtedy, gdy zakres, kohorta dowodowa i założenia pozostają widoczne. Dlatego możliwość prześledzenia analizy jest równie ważna jak jej główne wyniki." } },
      { title: { en: "Data Source", pl: "Źródło danych" }, body: { en: "Official TED Search API result notices scoped to EU-27 digital procurement. A reproducible source manifest preserves the extraction context and public-data provenance.", pl: "Oficjalne ogłoszenia o wynikach z TED Search API, ograniczone do cyfrowych zamówień w UE-27. Odtwarzalny manifest zachowuje kontekst ekstrakcji i pochodzenie danych publicznych." } },
      { title: { en: "Analytical Approach", pl: "Podejście analityczne" }, body: { en: "Management questions were translated into analytical cohorts, explicit KPI rules and acceptance criteria. Python and SQL pipelines apply controls before data enters the reporting layer.", pl: "Pytania zarządcze przełożono na kohorty analityczne, jawne reguły KPI i kryteria akceptacji. Potoki Python i SQL stosują kontrole przed przekazaniem danych do warstwy raportowej." } },
      { title: { en: "Data Model", pl: "Model danych" }, body: { en: "A SQLite analytical model separates notice, buyer, supplier and award perspectives so measures can be reproduced and interrogated without relying on one flattened export.", pl: "Model analityczny SQLite rozdziela perspektywy ogłoszeń, nabywców, dostawców i zamówień, dzięki czemu miary można odtworzyć bez polegania na jednym płaskim eksporcie." } },
      { title: { en: "KPI Definitions", pl: "Definicje KPI" }, body: { en: "Every reported measure has a defined numerator, denominator, cohort and data-quality condition. Known award value is kept separate from records where currency or value cannot be compared reliably.", pl: "Każda miara ma określony licznik, mianownik, kohortę i warunek jakości danych. Znana wartość zamówień jest oddzielona od rekordów, których waluty lub wartości nie można wiarygodnie porównać." } },
      { title: { en: "Key Findings", pl: "Kluczowe ustalenia" }, body: { en: "The portfolio analysis observed a 47.7% single-bid screening rate within 27,100 competition-evidence notices and analysed €72.7B in quality-screened known EUR award value.", pl: "Analiza portfolio wykazała 47,7% obserwowany wskaźnik jednej oferty wśród 27 100 ogłoszeń z danymi o konkurencji oraz objęła €72,7 mld zweryfikowanej, znanej wartości zamówień w EUR." } },
      { title: { en: "Decision Support", pl: "Wsparcie decyzji" }, body: { en: "The output helps prioritise follow-up questions about market participation, supplier concentration and data completeness. It does not determine wrongdoing or legal compliance.", pl: "Wynik pomaga ustalać priorytety dalszych pytań o udział rynku, koncentrację dostawców i kompletność danych. Nie rozstrzyga o naruszeniach ani zgodności prawnej." } },
      { title: { en: "Data Quality and Guardrails", pl: "Jakość danych i zabezpieczenia" }, body: { en: "Coverage checks, currency handling, deduplication rules and explicit exclusions protect the interpretation. A single-bid signal is a screening indicator—not evidence of fraud, corruption or misconduct.", pl: "Kontrole pokrycia, obsługa walut, reguły deduplikacji i jawne wyłączenia chronią interpretację. Sygnał jednej oferty jest wskaźnikiem przesiewowym — nie dowodem nadużycia, korupcji ani niewłaściwego postępowania." } },
      { title: { en: "Requirements and Acceptance Criteria", pl: "Wymagania i kryteria akceptacji" }, body: { en: "Business requirements define scope, reproducibility, calculation behaviour and the evidence required before a KPI can be displayed.", pl: "Wymagania biznesowe definiują zakres, odtwarzalność, sposób obliczeń oraz dowody wymagane przed prezentacją KPI." } },
      { title: { en: "UAT and Traceability", pl: "UAT i śledzenie wymagań" }, body: { en: "UAT scenarios connect requirements to transformation rules, SQL outputs and published measures, creating a clear route from question to reported result.", pl: "Scenariusze UAT łączą wymagania z regułami transformacji, wynikami SQL i publikowanymi miarami, tworząc jasną drogę od pytania do raportowanego wyniku." } },
      { title: { en: "Deliverables", pl: "Rezultaty" }, body: { en: "Requirements and assumptions, a source manifest, data-quality controls, SQLite model, KPI definitions, UAT and traceability, executive findings and decision-focused actions.", pl: "Wymagania i założenia, manifest źródeł, kontrole jakości, model SQLite, definicje KPI, UAT i śledzenie wymagań, wnioski zarządcze i działania wspierające decyzje." } },
      { title: { en: "Limitations", pl: "Ograniczenia" }, body: { en: "The analysis depends on the completeness and consistency of published TED fields. It is a portfolio study of public records, not a regulatory investigation or claim of commercial impact.", pl: "Analiza zależy od kompletności i spójności opublikowanych pól TED. To projekt portfolio oparty na danych publicznych, a nie dochodzenie regulacyjne ani deklaracja wpływu komercyjnego." } },
      { title: { en: "What I Learned", pl: "Czego się nauczyłem" }, body: { en: "Strong decision support depends on connecting business definitions, reproducible data work and careful language—not merely producing a technically correct metric.", pl: "Dobre wsparcie decyzji wymaga połączenia definicji biznesowych, odtwarzalnej analizy i ostrożnego języka — nie tylko technicznie poprawnej miary." } },
    ],
  },
  {
    slug: "ecommerce-decision-system",
    index: "02",
    title: {
      en: "E-Commerce Sales, Cancellations & Customer Value Decision System",
      pl: "System decyzyjny: sprzedaż e-commerce, anulowania i wartość klienta",
    },
    category: {
      en: "Business Analysis · E-Commerce · Customer Analytics",
      pl: "Analiza Biznesowa · E-commerce · Analityka Klienta",
    },
    summary: {
      en: "An end-to-end Business Analyst case study transforming more than one million transaction lines into auditable KPIs, SQL models, dashboards and management-ready decision support.",
      pl: "Kompleksowe studium przypadku Analityka Biznesowego, przekształcające ponad milion pozycji transakcyjnych w weryfikowalne KPI, modele SQL, dashboardy i materiały wspierające decyzje zarządcze.",
    },
    question: {
      en: "Where should an e-commerce leadership team focus first to protect sales value, reduce cancellation exposure and retain valuable customers?",
      pl: "Na czym zespół zarządzający e-commerce powinien skupić się w pierwszej kolejności, aby chronić wartość sprzedaży, ograniczyć anulowania i utrzymać wartościowych klientów?",
    },
    proof: {
      why: { en: "Sales, cancellation exposure and customer value need one governed view so teams do not use conflicting definitions or mistake sales for profit.", pl: "Sprzedaż, ekspozycja na anulowania i wartość klienta wymagają jednego kontrolowanego widoku, aby zespoły nie używały sprzecznych definicji ani nie myliły sprzedaży z zyskiem." },
      role: { en: "End-to-end Business Analyst portfolio case: BRD, user stories, process model, governed KPIs, SQL model, dashboard, UAT and traceability.", pl: "Kompleksowy projekt portfolio Analityka Biznesowego: BRD, user stories, model procesu, kontrolowane KPI, model SQL, dashboard, UAT i śledzenie wymagań." },
      scope: { en: "Both sheets of the historical UCI Online Retail II workbook, covering 2009-12-01 to 2011-12-09, analysed at transaction-line grain.", pl: "Oba arkusze historycznego skoroszytu UCI Online Retail II, obejmujące okres od 2009-12-01 do 2011-12-09, analizowane na poziomie pozycji transakcji." },
      users: { en: "Executive sponsors, commercial leads, operations teams, CRM leads and data owners represented through documented user stories.", pl: "Sponsorzy zarządczy, zespoły komercyjne i operacyjne, CRM oraz właściciele danych reprezentowani przez udokumentowane user stories." },
      keyResult: { en: "A reconciled decision system across 1,067,371 transaction lines, with £20.97M gross sales and £1.53M cancellation amount in the historical dataset.", pl: "Uzgodniony system decyzyjny obejmujący 1 067 371 pozycji transakcyjnych, £20,97 mln sprzedaży brutto i £1,53 mln anulowań w historycznym zbiorze." },
      guardrail: { en: "The source has no cost or cancellation-reason fields; the project does not claim profitability, root cause or realised commercial impact.", pl: "Źródło nie zawiera kosztów ani powodów anulowania; projekt nie deklaruje rentowności, przyczyn źródłowych ani zrealizowanego wpływu komercyjnego." },
      evidence: {
        en: ["Project charter and BRD", "User stories and acceptance criteria", "KPI and data dictionaries", "SQLite star schema and SQL controls", "Executive dashboard, Excel pack and presentation", "UAT plan and verified traceability matrix"],
        pl: ["Karta projektu i BRD", "User stories i kryteria akceptacji", "Słowniki KPI i danych", "Schemat gwiazdy SQLite i kontrole SQL", "Dashboard, pakiet Excel i prezentacja", "Plan UAT i zweryfikowana macierz śledzenia"],
      },
    },
    artifacts: [
      {
        id: "ecom-dashboard",
        kind: "dashboard",
        type: { en: "Executive dashboard", pl: "Dashboard zarządczy" },
        title: { en: "Sales, cancellations and customer value", pl: "Sprzedaż, anulowania i wartość klienta" },
        caption: { en: "Verified dashboard output generated from UCI Online Retail II.", pl: "Zweryfikowany dashboard wygenerowany na podstawie UCI Online Retail II." },
        why: { en: "It brings governed sales and cancellation measures into one decision view while explicitly separating net sales from profit.", pl: "Łączy kontrolowane miary sprzedaży i anulowań w jednym widoku, wyraźnie oddzielając sprzedaż netto od zysku." },
      },
      {
        id: "ecom-traceability",
        kind: "traceability",
        type: { en: "Traceability matrix excerpt", pl: "Fragment macierzy śledzenia" },
        title: { en: "Business requirements connected to evidence", pl: "Wymagania biznesowe połączone z dowodami" },
        caption: { en: "Verified requirement rows from the completed analytical build.", pl: "Zweryfikowane wymagania z ukończonej wersji analitycznej." },
        why: { en: "Each requirement points to implementation, output evidence and a test rather than ending as an isolated document.", pl: "Każde wymaganie wskazuje implementację, dowód wynikowy i test, zamiast pozostawać odizolowanym dokumentem." },
        columns: [{ en: "Requirement", pl: "Wymaganie" }, { en: "Evidence", pl: "Dowód" }, { en: "Status", pl: "Status" }],
        rows: [
          { en: ["BR-01 Governed KPI definitions", "Metrics, workbook KPI sheet", "Verified"], pl: ["BR-01 Kontrolowane definicje KPI", "Metryki, arkusz KPI", "Zweryfikowane"] },
          { en: ["BR-04 Cancellation visibility", "Dashboard and cancellation report", "Verified"], pl: ["BR-04 Widoczność anulowań", "Dashboard i raport anulowań", "Zweryfikowane"] },
          { en: ["BR-08 Executive usability", "PNG, HTML, XLSX and PPTX", "Verified"], pl: ["BR-08 Użyteczność zarządcza", "PNG, HTML, XLSX i PPTX", "Zweryfikowane"] },
        ],
      },
      {
        id: "ecom-uat",
        kind: "uat",
        type: { en: "UAT evidence excerpt", pl: "Fragment dowodów UAT" },
        title: { en: "Reconciled measures and controlled change", pl: "Uzgodnione miary i kontrolowana zmiana" },
        caption: { en: "Representative passed checks from the repository’s UAT plan.", pl: "Reprezentatywne zaliczone testy z planu UAT w repozytorium." },
        why: { en: "The tests verify KPI arithmetic, lineage, database integrity and consistency across dashboard and Office outputs.", pl: "Testy weryfikują arytmetykę KPI, lineage, integralność bazy i spójność dashboardu z materiałami Office." },
        columns: [{ en: "Test", pl: "Test" }, { en: "Actual result", pl: "Wynik" }],
        rows: [
          { en: ["UAT-01 Recalculate net sales", "Exact match"], pl: ["UAT-01 Ponowne obliczenie sprzedaży netto", "Dokładna zgodność"] },
          { en: ["UAT-07 SQL orphan checks", "0 / 0 / 0 / 0"], pl: ["UAT-07 Kontrole osieroconych rekordów SQL", "0 / 0 / 0 / 0"] },
          { en: ["UAT-13 Consistency audit", "12 / 12 checks passed"], pl: ["UAT-13 Audyt spójności", "12 / 12 testów zaliczonych"] },
        ],
      },
    ],
    metrics: [
      { value: "1,067,371", label: { en: "transaction lines", pl: "pozycji transakcyjnych" } },
      { value: "£20.97M", label: { en: "gross sales in the historical dataset", pl: "sprzedaży brutto w historycznym zbiorze" } },
      { value: "£1.53M", label: { en: "cancellation amount in the dataset", pl: "wartości anulowań w zbiorze" } },
      { value: "41,938", label: { en: "completed orders", pl: "zrealizowanych zamówień" } },
      { value: "72.4%", label: { en: "repeat rate among identified active customers", pl: "powracających zidentyfikowanych aktywnych klientów" } },
    ],
    tools: ["Python", "pandas", "SQL", "SQLite", "Excel", "Dashboarding", "Business Analysis"],
    repo: "https://github.com/onurusalan/ecommerce-decision-system",
    chain: [
      { en: "Raw transactions", pl: "Surowe transakcje" },
      { en: "Data quality", pl: "Jakość danych" },
      { en: "Data model", pl: "Model danych" },
      { en: "KPIs", pl: "KPI" },
      { en: "Dashboard", pl: "Dashboard" },
      { en: "Recommendation", pl: "Rekomendacja" },
    ],
    sections: [
      { title: { en: "Business Question", pl: "Pytanie biznesowe" }, body: { en: "Where should leadership focus first to protect sales value, reduce cancellation exposure and retain valuable customers?", pl: "Na czym kierownictwo powinno skupić się najpierw, aby chronić wartość sprzedaży, ograniczyć anulowania i utrzymać wartościowych klientów?" } },
      { title: { en: "Why It Matters", pl: "Dlaczego to ważne" }, body: { en: "Sales, cancellations and customer value often live in separate views. A shared decision model makes the trade-offs visible without mistaking sales value for profit.", pl: "Sprzedaż, anulowania i wartość klienta często występują w oddzielnych widokach. Wspólny model decyzyjny pokazuje zależności bez mylenia wartości sprzedaży z zyskiem." } },
      { title: { en: "Data Source", pl: "Źródło danych" }, body: { en: "The historical UCI Online Retail II dataset. All figures describe analytical findings in that dataset, not revenue or profit generated by Onur.", pl: "Historyczny zbiór UCI Online Retail II. Wszystkie wartości opisują ustalenia analityczne w tym zbiorze, a nie przychód ani zysk wygenerowany przez Onura." } },
      { title: { en: "Analytical Approach", pl: "Podejście analityczne" }, body: { en: "A reproducible Python pipeline standardises transactions, identifies cancellations and prepares governed inputs for SQL analysis and management reporting.", pl: "Odtwarzalny potok Python standaryzuje transakcje, identyfikuje anulowania i przygotowuje kontrolowane dane wejściowe do analizy SQL i raportowania zarządczego." } },
      { title: { en: "Data Model", pl: "Model danych" }, body: { en: "A SQLite star schema separates transaction facts from customer, product and time dimensions, creating consistent routes to order and customer-level measures.", pl: "Schemat gwiazdy SQLite rozdziela fakty transakcyjne od wymiarów klienta, produktu i czasu, zapewniając spójne obliczenia na poziomie zamówień i klientów." } },
      { title: { en: "KPI Definitions", pl: "Definicje KPI" }, body: { en: "Gross sales, cancellation amount, completed orders and repeat-customer rate are documented with calculation logic, grain, exclusions and data-quality expectations.", pl: "Sprzedaż brutto, wartość anulowań, zrealizowane zamówienia i wskaźnik powracających klientów opisano wraz z logiką obliczeń, poziomem szczegółowości, wyłączeniami i wymaganiami jakości." } },
      { title: { en: "Key Findings", pl: "Kluczowe ustalenia" }, body: { en: "The historical data contains 1,067,371 transaction lines, £20.97M gross sales, £1.53M cancellation amount and 41,938 completed orders. The repeat rate is 72.4% among identified active customers.", pl: "Dane historyczne obejmują 1 067 371 pozycji transakcyjnych, £20,97 mln sprzedaży brutto, £1,53 mln anulowań i 41 938 zrealizowanych zamówień. Wskaźnik powracających klientów wynosi 72,4% wśród zidentyfikowanych aktywnych klientów." } },
      { title: { en: "Decision Support", pl: "Wsparcie decyzji" }, body: { en: "The system creates a shared basis for deciding which cancellation patterns, customer groups and sales-value exposures deserve investigation first.", pl: "System tworzy wspólną podstawę do ustalenia, które wzorce anulowań, grupy klientów i ekspozycje wartości sprzedaży wymagają analizy w pierwszej kolejności." } },
      { title: { en: "Data Quality and Guardrails", pl: "Jakość danych i zabezpieczenia" }, body: { en: "Cancellation identification, customer availability, invalid quantities and price handling are explicit. Net sales are never presented as profit, and historical figures are not claimed as commercial impact.", pl: "Identyfikacja anulowań, dostępność danych klienta, nieprawidłowe ilości i obsługa cen są jawne. Sprzedaż netto nie jest przedstawiana jako zysk, a wartości historyczne nie są deklarowane jako wpływ komercyjny." } },
      { title: { en: "Requirements and Acceptance Criteria", pl: "Wymagania i kryteria akceptacji" }, body: { en: "The BRD, user stories and acceptance rules specify what each audience must be able to understand and verify in the finished reporting pack.", pl: "BRD, user stories i reguły akceptacji określają, co każda grupa odbiorców musi móc zrozumieć i zweryfikować w gotowym pakiecie raportowym." } },
      { title: { en: "UAT and Traceability", pl: "UAT i śledzenie wymagań" }, body: { en: "Tests connect business requirements to pipeline rules, SQL outputs, dashboard elements and the Excel management pack.", pl: "Testy łączą wymagania biznesowe z regułami potoku, wynikami SQL, elementami dashboardu i pakietem zarządczym Excel." } },
      { title: { en: "Deliverables", pl: "Rezultaty" }, body: { en: "Python pipeline, SQL analysis, SQLite star schema, executive dashboard, Excel management pack, KPI dictionary, BRD, process model, user stories, UAT, traceability matrix, unit tests and data-quality controls.", pl: "Potok Python, analiza SQL, schemat gwiazdy SQLite, dashboard zarządczy, pakiet Excel, słownik KPI, BRD, model procesu, user stories, UAT, macierz śledzenia wymagań, testy jednostkowe i kontrole jakości." } },
      { title: { en: "Limitations", pl: "Ograniczenia" }, body: { en: "Customer-level measures depend on identified customer records, and the dataset represents a historical retail context. Recommendations require validation against current commercial conditions.", pl: "Miary na poziomie klientów zależą od zidentyfikowanych rekordów, a zbiór reprezentuje historyczny kontekst handlu. Rekomendacje wymagają weryfikacji względem aktualnych warunków biznesowych." } },
      { title: { en: "What I Learned", pl: "Czego się nauczyłem" }, body: { en: "A decision system becomes credible when KPI definitions, data controls, business requirements and reporting outputs agree with one another end to end.", pl: "System decyzyjny staje się wiarygodny, gdy definicje KPI, kontrole danych, wymagania biznesowe i raportowanie są ze sobą spójne od początku do końca." } },
    ],
  },
];

export const experience = [
  {
    company: "Etisan Proje A.Ş.",
    role: { en: "Software Unit Intern", pl: "Stażysta w dziale oprogramowania" },
    dates: { en: "July 2024 — August 2024", pl: "lipiec 2024 — sierpień 2024" },
    location: { en: "Ankara, Turkey", pl: "Ankara, Turcja" },
    context: { en: "Operational data analysis and management reporting", pl: "Analiza danych operacyjnych i raportowanie zarządcze" },
    points: {
      en: ["Cleaned, preprocessed and structured operational datasets using SQL and Python/pandas.", "Prepared data for business analysis and identified patterns and trends.", "Built Tableau dashboards with country-to-institution drill-down reporting.", "Delivered stakeholder-focused analytical reports and dashboards reviewed by management."],
      pl: ["Czyściłem, przetwarzałem i strukturyzowałem dane operacyjne w SQL oraz Python/pandas.", "Przygotowywałem dane do analiz biznesowych i identyfikowałem wzorce oraz trendy.", "Tworzyłem dashboardy Tableau z raportowaniem drill-down od kraju do instytucji.", "Dostarczałem raporty i dashboardy analityczne oceniane przez kadrę zarządzającą."],
    },
    analyticalWork: { en: "Prepared operational datasets, investigated patterns and structured country-to-institution reporting views.", pl: "Przygotowywałem operacyjne zbiory danych, analizowałem wzorce i tworzyłem widoki raportowe od kraju do instytucji." },
    outputs: { en: "Clean analytical datasets, Tableau dashboards and stakeholder-focused management reports.", pl: "Oczyszczone zbiory analityczne, dashboardy Tableau i raporty zarządcze ukierunkowane na interesariuszy." },
    businessRelevance: { en: "Made operational evidence easier for management to review through structured analysis and drill-down reporting.", pl: "Ułatwiłem kadrze zarządzającej przegląd danych operacyjnych poprzez uporządkowaną analizę i raportowanie drill-down." },
    tools: ["SQL", "Python", "pandas", "Tableau"],
    learning: { en: "Clear management reporting depends on reliable data preparation and a reporting structure designed around stakeholder questions.", pl: "Przejrzyste raportowanie zarządcze zależy od wiarygodnego przygotowania danych i struktury raportu zaprojektowanej wokół pytań interesariuszy." },
  },
  {
    company: "Elixir Games & SphereStudios",
    role: { en: "Community Manager", pl: "Community Manager" },
    dates: { en: "April 2023 — November 2023", pl: "kwiecień 2023 — listopad 2023" },
    location: { en: "Remote", pl: "Zdalnie" },
    context: { en: "Engagement and behavioural analysis", pl: "Analiza zaangażowania i zachowań" },
    points: {
      en: ["Monitored engagement and user interaction patterns.", "Used behavioural observations to inform content strategy."],
      pl: ["Monitorowałem zaangażowanie i wzorce interakcji użytkowników.", "Wykorzystywałem obserwacje zachowań do kształtowania strategii treści."],
    },
    analyticalWork: { en: "Observed engagement and interaction patterns and translated them into structured content inputs.", pl: "Obserwowałem wzorce zaangażowania i interakcji oraz przekładałem je na uporządkowane materiały dla treści." },
    outputs: { en: "Behavioural observations and content-strategy inputs.", pl: "Obserwacje zachowań i materiały wspierające strategię treści." },
    businessRelevance: { en: "Built practical experience in listening to a user community and communicating recurring needs to a wider team.", pl: "Zdobyłem praktyczne doświadczenie w słuchaniu społeczności użytkowników i przekazywaniu powtarzających się potrzeb szerszemu zespołowi." },
    tools: ["Community Platforms", "Engagement Monitoring", "Content Planning"],
    learning: { en: "Behavioural signals need context before they become a useful recommendation.", pl: "Sygnały behawioralne wymagają kontekstu, zanim staną się użyteczną rekomendacją." },
  },
  {
    company: "Creatiful Mind & Consulting",
    role: { en: "Research Intern", pl: "Stażysta badawczy" },
    dates: { en: "March 2022 — February 2023", pl: "marzec 2022 — luty 2023" },
    location: { en: "Ankara, Turkey", pl: "Ankara, Turcja" },
    context: { en: "Research and structured decision inputs", pl: "Badania i uporządkowane dane do decyzji" },
    points: {
      en: ["Structured research findings for project development.", "Prepared clear information inputs to support decisions."],
      pl: ["Porządkowałem wyniki badań na potrzeby rozwoju projektów.", "Przygotowywałem przejrzyste materiały informacyjne wspierające decyzje."],
    },
    analyticalWork: { en: "Structured research findings and converted source material into clear inputs for project development.", pl: "Porządkowałem wyniki badań i przekształcałem materiały źródłowe w jasne dane wejściowe dla rozwoju projektów." },
    outputs: { en: "Organised research summaries and decision-support inputs.", pl: "Uporządkowane podsumowania badań i materiały wspierające decyzje." },
    businessRelevance: { en: "Helped reduce ambiguity by presenting research in a form that could be reviewed and used by others.", pl: "Pomagałem ograniczać niejasność, przedstawiając badania w formie możliwej do przeglądu i wykorzystania przez innych." },
    tools: ["Research", "Information Structuring", "Documentation"],
    learning: { en: "Useful research is defined by how clearly its evidence, limits and next questions are communicated.", pl: "Użyteczność badań zależy od jasnego przedstawienia dowodów, ograniczeń i kolejnych pytań." },
  },
] as const;

export const skills = [
  { title: { en: "Requirements & Delivery", pl: "Wymagania i realizacja" }, items: ["Requirements Elicitation", "Business Requirements", "User Stories", "Acceptance Criteria", "UAT", "Requirements Traceability", "Stakeholder Communication", "Business Documentation"] },
  { title: { en: "Processes & Decisions", pl: "Procesy i decyzje" }, items: ["Process Analysis", "Current-State Analysis", "Gap Analysis", "KPI Definition", "Decision Support", "Management Reporting", "Data Quality", "Operational Analysis"] },
  { title: { en: "Data & Reporting", pl: "Dane i raportowanie" }, items: ["SQL", "Python", "pandas", "Tableau", "Excel", "Pivot Tables", "VLOOKUP", "Data Cleaning", "Data Structuring", "Data Visualisation"] },
  { title: { en: "Technical Collaboration", pl: "Współpraca techniczna" }, items: ["Relational Databases", "SQLite", "Data Pipelines", "APIs", "Functional Logic", "React", "TypeScript", "Git", "GitHub"] },
] as const;

export function prefix(lang: Lang) {
  return lang === "pl" ? "/pl" : "";
}

export function localizedPath(lang: Lang, path = "") {
  return `${prefix(lang)}${path}` || "/";
}
