import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getDataSnapshot } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/house-rules",
    title: locale === "ja" ? "ハウスルール" : "House Rules",
    description: locale === "ja" ? "IKADAのハウスルール。" : "IKADA house rules.",
  });
}

export default async function HouseRulesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const data = await getDataSnapshot();

  return (
    <PolicyPage
      title={locale === "ja" ? "ハウスルール" : "House Rules"}
      intro={
        locale === "ja"
          ? "IKADAは集落の中にある小さな家です。静けさ、自然、ごみ分別への配慮をお願いします。"
          : "IKADA is a small house in a rural neighborhood. Please respect quiet hours, nature, and island waste rules."
      }
      sections={data.houseInfo.rules.map((rule) => ({
        title: rule.label[locale],
        body: rule.description[locale],
      }))}
    />
  );
}
