import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { LocaleLink } from "@/components/LocaleLink";
import type { Locale } from "@/lib/types";

export function ButtonLink({
  locale,
  href,
  children,
  variant = "primary",
  icon: Icon = ArrowRight,
  className,
}: {
  locale: Locale;
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <LocaleLink
      locale={locale}
      href={href}
      className={cx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition",
        variant === "primary" && "bg-ink text-shell shadow-soft hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lift",
        variant === "secondary" && "border border-ink/15 bg-shell/90 text-ink shadow-sm hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white",
        variant === "ghost" && "text-ink underline-offset-4 hover:text-rust hover:underline",
        className,
      )}
    >
      <span>{children}</span>
      <Icon aria-hidden="true" className="h-4 w-4" />
    </LocaleLink>
  );
}
