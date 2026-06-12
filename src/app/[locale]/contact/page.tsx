import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
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
    path: "/contact",
    title: locale === "ja" ? "お問い合わせ" : "Contact",
    description: locale === "ja" ? "IKADAへのお問い合わせ。" : "Contact IKADA.",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <section className="bg-paper py-16">
      <Container className="max-w-3xl">
        <SectionHeading
          title={locale === "ja" ? "お問い合わせ" : "Contact"}
          body={
            locale === "ja"
              ? "予約前の質問、滞在相談、取材などはこちらへ。"
              : "Questions before booking, stay details, and media inquiries can start here."
          }
        />
        <div className="mt-8 rounded-lg border border-ink/10 bg-shell p-5">
          <p className="flex items-center gap-2">
            <Mail aria-hidden="true" className="h-5 w-5 text-rust" />
            {siteConfig.email}
          </p>
          <p className="mt-3 flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-5 w-5 text-rust" />
            {siteConfig.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
