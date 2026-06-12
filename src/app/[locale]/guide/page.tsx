import type { Metadata } from "next";
import { ExternalLink, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { ImagePanel } from "@/components/ImagePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { listGuideSpots } from "@/lib/store";
import type { GuideCategory, Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/guide",
    title: locale === "ja" ? "周辺ガイド" : "Local Guide",
    description:
      locale === "ja"
        ? "IKADA周辺の食事、海、自然、雨の日、便利な場所のガイド。"
        : "Food, beaches, nature, rainy-day ideas, and useful places around IKADA.",
  });
}

export default async function GuidePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);
  const spots = await listGuideSpots();
  const categories = Object.keys(copy.guide.categories) as GuideCategory[];

  return (
    <>
      <section className="bg-shell py-16">
        <Container className="grid items-center gap-10 md:grid-cols-[1fr_0.95fr]">
          <SectionHeading eyebrow="AMAMI" title={copy.guide.title} body={copy.guide.intro} />
          <ImagePanel src={siteConfig.images.nature} alt="Mangrove river in Amami Oshima" className="aspect-[4/3]" priority />
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container className="space-y-12">
          {categories.map((category) => {
            const items = spots.filter((spot) => spot.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="font-display text-3xl font-bold">{copy.guide.categories[category]}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {items.map((spot) => (
                    <article key={spot.id} className="rounded-lg border border-ink/10 bg-shell p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-bold">{spot.name[locale]}</h3>
                          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-rust">
                            <MapPin aria-hidden="true" className="h-4 w-4" />
                            {spot.distance[locale]}
                          </p>
                        </div>
                        <a
                          href={spot.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/10 text-ink/70 hover:text-ink"
                          aria-label={`${spot.name[locale]} map`}
                        >
                          <ExternalLink aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-ink/72">{spot.description[locale]}</p>
                      <p className="mt-3 border-l-2 border-moss pl-3 text-sm leading-7 text-ink/72">
                        {spot.recommendation[locale]}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
