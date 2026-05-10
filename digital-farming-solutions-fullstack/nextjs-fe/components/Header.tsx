"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/crop", label: "Crop" },
  { href: "/fertiliser", label: "Fertilizer" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change or escape
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (href: string) => {
    if (href === "/home") return pathname === "/" || pathname === "/home";
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4" aria-label="Main">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--text-primary)] transition-transform hover:opacity-90 active:scale-[0.98]"
          aria-label="Digital Farming Solutions — go to home"
        >
          <Image
            src="https://i.ibb.co/1qgkf0b/logo.png"
            alt=""
            width={48}
            height={48}
            className="h-9 w-auto sm:h-10"
          />
          <span className="font-display text-base font-semibold sm:text-lg">
            DFS
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex md:items-center md:gap-0.5">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-accent-mint"
                    : "text-slate-400 hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive(href) && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent-emerald"
                    aria-hidden
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-[var(--text-primary)] transition-colors hover:bg-surface-elevated hover:border-border-hover md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="h-6 w-6 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${menuOpen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div
          className="fixed inset-0 top-16 bg-surface/60 backdrop-blur-sm"
          aria-hidden
          onClick={() => setMenuOpen(false)}
        />
        <ul className="fixed left-4 right-4 top-20 rounded-2xl border border-border bg-surface-elevated py-2 shadow-card">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex px-4 py-3.5 text-base font-medium transition-colors ${
                  isActive(href)
                    ? "border-l-2 border-accent-emerald bg-accent-emerald/10 text-accent-mint"
                    : "border-l-2 border-transparent text-slate-400 hover:bg-surface-muted/50 hover:text-[var(--text-primary)]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
