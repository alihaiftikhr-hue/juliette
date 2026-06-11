import Link from "next/link";
import { JulietteEmblem } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid gap-12 sm:grid-cols-[1.2fr_1fr_1fr] items-start">
          {/* Emblem */}
          <div className="max-w-[280px]">
            <JulietteEmblem className="w-full text-cream" />
          </div>

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
