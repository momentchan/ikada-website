"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { t } from "@/lib/i18n";
import { cx } from "@/lib/cx";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { LocaleLink } from "@/components/LocaleLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavLinks } from "@/components/NavLinks";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <header
      className={cx(
        "top-0 z-50 w-full",
        isHome
          ? "fixed border-b border-shell/10 bg-ink/20 backdrop-blur-md"
          : "sticky border-b border-ink/8 bg-paper/92 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:min-h-18 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="inline-flex shrink-0 items-center gap-3">
          <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-sm bg-ink text-shell shadow-soft">
            <Image
              src={siteConfig.images.logo}
              alt=""
              fill
              sizes="40px"
              className="object-contain p-1.5"
            />
          </span>
          <span className="leading-tight">
            <span className={cx("block font-display text-xl font-bold", isHome ? "text-shell" : "text-ink")}>
              IKADA
            </span>
            <span
              className={cx(
                "hidden text-[11px] font-bold uppercase tracking-[0.16em] sm:block",
                isHome ? "text-shell/55" : "text-ink/45",
              )}
            >
              Amami island house
            </span>
          </span>
        </Link>

        <NavLinks locale={locale} className="hidden items-center gap-0.5 md:flex" tone={isHome ? "overlay" : "default"} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} tone={isHome ? "overlay" : "default"} />
          <LocaleLink
            locale={locale}
            href="/booking"
            className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-rust px-3 py-2 text-sm font-bold text-shell shadow-soft transition hover:-translate-y-0.5 hover:bg-wood"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">{copy.cta.availability}</span>
            <span className="sm:hidden">{locale === "ja" ? "予約" : "Book"}</span>
          </LocaleLink>
        </div>
      </div>

      <NavLinks
        locale={locale}
        className={cx(
          "flex gap-0.5 overflow-x-auto px-4 py-2 md:hidden",
          isHome ? "border-t border-shell/10" : "border-t border-ink/8",
        )}
        linkClassName="whitespace-nowrap text-xs"
        tone={isHome ? "overlay" : "default"}
      />
    </header>
  );
}
