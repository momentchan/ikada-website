import { CalendarDays, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import type { Locale } from "@/lib/types";

export function CtaBand({
  locale,
  title,
  body,
  showGuide = true,
}: {
  locale: Locale;
  title: string;
  body: string;
  showGuide?: boolean;
}) {
  return (
    <section className="section-rule bg-ink text-shell">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center sm:py-20">
        <div className="max-w-xl">
          <p className="eyebrow-light mb-3">
            <span className="h-px w-8 bg-tide/70" />
            IKADA
          </p>
          <h2 className="text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-pretty text-sm leading-7 text-shell/72 sm:text-base">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
            {locale === "ja" ? "空室を確認" : "Check Availability"}
          </ButtonLink>
          {showGuide ? (
            <ButtonLink locale={locale} href="/guide" variant="secondary" icon={Compass}>
              {locale === "ja" ? "周辺ガイド" : "Local Guide"}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
