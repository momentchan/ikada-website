import { NextResponse } from "next/server";
import { isDateRangeAvailable } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const checkIn = url.searchParams.get("checkIn") ?? "";
  const checkOut = url.searchParams.get("checkOut") ?? "";
  if (!checkIn || !checkOut) {
    return NextResponse.json({ ok: false, available: false, message: "Missing dates." }, { status: 400 });
  }
  const available = await isDateRangeAvailable(checkIn, checkOut);
  return NextResponse.json({ ok: true, available });
}
