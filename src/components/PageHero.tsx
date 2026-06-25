import Image from "next/image";
import { cx } from "@/lib/cx";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  variant?: "dark" | "light";
  compact?: boolean;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  variant = "dark",
  compact = false,
  children,
}: PageHeroProps) {
  const isDark = variant === "dark";

  if (image) {
    return (
      <section className={cx("relative overflow-hidden", isDark ? "bg-ink text-shell" : "bg-shell text-ink")}>
        <div className={cx("relative", compact ? "min-h-[38svh]" : "min-h-[48svh]")}>
          <Image src={image} alt={imageAlt ?? title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/52 to-ink/18" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className={cx("relative mx-auto flex w-full max-w-7xl items-end px-5 sm:px-6 lg:px-8", compact ? "min-h-[38svh] py-12" : "min-h-[48svh] py-16 sm:py-20")}>
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="eyebrow-light mb-4">
                  <span className="h-px w-8 bg-tide/70" />
                  {eyebrow}
                </p>
              ) : null}
              <h1 className={cx("text-balance font-display font-bold leading-[1.02]", compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl")}>
                {title}
              </h1>
              {body ? <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-shell/78 sm:text-lg">{body}</p> : null}
              {children ? <div className="mt-7">{children}</div> : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cx(isDark ? "bg-ink py-20 text-shell sm:py-28" : "bg-shell py-20 text-ink sm:py-28")}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className={isDark ? "eyebrow-light mb-4" : "eyebrow mb-4"}>
              <span className={cx("h-px w-8", isDark ? "bg-tide/70" : "bg-rust/60")} />
              {eyebrow}
            </p>
          ) : null}
          <h1 className={cx("text-balance font-display font-bold leading-[1.02]", compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl")}>
            {title}
          </h1>
          {body ? (
            <p className={cx("mt-5 max-w-2xl text-pretty text-base leading-8 sm:text-lg", isDark ? "text-shell/75" : "text-ink/70")}>
              {body}
            </p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
