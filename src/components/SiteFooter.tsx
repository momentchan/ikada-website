import { Anchor, Mail, MapPin } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

const links = [
  { href: "/house-rules", label: { en: "House Rules", ja: "ハウスルール" } },
  { href: "/cancellation", label: { en: "Cancellation", ja: "キャンセル" } },
  { href: "/privacy", label: { en: "Privacy", ja: "プライバシー" } },
  { href: "/terms", label: { en: "Terms", ja: "予約条件" } },
  { href: "/legal", label: { en: "Legal", ja: "特商法表記" } },
  { href: "/contact", label: { en: "Contact", ja: "お問い合わせ" } },
  { href: "/emergency", label: { en: "Emergency", ja: "緊急情報" } },
  { href: "/guest-guide", label: { en: "Guest Guide", ja: "ゲストガイド" } },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-ink/10 bg-ink text-shell">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 font-display text-2xl font-bold">
            <Anchor aria-hidden="true" className="h-5 w-5" />
            IKADA
          </div>
          <p className="mt-3 max-w-md text-sm leading-7 text-shell/75">
            {locale === "ja"
              ? "奄美大島・住用エリアの小さな島の家。豪華さより、自然と友人とゆっくりした時間のために。"
              : "A small island house in Sumiyo, Amami Oshima. More raft than resort, in the best possible way."}
          </p>
          <div className="mt-5 space-y-2 text-sm text-shell/75">
            <p className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {siteConfig.location}
            </p>
            <p className="flex items-center gap-2">
              <Mail aria-hidden="true" className="h-4 w-4" />
              {siteConfig.email}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {links.map((link) => (
            <LocaleLink
              key={link.href}
              locale={locale}
              href={link.href}
              className="rounded-lg px-2 py-2 text-shell/75 transition hover:bg-shell/10 hover:text-shell"
            >
              {link.label[locale]}
            </LocaleLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
