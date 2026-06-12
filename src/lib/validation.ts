import { z } from "zod";
import { locales } from "@/lib/types";

export const bookingRequestSchema = z.object({
  guestName: z.string().min(2).max(120),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(5).max(60),
  country: z.string().min(2).max(80),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.coerce.number().int().min(1).max(12),
  message: z.string().max(1200).default(""),
  acceptedRules: z.coerce.boolean(),
  locale: z.enum(locales),
});

export const settingsSchema = z.object({
  baseNightlyPrice: z.coerce.number().int().min(1000),
  cleaningFee: z.coerce.number().int().min(0),
  extraGuestFee: z.coerce.number().int().min(0),
  extraGuestThreshold: z.coerce.number().int().min(1),
  weeklyDiscountPercent: z.coerce.number().int().min(0).max(50),
  maxGuests: z.coerce.number().int().min(1).max(20),
  checkInTime: z.string().min(1).max(20),
  checkOutTime: z.string().min(1).max(20),
  minNights: z.coerce.number().int().min(1).max(30),
  airbnbIcalUrl: z.string().url().optional().or(z.literal("")),
  bookingPolicyEn: z.string().min(1).max(4000),
  bookingPolicyJa: z.string().min(1).max(4000),
  cancellationPolicyEn: z.string().min(1).max(4000),
  cancellationPolicyJa: z.string().min(1).max(4000),
});

export const blockedDateSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().min(1).max(200),
});

export const guideSpotSchema = z.object({
  id: z.string().optional(),
  category: z.enum([
    "food",
    "cafe",
    "beach",
    "nature",
    "viewpoint",
    "rainy_day",
    "shop",
    "useful",
  ]),
  nameEn: z.string().min(1).max(120),
  nameJa: z.string().min(1).max(120),
  distanceEn: z.string().min(1).max(120),
  distanceJa: z.string().min(1).max(120),
  descriptionEn: z.string().min(1).max(600),
  descriptionJa: z.string().min(1).max(600),
  recommendationEn: z.string().min(1).max(600),
  recommendationJa: z.string().min(1).max(600),
  mapUrl: z.string().url(),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().min(0).default(0),
});
