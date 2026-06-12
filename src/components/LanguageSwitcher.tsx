"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";
import type { Locale } from "@/lib/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const withoutLocale = pathname.replace(/^\/(en|ja)/, "") || "";

  return (
    <div className="inline-flex rounded-lg border border-ink/15 bg-shell/75 p-1 text-xs font-semibold">
      {(["en", "ja"] as const).map((item) => (
        <Link
          key={item}
          href={`/${item}${withoutLocale}`}
          className={cx(
            "rounded-md px-2.5 py-1.5 transition",
            locale === item ? "bg-ink text-shell" : "text-ink/70 hover:text-ink",
          )}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
