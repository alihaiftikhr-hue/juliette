/**
 * Canonical site origin, used for metadata, sitemap, robots and JSON-LD.
 * Override per-environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thejuliette.pk"
).replace(/\/$/, "");

export const SITE_NAME = "Juliette";
export const SITE_TAGLINE = "Wear Your Fairytale";
export const SITE_DESCRIPTION =
  "Detachable lace, ribbon & finery to make any outfit prettier — handmade in small batches. Worldwide shipping.";
