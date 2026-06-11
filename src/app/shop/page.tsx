import type { Metadata } from "next";
import Link from "next/link";
import { LeafDivider } from "@/components/Logo";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/data/products";
import { listProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Detachable lace collars, bows, ribbons, cuffs and finery — handmade in Lahore in small batches.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = CATEGORIES.find((c) => c.toLowerCase() === category?.toLowerCase());
  const shown = listProducts(active);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 sm:pt-20">
      <div className="text-center mb-10">
        <p className="label-caps text-espresso/60">Shop</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">The Collection</h1>
        <p className="mt-4 max-w-xl mx-auto text-espresso/75">
          Finery to slip over the clothes you already love. Every piece is
          detachable, hand-finished and made in a small batch.
        </p>
        <LeafDivider className="w-44 mx-auto mt-6 text-espresso/70" />
      </div>

      {/* Category filter */}
      <nav
        aria-label="Filter by category"
        className="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-12"
      >
        <Link
          href="/shop"
          className={`label-caps transition-colors hover:text-rose ${
            !active ? "text-rose underline underline-offset-4" : "text-espresso/70"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/shop?category=${c.toLowerCase()}`}
            className={`label-caps transition-colors hover:text-rose ${
              active === c ? "text-rose underline underline-offset-4" : "text-espresso/70"
            }`}
          >
            {c}
          </Link>
        ))}
      </nav>

      {shown.length === 0 ? (
        <p className="text-center text-espresso/70 py-16">
          Nothing here just yet — this chapter is still being written.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
          {shown.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}

      {/* COD notice */}
      <div className="mt-16 mx-auto max-w-lg bg-kraft-soft border border-espresso/10 px-6 py-4 text-center">
        <p className="label-caps !text-[0.6rem] text-espresso/70 leading-relaxed">
          Cash on Delivery · Delivery charges paid in advance · Ships across Pakistan
        </p>
        <p className="mt-2 text-sm text-espresso/60 italic">
          Add items to your cart and order directly via WhatsApp.
        </p>
      </div>
    </div>
  );
}
