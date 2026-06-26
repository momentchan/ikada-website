import type { Metadata } from "next";
import "@/app/globals.css";
import { fontDisplay, fontSans, fontSansJa } from "@/lib/fonts";
import { getSiteUrl, siteConfig } from "@/lib/site";

const siteTitle = siteConfig.title;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteTitle,
    template: `${siteTitle} | %s`,
  },
  description: "A small island guest house in Sumiyo, Amami Oshima.",
  openGraph: {
    images: [siteConfig.images.hero],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSansJa.variable} ${fontDisplay.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
