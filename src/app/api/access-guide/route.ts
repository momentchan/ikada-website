import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { getDataSnapshot } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = isLocale(url.searchParams.get("locale") ?? "") ? url.searchParams.get("locale")! : "en";
  const data = await getDataSnapshot();
  const text =
    locale === "ja"
      ? [
          "IKADA アクセスガイド",
          "",
          siteConfig.locationJa,
          siteConfig.email,
          "",
          data.houseInfo.accessGuide.ja,
          "",
          "注意: レンタカーを強くおすすめします。",
          "駐車場所やチェックイン詳細は予約確定後にお送りします。",
        ].join("\n")
      : [
          "IKADA Access Guide",
          "",
          siteConfig.location,
          siteConfig.email,
          "",
          data.houseInfo.accessGuide.en,
          "",
          "Important: rental car is strongly recommended.",
          "Parking and check-in details are sent after confirmation.",
        ].join("\n");

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename=ikada-access-${locale}.txt`,
    },
  });
}
