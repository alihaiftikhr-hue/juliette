import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { LeafDivider } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to the Juliette atelier — reservations, custom requests, and everything lovely in between.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-14 sm:pt-20">
      <div className="text-center mb-12">
        <p className="label-caps text-espresso/60">The Atelier</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Write to Us</h1>
        <p className="mt-4 max-w-lg mx-auto text-espresso/75">
          Reservations, custom requests, or simply to say hello — letters are
          our favourite kind of post.
        </p>
        <LeafDivider className="w-44 mx-auto mt-6 text-espresso/70" />
      </div>

      <ContactForm />

      <div className="mt-16 text-center space-y-2 text-espresso/70">
        <p className="label-caps text-espresso/60">Elsewhere</p>
        <p>
          <a
            href="https://instagram.com/thejuliette.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-rose transition-colors"
          >
            Instagram
          </a>
          <span className="mx-3" aria-hidden="true">·</span>
          Lahore, Pakistan
        </p>
      </div>
    </div>
  );
}
