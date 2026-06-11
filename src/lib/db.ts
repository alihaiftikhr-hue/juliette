import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import {
  seedProducts,
  type ArtKind,
  type Product,
  type ProductInput,
} from "../data/products";

const DB_PATH = path.join(process.cwd(), "data", "juliette.db");

type Row = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  blurb: string;
  description: string;
  details: string; // JSON array
  art: string;
  canvas: string;
  accent: string;
  image_src: string | null;
  image_alt: string | null;
  stock: number;
};

function openDb(): DatabaseSync {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      blurb TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      details TEXT NOT NULL DEFAULT '[]',
      art TEXT NOT NULL,
      canvas TEXT NOT NULL,
      accent TEXT NOT NULL,
      image_src TEXT,
      image_alt TEXT,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const { n } = db.prepare("SELECT COUNT(*) AS n FROM products").get() as { n: number };
  if (n === 0) {
    const insert = db.prepare(
      `INSERT INTO products
        (slug, name, category, price, blurb, description, details, art, canvas, accent, image_src, image_alt, stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const p of seedProducts) {
      insert.run(
        p.slug,
        p.name,
        p.category,
        p.price,
        p.blurb,
        p.description,
        JSON.stringify(p.details),
        p.art,
        p.canvas,
        p.accent,
        p.image?.src ?? null,
        p.image?.alt ?? null,
        p.stock
      );
    }
  }
  return db;
}

// Survive dev-server hot reloads without re-opening handles.
const g = globalThis as unknown as { __julietteDb?: DatabaseSync };
function db(): DatabaseSync {
  g.__julietteDb ??= openDb();
  return g.__julietteDb;
}

function toProduct(row: Row): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    blurb: row.blurb,
    description: row.description,
    details: JSON.parse(row.details) as string[],
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

export function listProducts(category?: string): Product[] {
  const rows = category
    ? (db()
        .prepare("SELECT * FROM products WHERE category = ? ORDER BY id")
        .all(category) as Row[])
    : (db().prepare("SELECT * FROM products ORDER BY id").all() as Row[]);
  return rows.map(toProduct);
}

export function getProduct(slug: string): Product | undefined {
  const row = db().prepare("SELECT * FROM products WHERE slug = ?").get(slug) as
    | Row
    | undefined;
  return row ? toProduct(row) : undefined;
}

export function getProductById(id: number): Product | undefined {
  const row = db().prepare("SELECT * FROM products WHERE id = ?").get(id) as
    | Row
    | undefined;
  return row ? toProduct(row) : undefined;
}

export function slugExists(slug: string, excludeId?: number): boolean {
  const row =
    excludeId != null
      ? db()
          .prepare("SELECT 1 AS x FROM products WHERE slug = ? AND id != ?")
          .get(slug, excludeId)
      : db().prepare("SELECT 1 AS x FROM products WHERE slug = ?").get(slug);
  return row != null;
}

export function createProduct(input: ProductInput): Product {
  const result = db()
    .prepare(
      `INSERT INTO products
        (slug, name, category, price, blurb, description, details, art, canvas, accent, image_src, image_alt, stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.slug,
      input.name,
      input.category,
      input.price,
      input.blurb,
      input.description,
      JSON.stringify(input.details),
      input.art,
      input.canvas,
      input.accent,
      input.image?.src ?? null,
      input.image?.alt ?? null,
      input.stock
    );
  return getProductById(Number(result.lastInsertRowid))!;
}

export function updateProduct(id: number, input: ProductInput): void {
  db()
    .prepare(
      `UPDATE products SET
        slug = ?, name = ?, category = ?, price = ?, blurb = ?, description = ?,
        details = ?, art = ?, canvas = ?, accent = ?, image_src = ?, image_alt = ?, stock = ?
       WHERE id = ?`
    )
    .run(
      input.slug,
      input.name,
      input.category,
      input.price,
      input.blurb,
      input.description,
      JSON.stringify(input.details),
      input.art,
      input.canvas,
      input.accent,
      input.image?.src ?? null,
      input.image?.alt ?? null,
      input.stock,
      id
    );
}

export function deleteProduct(id: number): void {
  db().prepare("DELETE FROM products WHERE id = ?").run(id);
}

export function adjustStock(id: number, delta: number): void {
  db()
    .prepare("UPDATE products SET stock = MAX(0, stock + ?) WHERE id = ?")
    .run(delta, id);
}
