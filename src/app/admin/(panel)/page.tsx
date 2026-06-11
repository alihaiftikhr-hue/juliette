import Image from "next/image";
import Link from "next/link";
import { adjustStockAction, deleteProductAction } from "@/app/admin/actions";
import ProductArt from "@/components/ProductArt";
import { formatPrice } from "@/data/products";
import { listProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { saved, deleted } = await searchParams;
  const products = listProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-espresso/70">
          {products.length} product{products.length === 1 ? "" : "s"} ·{" "}
          {products.filter((p) => p.stock === 0).length} sold out
        </p>
        <Link href="/admin/products/new" className="btn">
          + Add Product
        </Link>
      </div>

      {saved && (
        <p className="mb-5 text-sage" role="status">
          ✦ Product saved.
        </p>
      )}
      {deleted && (
        <p className="mb-5 text-rose" role="status">
          ✦ Product deleted.
        </p>
      )}

      <div className="overflow-x-auto border border-espresso/15">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-espresso/15 bg-cream-deep">
              <th className="label-caps !text-[0.6rem] px-4 py-3">Product</th>
              <th className="label-caps !text-[0.6rem] px-4 py-3">Category</th>
              <th className="label-caps !text-[0.6rem] px-4 py-3">Price</th>
              <th className="label-caps !text-[0.6rem] px-4 py-3">Stock</th>
              <th className="label-caps !text-[0.6rem] px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-espresso/10 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`${p.canvas} relative w-12 h-12 shrink-0 overflow-hidden border border-espresso/10`}>
                      {p.image ? (
                        <Image
                          src={p.image.src}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <ProductArt kind={p.art} accent={p.accent} className="w-full h-full" />
                      )}
                    </div>
                    <div>
                      <p className="leading-tight">{p.name}</p>
                      <p className="text-xs text-espresso/50">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-espresso/75">{p.category}</td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <form action={adjustStockAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="delta" value={-1} />
                      <button
                        type="submit"
                        aria-label={`Decrease stock of ${p.name}`}
                        className="w-7 h-7 border border-espresso/25 hover:border-rose hover:text-rose transition-colors cursor-pointer"
                      >
                        −
                      </button>
                    </form>
                    <span
                      className={`min-w-8 text-center tabular-nums ${
                        p.stock === 0 ? "text-rose font-semibold" : ""
                      }`}
                    >
                      {p.stock}
                    </span>
                    <form action={adjustStockAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="delta" value={1} />
                      <button
                        type="submit"
                        aria-label={`Increase stock of ${p.name}`}
                        className="w-7 h-7 border border-espresso/25 hover:border-sage hover:text-sage transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </form>
                    {p.stock === 0 && (
                      <span className="label-caps !text-[0.55rem] text-rose">Sold out</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/shop/${p.slug}`}
                      className="label-caps !text-[0.6rem] text-espresso/60 hover:text-rose transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="label-caps !text-[0.6rem] hover:text-rose transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="label-caps !text-[0.6rem] text-rose/80 hover:text-rose transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-sm text-espresso/55 italic">
        Stock at zero shows the piece as sold out in the shop — it stays
        visible so admirers can still find it.
      </p>
    </div>
  );
}
