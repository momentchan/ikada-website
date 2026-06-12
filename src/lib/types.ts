export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export type BookingStatus =
  | "pending"
  | "awaiting_payment"
  | "confirmed"
  | "cancelled"
  | "refunded"
  | "blocked";

export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";

export type GuideCategory =
  | "food"
  | "cafe"
  | "beach"
  | "nature"
  | "viewpoint"
  | "rainy_day"
  | "shop"
  | "useful";

export type LocalizedText = {
  en: string;
  ja: string;
};

export type Quote = {
  nights: number;
  baseNightlyPrice: number;
  subtotal: number;
  extraGuestFee: number;
  cleaningFee: number;
  discount: number;
  total: number;
  currency: "jpy";
};

export type HouseSettings = {
  listingId: string;
  listingName: string;
  baseNightlyPrice: number;
  cleaningFee: number;
  extraGuestFee: number;
  extraGuestThreshold: number;
  weeklyDiscountPercent: number;
  maxGuests: number;
  checkInTime: string;
  checkOutTime: string;
  minNights: number;
  currency: "jpy";
  airbnbIcalUrl?: string;
  bookingPolicy: LocalizedText;
  cancellationPolicy: LocalizedText;
};

export type Booking = {
  id: string;
  listingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  country: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  quote: Quote;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingRequest = {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  country: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  acceptedRules: boolean;
  locale: Locale;
};

export type BlockedDate = {
  id: string;
  listingId: string;
  startDate: string;
  endDate: string;
  reason: string;
  createdAt: string;
};

export type GuideSpot = {
  id: string;
  category: GuideCategory;
  name: LocalizedText;
  distance: LocalizedText;
  description: LocalizedText;
  recommendation: LocalizedText;
  mapUrl: string;
  sourceUrl?: string;
  isPublished: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type FaqItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  isPublished: boolean;
  sortOrder: number;
};

export type HouseInfo = {
  headline: LocalizedText;
  description: LocalizedText;
  facilities: Array<{
    key: string;
    label: LocalizedText;
    value: LocalizedText;
  }>;
  rules: Array<{
    key: string;
    label: LocalizedText;
    description: LocalizedText;
  }>;
  accessGuide: LocalizedText;
  emergencyInfo: LocalizedText;
};

export type IkadaData = {
  settings: HouseSettings;
  bookings: Booking[];
  blockedDates: BlockedDate[];
  guideSpots: GuideSpot[];
  faqItems: FaqItem[];
  houseInfo: HouseInfo;
};
