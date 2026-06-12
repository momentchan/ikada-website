import Link from "next/link";
import { Anchor, CalendarDays } from "lucide-react";
import { navItems, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { LocaleLink } from "@/components/LocaleLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/88 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 font-display text-xl font-bold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-shell">
            <Anchor aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>IKADA</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <LocaleLink
              key={item.href}
              locale={locale}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/75 transition hover:bg-shell hover:text-ink"
            >
              {item.label[locale]}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <LocaleLink
            locale={locale}
            href="/booking"
            className="hidden min-h-10 items-center gap-2 rounded-lg bg-rust px-3 py-2 text-sm font-semibold text-shell transition hover:bg-wood sm:inline-flex"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            <span>{copy.cta.availability}</span>
          </LocaleLink>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-ink/10 px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <LocaleLink
            key={item.href}
            locale={locale}
            href={item.href}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-ink/75"
          >
            {item.label[locale]}
          </LocaleLink>
        ))}
      </nav>
    </header>
  );
}
