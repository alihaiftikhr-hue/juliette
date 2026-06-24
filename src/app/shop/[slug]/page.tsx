import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CartButton from "@/components/CartButton";
import { LeafDivider } from "@/components/Logo";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/data/products";
import { getProduct, listProducts } from "@/lib/db";
import { getVisitorCountry } from "@/lib/geo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.blurb,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} · ${SITE_NAME}`,
      description: product.blurb,
      url: `${SITE_URL}/shop/${product.slug}`,
      images: product.image ? [{ url: product.image.src, alt: product.image.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · ${SITE_NAME}`,
      description: product.blurb,
      images: product.image ? [product.image.src] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const country = await getVisitorCountry();

  const all = await listProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(all.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, 3);

  const soldOut = product.stock === 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.image ? [`${SITE_URL}${product.image.src}`] : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="label-caps !text-[0.62rem] text-espresso/60 mb-8">
        <Link href="/shop" className="hover:text-rose transition-colors">
          Shop
        </Link>
        <span className="mx-2" aria-hidden="true">·</span>
        <Link
          href={`/shop?category=${product.category.toLowerCase()}`}
          className="hover:text-rose transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2" aria-hidden="true">·</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Imagery */}
        <div
          className={`${product.canvas} relative aspect-square overflow-hidden border border-espresso/10`}
        >
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              preload
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <ProductArt
              kind={product.art}
              accent={product.accent}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Details */}
        <div>
          <p className="label-caps text-espresso/60">{product.category}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{product.name}</h1>
          <p className="label-caps mt-4 text-espresso/80">
            {formatPrice(country === "PK" ? product.price : product.price_intl, country)}
            {soldOut ? (
              <span className="ml-3 text-rose">· Sold Out</span>
            ) : (
              product.stock <= 5 && (
                <span className="ml-3 text-sage">· Only {product.stock} left</span>
              )
            )}
          </p>

          <LeafDivider className="w-36 my-7 text-espresso/60" />

          <p className="text-lg leading-relaxed text-espresso/85">{product.description}</p>

          <ul className="mt-7 space-y-2.5">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3 text-espresso/75">
                <span className="text-rose mt-0.5" aria-hidden="true">✦</span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <CartButton
              soldOut={soldOut}
              item={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: country === "PK" ? product.price : product.price_intl,
                image: product.image,
              }}
            />
            <Link href="/shop" className="btn btn-ghost">
              Keep Browsing
            </Link>
          </div>

          {/* Delivery info */}
          <div className="mt-6 bg-kraft-soft border border-espresso/10 px-4 py-3">
            {soldOut ? (
              <p className="text-sm text-espresso/65 italic">
                This batch has found its homes — write to the atelier to hear when it returns.
              </p>
            ) : (
              <p className="label-caps !text-[0.58rem] text-espresso/70 leading-relaxed">
                Worldwide Shipping &nbsp;·&nbsp; Secure Payments
                &nbsp;·&nbsp; Hand-finished in our atelier
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="pt-24 pb-8">
        <div className="text-center mb-10">
          <p className="label-caps text-espresso/60">You may also love</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} countryCode={country} />
          ))}
        </div>
      </section>
    </div>
  );
}
