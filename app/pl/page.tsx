import type { Metadata } from "next";
import { Home } from "@/components/page";

export const metadata: Metadata = {
  title: { absolute: "Onur Usalan — Analityk Biznesowy | Analiza Procesów i Danych" },
  description: "Analityk Biznesowy z Warszawy łączący wymagania biznesowe, analizę procesów, danych, raportowanie i UAT; student International Business w SGH.",
  alternates: { canonical: "/pl", languages: { en: "/", pl: "/pl", "x-default": "/" } },
  openGraph: { locale: "pl_PL", title: "Onur Usalan — Analityk Biznesowy | Analiza Procesów i Danych", description: "Wymagania biznesowe · Analiza procesów · Dane · Raportowanie · UAT · Warszawa" },
};

export default function PolishHomeRoute() {
  return <Home lang="pl" />;
}
