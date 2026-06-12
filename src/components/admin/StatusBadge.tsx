import { cx } from "@/lib/cx";

export function StatusBadge({ children }: { children: string }) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize",
        children === "confirmed" && "bg-moss/15 text-moss",
        children === "paid" && "bg-moss/15 text-moss",
        children === "pending" && "bg-tarp/15 text-tarp",
        children === "awaiting_payment" && "bg-rust/15 text-rust",
        children === "unpaid" && "bg-ink/10 text-ink/70",
        children === "cancelled" && "bg-ink/10 text-ink/50",
        children === "refunded" && "bg-ink/10 text-ink/50",
        children === "failed" && "bg-rust/15 text-rust",
      )}
    >
      {children.replaceAll("_", " ")}
    </span>
  );
}
