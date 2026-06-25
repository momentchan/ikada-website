"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { LocaleLink } from "@/components/LocaleLink";
import { cx } from "@/lib/cx";

export function NavLinks({
  locale,
  className,
  linkClassName,
}: {
  locale: Locale;
  className?: string;
  linkClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {navItems.map((item) => {
        const href = localizedPath(locale, item.href);
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <LocaleLink
            key={item.href}
            locale={locale}
            href={item.href}
            className={cx(
              "rounded-lg px-3 py-2 text-sm font-semibold transition",
              isActive
                ? "bg-ink/8 text-ink"
                : "text-ink/68 hover:bg-shell/80 hover:text-ink",
              linkClassName,
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label[locale]}
          </LocaleLink>
        );
      })}
    </nav>
  );
}
