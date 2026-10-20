import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: baseUrl(), lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
