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
    <div className={cx("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-rust">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-8 text-ink/70">{body}</p> : null}
    </div>
  );
}
