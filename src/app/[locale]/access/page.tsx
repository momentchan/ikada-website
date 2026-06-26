import type { Metadata } from "next";
import { Car, Download, MapPin, Navigation, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ImagePanel } from "@/components/ImagePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/access",
    title: locale === "ja" ? "アクセス" : "Access",
    description:
      locale === "ja"
        ? "奄美大島・住用エリアのIKADAへの行き方。レンタカー推奨、駐車場、買い出し情報。"
        : "How to get to IKADA in Sumiyo, Amami Oshima, with rental car, parking, and supply notes.",
  });
}

export default async function AccessPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);
  const mapQuery = encodeURIComponent(siteConfig.locationJa);

  return (
    <>
      <section className="bg-shell py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <ImagePanel
            src={siteConfig.images.access}
            alt="Road and landscape near IKADA in Sumiyo, Amami Oshima"
            className="aspect-[16/11]"
            priority
            rounded="sm"
          />
          <div>
            <SectionHeading eyebrow="SUMIYO" title={copy.access.title} body={copy.access.intro} />
            <div className="mt-6 surface-card-paper p-5 text-sm leading-7 text-ink/68">
              <p className="font-bold text-ink">{locale === "ja" ? siteConfig.locationJa : siteConfig.location}</p>
              <p className="mt-1">
                {locale === "ja"
                  ? "チェックイン詳細と駐車場所は予約確定後にご案内します。"
                  : "Check-in details and exact parking notes are sent after confirmation."}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`/api/access-guide?locale=${locale}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-shell/90 px-4 py-2 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {locale === "ja" ? "アクセスガイドを保存" : "Download Access Guide"}
              </a>
              <ButtonLink locale={locale} href="/guide" variant="ghost" icon={MapPin}>
                {copy.cta.area}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="grid gap-4 lg:grid-cols-4">
          {copy.access.sections.map((section, index) => {
            const Icon = [Navigation, Car, MapPin, ShoppingBag][index] ?? Car;
            return (
              <article key={section.title} className="surface-card p-6">
                <Icon aria-hidden="true" className="h-5 w-5 text-rust" />
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/65">{section.body}</p>
              </article>
            );
          })}
        </Container>
      </section>

      <section className="section-rule bg-shell py-20 sm:py-28">
        <Container>
          <div className="overflow-hidden surface-card-paper">
            <div className="border-b border-ink/8 px-5 py-4">
              <h2 className="font-display text-3xl font-bold">
                {locale === "ja" ? "地図" : "Map"}
              </h2>
            </div>
            <iframe
              title="Map to IKADA in Sumiyo, Amami Oshima"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[min(420px,60svh)] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
