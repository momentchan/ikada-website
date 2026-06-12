import { deleteGuideSpotAction, upsertGuideSpotAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin-auth";
import { listGuideSpots } from "@/lib/store";
import type { GuideCategory, GuideSpot } from "@/lib/types";

const categories: GuideCategory[] = ["food", "cafe", "beach", "nature", "viewpoint", "rainy_day", "shop", "useful"];

function GuideSpotForm({ spot }: { spot?: GuideSpot }) {
  return (
    <form action={upsertGuideSpotAction} className="rounded-lg border border-ink/10 bg-shell p-5">
      <input type="hidden" name="id" value={spot?.id ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Category
          <select name="category" defaultValue={spot?.category ?? "nature"} className="min-h-11 rounded-lg border border-ink/15 px-3">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Sort order
          <input name="sortOrder" type="number" defaultValue={spot?.sortOrder ?? 100} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Name EN
          <input name="nameEn" required defaultValue={spot?.name.en ?? ""} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Name JA
          <input name="nameJa" required defaultValue={spot?.name.ja ?? ""} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Distance EN
          <input name="distanceEn" required defaultValue={spot?.distance.en ?? ""} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Distance JA
          <input name="distanceJa" required defaultValue={spot?.distance.ja ?? ""} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75 md:col-span-2">
          Map URL
          <input name="mapUrl" required defaultValue={spot?.mapUrl ?? "https://www.google.com/maps"} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75 md:col-span-2">
          Source URL
          <input name="sourceUrl" defaultValue={spot?.sourceUrl ?? ""} className="min-h-11 rounded-lg border border-ink/15 px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Description EN
          <textarea name="descriptionEn" required rows={4} defaultValue={spot?.description.en ?? ""} className="rounded-lg border border-ink/15 px-3 py-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Description JA
          <textarea name="descriptionJa" required rows={4} defaultValue={spot?.description.ja ?? ""} className="rounded-lg border border-ink/15 px-3 py-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Recommendation EN
          <textarea name="recommendationEn" required rows={4} defaultValue={spot?.recommendation.en ?? ""} className="rounded-lg border border-ink/15 px-3 py-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Recommendation JA
          <textarea name="recommendationJa" required rows={4} defaultValue={spot?.recommendation.ja ?? ""} className="rounded-lg border border-ink/15 px-3 py-3" />
        </label>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink/75">
        <input type="checkbox" name="isPublished" value="true" defaultChecked={spot?.isPublished ?? true} />
        Published
      </label>
      <button className="mt-5 min-h-11 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-shell">
        {spot ? "Save Spot" : "Add Spot"}
      </button>
    </form>
  );
}

export default async function AdminGuidePage() {
  await requireAdmin();
  const spots = await listGuideSpots({ includeDrafts: true });

  return (
    <section className="px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-rust">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Local Guide</h1>
        <div className="mt-6">
          <AdminNav />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 font-display text-2xl font-bold">Add New Spot</h2>
          <GuideSpotForm />
        </div>

        <div className="mt-10 space-y-6">
          {spots.map((spot) => (
            <div key={spot.id}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">{spot.name.en}</h2>
                <form action={deleteGuideSpotAction}>
                  <input type="hidden" name="id" value={spot.id} />
                  <button className="rounded-lg border border-ink/15 bg-shell px-3 py-2 text-sm font-semibold">Delete</button>
                </form>
              </div>
              <GuideSpotForm spot={spot} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
