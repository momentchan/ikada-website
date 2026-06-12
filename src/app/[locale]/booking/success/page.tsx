import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildMetadata({
    locale,
    path: "/booking/success",
    title: locale === "ja" ? "予約完了" : "Booking Success",
    description: locale === "ja" ? "IKADA予約決済完了ページ。" : "IKADA booking payment success page.",
  });
}

export default async function SuccessPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <section className="bg-paper py-20">
      <Container className="max-w-2xl text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-moss" />
        <h1 className="mt-5 font-display text-5xl font-bold">
          {locale === "ja" ? "ありがとうございます" : "Thank You"}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/72">
          {locale === "ja"
            ? "お支払いが完了した場合、予約確認メールをお送りします。入室詳細は到着前にお送りします。"
            : "If payment completed successfully, a confirmation email will be sent. Detailed entry information follows before arrival."}
        </p>
        <div className="mt-8">
          <ButtonLink locale={locale} href="/guest-guide">
            {locale === "ja" ? "ゲストガイドを見る" : "View Guest Guide"}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
