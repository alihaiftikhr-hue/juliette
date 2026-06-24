import Image from "next/image";
import Link from "next/link";
import { JulietteEmblem, LeafDivider } from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  CARD_ACCENTS,
  CARD_CANVASES,
  CATEGORIES,
  CATEGORY_ART,
} from "@/data/products";
import { listProducts } from "@/lib/db";
import { getVisitorCountry } from "@/lib/geo";

export const dynamic = "force-dynamic";

const FAQ_ITEMS = [
  {
    q: "How do the pieces attach?",
    a: "Everything ties, clips or slips on — no sewing and no alterations. Each piece is designed to move between the clothes you already own.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We ship across Pakistan and internationally with tracked, flat-rate delivery. Prices show in your local currency automatically.",
  },
  {
    q: "How do I place an order?",
    a: "Add your favourites to the cart and tap “Order via WhatsApp”. We’ll confirm availability, shipping and payment with you directly.",
  },
  {
    q: "How should I care for my finery?",
    a: "Gently hand-wash in cool water and lay flat to dry. Each piece is hand-finished, so a little tenderness keeps it beautiful for years.",
  },
];

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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[64vh] flex flex-col items-center justify-center text-center px-5 py-20 sm:py-24">
        {/* Background editorial photo */}
        <Image
          src="/products/lace_cuff.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
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

        <div
          className="fade-in relative z-10 [animation-delay:0.08s]"
          style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.45))" }}
        >
          <JulietteEmblem className="w-[190px] sm:w-[260px] lg:w-[310px] mx-auto text-cream" />
        </div>

        <h1
          className="fade-up relative z-10 mt-7 sm:mt-8 text-3xl sm:text-4xl lg:text-5xl max-w-2xl mx-auto leading-snug text-cream [animation-delay:0.22s]"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55)" }}
        >
          The little details that make
          <span className="italic"> any outfit </span>
          a fairytale.
        </h1>

        {/* Understated text-link CTAs — don't compete with logo or headline */}
        <div className="fade-up relative z-10 mt-9 sm:mt-10 flex items-center justify-center gap-8 [animation-delay:0.5s]">
          <Link
            href="/shop"
            className="label-caps !text-[0.62rem] text-cream/90 border-b border-cream/45 pb-px hover:text-cream hover:border-cream transition-colors"
          >
            Explore the Collection
          </Link>
          <span className="text-cream/25 text-xs select-none">·</span>
          <Link
            href="/our-story"
            className="label-caps !text-[0.62rem] text-cream/55 hover:text-cream/90 transition-colors"
          >
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

      {/* ——— Shop by category ——— */}
      <RevealOnScroll>
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-20">
          <div className="text-center mb-10">
            <p className="label-caps text-espresso/60">Shop by Category</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Find your finery</h2>
            <LeafDivider className="w-44 mx-auto mt-5 text-espresso/70" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
            {CATEGORIES.map((category, i) => (
              <Link
                key={category}
                href={`/shop?category=${category.toLowerCase()}`}
                className="group block text-center basis-[calc(50%-0.75rem)] sm:basis-[calc(33.333%-1rem)] lg:basis-[calc(20%-1.2rem)]"
                aria-label={`Shop ${category}`}
              >
                <div
                  className={`${CARD_CANVASES[i % CARD_CANVASES.length]} relative overflow-hidden aspect-square border border-espresso/10 transition-all duration-500 group-hover:border-espresso/30 group-hover:shadow-xl group-hover:shadow-espresso/5`}
                >
                  <ProductArt
                    kind={CATEGORY_ART[category]}
                    accent={CARD_ACCENTS[i % CARD_ACCENTS.length]}
                    className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-espresso/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="mt-4 text-xl sm:text-2xl leading-snug group-hover:text-rose transition-colors duration-300">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </RevealOnScroll>

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

      {/* ——— Testimonials ——— */}
      <RevealOnScroll>
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-24">
          <div className="text-center mb-12">
            <p className="label-caps text-espresso/60">Love Letters</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">What they&rsquo;re saying</h2>
            <LeafDivider className="w-44 mx-auto mt-5 text-espresso/70" />
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                quote:
                  "The lace collar arrived wrapped like a gift to myself. Three people asked where my whole outfit was from — it was just the collar.",
                name: "Hira A.",
                place: "Lahore",
              },
              {
                quote:
                  "I wore the Camille cuffs to a wedding and felt like I’d stepped out of a painting. The quality is so much better than I expected.",
                name: "Sofia R.",
                place: "London",
              },
              {
                quote:
                  "Finally, pretty details that don’t need a whole new wardrobe. They ship beautifully and the notes inside are the sweetest touch.",
                name: "Ayesha K.",
                place: "Karachi",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="bg-cream-deep border border-espresso/10 px-7 py-8 flex flex-col text-center"
              >
                <span className="font-logo text-5xl text-rose leading-none" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-espresso/85 leading-relaxed italic flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="label-caps !text-[0.6rem] mt-6 text-espresso/70">
                  {t.name} · {t.place}
                </figcaption>
              </figure>
            ))}
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

      {/* ——— FAQ ——— */}
      <RevealOnScroll>
        <section className="mx-auto max-w-3xl px-5 sm:px-8 pt-24">
          <div className="text-center mb-10">
            <p className="label-caps text-espresso/60">Good to Know</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Little questions, answered</h2>
            <LeafDivider className="w-44 mx-auto mt-5 text-espresso/70" />
          </div>

          <div className="divide-y divide-espresso/12 border-y border-espresso/12">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                  <span className="font-serif text-lg sm:text-xl text-espresso">{item.q}</span>
                  <span
                    className="text-rose text-2xl leading-none transition-transform duration-300 group-open:rotate-45 select-none"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-espresso/75 leading-relaxed pr-8">{item.a}</p>
              </details>
            ))}
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
