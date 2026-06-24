import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/our-story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Product pages — degrade gracefully if the catalogue can't be reached.
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await listProducts();
    productRoutes = products.map((p) => ({
      url: `${SITE_URL}/shop/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: p.image ? [`${SITE_URL}${p.image.src}`] : undefined,
    }));
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...productRoutes];
}
