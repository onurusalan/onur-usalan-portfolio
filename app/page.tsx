import type { Metadata } from "next";
import { Home } from "@/components/page";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", pl: "/pl", "x-default": "/" } },
};

export default function HomeRoute() {
  return <Home lang="en" />;
}
