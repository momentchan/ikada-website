"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, requireAdmin, setAdminSession, verifyAdminPassword } from "@/lib/admin-auth";
import {
  createBlockedDate,
  deleteBlockedDate,
  deleteGuideSpot,
  getBooking,
  getSettings,
  updateBooking,
  updateSettings,
  upsertGuideSpot,
} from "@/lib/store";
import { blockedDateSchema, guideSpotSchema, settingsSchema } from "@/lib/validation";
import {
  sendBookingCancelledEmail,
  sendBookingConfirmedEmail,
  sendPaymentRequestEmail,
} from "@/lib/email";
import type { GuideSpot, Locale } from "@/lib/types";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await setAdminSession();
  redirect("/admin/bookings");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function approveAndRequestPaymentAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const locale: Locale = String(formData.get("locale") ?? "en") === "ja" ? "ja" : "en";
  const booking = await updateBooking(id, { status: "awaiting_payment", paymentStatus: "unpaid" });
  await sendPaymentRequestEmail(booking, locale);
  revalidatePath("/admin/bookings");
}

export async function markConfirmedAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const locale: Locale = String(formData.get("locale") ?? "en") === "ja" ? "ja" : "en";
  const booking = await updateBooking(id, { status: "confirmed" });
  await sendBookingConfirmedEmail(booking, locale);
  revalidatePath("/admin/bookings");
}

export async function cancelBookingAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const locale: Locale = String(formData.get("locale") ?? "en") === "ja" ? "ja" : "en";
  const booking = await updateBooking(id, { status: "cancelled" });
  await sendBookingCancelledEmail(booking, locale);
  revalidatePath("/admin/bookings");
}

export async function markRefundedAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await updateBooking(id, { status: "refunded", paymentStatus: "refunded" });
  revalidatePath("/admin/bookings");
}

export async function addBlockedDateAction(formData: FormData) {
  await requireAdmin();
  const parsed = blockedDateSchema.parse(Object.fromEntries(formData.entries()));
  await createBlockedDate(parsed);
  revalidatePath("/admin/blocks");
  revalidatePath("/api/calendar");
}

export async function deleteBlockedDateAction(formData: FormData) {
  await requireAdmin();
  await deleteBlockedDate(String(formData.get("id") ?? ""));
  revalidatePath("/admin/blocks");
  revalidatePath("/api/calendar");
}

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin();
  const parsed = settingsSchema.parse(Object.fromEntries(formData.entries()));
  const current = await getSettings();
  await updateSettings({
    ...current,
    baseNightlyPrice: parsed.baseNightlyPrice,
    cleaningFee: parsed.cleaningFee,
    extraGuestFee: parsed.extraGuestFee,
    extraGuestThreshold: parsed.extraGuestThreshold,
    weeklyDiscountPercent: parsed.weeklyDiscountPercent,
    maxGuests: parsed.maxGuests,
    checkInTime: parsed.checkInTime,
    checkOutTime: parsed.checkOutTime,
    minNights: parsed.minNights,
    airbnbIcalUrl: parsed.airbnbIcalUrl || "",
    bookingPolicy: {
      en: parsed.bookingPolicyEn,
      ja: parsed.bookingPolicyJa,
    },
    cancellationPolicy: {
      en: parsed.cancellationPolicyEn,
      ja: parsed.cancellationPolicyJa,
    },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/en/booking");
  revalidatePath("/ja/booking");
}

export async function upsertGuideSpotAction(formData: FormData) {
  await requireAdmin();
  const parsed = guideSpotSchema.parse(Object.fromEntries(formData.entries()));
  const spot: GuideSpot = {
    id: parsed.id || crypto.randomUUID(),
    category: parsed.category,
    name: {
      en: parsed.nameEn,
      ja: parsed.nameJa,
    },
    distance: {
      en: parsed.distanceEn,
      ja: parsed.distanceJa,
    },
    description: {
      en: parsed.descriptionEn,
      ja: parsed.descriptionJa,
    },
    recommendation: {
      en: parsed.recommendationEn,
      ja: parsed.recommendationJa,
    },
    mapUrl: parsed.mapUrl,
    sourceUrl: parsed.sourceUrl || "",
    isPublished: parsed.isPublished,
    sortOrder: parsed.sortOrder,
    updatedAt: new Date().toISOString(),
  };
  await upsertGuideSpot(spot);
  revalidatePath("/admin/guide");
  revalidatePath("/en/guide");
  revalidatePath("/ja/guide");
}

export async function deleteGuideSpotAction(formData: FormData) {
  await requireAdmin();
  await deleteGuideSpot(String(formData.get("id") ?? ""));
  revalidatePath("/admin/guide");
  revalidatePath("/en/guide");
  revalidatePath("/ja/guide");
}

export async function refreshBookingAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await getBooking(id);
  revalidatePath("/admin/bookings");
}
