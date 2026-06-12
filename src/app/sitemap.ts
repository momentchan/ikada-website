import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const paths = [
  "",
  "/story",
  "/stay",
  "/access",
  "/guide",
  "/guest-guide",
  "/booking",
  "/house-rules",
  "/cancellation",
  "/privacy",
  "/terms",
  "/contact",
  "/emergency",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return ["en", "ja"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
