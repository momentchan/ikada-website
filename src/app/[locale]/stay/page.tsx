import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ImagePanel } from "@/components/ImagePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getDataSnapshot } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/stay",
    title: locale === "ja" ? "宿について" : "Stay",
    description:
      locale === "ja"
        ? "奄美大島・住用の素朴な一軒家IKADAの設備、向いている人、注意点。"
        : "Facilities, house details, and what to know before booking IKADA in Sumiyo, Amami Oshima.",
  });
}

export default async function StayPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);
  const data = await getDataSnapshot();

  return (
    <>
      <section className="bg-shell py-16">
        <Container className="grid items-center gap-10 md:grid-cols-[1fr_0.95fr]">
          <SectionHeading
            eyebrow="IKADA"
            title={copy.stay.title}
            body={data.houseInfo.description[locale]}
          />
          <ImagePanel src={siteConfig.images.house} alt="Modest warm island house interior" className="aspect-[4/3]" priority />
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.houseInfo.facilities.map((facility) => (
              <article key={facility.key} className="rounded-lg border border-ink/10 bg-shell p-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-rust">{facility.label[locale]}</p>
                <h2 className="mt-3 font-display text-2xl font-bold">{facility.value[locale]}</h2>
              </article>
            ))}
            <article className="rounded-lg border border-ink/10 bg-shell p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-rust">
                {locale === "ja" ? "チェックイン" : "Check-in"}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold">
                {data.settings.checkInTime} / {data.settings.checkOutTime}
              </h2>
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-shell py-16">
        <Container className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">{copy.stay.goodFor}</h2>
            <ul className="mt-5 space-y-3">
              {copy.stay.goodItems.map((item) => (
                <li key={item} className="flex gap-3 text-ink/75">
                  <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-moss" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">{copy.stay.notFor}</h2>
            <ul className="mt-5 space-y-3">
              {copy.stay.notItems.map((item) => (
                <li key={item} className="flex gap-3 text-ink/75">
                  <X aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-rust" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
