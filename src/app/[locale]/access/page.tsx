import type { Metadata } from "next";
import { Car, Download, MapPin } from "lucide-react";
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

  return (
    <>
      <section className="bg-shell py-16">
        <Container className="grid items-center gap-10 md:grid-cols-[0.95fr_1fr]">
          <ImagePanel src={siteConfig.images.nature} alt="Amami Oshima mangrove river and rural road" className="aspect-[4/3]" priority />
          <div>
            <SectionHeading eyebrow="SUMIYO" title={copy.access.title} body={copy.access.intro} />
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`/api/access-guide?locale=${locale}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-ink/15 bg-paper px-4 py-2 text-sm font-bold"
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

      <section className="bg-paper py-16">
        <Container className="grid gap-4 md:grid-cols-2">
          {copy.access.sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-ink/10 bg-shell p-5">
              <Car aria-hidden="true" className="h-5 w-5 text-rust" />
              <h2 className="mt-4 font-display text-2xl font-bold">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink/70">{section.body}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-shell py-16">
        <Container>
          <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper">
            <iframe
              title="Map around Sumiyo, Amami Oshima"
              src="https://www.google.com/maps?q=Sumiyo%2C%20Amami%20Oshima%2C%20Kagoshima%2C%20Japan&output=embed"
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
