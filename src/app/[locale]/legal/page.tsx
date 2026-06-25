import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/legal",
    title: locale === "ja" ? "特定商取引法に基づく表記" : "Legal / Commercial Disclosure",
    description:
      locale === "ja"
        ? "IKADAの特定商取引法に基づく表記プレースホルダー。"
        : "Placeholder commercial disclosure information for IKADA.",
  });
}

export default async function LegalPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <PolicyPage
      title={locale === "ja" ? "特定商取引法に基づく表記" : "Legal / Commercial Disclosure"}
      intro={
        locale === "ja"
          ? "直接決済を行う場合に必要な事業者情報のプレースホルダーです。公開前に正確な情報と法的確認を入れてください。"
          : "Placeholder business information for direct payments. Confirm exact legal requirements before publishing."
      }
      sections={[
        {
          title: locale === "ja" ? "事業者名" : "Business Name",
          body: "IKADA / Placeholder",
        },
        {
          title: locale === "ja" ? "所在地" : "Address",
          body: locale === "ja" ? siteConfig.locationJa : siteConfig.location,
        },
        {
          title: locale === "ja" ? "連絡先" : "Contact",
          body: `${siteConfig.email} / Phone number placeholder`,
        },
        {
          title: locale === "ja" ? "販売価格・追加料金" : "Prices And Fees",
          body:
            locale === "ja"
              ? "宿泊料金、清掃費、追加人数料金、税金等は予約画面または支払い画面に表示します。"
              : "Nightly price, cleaning fee, extra guest fee, taxes, and other charges are shown on booking or payment screens.",
        },
        {
          title: locale === "ja" ? "支払方法" : "Payment Method",
          body: "Credit card via Stripe Checkout.",
        },
      ]}
    />
  );
}
