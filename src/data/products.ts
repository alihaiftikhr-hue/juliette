export type ArtKind = "collar" | "bow" | "ribbon" | "cuff" | "brooch" | "bandana";

export type ProductInput = {
  slug: string;
  name: string;
  category: string;
  price: number; // PKR
  blurb: string;
  description: string;
  details: string[];
  art: ArtKind;
  /** Tailwind background utility for the card canvas */
  canvas: string;
  /** Accent colour used inside the illustration */
  accent: string;
  /** Product photograph — when present it replaces the line illustration */
  image?: { src: string; alt: string };
  /** Units currently in stock; 0 renders as sold out */
  stock: number;
};

export type Product = ProductInput & { id: number };

export const CATEGORIES = [
  "Cuffs",
  "Sleeves",
  "Bandanas",
  "Sets",
  "Accessories",
] as const;

/** Default illustration per category, for products without photos yet. */
export const CATEGORY_ART: Record<string, ArtKind> = {
  Cuffs: "cuff",
  Sleeves: "cuff",
  Bandanas: "bandana",
  Sets: "ribbon",
  Accessories: "collar",
};

export const CARD_CANVASES = ["bg-cream-deep", "bg-kraft-soft", "bg-rose-soft"];
export const CARD_ACCENTS = ["#8a9a7b", "#c9a6a0", "#43342a"];

