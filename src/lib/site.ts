import type { Locale } from "@/lib/types";

export const siteConfig = {
  name: "IKADA",
  location: "Sumiyo, Amami Oshima, Kagoshima, Japan",
  defaultLocale: "en" satisfies Locale,
  locales: ["en", "ja"] as const,
  email: "hello@example.com",
  phone: "+81-000-0000-0000",
  images: {
    hero: "/images/ikada-hero.png",
    raft: "/images/ikada-raft-story.png",
    house: "/images/ikada-house-interior.png",
    nature: "/images/ikada-local-nature.png",
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function localizedPath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}
