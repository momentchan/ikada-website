import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/privacy",
    title: locale === "ja" ? "プライバシーポリシー" : "Privacy Policy",
    description: locale === "ja" ? "IKADAの個人情報の取り扱い。" : "How IKADA handles guest information.",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <PolicyPage
      title={locale === "ja" ? "プライバシーポリシー" : "Privacy Policy"}
      intro={
        locale === "ja"
          ? "予約、連絡、決済、滞在サポートに必要な情報のみを扱います。"
          : "We collect only the information needed for booking, communication, payment, and stay support."
      }
      sections={[
        {
          title: locale === "ja" ? "取得する情報" : "Information Collected",
          body:
            locale === "ja"
              ? "名前、メール、電話番号、国・地域、宿泊日、人数、メッセージ、決済IDを保存します。カード情報は保存しません。"
              : "We store name, email, phone, country, dates, guest count, message, and payment IDs. We do not store raw card data.",
        },
        {
          title: locale === "ja" ? "利用目的" : "Purpose",
          body:
            locale === "ja"
              ? "予約管理、本人確認、支払い、到着前案内、緊急時対応、サービス改善に利用します。"
              : "We use this data for booking management, identification, payment, arrival guidance, emergencies, and service improvement.",
        },
        {
          title: locale === "ja" ? "外部サービス" : "Third-Party Services",
          body:
            locale === "ja"
              ? "決済はStripe、メール送信はResend、データベースはSupabaseまたは同等のPostgreSQLサービスを利用する予定です。"
              : "Payments use Stripe, emails use Resend, and the database is designed for Supabase or another PostgreSQL service.",
        },
      ]}
    />
  );
}
