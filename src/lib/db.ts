import { createClient } from "@supabase/supabase-js";
import { seedProducts, type ArtKind, type Product, type ProductInput } from "../data/products";

// ─── Supabase client (server-side only — uses service role key) ───────────────
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }
  return createClient(url, key);
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Row = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  price_intl: number;
  blurb: string;
  description: string;
  details: string[]; // Supabase returns JSONB as parsed JS already
  art: string;
  canvas: string;
  accent: string;
  image_src: string | null;
  image_alt: string | null;
  stock: number;
};

function toProduct(row: Row): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    price_intl: row.price_intl ?? row.price, // Fallback to local price if intl is null
    blurb: row.blurb,
    description: row.description,
    details: Array.isArray(row.details) ? row.details : JSON.parse(row.details as unknown as string),
    art: row.art as ArtKind,
    canvas: row.canvas,
    accent: row.accent,
    image:
      row.image_src != null
        ? { src: row.image_src, alt: row.image_alt ?? row.name }
        : undefined,
    stock: row.stock,
  };
}

// ─── Seed on first run ────────────────────────────────────────────────────────
async function seedIfEmpty() {
  const supabase = getClient();
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  if (count === 0) {
    const rows = seedProducts.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      price_intl: p.price_intl,
      blurb: p.blurb,
      description: p.description,
      details: p.details,
      art: p.art,
      canvas: p.canvas,
      accent: p.accent,
      image_src: p.image?.src ?? null,
      image_alt: p.image?.alt ?? null,
      stock: p.stock,
    }));
    await supabase.from("products").insert(rows);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function listProducts(category?: string): Promise<Product[]> {
  await seedIfEmpty();
  const supabase = getClient();
  const query = supabase.from("products").select("*").order("id");
  const { data, error } = category
    ? await query.eq("category", category)
    : await query;
  if (error) throw new Error(error.message);
  return (data as Row[]).map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await seedIfEmpty();
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return undefined;
  return toProduct(data as Row);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return undefined;
  return toProduct(data as Row);
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  const supabase = getClient();
  const query = supabase.from("products").select("id").eq("slug", slug);
  if (excludeId != null) query.neq("id", excludeId);
  const { data } = await query;
  return (data?.length ?? 0) > 0;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .insert({
      slug: input.slug,
      name: input.name,
      category: input.category,
      price: input.price,
      price_intl: input.price_intl,
      blurb: input.blurb,
      description: input.description,
      details: input.details,
      art: input.art,
      canvas: input.canvas,
      accent: input.accent,
      image_src: input.image?.src ?? null,
      image_alt: input.image?.alt ?? null,
      stock: input.stock,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toProduct(data as Row);
}

export async function updateProduct(id: number, input: ProductInput): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase
    .from("products")
    .update({
      slug: input.slug,
      name: input.name,
      category: input.category,
      price: input.price,
      price_intl: input.price_intl,
      blurb: input.blurb,
      description: input.description,
      details: input.details,
      art: input.art,
      canvas: input.canvas,
      accent: input.accent,
      image_src: input.image?.src ?? null,
      image_alt: input.image?.alt ?? null,
      stock: input.stock,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteProduct(id: number): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function adjustStock(id: number, delta: number): Promise<void> {
  const supabase = getClient();
  // Fetch current stock, then update (Supabase doesn't support inline arithmetic without RPC)
  const { data, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", id)
    .single();
  if (fetchError) throw new Error(fetchError.message);
  const newStock = Math.max(0, (data as { stock: number }).stock + delta);
  const { error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
