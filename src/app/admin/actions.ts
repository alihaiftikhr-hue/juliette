"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, isAdmin, startSession, verifyPassword } from "@/lib/auth";
import {
  adjustStock,
  createProduct,
  deleteProduct,
  getProductById,
  slugExists,
  updateProduct,
} from "@/lib/db";
import {
  CARD_ACCENTS,
  CARD_CANVASES,
  CATEGORIES,
  CATEGORY_ART,
  type ProductInput,
} from "@/data/products";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

/* ————— Auth ————— */

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

/* ————— Helpers ————— */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashIndex(text: string, mod: number): number {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h % mod;
}

async function savePhoto(file: File, slug: string): Promise<string> {
  const ext = PHOTO_EXTENSIONS[file.type];
  if (!ext) throw new Error("unsupported-type");
  if (file.size > MAX_PHOTO_BYTES) throw new Error("too-large");
  const dir = path.join(process.cwd(), "public", "products");
  await fs.mkdir(dir, { recursive: true });
  const filename = `${slug}-${Date.now()}.${ext}`;
  await fs.writeFile(
    path.join(dir, filename),
    Buffer.from(await file.arrayBuffer())
  );
  return `/products/${filename}`;
}

function revalidateStore() {
  // Flush every cached route that lists or shows products.
  revalidatePath("/", "layout");
}

/* ————— Product CRUD ————— */

export async function saveProductAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") ? Number(formData.get("id")) : undefined;
  const existing = id != null ? getProductById(id) : undefined;
  if (id != null && !existing) redirect("/admin?error=missing");

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const price = Math.max(0, Math.round(Number(formData.get("price") ?? 0)));
  const stock = Math.max(0, Math.round(Number(formData.get("stock") ?? 0)));
  const blurb = String(formData.get("blurb") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const details = String(formData.get("details") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const removePhoto = formData.get("removePhoto") === "on";

  const backTo = id != null ? `/admin/products/${id}` : "/admin/products/new";
  if (!name || !(CATEGORIES as readonly string[]).includes(category) || !Number.isFinite(price)) {
    redirect(`${backTo}?error=invalid`);
  }

  let slug = slugify(String(formData.get("slug") ?? "")) || slugify(name);
  if (!slug) redirect(`${backTo}?error=invalid`);
  if (slugExists(slug, id)) {
    // Keep saves frictionless: suffix rather than reject.
    let i = 2;
    while (slugExists(`${slug}-${i}`, id)) i++;
    slug = `${slug}-${i}`;
  }

  // Photo: keep existing unless replaced or removed.
  let image = removePhoto ? undefined : existing?.image;
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    try {
      const src = await savePhoto(photo, slug);
      image = { src, alt: imageAlt || name };
    } catch (err) {
      const reason = err instanceof Error ? err.message : "upload";
      redirect(`${backTo}?error=${reason}`);
    }
  } else if (image && imageAlt) {
    image = { ...image, alt: imageAlt };
  }

  const input: ProductInput = {
    slug,
    name,
    category,
    price,
    stock,
    blurb,
    description,
    details,
    art: existing?.art ?? CATEGORY_ART[category] ?? "bow",
    canvas: existing?.canvas ?? CARD_CANVASES[hashIndex(slug, CARD_CANVASES.length)],
    accent: existing?.accent ?? CARD_ACCENTS[hashIndex(name, CARD_ACCENTS.length)],
    image,
  };

  if (id != null) {
    updateProduct(id, input);
  } else {
    createProduct(input);
  }

  revalidateStore();
  redirect("/admin?saved=1");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) deleteProduct(id);
  revalidateStore();
  redirect("/admin?deleted=1");
}

export async function adjustStockAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const delta = Number(formData.get("delta"));
  if (Number.isFinite(id) && Number.isFinite(delta)) adjustStock(id, delta);
  revalidateStore();
  revalidatePath("/admin");
}
