import { CalendarDays, Hammer, Leaf, MapPinned, Waves } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ImagePanel } from "@/components/ImagePanel";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoHero } from "@/components/VideoHero";
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

  const raftGallery = siteConfig.images.gallery.raftBuild.slice(0, 3).map((src, index) => ({
    src,
    alt:
      locale === "ja"
        ? `筏づくりの様子 ${index + 1}`
        : `Building the IKADA raft, photo ${index + 1}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "IKADA",
    description: copy.home.headline,
    image: `${getSiteUrl()}${siteConfig.images.hero}`,
    address: {
      "@type": "PostalAddress",
      postalCode: siteConfig.postalCode,
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: "JP",
    },
    email: siteConfig.email,
    url: `${getSiteUrl()}/${locale}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoHero
        video={siteConfig.video.hero}
        poster={siteConfig.images.hero}
        eyebrow={copy.home.eyebrow}
        title={copy.home.heroTitle}
      />

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <SectionHeading
              eyebrow={locale === "ja" ? "WHY IKADA" : "WHY IKADA"}
              title={locale === "ja" ? "ホテルではなく、島で過ごすための拠点。" : "Not a hotel. A base for island days."}
              body={
                locale === "ja"
                  ? "豪華さより、戻ってこられる場所。雨の日も、海に出た日も、ただ何もしない朝も、ちゃんと受け止める家です。"
                  : "IKADA is for people who want the island close: wet roads, simple meals, quiet mornings, and the kind of plans that change when the weather does."
              }
            />
            <div className="grid gap-4 md:grid-cols-3">
              {copy.home.points.map((point, index) => {
                const Icon = [Hammer, Leaf, Waves][index];
                return (
                  <article key={point.title} className="surface-card p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-rust/10 text-rust">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-bold leading-tight">{point.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-ink/65">{point.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-rule bg-shell py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "ja" ? "STORY" : "THE RAFT"}
            title={copy.story.title}
            body={copy.story.intro}
            className="mb-10"
          />
          <PhotoGrid images={raftGallery} layout="three" />
          <div className="mt-8">
            <ButtonLink locale={locale} href="/story" variant="ghost" icon={Hammer}>
              {copy.cta.story}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section-rule bg-shell pb-14 pt-8 sm:pb-20 sm:pt-10">
        <Container className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8">
          <article className="rounded-sm bg-ink p-6 text-shell shadow-lift lg:p-8">
            <p className="eyebrow-light mb-3">
              <span className="h-px w-8 bg-tide/70" />
              {locale === "ja" ? "STAY" : "STAY"}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {locale === "ja" ? "静かな家、よく曲がる道、予定を変える天気。" : "A quiet house, winding roads, and weather that edits your plans."}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-shell/75 sm:text-base">
              {locale === "ja"
                ? "滞在の中心は、豪華な設備ではなく、島で過ごす時間そのもの。料理して、出かけて、戻って、眠る。その繰り返しが少し特別になる場所です。"
                : "The stay is not about luxury amenities. It is about the rhythm: cook, drive, swim, wait out rain, return, sleep, and wake up with the island still close."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink locale={locale} href="/stay" variant="secondary" icon={Leaf}>
                {locale === "ja" ? "宿について" : "See The House"}
              </ButtonLink>
              <ButtonLink locale={locale} href="/access" variant="secondary" icon={MapPinned}>
                {locale === "ja" ? "行き方を見る" : "Plan Access"}
              </ButtonLink>
            </div>
          </article>
          <div className="relative lg:-mr-6">
            <ImagePanel
              src={siteConfig.images.house}
              alt="IKADA house at night with garden lights"
              className="aspect-[4/5] lg:aspect-[5/6]"
              rounded="sm"
            />
          </div>
        </Container>
      </section>

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="max-w-3xl">
          <article className="surface-card p-8">
            <p className="eyebrow mb-4">
              <span className="h-px w-8 bg-rust/60" />
              {locale === "ja" ? "BOOKING" : "BOOKING"}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {locale === "ja" ? "日程が決まったら、まずリクエストを。" : "Have dates in mind? Start with a request."}
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink/68 sm:text-base">
              {locale === "ja"
                ? "空き状況を確認して、宿泊可能な場合だけ支払いリンクをお送りします。"
                : "We review availability first, then send payment only if the stay works."}
            </p>
            <div className="mt-7">
              <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
                {copy.cta.booking}
              </ButtonLink>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
