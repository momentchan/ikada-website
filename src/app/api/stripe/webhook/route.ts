import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendBookingConfirmedEmail } from "@/lib/email";
import { stripeClient } from "@/lib/stripe";
import { updateBooking } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ message: "Webhook secret is not configured." }, { status: 400 });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ message: "Missing Stripe signature." }, { status: 400 });
  }

  try {
    const stripe = stripeClient();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId || session.client_reference_id;
      if (bookingId) {
        const updated = await updateBooking(bookingId, {
          status: "confirmed",
          paymentStatus: "paid",
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : undefined,
        });
        await sendBookingConfirmedEmail(updated, "en");
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId || session.client_reference_id;
      if (bookingId) {
        await updateBooking(bookingId, { paymentStatus: "failed" });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
