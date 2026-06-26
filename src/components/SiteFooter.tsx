import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { LocaleLink } from "@/components/LocaleLink";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

const stayLinks = [
  { href: "/stay", label: { en: "Stay", ja: "宿について" } },
  { href: "/access", label: { en: "Access", ja: "アクセス" } },
  { href: "/guide", label: { en: "Local Guide", ja: "周辺ガイド" } },
  { href: "/guest-guide", label: { en: "Guest Guide", ja: "ゲストガイド" } },
];

const policyLinks = [
  { href: "/house-rules", label: { en: "House Rules", ja: "ハウスルール" } },
  { href: "/cancellation", label: { en: "Cancellation", ja: "キャンセル" } },
  { href: "/privacy", label: { en: "Privacy", ja: "プライバシー" } },
  { href: "/terms", label: { en: "Terms", ja: "予約条件" } },
  { href: "/legal", label: { en: "Legal", ja: "特商法表記" } },
  { href: "/emergency", label: { en: "Emergency", ja: "緊急情報" } },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-ink/8">
      <CtaBand
        locale={locale}
        title={locale === "ja" ? "ゆっくり流れる時間を、島で。" : "Ready to drift slowly?"}
        body={
          locale === "ja"
            ? "日程が決まったら、まずリクエストを。空き状況を確認してから、お支払いのご案内をお送りします。"
            : "Have dates in mind? Send a request first. We check availability, then send payment only if the stay works."
        }
      />
      <div className="paper-grain bg-ink text-shell">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="relative h-12 w-20 overflow-hidden">
                <Image src={siteConfig.images.logo} alt="IKADA" fill sizes="80px" className="object-contain" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-shell/50">
                {siteConfig.tagline[locale]}
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-shell/72">
              {locale === "ja"
                ? "奄美大島・住用エリアの小さな島の家。豪華さより、自然と友人とゆっくりした時間のために。"
                : "A small island house in Sumiyo, Amami Oshima. More raft than resort, in the best possible way."}
            </p>
            <div className="mt-6 space-y-2 text-sm text-shell/72">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                {locale === "ja" ? siteConfig.locationJa : siteConfig.location}
              </p>
              <p className="flex items-center gap-2">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 transition hover:text-shell hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-shell/45">
              {locale === "ja" ? "滞在" : "Stay"}
            </p>
            <div className="mt-3 grid gap-1">
              {stayLinks.map((link) => (
                <LocaleLink
                  key={link.href}
                  locale={locale}
                  href={link.href}
                  className="rounded-sm px-2 py-2 text-sm text-shell/72 transition hover:bg-shell/8 hover:text-shell"
                >
                  {link.label[locale]}
                </LocaleLink>
              ))}
              <LocaleLink
                locale={locale}
                href="/contact"
                className="rounded-sm px-2 py-2 text-sm text-shell/72 transition hover:bg-shell/8 hover:text-shell"
              >
                {locale === "ja" ? "お問い合わせ" : "Contact"}
              </LocaleLink>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-shell/45">
              {locale === "ja" ? "ポリシー" : "Policies"}
            </p>
            <div className="mt-3 grid gap-1">
              {policyLinks.map((link) => (
                <LocaleLink
                  key={link.href}
                  locale={locale}
                  href={link.href}
                  className="rounded-sm px-2 py-2 text-sm text-shell/72 transition hover:bg-shell/8 hover:text-shell"
                >
                  {link.label[locale]}
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-shell/10 py-5 text-center text-xs text-shell/45">
          © {new Date().getFullYear()} IKADA · Sumiyo, Amami Oshima
        </div>
      </div>
    </footer>
  );
}
