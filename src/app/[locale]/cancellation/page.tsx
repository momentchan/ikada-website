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
    path: "/cancellation",
    title: locale === "ja" ? "キャンセルポリシー" : "Cancellation Policy",
    description: locale === "ja" ? "IKADAのキャンセルと返金について。" : "IKADA cancellation and refund policy.",
  });
}

export default async function CancellationPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const settings = await getSettings();

  return (
    <PolicyPage
      title={locale === "ja" ? "キャンセルポリシー" : "Cancellation Policy"}
      intro={settings.cancellationPolicy[locale]}
      sections={[
        {
          title: locale === "ja" ? "天候・交通" : "Weather And Transport",
          body:
            locale === "ja"
              ? "台風、欠航、通行止めなどがある場合は、状況を確認した上で個別に相談します。"
              : "For typhoons, flight or ferry cancellations, and road closures, we review the situation case by case.",
        },
        {
          title: locale === "ja" ? "返金" : "Refunds",
          body:
            locale === "ja"
              ? "返金手続きはStripeの決済状況と手数料により変わります。管理画面からステータスを更新できます。"
              : "Refund handling depends on Stripe payment state and fees. Admin can mark refund status after processing.",
        },
      ]}
    />
  );
}
