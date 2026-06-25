import Image from "next/image";
import { cx } from "@/lib/cx";

type PhotoGridItem = {
  src: string;
  alt: string;
};

export function PhotoGrid({
  images,
  className,
  layout = "three",
}: {
  images: PhotoGridItem[];
  className?: string;
  layout?: "three" | "four" | "two";
}) {
  if (images.length === 0) return null;

  if (layout === "two" && images.length >= 2) {
    return (
      <div className={cx("grid gap-3 sm:grid-cols-2", className)}>
        {images.slice(0, 2).map((image) => (
          <PhotoCell key={image.src} image={image} className="aspect-[4/3]" />
        ))}
      </div>
    );
  }

  if (layout === "four" && images.length >= 4) {
    return (
      <div className={cx("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
        {images.slice(0, 4).map((image, index) => (
          <PhotoCell
            key={image.src}
            image={image}
            className={cx("aspect-[4/5]", index === 0 && "lg:row-span-2 lg:aspect-auto lg:min-h-full")}
          />
        ))}
      </div>
    );
  }

  const [first, second, third] = images;
  return (
    <div className={cx("grid gap-3 sm:grid-cols-3", className)}>
      {first ? <PhotoCell image={first} className="aspect-[4/5] sm:row-span-2 sm:aspect-auto sm:min-h-full" /> : null}
      {second ? <PhotoCell image={second} className="aspect-[16/11]" /> : null}
      {third ? <PhotoCell image={third} className="aspect-[16/11]" /> : null}
    </div>
  );
}

function PhotoCell({ image, className }: { image: PhotoGridItem; className?: string }) {
  return (
    <div className={cx("relative overflow-hidden rounded-sm bg-ink/10 shadow-soft ring-1 ring-ink/8", className)}>
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
    </div>
  );
}
