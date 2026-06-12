import { logoutAction, approveAndRequestPaymentAction, cancelBookingAction, markConfirmedAction, markRefundedAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { niceDate, yen } from "@/lib/format";
import { requireAdmin } from "@/lib/admin-auth";
import { getStoreMode, listBookings } from "@/lib/store";

export default async function AdminBookingsPage() {
  await requireAdmin();
  const bookings = await listBookings();

  return (
    <section className="px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-rust">Admin</p>
            <h1 className="mt-2 font-display text-4xl font-bold">Bookings</h1>
            <p className="mt-2 text-sm text-ink/60">Store mode: {getStoreMode()}</p>
          </div>
          <form action={logoutAction}>
            <button className="rounded-lg border border-ink/15 bg-shell px-3 py-2 text-sm font-semibold">Logout</button>
          </form>
        </div>
        <div className="mt-6">
          <AdminNav />
        </div>

        <div className="mt-8 space-y-4">
          {bookings.length === 0 ? (
            <div className="rounded-lg border border-ink/10 bg-shell p-6 text-ink/70">No bookings yet.</div>
          ) : (
            bookings.map((booking) => (
              <article key={booking.id} className="rounded-lg border border-ink/10 bg-shell p-5">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-2xl font-bold">{booking.guestName}</h2>
                      <StatusBadge>{booking.status}</StatusBadge>
                      <StatusBadge>{booking.paymentStatus}</StatusBadge>
                    </div>
                    <p className="mt-2 text-sm text-ink/65">
                      {niceDate(booking.checkIn)} - {niceDate(booking.checkOut)} / {booking.guests} guests / {yen(booking.quote.total)}
                    </p>
                    <p className="mt-2 text-sm text-ink/65">
                      {booking.guestEmail} / {booking.guestPhone} / {booking.country}
                    </p>
                    {booking.message ? <p className="mt-4 rounded-lg bg-paper p-3 text-sm leading-7 text-ink/70">{booking.message}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                    <form action={approveAndRequestPaymentAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <input type="hidden" name="locale" value="en" />
                      <button className="min-h-10 rounded-lg bg-rust px-3 py-2 text-sm font-bold text-shell">
                        Send payment
                      </button>
                    </form>
                    <form action={markConfirmedAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <input type="hidden" name="locale" value="en" />
                      <button className="min-h-10 rounded-lg border border-moss/30 px-3 py-2 text-sm font-bold text-moss">
                        Confirm
                      </button>
                    </form>
                    <form action={cancelBookingAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <input type="hidden" name="locale" value="en" />
                      <button className="min-h-10 rounded-lg border border-ink/15 px-3 py-2 text-sm font-bold text-ink/65">
                        Cancel
                      </button>
                    </form>
                    <form action={markRefundedAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <button className="min-h-10 rounded-lg border border-ink/15 px-3 py-2 text-sm font-bold text-ink/65">
                        Refunded
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
