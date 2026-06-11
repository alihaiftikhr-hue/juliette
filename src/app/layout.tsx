import type { Metadata } from "next";
import {
  Allura,
  Cinzel,
  Cormorant_Garamond,
  Italianno,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "@/components/CartProvider";

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Juliette · Wear Your Fairytale",
    template: "%s · Juliette",
  },
  description:
    "Detachable lace, ribbon & finery to make any outfit prettier. Est. 2026 · Pakistan.",
  keywords: [
    "detachable lace",
    "ribbon",
    "collars",
    "accessories",
    "Juliette",
    "Pakistan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${allura.variable} ${italianno.variable} ${cinzel.variable} ${cormorant.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
