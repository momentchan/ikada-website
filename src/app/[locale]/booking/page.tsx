import type { Metadata } from "next";
import { CalendarCheck, CreditCard, MailCheck, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getSettings } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/booking",
    title: locale === "ja" ? "予約リクエスト" : "Booking Request",
    description:
      locale === "ja"
        ? "IKADAの空室確認と宿泊リクエスト。ホスト確認後にカード支払いリンクを送ります。"
        : "Check availability and request a stay at IKADA. Card payment link is sent after host review.",
  });
}

export default async function BookingPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);
  const settings = await getSettings();
  const initialToday = new Date().toISOString().slice(0, 10);

  const steps = [
    {
      icon: CalendarCheck,
      title: locale === "ja" ? "日程を送る" : "Send dates",
      body: locale === "ja" ? "宿泊日、人数、連絡先を送信します。" : "Send your dates, group size, and contact details.",
    },
    {
      icon: MailCheck,
      title: locale === "ja" ? "ホスト確認" : "Host review",
      body: locale === "ja" ? "空き状況と滞在内容を確認します。" : "We check availability and whether the stay fits.",
    },
    {
      icon: CreditCard,
      title: locale === "ja" ? "カード決済" : "Card payment",
      body: locale === "ja" ? "宿泊可能な場合、Stripeの支払いリンクを送ります。" : "If approved, you receive a Stripe Checkout link.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={locale === "ja" ? "BOOKING" : "BOOKING"}
        title={copy.booking.title}
        body={copy.booking.intro}
        image={siteConfig.images.house}
        imageAlt="IKADA house in Sumiyo, Amami Oshima"
        compact
      />

      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow={locale === "ja" ? "HOW IT WORKS" : "HOW IT WORKS"}
              title={locale === "ja" ? "リクエストから確定まで" : "From request to confirmation"}
              body={copy.booking.pending}
            />
            <ol className="mt-8 space-y-0 border-l border-ink/12 pl-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[1.85rem] flex h-8 w-8 items-center justify-center rounded-full border border-ink/12 bg-shell text-rust">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/38">0{index + 1}</p>
                    <h2 className="mt-1 font-display text-2xl font-bold leading-tight">{step.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-ink/65">{step.body}</p>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 space-y-3">
              <div className="rounded-sm border border-sea/15 bg-sea/8 p-5">
                <ShieldCheck aria-hidden="true" className="h-5 w-5 text-sea" />
                <p className="mt-3 text-sm leading-7 text-ink/68">
                  {locale === "ja"
                    ? "カード情報はIKADAでは保存しません。支払いはStripe Checkoutで行います。"
                    : "IKADA never stores card details. Payment is handled through Stripe Checkout."}
                </p>
              </div>
              <p className="text-sm leading-7 text-ink/55">
                {locale === "ja"
                  ? "送信時点では予約確定・支払いは発生しません。"
                  : "Submitting the form does not confirm your booking or charge your card."}
              </p>
            </div>
          </div>
          <BookingForm locale={locale} settings={settings} initialToday={initialToday} />
        </Container>
      </section>
    </>
  );
}
