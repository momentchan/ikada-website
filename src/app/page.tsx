import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function IndexPage() {
  redirect(`/${siteConfig.defaultLocale}`);
}
