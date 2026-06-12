import Image from "next/image";
import { saveProductAction } from "@/app/admin/actions";
import { CATEGORIES, type Product } from "@/data/products";

const ERRORS: Record<string, string> = {
  invalid: "Please fill in a name, category and price.",
  "unsupported-type": "Photos must be JPEG, PNG, WebP or AVIF.",
  "too-large": "Photos must be under 5 MB.",
  upload: "The photo could not be saved — please try again.",
  missing: "That product no longer exists.",
};

export default function ProductForm({
  product,
  error,
}: {
  product?: Product;
  error?: string;
}) {
  return (
    <form action={saveProductAction} className="max-w-2xl space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      {error && (
        <p className="text-rose" role="alert">
          {ERRORS[error] ?? "Something went wrong — please try again."}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="p-name" className="label-caps block mb-2">
            Name *
          </label>
          <input
            id="p-name"
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="p-slug" className="label-caps block mb-2">
            Slug <span className="normal-case opacity-60">(blank = from name)</span>
          </label>
          <input
            id="p-slug"
            name="slug"
            type="text"
            defaultValue={product?.slug}
            placeholder="e.g. odette-lace-collar"
            className="field"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <label htmlFor="p-category" className="label-caps block mb-2">
            Category *
          </label>
          <select
            id="p-category"
            name="category"
            defaultValue={product?.category ?? CATEGORIES[0]}
            className="field"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="p-price" className="label-caps block mb-2 whitespace-nowrap">
            Price (Rs) *
          </label>
          <input
            id="p-price"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={product?.price}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="p-price-intl" className="label-caps block mb-2 whitespace-nowrap">
            Price Intl (Rs)
          </label>
          <input
            id="p-price-intl"
            name="price_intl"
            type="number"
            min={0}
            defaultValue={product?.price_intl ?? product?.price}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="p-stock" className="label-caps block mb-2">
            Stock
          </label>
          <input
            id="p-stock"
            name="stock"
            type="number"
            min={0}
            defaultValue={product?.stock ?? 0}
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="p-blurb" className="label-caps block mb-2">
          Blurb <span className="normal-case opacity-60">(one line, shown in lists)</span>
        </label>
        <input
          id="p-blurb"
          name="blurb"
          type="text"
          defaultValue={product?.blurb}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="p-description" className="label-caps block mb-2">
          Description
        </label>
        <textarea
          id="p-description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          className="field resize-y"
        />
      </div>

      <div>
        <label htmlFor="p-details" className="label-caps block mb-2">
          Details <span className="normal-case opacity-60">(one per line)</span>
        </label>
        <textarea
          id="p-details"
          name="details"
          rows={4}
          defaultValue={product?.details.join("\n")}
          className="field resize-y"
        />
      </div>

      <fieldset className="border border-espresso/15 p-5">
        <legend className="label-caps px-2">Photograph</legend>

        {product?.image && (
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20 overflow-hidden border border-espresso/10">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <label className="flex items-center gap-2 text-espresso/75 cursor-pointer">
              <input type="checkbox" name="removePhoto" className="accent-[#c9a6a0]" />
              Remove this photo (fall back to illustration)
            </label>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="p-photo" className="label-caps block mb-2">
              {product?.image ? "Replace photo" : "Upload photo"}
            </label>
            <input
              id="p-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="field !py-2.5 file:label-caps file:border-0 file:bg-espresso file:text-cream file:px-3 file:py-1.5 file:mr-3 file:cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="p-image-alt" className="label-caps block mb-2">
              Photo description <span className="normal-case opacity-60">(alt text)</span>
            </label>
            <input
              id="p-image-alt"
              name="imageAlt"
              type="text"
              defaultValue={product?.image?.alt}
              placeholder="What does the photo show?"
              className="field"
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-espresso/55 italic">
          Without a photo the shop shows the hand-drawn illustration for the
          product&rsquo;s category.
        </p>
      </fieldset>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" className="btn">
          {product ? "Save Changes" : "Create Product"}
        </button>
        <a href="/admin" className="btn btn-ghost">
          Cancel
        </a>
      </div>
    </form>
  );
}
