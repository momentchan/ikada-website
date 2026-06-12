import Image from "next/image";
import { CalendarDays, Compass, Hammer, Leaf, Waves } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ImagePanel } from "@/components/ImagePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl, siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);
  return buildMetadata({
    locale,
    path: "/",
    title: "IKADA",
    description: copy.home.headline,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "IKADA",
    description: copy.home.headline,
    image: `${getSiteUrl()}${siteConfig.images.hero}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sumiyo, Amami-shi",
      addressRegion: "Kagoshima",
      addressCountry: "JP",
    },
    url: `${getSiteUrl()}/${locale}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[78svh] overflow-hidden bg-ink text-shell">
        <Image
          src={siteConfig.images.hero}
          alt="A modest island house in Amami Oshima with handmade raft materials"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/50 to-ink/15" />
        <Container className="relative flex min-h-[78svh] items-center py-16">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-tide">
              {copy.home.eyebrow}
            </p>
            <h1 className="font-display text-6xl font-bold leading-none sm:text-7xl md:text-8xl">
              IKADA
            </h1>
            <p className="mt-6 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {copy.home.headline}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-shell/84 sm:text-lg">
              {copy.home.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
                {copy.cta.availability}
              </ButtonLink>
              <ButtonLink locale={locale} href="/story" variant="secondary" icon={Hammer}>
                {copy.cta.story}
              </ButtonLink>
              <ButtonLink locale={locale} href="/guide" variant="secondary" icon={Compass}>
                {copy.cta.area}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.home.points.map((point, index) => {
              const Icon = [Hammer, Leaf, Waves][index];
              return (
                <article key={point.title} className="rounded-lg border border-ink/10 bg-shell p-5">
                  <Icon aria-hidden="true" className="h-6 w-6 text-rust" />
                  <h2 className="mt-4 font-display text-2xl font-bold">{point.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink/68">{point.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-shell py-16">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={locale === "ja" ? "STORY" : "THE RAFT"}
              title={copy.story.title}
              body={copy.story.intro}
            />
            <div className="mt-6">
              <ButtonLink locale={locale} href="/story" variant="ghost" icon={Hammer}>
                {copy.cta.story}
              </ButtonLink>
            </div>
          </div>
          <ImagePanel
            src={siteConfig.images.raft}
            alt="Friends building a handmade bamboo raft"
            className="aspect-[4/3]"
          />
        </Container>
      </section>
    </>
  );
}
