import { NextResponse } from "next/server";
import { buildIcal } from "@/lib/calendar";
import { listBlockedDates, listBookings } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const [bookings, blocks] = await Promise.all([listBookings(), listBlockedDates()]);
  return new NextResponse(buildIcal(bookings, blocks), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=ikada-calendar.ics",
    },
  });
}
