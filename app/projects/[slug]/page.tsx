import type { Metadata } from "next";
import { CaseStudy } from "@/components/page";
import { projects } from "@/content/site";
import { projectMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return projectMetadata((await params).slug, "en");
}

export default async function EnglishCaseRoute({ params }: { params: Promise<{ slug: string }> }) {
  return <CaseStudy lang="en" slug={(await params).slug} />;
}
