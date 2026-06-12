import type { Metadata } from "next";
import { CalendarCheck, CreditCard, MailCheck } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
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

  const steps = [
    {
      icon: CalendarCheck,
      title: locale === "ja" ? "日程を送る" : "Send Dates",
      body: locale === "ja" ? "宿泊日、人数、連絡先を送信します。" : "Send your dates, group size, and contact details.",
    },
    {
      icon: MailCheck,
      title: locale === "ja" ? "ホスト確認" : "Host Review",
      body: locale === "ja" ? "空き状況と滞在内容を確認します。" : "We check availability and whether the stay fits.",
    },
    {
      icon: CreditCard,
      title: locale === "ja" ? "カード決済" : "Card Payment",
      body: locale === "ja" ? "宿泊可能な場合、Stripeの支払いリンクを送ります。" : "If approved, you receive a Stripe Checkout link.",
    },
  ];

  return (
    <section className="bg-paper py-16">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading title={copy.booking.title} body={copy.booking.intro} />
          <div className="mt-8 space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-lg border border-ink/10 bg-shell p-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-rust" />
                  <h2 className="mt-3 font-display text-2xl font-bold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/70">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
        <BookingForm locale={locale} settings={settings} />
      </Container>
    </section>
  );
}
