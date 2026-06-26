import Image from "next/image";
import { cx } from "@/lib/cx";

export function ImagePanel({
  src,
  alt,
  className,
  priority,
  caption,
  rounded = "md",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  caption?: string;
  rounded?: "sm" | "md" | "none";
}) {
  const roundedClass = rounded === "sm" ? "rounded-sm" : rounded === "none" ? "rounded-none" : "rounded-md";

  return (
    <figure className={className}>
      <div
        className={cx(
          "relative overflow-hidden bg-ink/10 shadow-soft",
          roundedClass,
          !className?.includes("aspect") && "aspect-[4/3]",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-6 text-ink/55">{caption}</figcaption> : null}
    </figure>
  );
}
