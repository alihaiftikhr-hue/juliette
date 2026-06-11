import type { Metadata } from "next";
import Link from "next/link";
import { JulietteEmblem, LeafDivider } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Juliette began with a simple thought: every wardrobe already holds a fairytale — it just needs a little lace to find it.",
};

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 sm:pt-20">
      <div className="text-center">

        <h1 className="mt-3 text-4xl sm:text-5xl">Our Story</h1>
        <LeafDivider className="w-44 mx-auto mt-6 text-espresso/70" />
      </div>

      <article className="mt-12 space-y-7 text-lg leading-relaxed text-espresso/85">
        <p className="first-letter:font-logo first-letter:text-6xl first-letter:text-rose first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]">
          Juliette began with a plain black kurta and a scrap of lace. Pinned
          at the collar for an evening, it turned the most ordinary piece in
          the wardrobe into the one everybody asked about. The lace came off
          at midnight — the kurta went back to being a kurta — and a small
          idea refused to leave.
        </p>
        <p>
          What if the prettiest part of an outfit could be a guest rather than
          a resident? Something you tie on, clip on, slip on — and move from
          dress to sweater to kameez as the week demands. Not fast fashion,
          but slow finery: a small wardrobe of details that makes a large
          wardrobe unnecessary.
        </p>
        <p>
          So we built an atelier around that thought. Every Juliette piece is
          detachable by design — collars that tie at the nape, cuffs that slip
          over wrists, bows on combs, ribbon by the yard. Each is cut and
          finished by hand, in batches small enough that we know
          every piece that leaves us.
        </p>

        <div className="py-6 text-center">
          <p className="font-tagline text-4xl sm:text-5xl leading-snug text-espresso">
            &ldquo;Every wardrobe already holds a fairytale —<br />
            it just needs a little lace to find it.&rdquo;
          </p>
        </div>

        <p>
          The name is borrowed from the most romantic heroine we know, and the
          motto is a promise: <em>wear your fairytale</em>. Not someone
          else&rsquo;s, bought whole off a rack — yours, conjured from the
          clothes you already love, one ribbon at a time.
        </p>
        <p>
          Our first collection arrives in 2026. It will be small, it will be
          made slowly, and we hope a piece of it ends up somewhere in your
          story.
        </p>
      </article>

      <div className="text-center mt-14">
        <JulietteEmblem className="w-60 mx-auto text-espresso/80" />
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/shop" className="btn">
            Explore the Collection
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Write to Us
          </Link>
        </div>
      </div>
    </div>
  );
}
