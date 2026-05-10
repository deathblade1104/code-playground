import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] mt-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12]"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent-emerald/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/5 w-[28rem] h-[28rem] bg-accent-cyan/10 rounded-full blur-3xl animate-float animate-delay-300" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-mint/10 rounded-full blur-3xl animate-float animate-delay-200" />

      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-4xl w-full text-center">
          {/* Badge */}
          <p
            className="mb-5 inline-block rounded-full border border-accent-emerald/30 bg-accent-emerald/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-mint animate-fade-in opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            ML-Powered Agriculture
          </p>

          {/* Headline */}
          <h1
            className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up opacity-0 animate-delay-100"
            style={{ animationFillMode: "forwards" }}
          >
            Digital Farming
            <span className="mt-2 block bg-gradient-to-r from-accent-mint via-accent-emerald to-accent-cyan bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>

          <p
            className="mx-auto mb-8 max-w-xl text-base text-slate-400 sm:text-lg md:text-xl animate-fade-in-up opacity-0 animate-delay-200"
            style={{ animationFillMode: "forwards" }}
          >
            Get crop and fertilizer recommendations powered by machine learning. 
            Better decisions, better yields.
          </p>

          {/* CTAs */}
          <div
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up opacity-0 animate-delay-300"
            style={{ animationFillMode: "forwards" }}
          >
            <Link
              href="/home"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent-emerald to-accent-mint px-8 py-4 font-display font-semibold text-surface shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]"
            >
              Explore
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/crop"
                className="rounded-xl border border-border bg-surface-elevated/80 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-accent-emerald/40 hover:bg-surface-muted/50 hover:text-[var(--text-primary)]"
              >
                Crop recommendation
              </Link>
              <Link
                href="/fertiliser"
                className="rounded-xl border border-border bg-surface-elevated/80 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-accent-emerald/40 hover:bg-surface-muted/50 hover:text-[var(--text-primary)]"
              >
                Fertilizer suggestion
              </Link>
            </div>
          </div>

          {/* Feature strip */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-500 animate-fade-in opacity-0 animate-delay-500"
            style={{ animationFillMode: "forwards" }}
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              Smart crop matching
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              Soil-based fertilizer
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
              Free to use
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
