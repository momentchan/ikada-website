import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, MapPin, MapPinned } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
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
  const publishedCategories = categories.filter((category) =>
    spots.some((spot) => spot.category === category),
  );

  return (
    <>
      <section className="bg-shell py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <SectionHeading eyebrow="AMAMI" title={copy.guide.title} body={copy.guide.intro} />
          <ImagePanel
            src={siteConfig.images.gallery.island[0] ?? siteConfig.images.nature}
            alt="Amami Oshima landscape near IKADA"
            className="aspect-[16/11]"
            priority
            rounded="sm"
          />
        </Container>
      </section>

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.22fr_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/40">
                {locale === "ja" ? "カテゴリー" : "Categories"}
              </p>
              {publishedCategories.map((category) => (
                <a
                  key={category}
                  href={`#guide-${category}`}
                  className="block rounded-sm px-2 py-2 text-sm font-semibold text-ink/62 transition hover:bg-shell hover:text-ink"
                >
                  {copy.guide.categories[category]}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-16">
            {publishedCategories.map((category, categoryIndex) => {
              const items = spots.filter((spot) => spot.category === category);
              const ambientImage =
                siteConfig.images.gallery.island[categoryIndex % siteConfig.images.gallery.island.length];

              return (
                <div key={category} id={`guide-${category}`} className="scroll-mt-28">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-rust">
                        {items.length} {locale === "ja" ? "件" : items.length === 1 ? "place" : "places"}
                      </p>
                      <h2 className="mt-2 font-display text-4xl font-bold">{copy.guide.categories[category]}</h2>
                    </div>
                    <div className="relative hidden h-20 w-32 overflow-hidden rounded-sm shadow-soft sm:block">
                      <Image src={ambientImage} alt="" fill sizes="128px" className="object-cover" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items.map((spot) => (
                      <article key={spot.id} className="surface-card p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl font-bold leading-tight">{spot.name[locale]}</h3>
                            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-rust/10 px-3 py-1 text-xs font-bold text-rust">
                              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                              {spot.distance[locale]}
                            </p>
                          </div>
                          <a
                            href={spot.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper text-ink/65 shadow-soft transition hover:text-ink"
                            aria-label={`${spot.name[locale]} map`}
                          >
                            <ExternalLink aria-hidden="true" className="h-4 w-4" />
                          </a>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-ink/68">{spot.description[locale]}</p>
                        <p className="mt-4 border-l-2 border-moss/50 bg-moss/5 py-2 pl-4 text-sm italic leading-7 text-ink/72">
                          {spot.recommendation[locale]}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-rule bg-shell py-12">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink/65">
            {locale === "ja" ? "IKADAへの行き方はアクセスページをご覧ください。" : "See the access page for directions to IKADA."}
          </p>
          <ButtonLink locale={locale} href="/access" variant="secondary" icon={MapPinned}>
            {locale === "ja" ? "アクセス" : "Access"}
          </ButtonLink>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        title={locale === "ja" ? "島の一日は、ここから始まる。" : "Start your island day from IKADA."}
        body={
          locale === "ja"
            ? "滞在しながら、このガイドを参考に動いてみてください。"
            : "Stay with us and use these notes as a starting point, not a schedule."
        }
      />
    </>
  );
}
