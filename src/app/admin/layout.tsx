import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IKADA Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-paper text-ink">{children}</main>;
}
