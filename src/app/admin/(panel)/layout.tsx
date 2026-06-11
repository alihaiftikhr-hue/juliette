import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Atelier Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso/15 pb-5">
        <div>
          <p className="label-caps text-espresso/60">The Atelier</p>
          <h1 className="text-3xl mt-1">Admin</h1>
        </div>
        <nav className="flex items-center gap-5">
          <Link href="/admin" className="label-caps hover:text-rose transition-colors">
            Products
          </Link>
          <Link href="/" className="label-caps hover:text-rose transition-colors">
            View Site ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="label-caps text-espresso/60 hover:text-rose transition-colors cursor-pointer">
              Logout
            </button>
          </form>
        </nav>
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
}
