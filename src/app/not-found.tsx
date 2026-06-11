import Link from "next/link";
import { LeafDivider } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-24 text-center">
      <p className="label-caps text-espresso/60">Page Not Found</p>
      <p className="font-tagline text-5xl sm:text-6xl mt-6 leading-snug text-espresso">
        This page wandered off into the woods…
      </p>
      <LeafDivider className="w-44 mx-auto mt-8 text-espresso/70" />
      <p className="mt-6 text-espresso/75">
        The path you followed doesn&rsquo;t lead anywhere — but the collection
        is just over the hill.
      </p>
      <Link href="/" className="btn mt-10">
        Return Home
      </Link>
    </div>
  );
}
