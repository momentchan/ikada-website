import type { Locale } from "@/lib/types";

export const siteConfig = {
  name: "IKADA",
  location: "18 Yamma, Sumiyo-cho, Amami-shi, Kagoshima 894-1204, Japan",
  locationJa: "〒894-1204 鹿児島県奄美市住用町大字山間18",
  postalCode: "894-1204",
  streetAddress: "18 Yamma, Sumiyo-cho",
  addressLocality: "Amami-shi",
  addressRegion: "Kagoshima",
  defaultLocale: "en" satisfies Locale,
  locales: ["en", "ja"] as const,
  email: "ikada.amami@gmail.com",
  phone: "+81-000-0000-0000",
  images: {
    logo: "/images/logo/logo.png",
    hero: "/images/house/IMG_20251128_142141.jpg",
    raft: "/images/raft/DSCF5737.JPG",
    newsClip: "/images/raft/news_small.png",
    house: "/images/house/PXL_20260218_135513506.jpg",
    nature: "/images/raft/DJI_0671.JPG",
    access: "/images/raft/DJI_0624.JPG",
    gallery: {
      raftBuild: [
        "/images/raft/1768573621141-0.jpg",
        "/images/raft/1768573621141-4.jpg",
        "/images/raft/1768573621141-8.jpg",
        "/images/raft/1768573735437-7.jpg",
        "/images/raft/DSCF5729.JPG",
        "/images/raft/DSCF5734.JPG",
      ],
      houseLife: [
        "/images/house/PXL_20260218_135513506.jpg",
        "/images/house/IMG_20251128_142141.jpg",
        "/images/house/IMG_0283.png",
        "/images/raft/PXL_20260427_070004827.jpg",
      ],
      island: [
        "/images/raft/DJI_0671.JPG",
        "/images/raft/DJI_0624.JPG",
        "/images/raft/dji_fly_20251127_073530_675_1764197089712_photo_optimized.jpg",
        "/images/raft/426a0346-ed35-42ed-8283-cd690d85fea4.jpg",
        "/images/raft/1768573679687-1.jpg",
        "/images/raft/PXL_20260427_063138489.jpg",
      ],
    },
  },
  video: {
    hero: "/video/House-720p.mp4",
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function localizedPath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}
