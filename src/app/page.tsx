import Image from "next/image";
import Link from "next/link";
import { JulietteEmblem, LeafDivider } from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import ProductCard from "@/components/ProductCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { listProducts } from "@/lib/db";
import { getVisitorCountry } from "@/lib/geo";

export const dynamic = "force-dynamic";

const MARQUEE_ITEMS = [
  "Once Upon a Cuff",
  "Stitched by Hand · Finished with Love",
  "Every Detail is a Love Letter",
  "Lace & Longing",
  "Wear What the Heroines Wore",
  "Worldwide Shipping",
  "The Story is in the Sleeve",
  "Coded in Dreams · Dreamed in Lace",
  "limited edition · always",
];

export default async function Home() {
  const featured = (await listProducts()).slice(0, 4);
  const country = await getVisitorCountry();

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-16">
        {/* Background editorial photo */}
        <Image
          src="/products/lace_cuff.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        {/* Heavy espresso veil — unified, calm, luxe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(67,52,42,0.62)" }}
          aria-hidden="true"
        />
        {/* Radial readability anchor — softens the exact centre behind logo + headline */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(33,26,24,0.35) 0%, transparent 72%)",
          }}
          aria-hidden="true"
        />

        <JulietteEmblem
          className="fade-in relative z-10 mt-4 w-[200px] sm:w-[280px] lg:w-[340px] mx-auto text-cream [animation-delay:0.08s]"
        />

        <h1 className="fade-up relative z-10 mt-4 text-3xl sm:text-4xl lg:text-5xl max-w-2xl mx-auto leading-snug text-cream [animation-delay:0.22s]">
          The little details that make
          <span className="italic"> any outfit </span>
          a fairytale.
        </h1>

        <div className="fade-up relative z-10 mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 [animation-delay:0.5s]">
          <Link href="/shop" className="btn btn-cream !py-3 !px-8">
            Explore the Collection
          </Link>
          <Link href="/our-story" className="btn btn-cream !py-3 !px-8 !bg-transparent">
            Our Story
          </Link>
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
                <span key={i} className="inline-flex items-center">
                  <span className="label-caps !text-[0.6rem] opacity-75 px-5 whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-rose/60 text-[0.6rem]">✿</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ——— Featured collection ——— */}
      <RevealOnScroll>
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20">
          <div className="text-center mb-12">
            <p className="label-caps text-espresso/60">The Collection</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">A first look at the finery</h2>
            <LeafDivider className="w-44 mx-auto mt-5 text-espresso/70" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} countryCode={country} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn btn-ghost">
              View Everything
            </Link>
          </div>
        </section>
      </RevealOnScroll>

      {/* ——— Full-bleed photo strip ——— */}
      <div className="mt-24 relative w-full aspect-[21/8] overflow-hidden">
        <Image
          src="/products/lace_cuff.webp"
          alt="Camille Pearl-Button Cuffs — white satin with embroidered lace ruffles"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-20">
          <p className="label-caps !text-[0.58rem] text-cream/60">Featured</p>
          <h3 className="mt-2 text-cream text-2xl sm:text-4xl max-w-xs leading-snug">
            Camille Pearl-Button Cuffs
          </h3>
          <p className="mt-2 text-cream/70 max-w-xs text-sm hidden sm:block">
            Crisp satin, a row of pearl buttons, embroidered lace ruffles.
          </p>
          <Link
            href="/shop/camille-pearl-button-cuffs"
            className="mt-6 self-start btn btn-cream !text-[0.65rem] !px-6 !py-3"
          >
            View This Piece
          </Link>
        </div>
      </div>

      {/* ——— Brand promise ——— */}
      <RevealOnScroll>
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-24">
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            <div>
              <p className="font-logo text-5xl text-rose" aria-hidden="true">1</p>
              <h3 className="label-caps mt-4">Detachable by Design</h3>
              <p className="mt-3 text-espresso/75">
                Every piece ties, clips or slips on — no sewing, no alterations.
                One cuff, a dozen outfits.
              </p>
            </div>
            <div>
              <p className="font-logo text-5xl text-rose" aria-hidden="true">2</p>
              <h3 className="label-caps mt-4">Made by Hand</h3>
              <p className="mt-3 text-espresso/75">
                Cut, tied and finished in our atelier. Small
                imperfections are the signature of a human hand.
              </p>
            </div>
            <div>
              <p className="font-logo text-5xl text-rose" aria-hidden="true">3</p>
              <h3 className="label-caps mt-4">Secure Shipping</h3>
              <p className="mt-3 text-espresso/75">
                Secure global payments & flat-rate international shipping.
                Tracked and delivered to your doorstep, anywhere.
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ——— Story teaser ——— */}
      <RevealOnScroll>
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
      </RevealOnScroll>

      {/* ——— Newsletter ——— */}
      <RevealOnScroll>
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
      </RevealOnScroll>
    </>
  );
}