/** Initial catalogue used to seed the database on first run. */
export const seedProducts: ProductInput[] = [
  {
    slug: "odette-lace-collar",
    name: "Odette Lace Collar",
    category: "Accessories",
    price: 2450,
    blurb: "A detachable scalloped lace collar that turns a plain kameez into a storybook page.",
    description:
      "Odette is our signature piece — a softly scalloped collar in cream cotton lace, finished with a single ribbon tie at the nape. Slip it over a sweater, a plain kurta, or a black dress and let it do the talking.",
    details: [
      "Cream cotton lace, soft against the skin",
      "Ties at the back with a satin ribbon",
      "Fits all necklines · one size",
      "Hand-finished in our Lahore atelier",
    ],
    art: "collar",
    canvas: "bg-cream-deep",
    accent: "#8a9a7b",
    stock: 12,
  },
  {
    slug: "wren-velvet-bow",
    name: "Wren Velvet Bow",
    category: "Accessories",
    price: 1250,
    blurb: "An oversized velvet hair bow in deep espresso — quietly dramatic.",
    description:
      "The Wren bow is cut from soft cotton velvet and mounted on a French barrette. Wear it low at the nape for an old-portrait silhouette, or high for something more playful.",
    details: [
      "Cotton velvet, espresso brown",
      "French barrette clip, silver tone",
      "Approx. 14 cm across",
      "Hand-tied — each bow sits slightly differently",
    ],
    art: "bow",
    canvas: "bg-rose-soft",
    accent: "#43342a",
    stock: 20,
  },
  {
    slug: "fable-ribbon-set",
    name: "Fable Ribbon Set",
    category: "Sets",
    price: 950,
    blurb: "Three yards each of sage, dusty rose and cream double-faced satin.",
    description:
      "A little library of ribbon. Braid it into your hair, lace it through a cuff, tie it round a gift — the Fable set is the quiet workhorse of a romantic wardrobe.",
    details: [
      "Double-faced satin · 16 mm width",
      "Sage, dusty rose & cream — 3 yards each",
      "Cut, sealed and spooled by hand",
      "Wrapped on kraft card spools",
    ],
    art: "ribbon",
    canvas: "bg-kraft-soft",
    accent: "#c9a6a0",
    stock: 25,
  },
  {
    slug: "elowen-lace-cuffs",
    name: "Elowen Lace Cuffs",
    category: "Cuffs",
    price: 1850,
    blurb: "A pair of detachable lace cuffs that peek from beneath any sleeve.",
    description:
      "Elowen cuffs slip on under a blazer, a sweater or a winter shawl, ending every sleeve in a flourish of cream lace. Subtle from afar; unmistakable up close.",
    details: [
      "Sold as a pair",
      "Elasticated — slips over the wrist",
      "Cream cotton lace, 6 cm deep",
      "Hand-finished edges",
    ],
    art: "cuff",
    canvas: "bg-cream-deep",
    accent: "#c9a6a0",
    image: {
      src: "/products/lace.jpg",
      alt: "Elowen embroidered lace cuff flaring over the wrist",
    },
    stock: 10,
  },
  {
    slug: "camille-pearl-button-cuffs",
    name: "Camille Pearl-Button Cuffs",
    category: "Cuffs",
    price: 2650,
    blurb: "Crisp satin cuffs with embroidered lace ruffles and a row of pearl buttons.",
    description:
      "Camille is the cuff for occasions — a crisp white satin band closed with a row of tiny pearl buttons, opening into a generous ruffle of embroidered lace. Worn under a plain sleeve, it gives any outfit the wrists of a portrait sitter.",
    details: [
      "Sold as a pair",
      "White satin band with pearl-knot buttons",
      "Embroidered floral lace ruffle",
      "Hand-finished in our Lahore atelier",
    ],
    art: "cuff",
    canvas: "bg-kraft-soft",
    accent: "#8a9a7b",
    image: {
      src: "/products/lace_cuff.webp",
      alt: "Pair of Camille white satin cuffs with pearl buttons and embroidered lace ruffles",
    },
    stock: 8,
  },
  {
    slug: "marguerite-ribbon-brooch",
    name: "Marguerite Ribbon Brooch",
    category: "Accessories",
    price: 1450,
    blurb: "A rosette brooch of pleated ribbon with trailing satin tails.",
    description:
      "A pleated rosette of dusty-rose satin with two trailing tails, pinned wherever an outfit feels unfinished — a lapel, a strap, the band of a hat.",
    details: [
      "Dusty rose satin rosette",
      "Trailing tails, approx. 18 cm",
      "Locking pin back",
      "Made to order in small batches",
    ],
    art: "brooch",
    canvas: "bg-kraft-soft",
    accent: "#8a9a7b",
    stock: 9,
  },
  {
    slug: "isolde-floral-bandana",
    name: "Isolde Floral Bandana",
    category: "Bandanas",
    price: 1650,
    blurb: "A square of sage-print cotton voile — tie it round your neck, your hair, or your bag.",
    description:
      "Isolde is a generous square of sage floral-print cotton voile, hand-hemmed on all four sides. Fold it into a neck tie for an old-money silhouette, wrap it around a topknot, or loop it through a bag strap.",
    details: [
      "Sage floral print on cotton voile",
      "55 × 55 cm",
      "Hand-rolled hems on all four sides",
      "Packaged flat on a kraft card",
    ],
    art: "bandana",
    canvas: "bg-rose-soft",
    accent: "#8a9a7b",
    stock: 6,
  },
  {
    slug: "noor-pearl-collar",
    name: "Noor Pearl-Edge Collar",
    category: "Accessories",
    price: 2950,
    blurb: "Our lace collar, edged in tiny glass pearls for candlelit evenings.",
    description:
      "The evening sister of Odette. The same scalloped lace, traced along its edge with tiny glass pearls that catch the light when you turn your head.",
    details: [
      "Cream lace with glass pearl edging",
      "Satin ribbon tie at the nape",
      "One size · fits all necklines",
      "Limited batch of thirty",
    ],
    art: "collar",
    canvas: "bg-kraft-soft",
    accent: "#c9a6a0",
    stock: 30,
  },
  {
    slug: "briar-hair-ribbon",
    name: "Briar Hair Ribbon",
    category: "Accessories",
    price: 750,
    blurb: "A single wide ribbon, pre-tied to a comb — a bow without the fuss.",
    description:
      "All the romance of a hand-tied bow with none of the morning struggle. Briar comes pre-tied to a small comb that slides into braids, buns and half-up styles.",
    details: [
      "Available in cream or dusty rose satin",
      "Pre-tied on a tortoise comb",
      "Bow approx. 11 cm across",
      "Re-tieable if you like yours looser",
    ],
    art: "bow",
    canvas: "bg-cream-deep",
    accent: "#c9a6a0",
    stock: 14,
  },
];

export function formatPrice(price: number): string {
  return `Rs ${price.toLocaleString("en-PK")}`;
}
