import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, KeyRound, Trash2, Wifi } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getDataSnapshot } from "@/lib/store";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/guest-guide",
    title: locale === "ja" ? "ゲストガイド" : "Guest Guide",
    description:
      locale === "ja"
        ? "IKADA滞在中のWi-Fi、家電、ごみ、騒音、チェックアウト、緊急情報。"
        : "IKADA guest information for Wi-Fi, appliances, garbage, noise, checkout, and emergencies.",
  });
}

export default async function GuestGuidePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = t(locale);
  const data = await getDataSnapshot();

  const items = [
    {
      icon: KeyRound,
      title: locale === "ja" ? "入室方法" : "House Entry",
      body:
        locale === "ja"
          ? "鍵の場所や暗証番号などの詳細は公開していません。予約確定後のメールでご案内します。"
          : "Sensitive entry details are not public. Confirmed guests receive them by email.",
    },
    {
      icon: Wifi,
      title: "Wi-Fi",
      body:
        locale === "ja"
          ? "Wi-Fi情報は室内と到着前メールで確認できます。天候により通信が不安定になる場合があります。"
          : "Wi-Fi details are shared inside the house and by pre-arrival email. Island weather can affect stability.",
    },
    {
      icon: Trash2,
      title: locale === "ja" ? "ごみ" : "Garbage",
      body:
        locale === "ja"
          ? "島の分別ルールに従ってください。チェックアウト前に指定場所へまとめてください。"
          : "Please follow island sorting rules and place garbage in the instructed area before checkout.",
    },
    {
      icon: CheckCircle2,
      title: locale === "ja" ? "チェックアウト" : "Before Checkout",
      body:
        locale === "ja"
          ? "忘れ物、火元、エアコン、戸締まり、鍵の返却、ごみを確認してください。"
          : "Check belongings, heat sources, AC, locks, key return, and garbage before leaving.",
    },
    {
      icon: AlertTriangle,
      title: locale === "ja" ? "緊急・自然" : "Emergency And Nature",
      body: data.houseInfo.emergencyInfo[locale],
    },
  ];

  return (
    <section className="bg-paper py-16">
      <Container>
        <SectionHeading title={copy.guestGuide.title} body={copy.guestGuide.publicNote} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-ink/10 bg-shell p-5">
                <Icon aria-hidden="true" className="h-6 w-6 text-rust" />
                <h2 className="mt-4 font-display text-2xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/72">{item.body}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
