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
        className={`${product.canvas} relative overflow-hidden aspect-square border border-espresso/10 transition-all duration-500 group-hover:border-espresso/30 group-hover:shadow-xl group-hover:shadow-espresso/5`}
      >
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <ProductArt
            kind={product.art}
            accent={product.accent}
            className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-espresso/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <span className="btn !py-2 !px-5 !text-[0.65rem] bg-cream text-espresso border-none shadow-lg">
            Explore Piece
          </span>
        </div>

        <span
          className={`label-caps !text-[0.55rem] absolute top-4 left-4 z-10 ${product.image
              ? "bg-cream/90 backdrop-blur-sm px-2.5 py-1 text-espresso/80 shadow-sm"
              : "text-espresso/55"
            }`}
        >
          {product.category}
        </span>

        {product.stock === 0 && (
          <span className="label-caps !text-[0.55rem] absolute bottom-4 right-4 z-10 bg-espresso/90 text-cream px-3 py-1.5 shadow-lg">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl sm:text-2xl leading-snug group-hover:text-rose transition-colors duration-300">
          {product.name}
        </h3>
        <p className="label-caps !text-[0.7rem] mt-2 text-espresso/70 tracking-widest">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
