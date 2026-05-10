import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="pt-24 pb-20 px-4">
      <section className="max-w-4xl mx-auto text-center mb-24">
        <p className="text-accent-mint font-medium mb-2 text-sm uppercase tracking-widest animate-fade-in opacity-0" style={{ animationFillMode: "forwards" }}>
          Welcome to
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-4 animate-fade-in-up opacity-0 animate-delay-100" style={{ animationFillMode: "forwards" }}>
          Digital Farming Solutions
        </h1>
        <div className="flex items-center justify-center gap-3 my-8 animate-fade-in opacity-0 animate-delay-200" style={{ animationFillMode: "forwards" }}>
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent-emerald/50" />
          <span className="text-accent-mint text-xl">✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent-emerald/50" />
        </div>
        <p className="text-slate-400 text-lg">We are ready to assist you</p>
      </section>

      <section className="max-w-5xl mx-auto mb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <p className="text-accent-mint font-medium text-sm uppercase tracking-wider">Discover</p>
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)]">
              Our Story
            </h2>
            <p className="text-slate-400 leading-relaxed">
              We are an enthusiastic team striving to bring Machine Learning and
              AI into daily life. Digital Farming Solutions uses cutting-edge
              technology to provide state-of-the-art solutions for agriculture,
              helping farmers increase the quality and quantity of their produce.
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-card group">
            <Image
              src="https://media.istockphoto.com/vectors/artificial-intelligence-neural-network-ai-with-digital-brain-is-face-vector-id1145990155?k=20&m=1145990155&s=612x612&w=0&h=fCdHHleOG1GMcmYqzfr_6lQySijag46f2NxsmBugG-s="
              alt="AI and agriculture"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-28 py-20 border-y border-border">
        <p className="text-accent-mint font-medium text-center text-sm uppercase tracking-wider mb-2">Innovative</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center">
          Technologies
        </h2>
      </section>

      <section className="max-w-5xl mx-auto mb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-3">
            {[
              "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?w=400&q=80",
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
              "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
              "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden border border-border shadow-card hover:border-border-hover hover:shadow-glow transition-all duration-300"
              >
                <Image
                  src={src}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-accent-mint font-medium text-sm uppercase tracking-wider mb-2">Discover</p>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
              Our products
            </h2>
            <ul className="text-slate-400 space-y-4">
              <li>
                <strong className="text-[var(--text-primary)]">Crop Recommendation</strong> — Best crop for your farm based on rainfall, humidity, temperature, and soil content.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Fertilizer Recommendation</strong> — Best fertilizer based on crop and soil nutrients.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Crop Health Prediction</strong> — Forecast crop health from soil, pesticide, and pest data.
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/crop"
                className="px-6 py-3 rounded-xl bg-accent-emerald/15 text-accent-mint font-medium border border-border-hover hover:bg-accent-emerald/25 hover:shadow-glow transition-all duration-300"
              >
                Crop
              </Link>
              <Link
                href="/fertiliser"
                className="px-6 py-3 rounded-xl bg-accent-emerald/15 text-accent-mint font-medium border border-border-hover hover:bg-accent-emerald/25 hover:shadow-glow transition-all duration-300"
              >
                Fertilizer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto text-center">
        <p className="text-accent-mint font-medium text-sm uppercase tracking-wider mb-2">What&apos;s next</p>
        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
          For us?
        </h2>
        <p className="text-slate-400 leading-relaxed">
          CNN-based plant disease identification, ML models for reintroduction of
          endangered plants, and yield-based price forecasting for smarter
          pricing strategies.
        </p>
      </section>
    </div>
  );
}
