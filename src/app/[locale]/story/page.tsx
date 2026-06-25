import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ImagePanel } from "@/components/ImagePanel";
import { PageHero } from "@/components/PageHero";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

const materialTags = {
  en: ["Bamboo", "Blue tarp", "Rope", "Friends"],
  ja: ["竹", "ブルーシート", "ロープ", "友人"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/story",
    title: locale === "ja" ? "IKADAのストーリー" : "Our Story",
    description:
      locale === "ja"
        ? "竹、廃材、ブルーシート、ロープから始まったIKADAの物語。"
        : "The IKADA story: bamboo, scrap wood, blue tarps, rope, friends, and a small island house.",
  });
}

export default async function StoryPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);

  const raftGallery = siteConfig.images.gallery.raftBuild.slice(0, 4).map((src, index) => ({
    src,
    alt:
      locale === "ja"
        ? `筏づくりの記録 ${index + 1}`
        : `Raft build documentation, photo ${index + 1}`,
  }));

  return (
    <>
      <PageHero
        eyebrow="IKADA"
        title={copy.story.title}
        body={copy.story.intro}
        image={siteConfig.images.raft}
        imageAlt="The handmade IKADA raft floating on Amami water"
        compact
      />

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-shell p-7 shadow-soft ring-1 ring-ink/8">
              <p className="font-display text-3xl font-bold leading-tight text-ink">
                {locale === "ja"
                  ? "たぶん浮く、という種類の計画でした。"
                  : "It was the kind of plan that begins with: surely this floats."}
              </p>
              <p className="mt-4 text-sm leading-7 text-ink/62">
                {locale === "ja"
                  ? "その雑さと楽観が、家の名前になりました。"
                  : "That mix of optimism and poor engineering judgment became the name of the house."}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {materialTags[locale].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.story.sections.map((section, index) => (
              <article key={section.title} className="rounded-sm border border-ink/8 bg-shell/75 p-7">
                <p className="font-display text-5xl font-bold text-rust/60">0{index + 1}</p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink/68">{section.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-rule bg-shell py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "ja" ? "BUILD" : "THE BUILD"}
            title={locale === "ja" ? "作った記録" : "What we tied together"}
            body={
              locale === "ja"
                ? "きれいな完成写真だけではなく、途中の雑さも含めて残しています。"
                : "Not just the finished photos — the messy middle is part of the story too."
            }
            className="mb-10"
          />
          <PhotoGrid images={raftGallery} layout="four" />
        </Container>
      </section>

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <ImagePanel
            src={siteConfig.images.house}
            alt="IKADA house at night with garden lights"
            className="aspect-[4/3]"
            rounded="sm"
          />
          <div>
            <SectionHeading
              eyebrow={locale === "ja" ? "STAY" : "THE HOUSE"}
              title={locale === "ja" ? "筏の続きとしての家" : "A house as the continuation of a raft"}
              body={
                locale === "ja"
                  ? "IKADAは目的地というより、島で動くための拠点です。静かに過ごす日も、朝から出かける日も、戻ってきて一息つく場所。"
                  : "IKADA is less a destination than a base: a place to come back to after rain, roads, mangroves, beaches, and meals that start with somebody chopping something slowly."
              }
            />
            <div className="mt-8">
              <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
                {locale === "ja" ? "空室を確認" : "Check Availability"}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
