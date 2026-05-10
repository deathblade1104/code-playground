import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-elevated/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h4 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3">
              About the project
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              This web app was initially developed by Shahbaz and Nikhar as part
              of their final year BTech project. It combines a Next.js frontend
              with a Django microservice that serves ML models for crop
              recommendation and fertilizer suggestion.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-lg text-[var(--text-primary)]">
              Navigate
            </h4>
            <ul className="flex flex-wrap gap-4">
              {[
                { href: "/", label: "Landing" },
                { href: "/home", label: "Home" },
                { href: "/crop", label: "Crop" },
                { href: "/fertiliser", label: "Fertilizer" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-accent-mint transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-slate-500 text-sm text-center">
            Digital Farming Solutions — ML-powered agriculture tools
          </p>
        </div>
      </div>
    </footer>
  );
}
