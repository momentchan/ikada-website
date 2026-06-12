import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/terms",
    title: locale === "ja" ? "予約条件" : "Terms Of Booking",
    description: locale === "ja" ? "IKADAの予約条件。" : "IKADA terms of booking.",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const settings = await getSettings();

  return (
    <PolicyPage
      title={locale === "ja" ? "予約条件" : "Terms Of Booking"}
      intro={settings.bookingPolicy[locale]}
      sections={[
        {
          title: locale === "ja" ? "予約確定" : "Confirmation",
          body:
            locale === "ja"
              ? "予約はホスト承認とStripe決済完了後に確定します。"
              : "Bookings are confirmed after host approval and successful Stripe payment.",
        },
        {
          title: locale === "ja" ? "宿泊者情報" : "Guest Information",
          body:
            locale === "ja"
              ? "正確な連絡先、人数、到着予定をお知らせください。人数変更は事前相談が必要です。"
              : "Please provide accurate contact details, guest count, and arrival plans. Guest count changes require prior approval.",
        },
      ]}
    />
  );
}
