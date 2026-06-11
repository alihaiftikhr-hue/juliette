import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "juliette_admin";
const SESSION_DAYS = 7;

function adminPassword(): string {
  // Set ADMIN_PASSWORD in .env.local — this fallback is for first local run only.
  return process.env.ADMIN_PASSWORD ?? "juliette2026";
}

/** Deterministic session token derived from the password; rotating the password invalidates sessions. */
function sessionToken(): string {
  return createHmac("sha256", "juliette-admin-session-v1")
    .update(adminPassword())
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function verifyPassword(candidate: string): boolean {
  return safeEqual(candidate, adminPassword());
}

export async function isAdmin(): Promise<boolean> {
  const cookie = (await cookies()).get(COOKIE_NAME);
  return cookie != null && safeEqual(cookie.value, sessionToken());
}

/** Call from a Server Action after verifying the password. */
export async function startSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

/** Call from a Server Action. */
export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
