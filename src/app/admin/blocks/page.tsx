import { addBlockedDateAction, deleteBlockedDateAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { niceDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/site";
import { requireAdmin } from "@/lib/admin-auth";
import { listBlockedDates } from "@/lib/store";

export default async function AdminBlocksPage() {
  await requireAdmin();
  const blocks = await listBlockedDates();
  const calendarUrl = `${getSiteUrl()}/api/calendar`;

  return (
    <section className="px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-rust">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Calendar Blocks</h1>
        <div className="mt-6">
          <AdminNav />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form action={addBlockedDateAction} className="rounded-lg border border-ink/10 bg-shell p-5">
            <h2 className="font-display text-2xl font-bold">Block Dates</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-ink/75">
                Start date
                <input type="date" required name="startDate" className="min-h-11 rounded-lg border border-ink/15 px-3" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink/75">
                End date
                <input type="date" required name="endDate" className="min-h-11 rounded-lg border border-ink/15 px-3" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-ink/75">
              Reason
              <input name="reason" required className="min-h-11 rounded-lg border border-ink/15 px-3" />
            </label>
            <button className="mt-5 min-h-11 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-shell">
              Add Block
            </button>
          </form>

          <div className="rounded-lg border border-ink/10 bg-shell p-5">
            <h2 className="font-display text-2xl font-bold">Calendar Sync</h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              Export direct bookings and blocks as iCal. Import this URL into Airbnb or Booking.com once published.
            </p>
            <p className="mt-3 break-all rounded-lg bg-paper p-3 text-sm text-ink/70">{calendarUrl}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {blocks.map((block) => (
            <article key={block.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink/10 bg-shell p-4">
              <div>
                <p className="font-semibold">
                  {niceDate(block.startDate)} - {niceDate(block.endDate)}
                </p>
                <p className="text-sm text-ink/60">{block.reason}</p>
              </div>
              <form action={deleteBlockedDateAction}>
                <input type="hidden" name="id" value={block.id} />
                <button className="rounded-lg border border-ink/15 px-3 py-2 text-sm font-semibold">Delete</button>
              </form>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
