import "server-only";

import { Resend } from "resend";
import { niceDate, yen } from "@/lib/format";
import { getSiteUrl } from "@/lib/site";
import type { Booking, Locale } from "@/lib/types";

type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function resendClient() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

async function sendEmail(message: EmailMessage) {
  const from = process.env.EMAIL_FROM || "IKADA <ikada.amami@gmail.com>";
  const client = resendClient();
  if (!client) {
    console.info("[email:dry-run]", { from, ...message });
    return { id: "dry-run" };
  }

  return client.emails.send({
    from,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

function bookingSummary(booking: Booking, locale: Locale) {
  const dateLocale = locale === "ja" ? "ja" : "en";
  return [
    `${niceDate(booking.checkIn, dateLocale)} - ${niceDate(booking.checkOut, dateLocale)}`,
    `${booking.guests} guest${booking.guests === 1 ? "" : "s"}`,
    `${booking.quote.nights} night${booking.quote.nights === 1 ? "" : "s"}`,
    yen(booking.quote.total),
  ].join(" / ");
}

function shell(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1f2a25; line-height: 1.6; max-width: 640px;">
      <h1 style="font-family: Georgia, serif; font-size: 28px;">${title}</h1>
      ${body}
      <p style="margin-top: 32px; color: #617d46;">IKADA, Amami Oshima</p>
    </div>
  `;
}

export async function sendBookingRequestEmails(booking: Booking, locale: Locale) {
  const host = process.env.HOST_EMAIL;
  const summary = bookingSummary(booking, locale);

  await sendEmail({
    to: booking.guestEmail,
    subject: locale === "ja" ? "IKADAへの宿泊リクエストを受け付けました" : "We received your IKADA booking request",
    text: `Thank you for your request: ${summary}. We will check the dates and reply soon.`,
    html: shell(
      locale === "ja" ? "宿泊リクエストを受け付けました" : "Booking request received",
      `<p>${summary}</p><p>${
        locale === "ja"
          ? "日程を確認して、宿泊可能な場合は支払いリンクをお送りします。"
          : "We will check the dates and send a payment link if the stay works."
      }</p>`,
    ),
  });

  if (host) {
    await sendEmail({
      to: host,
      subject: `New IKADA booking request from ${booking.guestName}`,
      text: `${summary}\n${booking.guestName} <${booking.guestEmail}>\n${booking.message}`,
      html: shell(
        "New booking request",
        `<p>${summary}</p><p>${booking.guestName}<br>${booking.guestEmail}<br>${booking.guestPhone}</p><p>${booking.message}</p><p><a href="${getSiteUrl()}/admin/bookings">Open admin</a></p>`,
      ),
    });
  }
}

export async function sendPaymentRequestEmail(booking: Booking, locale: Locale) {
  const paymentUrl = `${getSiteUrl()}/${locale}/booking/pay/${booking.id}`;
  await sendEmail({
    to: booking.guestEmail,
    subject: locale === "ja" ? "IKADAのお支払いリンク" : "IKADA payment link",
    text: `Your dates are available. Pay here: ${paymentUrl}`,
    html: shell(
      locale === "ja" ? "お支払いリンク" : "Payment link",
      `<p>${bookingSummary(booking, locale)}</p><p>${
        locale === "ja"
          ? "日程を仮押さえしました。以下のリンクからお支払いをお願いします。"
          : "We held the dates. Please complete payment from the link below."
      }</p><p><a href="${paymentUrl}">${paymentUrl}</a></p>`,
    ),
  });
}

export async function sendBookingConfirmedEmail(booking: Booking, locale: Locale) {
  await sendEmail({
    to: booking.guestEmail,
    subject: locale === "ja" ? "IKADAの予約が確定しました" : "Your IKADA booking is confirmed",
    text: `Your booking is confirmed: ${bookingSummary(booking, locale)}. Guest guide: ${getSiteUrl()}/${locale}/guest-guide`,
    html: shell(
      locale === "ja" ? "予約が確定しました" : "Booking confirmed",
      `<p>${bookingSummary(booking, locale)}</p><p>${
        locale === "ja"
          ? "詳しい入室方法や滞在情報は到着前にお送りします。"
          : "Detailed entry and stay information will be sent before arrival."
      }</p>`,
    ),
  });
}

export async function sendBookingCancelledEmail(booking: Booking, locale: Locale) {
  await sendEmail({
    to: booking.guestEmail,
    subject: locale === "ja" ? "IKADAの予約リクエストについて" : "About your IKADA booking request",
    text: `Your booking status is now ${booking.status}.`,
    html: shell(
      locale === "ja" ? "予約ステータスの更新" : "Booking status updated",
      `<p>${bookingSummary(booking, locale)}</p><p>Status: ${booking.status}</p>`,
    ),
  });
}

export function preArrivalTemplate(locale: Locale) {
  return locale === "ja"
    ? "到着前のご案内: 住所、駐車場、入室方法、Wi-Fi、ごみ分別、緊急連絡先を含めて送信します。"
    : "Pre-arrival guide: include address, parking, entry, Wi-Fi, garbage rules, and emergency contacts.";
}

export function checkoutReminderTemplate(locale: Locale) {
  return locale === "ja"
    ? "チェックアウト前: 忘れ物確認、ごみ、戸締まり、エアコン、鍵の返却をご確認ください。"
    : "Before checkout: check belongings, garbage, locks, AC, and key return.";
}

export function reviewRequestTemplate(locale: Locale) {
  return locale === "ja"
    ? "ご滞在ありがとうございました。もしよければ感想をお聞かせください。"
    : "Thank you for staying at IKADA. We would love to hear how it felt.";
}
