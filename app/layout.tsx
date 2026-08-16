import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { siteUrl } from "@/content/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F5F8",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Onur Usalan Portfolio",
  title: {
    default: "Onur Usalan — Business Analyst | Process & Data Analysis",
    template: "%s | Onur Usalan",
  },
  description: "Warsaw-based Business Analyst turning ambiguous needs into structured requirements, understandable processes and decision-ready evidence through SQL, reporting and UAT.",
  authors: [{ name: "Onur Usalan", url: siteUrl }],
  creator: "Onur Usalan",
  publisher: "Onur Usalan",
  category: "Business Analysis Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  keywords: ["Onur Usalan", "Business Analyst Warsaw", "Junior Business Systems Analyst", "Requirements Elicitation", "Business Requirements", "Process Analysis", "User Stories", "Acceptance Criteria", "UAT", "Requirements Traceability", "KPI Reporting", "Data Quality", "Decision Support", "SQL", "Python", "Tableau", "Excel", "SGH Warsaw School of Economics", "Poland"],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Onur Usalan",
    title: "Onur Usalan — Business Analyst | Process & Data Analysis",
    description: "Requirements · Process Analysis · Data · Reporting · UAT · Warsaw",
    locale: "en_GB",
    alternateLocale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onur Usalan — Business Analyst | Process & Data Analysis",
    description: "Requirements · Process Analysis · Data · Reporting · UAT · Warsaw",
  },
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
