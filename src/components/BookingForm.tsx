"use client";

import { useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import type { HouseSettings, Locale } from "@/lib/types";
import { calculateQuote, nightsBetween } from "@/lib/pricing";
import { yen } from "@/lib/format";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function BookingForm({ locale, settings }: { locale: Locale; settings: HouseSettings }) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const quote = useMemo(() => {
    if (!checkIn || !checkOut || nightsBetween(checkIn, checkOut) <= 0) return null;
    return calculateQuote(settings, checkIn, checkOut, guests);
  }, [checkIn, checkOut, guests, settings]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, guests, checkIn, checkOut, locale }),
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !result.ok) {
      setState({
        status: "error",
        message:
          result.message ||
          (locale === "ja" ? "送信できませんでした。内容を確認してください。" : "Could not send the request. Please check the details."),
      });
      return;
    }

    event.currentTarget.reset();
    setCheckIn("");
    setCheckOut("");
    setGuests(2);
    setState({
      status: "success",
      message:
        locale === "ja"
          ? "リクエストを受け付けました。日程確認後にご連絡します。"
          : "Request received. We will check the dates and reply soon.",
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-ink/10 bg-shell p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          {locale === "ja" ? "チェックイン" : "Check-in"}
          <input
            required
            type="date"
            name="checkIn"
            min={today}
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          {locale === "ja" ? "チェックアウト" : "Check-out"}
          <input
            required
            type="date"
            name="checkOut"
            min={checkIn || today}
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          {locale === "ja" ? "人数" : "Guests"}
          <input
            required
            type="number"
            name="guests"
            min={1}
            max={settings.maxGuests}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          {locale === "ja" ? "国・地域" : "Country"}
          <input
            required
            name="country"
            autoComplete="country-name"
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          {locale === "ja" ? "名前" : "Name"}
          <input
            required
            name="guestName"
            autoComplete="name"
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          {locale === "ja" ? "メール" : "Email"}
          <input
            required
            type="email"
            name="guestEmail"
            autoComplete="email"
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75 sm:col-span-2">
          {locale === "ja" ? "電話番号" : "Phone"}
          <input
            required
            name="guestPhone"
            autoComplete="tel"
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75 sm:col-span-2">
          {locale === "ja" ? "旅の目的・メッセージ" : "Message / purpose of trip"}
          <textarea
            name="message"
            rows={5}
            className="rounded-lg border border-ink/15 bg-white px-3 py-3 text-ink"
          />
        </label>
      </div>

      {quote ? (
        <div className="mt-5 rounded-lg bg-paper p-4 text-sm text-ink/75">
          <div className="flex items-center justify-between gap-3">
            <span>
              {quote.nights} {locale === "ja" ? "泊の概算" : quote.nights === 1 ? "night estimate" : "nights estimate"}
            </span>
            <strong className="text-lg text-ink">{yen(quote.total)}</strong>
          </div>
          <p className="mt-1">
            {locale === "ja"
              ? "確定料金はホスト確認後の支払いリンクで確認できます。"
              : "Final payment is confirmed from the payment link after host review."}
          </p>
        </div>
      ) : null}

      <label className="mt-5 flex gap-3 text-sm leading-6 text-ink/75">
        <input required type="checkbox" name="acceptedRules" value="true" className="mt-1 h-4 w-4 rounded border-ink/20" />
        <span>
          {locale === "ja"
            ? "ハウスルール、キャンセルポリシー、自然環境への注意を確認しました。"
            : "I have read the house rules, cancellation policy, and rural nature notes."}
        </span>
      </label>

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-shell transition hover:bg-charcoal disabled:cursor-wait disabled:opacity-65 sm:w-auto"
      >
        {state.status === "loading" ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Send aria-hidden="true" className="h-4 w-4" />}
        {locale === "ja" ? "リクエストを送る" : "Send Request"}
      </button>

      {state.status === "success" || state.status === "error" ? (
        <p className={state.status === "success" ? "mt-4 text-sm font-semibold text-moss" : "mt-4 text-sm font-semibold text-rust"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
