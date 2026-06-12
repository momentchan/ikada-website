import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";
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
          data.houseInfo.accessGuide.ja,
          "",
          "注意: レンタカーを強くおすすめします。",
          "正確な住所と駐車場所は予約確定後にお送りします。",
        ].join("\n")
      : [
          "IKADA Access Guide",
          "",
          data.houseInfo.accessGuide.en,
          "",
          "Important: rental car is strongly recommended.",
          "Exact address and parking details are sent after confirmation.",
        ].join("\n");

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename=ikada-access-${locale}.txt`,
    },
  });
}
