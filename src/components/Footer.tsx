import Link from "next/link";
import { JulietteEmblem } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      {/* Brand close — centred monogram + tagline */}
      <div className="text-center pt-16 pb-12 px-5 border-b border-cream/10">
        <JulietteEmblem className="w-36 sm:w-44 mx-auto text-cream/50" />
        <p className="font-tagline text-3xl sm:text-4xl text-cream/60 mt-4 leading-snug">
          Wear Your Fairytale
        </p>
        <a
          href="https://instagram.com/thejuliette.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps !text-[0.6rem] text-cream/35 hover:text-rose transition-colors mt-3 inline-block tracking-widest"
        >
          @thejuliette.pk
        </a>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="grid gap-12 sm:grid-cols-2 max-w-lg mx-auto sm:max-w-none">
          {/* Explore */}
          <div>
            <h3 className="label-caps text-kraft mb-5">Explore</h3>
            <ul className="space-y-3 text-cream/80">
              <li>
                <Link href="/shop" className="hover:text-rose transition-colors">
                  The Collection
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-rose transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier */}
          <div>
            <h3 className="label-caps text-kraft mb-5">The Atelier</h3>
            <p className="text-cream/80 leading-relaxed">
              Detachable lace, ribbon &amp; finery
              <br />
              to make any outfit prettier.
            </p>
            <p className="mt-4 text-cream/60">
              <a
                href="https://instagram.com/thejuliette.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose transition-colors"
              >
                Instagram ↗
              </a>
            </p>
          </div>
        </div>

        <hr className="hairline !border-cream/15 my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="label-caps !text-[0.6rem] text-cream/50">
            Est · MMXXVI · Pakistan
          </p>
          <p className="text-sm text-cream/50">
            © {new Date().getFullYear()} Juliette. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
