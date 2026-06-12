"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/types";

export function PaymentButton({ bookingId, locale }: { bookingId: string; locale: Locale }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, locale }),
    });
    const result = (await response.json()) as { url?: string; message?: string };
    setLoading(false);

    if (!response.ok || !result.url) {
      setMessage(
        result.message ||
          (locale === "ja"
            ? "支払いページを開始できませんでした。"
            : "Could not start the payment page."),
      );
      return;
    }
    window.location.href = result.url;
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2 text-sm font-bold text-shell transition hover:bg-charcoal disabled:cursor-wait disabled:opacity-65"
      >
        {loading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <CreditCard aria-hidden="true" className="h-4 w-4" />}
        {locale === "ja" ? "カードで支払う" : "Pay By Card"}
      </button>
      {message ? <p className="mt-3 text-sm font-semibold text-rust">{message}</p> : null}
    </div>
  );
}
