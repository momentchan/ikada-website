import type { Metadata } from "next";
import Image from "next/image";
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
        fullScreen
      />

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card p-7">
              <p className="font-display text-3xl font-bold leading-tight text-ink">
                {locale === "ja"
                  ? "たぶん浮く、という種類の計画でした。"
                  : "It was the kind of plan that begins with: surely this floats."}
              </p>
              <p className="mt-4 text-sm leading-7 text-ink/62">
                {locale === "ja"
                  ? "その物語が、この宿の名前になりました。"
                  : "That story became the name of the guest house."}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {materialTags[locale].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.story.sections.map((section, index) => (
              <article key={section.title} className="surface-card bg-shell/75 p-7">
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
            eyebrow={locale === "ja" ? "筏" : "THE RAFT"}
            title={locale === "ja" ? "筏づくりの記録" : "Building the raft"}
            body={
              locale === "ja"
                ? "きれいな完成写真だけではなく、途中の様子も含めて残しています。"
                : "Photos from building the raft — including the messy middle, not just the finished float."
            }
            className="mb-10"
          />
          <PhotoGrid images={raftGallery} layout="four" />
        </Container>
      </section>

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <SectionHeading
              eyebrow={copy.story.press.eyebrow}
              title={copy.story.press.title}
              body={copy.story.press.body}
            />
          </div>
          <figure>
            <Image
              src={siteConfig.images.newsClip}
              alt={copy.story.press.title}
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full rounded-sm object-contain"
            />
          </figure>
        </Container>
      </section>

      <section className="section-rule bg-shell py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <ImagePanel
            src={siteConfig.images.house}
            alt="IKADA house at night with garden lights"
            className="aspect-[4/3]"
            rounded="sm"
          />
          <div>
            <SectionHeading
              eyebrow={locale === "ja" ? "STAY" : "THE HOUSE"}
              title={locale === "ja" ? "筏の名を持つ、島の宿" : "A guest house named for the raft"}
              body={
                locale === "ja"
                  ? "家そのものを作ったわけではありません。でも筏の物語から生まれた名前で、島で動くための拠点として迎えています。"
                  : "We did not build the house. But named for the raft story, it is our base on the island — a place to come back to after rain, roads, mangroves, beaches, and slow meals."
              }
            />
          </div>
        </Container>
      </section>
    </>
  );
}
