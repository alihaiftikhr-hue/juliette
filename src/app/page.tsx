import Link from "next/link";
import { JulietteEmblem, LeafDivider } from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import ProductCard from "@/components/ProductCard";
import { listProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function Home() {
  const featured = listProducts().slice(0, 4);

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 text-center">
          <JulietteEmblem className="fade-in w-[320px] sm:w-[440px] mx-auto text-espresso" />

          <h1 className="fade-up mt-12 text-3xl sm:text-5xl max-w-2xl mx-auto [animation-delay:0.15s]">
            The little details that make
            <span className="italic"> any outfit </span>
            a fairytale.
          </h1>

          <p className="fade-up mt-6 max-w-xl mx-auto text-espresso/75 text-lg [animation-delay:0.3s]">
            Detachable lace collars, hand-tied bows, ribbon and finery —
            designed to slip over the clothes you already love.
            Handmade in Lahore, in small batches.
          </p>

          <div className="fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 [animation-delay:0.45s]">
            <Link href="/shop" className="btn">
              Explore the Collection
            </Link>
            <Link href="/our-story" className="btn btn-ghost">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Label strip ——— */}
      <section className="bg-espresso text-cream">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          <span className="label-caps opacity-90">Detachable by Design</span>
          <span aria-hidden="true" className="hidden sm:inline opacity-40">·</span>
          <span className="label-caps opacity-90">Handmade in Lahore</span>
          <span aria-hidden="true" className="hidden sm:inline opacity-40">·</span>
          <span className="label-caps opacity-90">Small Batches Only</span>
        </div>
      </section>

      {/* ——— Featured collection ——— */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20">
        <div className="text-center mb-12">
          <p className="label-caps text-espresso/60">The Collection</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">A first look at the finery</h2>
          <LeafDivider className="w-44 mx-auto mt-5 text-espresso/70" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="btn btn-ghost">
            View Everything
          </Link>
        </div>
      </section>

      {/* ——— Promise ——— */}
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
            <h3 className="label-caps mt-4">Limited Batches</h3>
            <p className="mt-3 text-espresso/75">
              We make a little, beautifully, rather than a lot, carelessly.
              When a batch is gone, it rests.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Story teaser ——— */}
      <section className="mt-24 bg-kraft-soft border-y border-espresso/10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 text-center">
          <p className="label-caps text-espresso/60">Our Story</p>
          <p className="font-tagline text-4xl sm:text-5xl mt-6 leading-snug text-espresso">
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
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-24 text-center">
        <p className="label-caps text-espresso/60">The Guest List</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Be first through the gates</h2>
        <p className="mt-4 max-w-lg mx-auto text-espresso/75">
          The first collection arrives soon, in a very small batch. Join the
          list for early access and the occasional beautifully written letter.
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
