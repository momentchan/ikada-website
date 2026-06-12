import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { defaultData, defaultSettings } from "@/lib/default-data";
import { calculateQuote, nightsBetween, rangesOverlap } from "@/lib/pricing";
import type {
  BlockedDate,
  Booking,
  BookingRequest,
  BookingStatus,
  GuideSpot,
  HouseSettings,
  IkadaData,
  PaymentStatus,
} from "@/lib/types";

const activeBookingStatuses: BookingStatus[] = [
  "pending",
  "awaiting_payment",
  "confirmed",
];

type SupabaseRow = Record<string, unknown>;

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function supabase() {
  return createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

function dataPath() {
  return path.join(process.cwd(), ".data", "ikada-store.json");
}

function cloneDefaultData(): IkadaData {
  return JSON.parse(JSON.stringify(defaultData)) as IkadaData;
}

async function readFileData(): Promise<IkadaData> {
  const file = dataPath();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Partial<IkadaData>;
    return {
      ...cloneDefaultData(),
      ...parsed,
      settings: { ...defaultSettings, ...parsed.settings },
      bookings: parsed.bookings ?? [],
      blockedDates: parsed.blockedDates ?? [],
      guideSpots: parsed.guideSpots ?? defaultData.guideSpots,
      faqItems: parsed.faqItems ?? defaultData.faqItems,
      houseInfo: parsed.houseInfo ?? defaultData.houseInfo,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
    const fresh = cloneDefaultData();
    await writeFileData(fresh);
    return fresh;
  }
}

async function writeFileData(data: IkadaData) {
  const file = dataPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function rowToBooking(row: SupabaseRow): Booking {
  return {
    id: String(row.id),
    listingId: String(row.listing_id),
    guestName: String(row.guest_name),
    guestEmail: String(row.guest_email),
    guestPhone: String(row.guest_phone ?? ""),
    country: String(row.country ?? ""),
    checkIn: String(row.check_in),
    checkOut: String(row.check_out),
    guests: Number(row.guests),
    message: String(row.message ?? ""),
    status: row.status as BookingStatus,
    paymentStatus: row.payment_status as PaymentStatus,
    quote: row.quote as Booking["quote"],
    stripeCheckoutSessionId: row.stripe_checkout_session_id
      ? String(row.stripe_checkout_session_id)
      : undefined,
    stripePaymentIntentId: row.stripe_payment_intent_id
      ? String(row.stripe_payment_intent_id)
      : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function bookingToRow(booking: Booking): SupabaseRow {
  return {
    id: booking.id,
    listing_id: booking.listingId,
    guest_name: booking.guestName,
    guest_email: booking.guestEmail,
    guest_phone: booking.guestPhone,
    country: booking.country,
    check_in: booking.checkIn,
    check_out: booking.checkOut,
    guests: booking.guests,
    message: booking.message,
    status: booking.status,
    payment_status: booking.paymentStatus,
    quote: booking.quote,
    stripe_checkout_session_id: booking.stripeCheckoutSessionId ?? null,
    stripe_payment_intent_id: booking.stripePaymentIntentId ?? null,
    created_at: booking.createdAt,
    updated_at: booking.updatedAt,
  };
}

function rowToBlock(row: SupabaseRow): BlockedDate {
  return {
    id: String(row.id),
    listingId: String(row.listing_id),
    startDate: String(row.start_date),
    endDate: String(row.end_date),
    reason: String(row.reason ?? ""),
    createdAt: String(row.created_at),
  };
}

function blockToRow(block: BlockedDate): SupabaseRow {
  return {
    id: block.id,
    listing_id: block.listingId,
    start_date: block.startDate,
    end_date: block.endDate,
    reason: block.reason,
    created_at: block.createdAt,
  };
}

function rowToGuideSpot(row: SupabaseRow): GuideSpot {
  return {
    id: String(row.id),
    category: row.category as GuideSpot["category"],
    name: row.name as GuideSpot["name"],
    distance: row.distance as GuideSpot["distance"],
    description: row.description as GuideSpot["description"],
    recommendation: row.recommendation as GuideSpot["recommendation"],
    mapUrl: String(row.map_url),
    sourceUrl: row.source_url ? String(row.source_url) : undefined,
    isPublished: Boolean(row.is_published),
    sortOrder: Number(row.sort_order),
    updatedAt: String(row.updated_at),
  };
}

function guideSpotToRow(spot: GuideSpot): SupabaseRow {
  return {
    id: spot.id,
    category: spot.category,
    name: spot.name,
    distance: spot.distance,
    description: spot.description,
    recommendation: spot.recommendation,
    map_url: spot.mapUrl,
    source_url: spot.sourceUrl ?? null,
    is_published: spot.isPublished,
    sort_order: spot.sortOrder,
    updated_at: spot.updatedAt,
  };
}

async function listSupabaseBookings() {
  const { data, error } = await supabase()
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => rowToBooking(row));
}

async function listSupabaseBlocks() {
  const { data, error } = await supabase()
    .from("blocked_dates")
    .select("*")
    .order("start_date", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => rowToBlock(row));
}

export function getStoreMode() {
  return hasSupabaseConfig() ? "supabase" : "local-file";
}

export async function getDataSnapshot(): Promise<IkadaData> {
  if (!hasSupabaseConfig()) {
    return readFileData();
  }

  const [bookings, blockedDates, guideSpots, settings] = await Promise.all([
    listSupabaseBookings(),
    listSupabaseBlocks(),
    listGuideSpots({ includeDrafts: true }),
    getSettings(),
  ]);

  return {
    ...cloneDefaultData(),
    settings,
    bookings,
    blockedDates,
    guideSpots,
  };
}

export async function getSettings(): Promise<HouseSettings> {
  if (!hasSupabaseConfig()) {
    return (await readFileData()).settings;
  }

  const { data, error } = await supabase()
    .from("settings")
    .select("value")
    .eq("key", "house_settings")
    .maybeSingle();
  if (error) throw error;
  return data?.value ? ({ ...defaultSettings, ...data.value } as HouseSettings) : defaultSettings;
}

export async function updateSettings(input: HouseSettings) {
  const settings = { ...input, currency: "jpy" as const };
  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    data.settings = settings;
    await writeFileData(data);
    return settings;
  }

  const { error } = await supabase()
    .from("settings")
    .upsert({
      key: "house_settings",
      value: settings,
      updated_at: new Date().toISOString(),
    });
  if (error) throw error;
  return settings;
}

export async function listBookings() {
  if (hasSupabaseConfig()) {
    return listSupabaseBookings();
  }
  const data = await readFileData();
  return [...data.bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getBooking(id: string) {
  if (hasSupabaseConfig()) {
    const { data, error } = await supabase()
      .from("bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToBooking(data) : null;
  }
  const data = await readFileData();
  return data.bookings.find((booking) => booking.id === id) ?? null;
}

export async function isDateRangeAvailable(
  checkIn: string,
  checkOut: string,
  ignoreBookingId?: string,
) {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) {
    return false;
  }

  const [bookings, blockedDates] = await Promise.all([listBookings(), listBlockedDates()]);
  const conflictsWithBooking = bookings.some((booking) => {
    if (booking.id === ignoreBookingId) return false;
    if (!activeBookingStatuses.includes(booking.status)) return false;
    return rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut);
  });
  const conflictsWithBlock = blockedDates.some((block) =>
    rangesOverlap(checkIn, checkOut, block.startDate, block.endDate),
  );

  return !conflictsWithBooking && !conflictsWithBlock;
}

export async function createBooking(input: BookingRequest) {
  const settings = await getSettings();
  const nights = nightsBetween(input.checkIn, input.checkOut);
  if (nights < settings.minNights) {
    throw new Error(`Minimum stay is ${settings.minNights} nights.`);
  }
  if (input.guests > settings.maxGuests) {
    throw new Error(`Maximum guests is ${settings.maxGuests}.`);
  }
  if (!input.acceptedRules) {
    throw new Error("House rules must be accepted before requesting a stay.");
  }
  const available = await isDateRangeAvailable(input.checkIn, input.checkOut);
  if (!available) {
    throw new Error("Those dates are no longer available.");
  }

  const timestamp = new Date().toISOString();
  const booking: Booking = {
    id: crypto.randomUUID(),
    listingId: settings.listingId,
    guestName: input.guestName,
    guestEmail: input.guestEmail,
    guestPhone: input.guestPhone,
    country: input.country,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    message: input.message,
    status: "pending",
    paymentStatus: "unpaid",
    quote: calculateQuote(settings, input.checkIn, input.checkOut, input.guests),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    data.bookings.unshift(booking);
    await writeFileData(data);
    return booking;
  }

  const { error } = await supabase().from("bookings").insert(bookingToRow(booking));
  if (error) throw error;
  return booking;
}

export async function updateBooking(
  id: string,
  patch: Partial<
    Pick<
      Booking,
      | "status"
      | "paymentStatus"
      | "stripeCheckoutSessionId"
      | "stripePaymentIntentId"
      | "quote"
    >
  >,
) {
  const updatedAt = new Date().toISOString();
  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    const index = data.bookings.findIndex((booking) => booking.id === id);
    if (index === -1) throw new Error("Booking not found.");
    data.bookings[index] = { ...data.bookings[index], ...patch, updatedAt };
    await writeFileData(data);
    return data.bookings[index];
  }

  const rowPatch: SupabaseRow = {
    updated_at: updatedAt,
  };
  if (patch.status) rowPatch.status = patch.status;
  if (patch.paymentStatus) rowPatch.payment_status = patch.paymentStatus;
  if (patch.stripeCheckoutSessionId !== undefined) {
    rowPatch.stripe_checkout_session_id = patch.stripeCheckoutSessionId;
  }
  if (patch.stripePaymentIntentId !== undefined) {
    rowPatch.stripe_payment_intent_id = patch.stripePaymentIntentId;
  }
  if (patch.quote) rowPatch.quote = patch.quote;

  const { data, error } = await supabase()
    .from("bookings")
    .update(rowPatch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return rowToBooking(data);
}

export async function listBlockedDates() {
  if (hasSupabaseConfig()) {
    return listSupabaseBlocks();
  }
  const data = await readFileData();
  return [...data.blockedDates].sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export async function createBlockedDate(input: Pick<BlockedDate, "startDate" | "endDate" | "reason">) {
  const settings = await getSettings();
  const available = await isDateRangeAvailable(input.startDate, input.endDate);
  if (!available) {
    throw new Error("That range overlaps an active booking or existing block.");
  }

  const block: BlockedDate = {
    id: crypto.randomUUID(),
    listingId: settings.listingId,
    startDate: input.startDate,
    endDate: input.endDate,
    reason: input.reason,
    createdAt: new Date().toISOString(),
  };

  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    data.blockedDates.push(block);
    await writeFileData(data);
    return block;
  }

  const { error } = await supabase().from("blocked_dates").insert(blockToRow(block));
  if (error) throw error;
  return block;
}

export async function deleteBlockedDate(id: string) {
  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    data.blockedDates = data.blockedDates.filter((block) => block.id !== id);
    await writeFileData(data);
    return;
  }

  const { error } = await supabase().from("blocked_dates").delete().eq("id", id);
  if (error) throw error;
}

export async function listGuideSpots(options: { includeDrafts?: boolean } = {}) {
  if (hasSupabaseConfig()) {
    const query = supabase().from("guide_spots").select("*").order("sort_order");
    const { data, error } = options.includeDrafts
      ? await query
      : await query.eq("is_published", true);
    if (error) throw error;
    return (data ?? []).map((row) => rowToGuideSpot(row));
  }

  const data = await readFileData();
  return data.guideSpots
    .filter((spot) => options.includeDrafts || spot.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function upsertGuideSpot(spot: GuideSpot) {
  const normalized = {
    ...spot,
    updatedAt: new Date().toISOString(),
  };

  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    const index = data.guideSpots.findIndex((item) => item.id === normalized.id);
    if (index === -1) {
      data.guideSpots.push(normalized);
    } else {
      data.guideSpots[index] = normalized;
    }
    await writeFileData(data);
    return normalized;
  }

  const { error } = await supabase().from("guide_spots").upsert(guideSpotToRow(normalized));
  if (error) throw error;
  return normalized;
}

export async function deleteGuideSpot(id: string) {
  if (!hasSupabaseConfig()) {
    const data = await readFileData();
    data.guideSpots = data.guideSpots.filter((spot) => spot.id !== id);
    await writeFileData(data);
    return;
  }

  const { error } = await supabase().from("guide_spots").delete().eq("id", id);
  if (error) throw error;
}
