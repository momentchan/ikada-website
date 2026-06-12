import "server-only";

import Stripe from "stripe";
import { getBooking, updateBooking } from "@/lib/store";
import { getSiteUrl } from "@/lib/site";
import type { Locale } from "@/lib/types";

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function createCheckoutSession(bookingId: string, locale: Locale) {
  const booking = await getBooking(bookingId);
  if (!booking) {
    throw new Error("Booking not found.");
  }
  if (booking.status !== "awaiting_payment" && booking.status !== "pending") {
    throw new Error("Booking is not awaiting payment.");
  }

  const stripe = stripeClient();
  const siteUrl = getSiteUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: booking.guestEmail,
    client_reference_id: booking.id,
    metadata: {
      bookingId: booking.id,
      listingId: booking.listingId,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "jpy",
          unit_amount: booking.quote.total,
          product_data: {
            name: `IKADA stay: ${booking.checkIn} - ${booking.checkOut}`,
            description: `${booking.quote.nights} nights, ${booking.guests} guests`,
          },
        },
      },
    ],
    success_url: `${siteUrl}/${locale}/booking/success?booking=${booking.id}`,
    cancel_url: `${siteUrl}/${locale}/booking/pay/${booking.id}?cancelled=1`,
  });

  await updateBooking(booking.id, {
    status: "awaiting_payment",
    paymentStatus: "unpaid",
    stripeCheckoutSessionId: session.id,
  });

  return session;
}
