import type { Metadata } from "next";
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

  return (
    <>
      <section className="bg-ink py-16 text-shell">
        <Container className="grid items-end gap-10 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-tide">IKADA</p>
            <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight sm:text-6xl">
              {copy.story.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-shell/75">{copy.story.intro}</p>
          </div>
          <ImagePanel src={siteConfig.images.raft} alt="Handmade bamboo raft materials" className="aspect-[4/3]" priority />
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container className="grid gap-8 md:grid-cols-2">
          {copy.story.sections.map((section, index) => (
            <article key={section.title} className="border-t border-ink/15 pt-6">
              <p className="font-display text-5xl font-bold text-rust/70">0{index + 1}</p>
              <h2 className="mt-4 font-display text-3xl font-bold">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-ink/72">{section.body}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-shell py-16">
        <Container className="grid items-center gap-10 md:grid-cols-[0.9fr_1fr]">
          <ImagePanel src={siteConfig.images.house} alt="Warm modest island house interior" className="aspect-[4/3]" />
          <SectionHeading
            eyebrow={locale === "ja" ? "STAY" : "THE HOUSE"}
            title={locale === "ja" ? "筏の続きとしての家" : "A house as the continuation of a raft"}
            body={
              locale === "ja"
                ? "IKADAは目的地というより、島で動くための拠点です。静かに過ごす日も、朝から出かける日も、戻ってきて一息つく場所。"
                : "IKADA is less a destination than a base: a place to come back to after rain, roads, mangroves, beaches, and meals that start with somebody chopping something slowly."
            }
          />
        </Container>
      </section>
    </>
  );
}
