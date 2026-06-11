import Image from "next/image";
import Link from "next/link";
import { JulietteEmblem, LeafDivider } from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/data/products";
import { listProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

const MARQUEE_ITEMS = [
  "Handmade in Lahore",
  "Cash on Delivery",
  "Small Batches Only",
  "Est. MMXXVI",
  "Wear Your Fairytale",
  "Cuffs & Sleeves",
  "Bandanas & Sets",
  "Ships Across Pakistan",
];

export default function Home() {
  const all = listProducts();

  // Hero card: prefer the large webp photo product
  const heroProduct =
    all.find((p) => p.image?.src.endsWith(".webp")) ??
    all.find((p) => p.image) ??
    all[0];

  // Grid: 3 products (prefer those with images), excluding the hero
  const gridProducts = all
    .filter((p) => p.id !== heroProduct.id)
    .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
    .slice(0, 3);

  return (
    <>
      {/* ——— Hero: split screen ——— */}
      <section className="min-h-[92vh] flex flex-col-reverse md:flex-row">
        {/* Left — espresso text panel */}
        <div className="bg-espresso text-cream flex flex-col justify-center items-center text-center px-10 md:px-14 py-16 md:py-0 md:w-[44%] flex-shrink-0">
          <p className="label-caps opacity-45 !text-[0.58rem] tracking-[0.32em]">
            Est · MMXXVI · Lahore
          </p>

          <JulietteEmblem
            className="mt-7 w-44 sm:w-52 opacity-90"
            tone="currentColor"
          />

          <p className="font-tagline text-5xl sm:text-6xl mt-8 leading-[1.05]">
            Wear Your<br />Fairytale
          </p>

          <p className="label-caps !text-[0.6rem] mt-5 opacity-50 leading-loose max-w-[17rem]">
            Detachable finery for everyday magic<br />
            Handmade in Lahore · COD Available
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-[260px]">
            <Link href="/shop" className="btn btn-cream flex-1">
              Shop Now
            </Link>
            <Link href="/our-story" className="btn btn-cream opacity-60 flex-1">
              Our Story
            </Link>
          </div>
        </div>

        {/* Right — product photo */}
        <div className="relative flex-1 min-h-[65vw] md:min-h-0 overflow-hidden">
          <Image
            src="/products/lace_cuff.webp"
            alt="Camille Pearl-Button Cuffs — white satin with pearl buttons and embroidered lace"
            fill
            preload
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 56vw"
          />
          {/* Blend edge into espresso panel on desktop */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-espresso to-transparent" />
        </div>
      </section>

      {/* ——— Marquee strip ——— */}
      <div
        className="bg-espresso text-cream overflow-hidden py-3 select-none"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center">
              {MARQUEE_ITEMS.map((text, i) => (
                <span key={i} className="inline-flex items-center gap-0">
                  <span className="label-caps !text-[0.6rem] opacity-75 px-5 whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-cream/25 text-[0.5rem]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ——— Featured collection ——— */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20">
        <div className="text-center mb-12">
          <p className="label-caps text-espresso/60">The Collection</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">A first look at the finery</h2>
          <LeafDivider className="w-44 mx-auto mt-5 text-espresso/70" />
        </div>

        {/* Cinematic hero card */}
        <Link
          href={`/shop/${heroProduct.slug}`}
          className="group relative block w-full aspect-[16/7] overflow-hidden mb-6"
          aria-label={`${heroProduct.name} — ${formatPrice(heroProduct.price)}`}
        >
          <div className={`absolute inset-0 ${heroProduct.canvas}`}>
            {heroProduct.image ? (
              <Image
                src={heroProduct.image.src}
                alt={heroProduct.image.alt}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            ) : (
              <ProductArt
                kind={heroProduct.art}
                accent={heroProduct.accent}
                className="w-full h-full transition-transform duration-1000 group-hover:scale-[1.04]"
              />
            )}
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/78 via-espresso/22 to-transparent" />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14">
            <p className="label-caps !text-[0.58rem] text-cream/60">
              {heroProduct.category}
            </p>
            <h3 className="mt-2 text-cream text-2xl sm:text-4xl leading-tight">
              {heroProduct.name}
            </h3>
            <p className="mt-2 text-cream/70 max-w-xs text-base leading-relaxed hidden sm:block">
              {heroProduct.blurb}
            </p>
            <p className="mt-4 label-caps !text-[0.62rem] text-cream/80">
              {formatPrice(heroProduct.price)}
              {heroProduct.stock === 0 && (
                <span className="ml-3 text-rose/80">· Sold Out</span>
              )}
            </p>
            <span className="mt-5 self-start btn btn-cream !text-[0.65rem] !px-6 !py-3">
              {heroProduct.stock === 0 ? "See Details" : "View This Piece"}
            </span>
          </div>
        </Link>

        {/* 3-up product grid */}
        <div className="grid grid-cols-3 gap-5 sm:gap-8">
          {gridProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="btn btn-ghost">
            View Everything
          </Link>
        </div>
      </section>

      {/* ——— Brand promise ——— */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-24">
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          <div>
            <p className="font-logo text-5xl text-rose" aria-hidden="true">1</p>
            <h3 className="label-caps mt-4">Detachable by Design</h3>
            <p className="mt-3 text-espresso/75">
              Every piece ties, clips or slips on — no sewing, no alterations.
              One collar, a dozen outfits.
            </p>
          </div>
          <div>
            <p className="font-logo text-5xl text-rose" aria-hidden="true">2</p>
            <h3 className="label-caps mt-4">Made by Hand</h3>
            <p className="mt-3 text-espresso/75">
              Cut, tied and finished in our Lahore atelier. Small
              imperfections are the signature of a human hand.
            </p>
          </div>
          <div>
            <p className="font-logo text-5xl text-rose" aria-hidden="true">3</p>
            <h3 className="label-caps mt-4">Cash on Delivery</h3>
            <p className="mt-3 text-espresso/75">
              Order with confidence — pay when it arrives at your door.
              Delivery charges settled in advance at a flat rate.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Story teaser ——— */}
      <section className="mt-24 bg-kraft-soft border-y border-espresso/10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 text-center">
          <p className="label-caps text-espresso/60">Our Story</p>
          <p className="font-tagline text-4xl sm:text-6xl mt-6 leading-snug text-espresso">
            &ldquo;We believe every wardrobe already holds a fairytale —
            it just needs a little lace to find it.&rdquo;
          </p>
          <LeafDivider className="w-44 mx-auto mt-8 text-espresso/70" />
          <Link href="/our-story" className="btn mt-10">
            Read the Story
          </Link>
        </div>
      </section>

      {/* ——— Newsletter ——— */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-8 text-center">
        <p className="label-caps text-espresso/60">The Guest List</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Be first through the gates</h2>
        <p className="mt-4 max-w-lg mx-auto text-espresso/75">
          Join the list for new arrivals, behind-the-scenes moments, and the
          occasional beautifully written letter.
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
