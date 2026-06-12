import type { Metadata } from "next";
import "@/app/globals.css";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "IKADA Amami",
    template: "%s | IKADA Amami",
  },
  description: "A small island guest house in Sumiyo, Amami Oshima.",
  openGraph: {
    images: [siteConfig.images.hero],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
