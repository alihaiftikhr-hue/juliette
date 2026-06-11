import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { LeafDivider } from "@/components/Logo";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Atelier Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-5 pt-24 text-center">
      <p className="label-caps text-espresso/60">The Atelier</p>
      <h1 className="mt-3 text-4xl">Admin</h1>
      <LeafDivider className="w-36 mx-auto mt-5 text-espresso/70" />

      {error && (
        <p className="mt-6 text-rose" role="alert">
          That isn&rsquo;t the magic word — try again.
        </p>
      )}

      <form action={loginAction} className="mt-8 space-y-4">
        <label htmlFor="admin-password" className="sr-only">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoFocus
          placeholder="Password"
          className="field text-center"
        />
        <button type="submit" className="btn w-full">
          Enter the Atelier
        </button>
      </form>
    </div>
  );
}
