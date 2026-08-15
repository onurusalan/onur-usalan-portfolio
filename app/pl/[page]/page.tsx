import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page, type StaticPageType } from "@/components/page";
import { staticMetadata } from "@/lib/metadata";

const pageTypes: StaticPageType[] = ["about", "experience", "projects", "contact"];
const isPageType = (value: string): value is StaticPageType => pageTypes.includes(value as StaticPageType);

export function generateStaticParams() {
  return pageTypes.map((page) => ({ page }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return isPageType(page) ? staticMetadata(page, "pl") : {};
}

export default async function PolishStaticRoute({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!isPageType(page)) notFound();
  return <Page lang="pl" type={page} />;
}
