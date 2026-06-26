import type { Metadata } from "next";
import { Bed, CalendarDays, Car, Check, Clock, Flame, ShieldCheck, UtensilsCrossed, Waves, Wifi, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getDataSnapshot } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

const facilityIcons: Record<string, LucideIcon> = {
  guests: Bed,
  beds: Bed,
  kitchen: UtensilsCrossed,
  wifi: Wifi,
  parking: Car,
  sauna: Flame,
  rental: Waves,
};

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

  const housePhotos = siteConfig.images.gallery.houseLife.slice(0, 2).map((src, index) => ({
    src,
    alt: locale === "ja" ? `IKADAの家 ${index + 1}` : `IKADA house, photo ${index + 1}`,
  }));

  return (
    <>
      <section className="bg-shell py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <SectionHeading
              eyebrow="IKADA"
              title={copy.stay.title}
              body={data.houseInfo.description[locale]}
            />
            <PhotoGrid images={housePhotos} layout="two" />
          </div>
        </Container>
      </section>

      <section className="section-rule bg-paper py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={locale === "ja" ? "DETAILS" : "DETAILS"}
              title={locale === "ja" ? "必要なことは、はっきり。" : "The practical bits, clearly."}
              body={
                locale === "ja"
                  ? "写真だけでなく、泊まる前に知っておきたい情報をまとめています。"
                  : "Less mystery, better trips. Here is what you need to know before booking."
              }
            />
            <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
              {locale === "ja" ? "空室を確認" : "Check Availability"}
            </ButtonLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.houseInfo.facilities.map((facility) => {
              const Icon = facilityIcons[facility.key] ?? Bed;
              return (
                <article key={facility.key} className="surface-card p-6">
                  <Icon aria-hidden="true" className="h-5 w-5 text-rust" />
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-rust/80">{facility.label[locale]}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight">{facility.value[locale]}</h2>
                </article>
              );
            })}
            <article className="surface-card-dark p-6">
              <Clock aria-hidden="true" className="h-5 w-5 text-tide" />
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-tide">
                {locale === "ja" ? "チェックイン" : "Check-in / out"}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                {data.settings.checkInTime} / {data.settings.checkOutTime}
              </h2>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-rule bg-shell py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1fr_0.82fr]">
          <div className="rounded-sm bg-moss/8 p-7 shadow-soft">
            <h2 className="font-display text-3xl font-bold">{copy.stay.goodFor}</h2>
            <ul className="mt-5 space-y-3">
              {copy.stay.goodItems.map((item) => (
                <li key={item} className="flex gap-3 text-ink/72">
                  <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-moss" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm bg-rust/8 p-7 shadow-soft">
            <h2 className="font-display text-3xl font-bold">{copy.stay.notFor}</h2>
            <ul className="mt-5 space-y-3">
              {copy.stay.notItems.map((item) => (
                <li key={item} className="flex gap-3 text-ink/72">
                  <X aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-rust" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="surface-card-paper p-7">
            <ShieldCheck aria-hidden="true" className="h-7 w-7 text-sea" />
            <h2 className="mt-4 font-display text-3xl font-bold">
              {locale === "ja" ? "予約前の安心" : "Before you book"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink/68">
              {locale === "ja"
                ? "予約リクエスト後に空き状況を確認します。宿泊可能な場合のみ支払いリンクをお送りします。"
                : "Your request is reviewed first. Payment only happens after we confirm the dates can work."}
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm font-semibold text-sea">
              <ButtonLink locale={locale} href="/house-rules" variant="ghost">
                {locale === "ja" ? "ハウスルール" : "House Rules"}
              </ButtonLink>
              <ButtonLink locale={locale} href="/cancellation" variant="ghost">
                {locale === "ja" ? "キャンセルポリシー" : "Cancellation Policy"}
              </ButtonLink>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        title={locale === "ja" ? "島の拠点として、泊まってみる。" : "Stay at IKADA as your island base."}
        body={
          locale === "ja"
            ? "日程が合えば、まずはリクエストをお送りください。"
            : "If the dates look right, send a request and we will take it from there."
        }
      />
    </>
  );
}
