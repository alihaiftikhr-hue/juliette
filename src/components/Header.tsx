"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/Logo";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-espresso/15">
      {/* Announcement ribbon */}
      <div className="bg-espresso text-cream text-center py-1.5 px-4">
        <p className="label-caps !text-[0.6rem] opacity-90">
          Handmade in Lahore · First collection arriving soon
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu button */}
          <button
            type="button"
            className="sm:hidden p-2 -ml-2 text-espresso"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
              {open ? (
                <path d="M4 4l14 14M18 4L4 18" />
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" />
              )}
            </svg>
          </button>

          {/* Desktop nav (left) */}
          <nav className="hidden sm:flex items-center gap-8 flex-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label-caps transition-colors hover:text-rose ${
                  pathname.startsWith(item.href) ? "text-rose" : "text-espresso"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Wordmark (centre) */}
          <Link
            href="/"
            className="text-espresso hover:text-rose transition-colors"
            aria-label="Juliette — home"
          >
            <Wordmark className="text-4xl sm:text-[2.6rem]" />
          </Link>

          {/* Right side */}
          <div className="flex items-center justify-end flex-1">
            <span className="hidden sm:block font-tagline text-2xl text-espresso/70 select-none">
              Wear Your Fairytale
            </span>
            <span className="sm:hidden w-[22px]" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <nav className="sm:hidden border-t border-espresso/15 bg-cream px-5 py-4 flex flex-col gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`label-caps ${
                pathname.startsWith(item.href) ? "text-rose" : "text-espresso"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
