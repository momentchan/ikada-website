import { cx } from "@/lib/cx";

export function SectionHeading({
  eyebrow,
  title,
  body,
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div className={cx("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-rust">
          <span className="h-px w-8 bg-rust/60" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-display text-4xl font-bold leading-[1.04] text-ink sm:text-5xl lg:leading-[1.02]">{title}</h2>
      {body ? <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-ink/68 sm:text-lg sm:leading-8">{body}</p> : null}
    </div>
  );
}
