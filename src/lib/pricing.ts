import { differenceInCalendarDays, parseISO } from "date-fns";
import type { HouseSettings, Quote } from "@/lib/types";

export function nightsBetween(checkIn: string, checkOut: string) {
  return differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
}

export function rangesOverlap(
  firstStart: string,
  firstEnd: string,
  secondStart: string,
  secondEnd: string,
) {
  return firstStart < secondEnd && secondStart < firstEnd;
}

export function calculateQuote(
  settings: HouseSettings,
  checkIn: string,
  checkOut: string,
  guests: number,
): Quote {
  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = settings.baseNightlyPrice * nights;
  const extraGuests = Math.max(0, guests - settings.extraGuestThreshold);
  const extraGuestFee = extraGuests * settings.extraGuestFee * nights;
  const cleaningFee = settings.cleaningFee;
  const eligibleForWeekly = nights >= 7;
  const discount = eligibleForWeekly
    ? Math.round((subtotal + extraGuestFee) * (settings.weeklyDiscountPercent / 100))
    : 0;

  return {
    nights,
    baseNightlyPrice: settings.baseNightlyPrice,
    subtotal,
    extraGuestFee,
    cleaningFee,
    discount,
    total: subtotal + extraGuestFee + cleaningFee - discount,
    currency: "jpy",
  };
}
