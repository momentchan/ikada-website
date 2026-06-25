import type { Metadata } from "next";
import { CalendarDays, Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
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
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          title={locale === "ja" ? "お問い合わせ" : "Contact"}
          body={
            locale === "ja"
              ? "予約前の質問、滞在相談、取材などはこちらへ。"
              : "Questions before booking, stay details, and media inquiries can start here."
          }
        />
        <div className="mt-10 rounded-sm border border-ink/8 bg-shell p-7 shadow-sm">
          <p className="flex items-center gap-3">
            <Mail aria-hidden="true" className="h-5 w-5 text-rust" />
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-sea underline-offset-4 hover:underline">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-4 flex items-start gap-3 text-ink/72">
            <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-rust" />
            {locale === "ja" ? siteConfig.locationJa : siteConfig.location}
          </p>
        </div>
        <div className="mt-8">
          <ButtonLink locale={locale} href="/booking" icon={CalendarDays}>
            {locale === "ja" ? "空室を確認" : "Check Availability"}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
