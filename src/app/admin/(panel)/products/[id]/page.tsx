import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const product = getProductById(Number(id));
  if (!product) notFound();

  return (
    <div>
      <h2 className="text-2xl mb-6">
        Edit · <span className="italic">{product.name}</span>
      </h2>
      <ProductForm product={product} error={error} />
    </div>
  );
}
