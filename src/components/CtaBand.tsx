import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function CtaBand({
  locale,
  title,
  body,
}: {
  locale: Locale;
  title: string;
  body: string;
}) {
  const copy = t(locale);

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
        <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
          {copy.cta.booking}
        </ButtonLink>
      </Container>
    </section>
  );
}
