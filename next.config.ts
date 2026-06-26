import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
