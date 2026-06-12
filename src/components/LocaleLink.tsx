import Link from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/lib/types";
import { localizedPath } from "@/lib/site";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  locale: Locale;
  href: string;
};

export function LocaleLink({ locale, href, ...props }: LocaleLinkProps) {
  return <Link href={localizedPath(locale, href)} {...props} />;
}
