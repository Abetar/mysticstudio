import type { MetadataRoute } from "next";

const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://mysticstudio.app"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  };
}