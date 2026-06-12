import { updateSettingsAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin-auth";
import { getSettings } from "@/lib/store";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await getSettings();

  return (
    <section className="px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-rust">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Settings</h1>
        <div className="mt-6">
          <AdminNav />
        </div>

        <form action={updateSettingsAction} className="mt-8 rounded-lg border border-ink/10 bg-shell p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["baseNightlyPrice", "Base nightly price"],
              ["cleaningFee", "Cleaning fee"],
              ["extraGuestFee", "Extra guest fee"],
              ["extraGuestThreshold", "Extra guest threshold"],
              ["weeklyDiscountPercent", "Weekly discount %"],
              ["maxGuests", "Max guests"],
              ["minNights", "Minimum nights"],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2 text-sm font-semibold text-ink/75">
                {label}
                <input
                  name={name}
                  type="number"
                  defaultValue={String(settings[name as keyof typeof settings])}
                  className="min-h-11 rounded-lg border border-ink/15 px-3"
                />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-semibold text-ink/75">
              Check-in time
              <input name="checkInTime" defaultValue={settings.checkInTime} className="min-h-11 rounded-lg border border-ink/15 px-3" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink/75">
              Check-out time
              <input name="checkOutTime" defaultValue={settings.checkOutTime} className="min-h-11 rounded-lg border border-ink/15 px-3" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink/75 lg:col-span-3">
              Airbnb iCal import URL
              <input name="airbnbIcalUrl" defaultValue={settings.airbnbIcalUrl} className="min-h-11 rounded-lg border border-ink/15 px-3" />
            </label>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-ink/75">
              Booking policy EN
              <textarea name="bookingPolicyEn" rows={6} defaultValue={settings.bookingPolicy.en} className="rounded-lg border border-ink/15 px-3 py-3" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink/75">
              Booking policy JA
              <textarea name="bookingPolicyJa" rows={6} defaultValue={settings.bookingPolicy.ja} className="rounded-lg border border-ink/15 px-3 py-3" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink/75">
              Cancellation policy EN
              <textarea name="cancellationPolicyEn" rows={6} defaultValue={settings.cancellationPolicy.en} className="rounded-lg border border-ink/15 px-3 py-3" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink/75">
              Cancellation policy JA
              <textarea name="cancellationPolicyJa" rows={6} defaultValue={settings.cancellationPolicy.ja} className="rounded-lg border border-ink/15 px-3 py-3" />
            </label>
          </div>
          <button className="mt-6 min-h-11 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-shell">
            Save Settings
          </button>
        </form>
      </div>
    </section>
  );
}
