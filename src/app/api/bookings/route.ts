import { NextResponse } from "next/server";
import { sendBookingRequestEmails } from "@/lib/email";
import { createBooking } from "@/lib/store";
import { bookingRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingRequestSchema.parse(body);
    const booking = await createBooking(parsed);
    await sendBookingRequestEmails(booking, parsed.locale);
    return NextResponse.json({ ok: true, bookingId: booking.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create booking.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
