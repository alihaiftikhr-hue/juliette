import Image from "next/image";
import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import { formatPrice, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      aria-label={`${product.name} — ${formatPrice(product.price)}`}
    >
      <div
        className={`${product.canvas} relative overflow-hidden aspect-square border border-espresso/10 transition-colors duration-500 group-hover:border-espresso/30`}
      >
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <ProductArt
            kind={product.art}
            accent={product.accent}
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        <span
          className={`label-caps !text-[0.55rem] absolute top-3 left-3 ${
            product.image
              ? "bg-cream/85 px-2 py-1 text-espresso/80"
              : "text-espresso/55"
          }`}
        >
          {product.category}
        </span>
        {product.stock === 0 && (
          <span className="label-caps !text-[0.55rem] absolute bottom-3 right-3 bg-espresso/90 text-cream px-2.5 py-1">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xl leading-snug group-hover:text-rose transition-colors">
          {product.name}
        </h3>
        <p className="label-caps !text-[0.62rem] mt-1.5 text-espresso/70">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
