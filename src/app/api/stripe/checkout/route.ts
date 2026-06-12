import { NextResponse } from "next/server";
import { createCheckoutSession, stripeConfigured } from "@/lib/stripe";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  bookingId: z.string().min(1),
  locale: z.enum(["en", "ja"]),
});

export async function POST(request: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json(
      { message: "Stripe is not configured. Set STRIPE_SECRET_KEY first." },
      { status: 503 },
    );
  }

  try {
    const parsed = schema.parse(await request.json());
    const session = await createCheckoutSession(parsed.bookingId, parsed.locale);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not start Stripe Checkout.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
