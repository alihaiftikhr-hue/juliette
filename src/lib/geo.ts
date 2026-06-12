import { headers } from "next/headers";

/**
 * Returns the 2-letter country code (ISO 3166-1 alpha-2) of the visitor.
 * Defaults to "PK" if not detectable.
 * Works only in Server Components / Actions / Route Handlers.
 */
export async function getVisitorCountry(): Promise<string> {
    const headerList = await headers();
    // Vercel automatically adds this header on its edge network.
    const country = headerList.get("x-vercel-ip-country") || "PK";
    return country.toUpperCase();
}
