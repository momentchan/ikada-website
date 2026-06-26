import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PaymentButton } from "@/components/PaymentButton";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale } from "@/lib/i18n";
import { niceDate, yen } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { stripeConfigured } from "@/lib/stripe";
import { getBooking } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/booking",
    title: locale === "ja" ? "お支払い" : "Payment",
    description: locale === "ja" ? "IKADA予約のお支払いページ。" : "Payment page for an IKADA booking.",
  });
}

export default async function PayPage({ params }: Props) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const booking = await getBooking(id);
  if (!booking) notFound();

  return (
    <section className="bg-paper py-16">
      <Container className="max-w-3xl">
        <SectionHeading
          title={locale === "ja" ? "お支払い" : "Payment"}
          body={
            locale === "ja"
              ? "内容を確認して、カード決済へ進んでください。"
              : "Review the stay details and continue to secure card payment."
          }
        />
        <div className="mt-8 surface-card p-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-bold text-ink/55">{locale === "ja" ? "日程" : "Dates"}</dt>
              <dd className="mt-1 font-semibold">
                {niceDate(booking.checkIn, locale)} - {niceDate(booking.checkOut, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-ink/55">{locale === "ja" ? "人数" : "Guests"}</dt>
              <dd className="mt-1 font-semibold">{booking.guests}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-ink/55">{locale === "ja" ? "泊数" : "Nights"}</dt>
              <dd className="mt-1 font-semibold">{booking.quote.nights}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-ink/55">{locale === "ja" ? "合計" : "Total"}</dt>
              <dd className="mt-1 font-display text-3xl font-bold">{yen(booking.quote.total)}</dd>
            </div>
          </dl>
          <div className="mt-6">
            {stripeConfigured() ? (
              <PaymentButton bookingId={booking.id} locale={locale} />
            ) : (
              <p className="rounded-lg bg-paper p-4 text-sm leading-7 text-ink/75">
                {locale === "ja"
                  ? "Stripeの環境変数が未設定です。本番前にSTRIPE_SECRET_KEYとWebhookを設定してください。"
                  : "Stripe environment variables are not configured yet. Set STRIPE_SECRET_KEY and the webhook before production payment."}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
