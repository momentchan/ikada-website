import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getSiteUrl, siteConfig } from "@/lib/site";

const keywords = [
  "Amami guest house",
  "Amami Airbnb",
  "Amami accommodation",
  "Amami nature stay",
  "Amami island house",
  "奄美大島 宿",
  "奄美大島 民宿",
  "奄美大島 ゲストハウス",
  "住用町 宿泊",
  "奄美 自然 宿",
];

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const pathname = `/${locale}${path === "/" ? "" : path}`;
  const url = `${siteUrl}${pathname}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | IKADA Amami`,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${path === "/" ? "" : path}`,
        ja: `${siteUrl}/ja${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      title: `${title} | IKADA Amami`,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
      images: [
        {
          url: siteConfig.images.hero,
          width: 1536,
          height: 1024,
          alt: "IKADA island house in Amami Oshima",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | IKADA Amami`,
      description,
      images: [siteConfig.images.hero],
    },
  };
}
