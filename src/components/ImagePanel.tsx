import Image from "next/image";
import { cx } from "@/lib/cx";

export function ImagePanel({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cx("relative overflow-hidden rounded-lg bg-ink/10", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority={priority} />
    </div>
  );
}
