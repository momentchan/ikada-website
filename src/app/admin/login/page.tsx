import { Anchor } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/bookings");
  }
  const { error } = await searchParams;

  return (
    <section className="flex min-h-screen items-center justify-center px-5 py-12">
      <form action={loginAction} className="w-full max-w-sm rounded-lg border border-ink/10 bg-shell p-6 shadow-soft">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-shell">
          <Anchor aria-hidden="true" className="h-5 w-5" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold">IKADA Admin</h1>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Local default password is <code>ikada-admin-local</code> until <code>ADMIN_PASSWORD</code> is set.
        </p>
        <label className="mt-6 grid gap-2 text-sm font-semibold text-ink/75">
          Password
          <input
            name="password"
            type="password"
            required
            className="min-h-11 rounded-lg border border-ink/15 bg-white px-3 text-ink"
          />
        </label>
        <button
          type="submit"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-ink px-4 py-2 text-sm font-bold text-shell"
        >
          Login
        </button>
        {error ? <p className="mt-4 text-sm font-semibold text-rust">Password did not match.</p> : null}
      </form>
    </section>
  );
}
