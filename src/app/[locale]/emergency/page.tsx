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
    path: "/emergency",
    title: locale === "ja" ? "緊急情報" : "Emergency Information",
    description:
      locale === "ja"
        ? "IKADA滞在中の緊急連絡先、ハブ、台風、大雨の注意。"
        : "Emergency contacts, habu snake, typhoon, and heavy rain notes for IKADA guests.",
  });
}

export default async function EmergencyPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const data = await getDataSnapshot();

  return (
    <PolicyPage
      title={locale === "ja" ? "緊急情報" : "Emergency Information"}
      intro={data.houseInfo.emergencyInfo[locale]}
      sections={[
        {
          title: locale === "ja" ? "緊急番号" : "Emergency Numbers",
          body:
            locale === "ja"
              ? "火事・救急: 119\n警察: 110\n住所や目印を落ち着いて伝えてください。"
              : "Fire or ambulance: 119\nPolice: 110\nStay calm and share the address or nearby landmark.",
        },
        {
          title: locale === "ja" ? "ハブ" : "Habu Snake Safety",
          body:
            locale === "ja"
              ? "夜道や草むらに注意し、ライトを使ってください。草むらや山道へ不用意に入らないでください。見つけても近づかないでください。"
              : "Use a light at night, avoid bushes and unmanaged forest paths, and do not approach snakes if seen.",
        },
        {
          title: locale === "ja" ? "台風・大雨" : "Typhoon And Heavy Rain",
          body:
            locale === "ja"
              ? "警報、避難情報、交通情報を確認してください。無理な移動や海・川への接近は避けてください。"
              : "Check weather warnings, evacuation information, and transport updates. Avoid unnecessary travel and stay away from rough sea or rivers.",
        },
      ]}
    />
  );
}
