import type { BlockedDate, Booking } from "@/lib/types";

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function dateOnly(value: string) {
  return value.replaceAll("-", "");
}

function stamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function buildIcal(bookings: Booking[], blocks: BlockedDate[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IKADA//Direct Booking Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  bookings
    .filter((booking) => ["pending", "awaiting_payment", "confirmed"].includes(booking.status))
    .forEach((booking) => {
      lines.push(
        "BEGIN:VEVENT",
        `UID:booking-${booking.id}@ikada`,
        `DTSTAMP:${stamp()}`,
        `DTSTART;VALUE=DATE:${dateOnly(booking.checkIn)}`,
        `DTEND;VALUE=DATE:${dateOnly(booking.checkOut)}`,
        `SUMMARY:${escapeText(`IKADA ${booking.status}`)}`,
        `DESCRIPTION:${escapeText(`${booking.guestName} / ${booking.guests} guests`)}`,
        "END:VEVENT",
      );
    });

  blocks.forEach((block) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:block-${block.id}@ikada`,
      `DTSTAMP:${stamp()}`,
      `DTSTART;VALUE=DATE:${dateOnly(block.startDate)}`,
      `DTEND;VALUE=DATE:${dateOnly(block.endDate)}`,
      `SUMMARY:${escapeText(`Blocked: ${block.reason}`)}`,
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
