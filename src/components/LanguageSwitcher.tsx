"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";
import type { Locale } from "@/lib/types";

export function LanguageSwitcher({ locale, tone = "default" }: { locale: Locale; tone?: "default" | "overlay" }) {
  const pathname = usePathname();
  const withoutLocale = pathname.replace(/^\/(en|ja)/, "") || "";
  const overlay = tone === "overlay";

  return (
    <div
      className={cx(
        "inline-flex rounded-lg p-1 text-xs font-semibold shadow-soft",
        overlay ? "bg-ink/35" : "bg-shell/75",
      )}
    >
      {(["en", "ja"] as const).map((item) => (
        <Link
          key={item}
          href={`/${item}${withoutLocale}`}
          className={cx(
            "rounded-md px-2.5 py-1.5 transition",
            overlay
              ? locale === item
                ? "bg-shell text-ink"
                : "text-shell/75 hover:text-shell"
              : locale === item
                ? "bg-ink text-shell"
                : "text-ink/70 hover:text-ink",
          )}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
