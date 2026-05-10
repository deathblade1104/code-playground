import { CropForm } from "@/components/CropForm";

export default function CropPage() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-accent-mint font-medium text-sm uppercase tracking-wider mb-2 animate-fade-in opacity-0" style={{ animationFillMode: "forwards" }}>
          Soil & climate
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 animate-fade-in-up opacity-0 animate-delay-100" style={{ animationFillMode: "forwards" }}>
          Crop recommendation
        </h1>
        <p className="text-slate-400 animate-fade-in-up opacity-0 animate-delay-200" style={{ animationFillMode: "forwards" }}>
          Enter your soil and climate data to get the best crop suggestion for your farm.
        </p>
      </div>
      <div className="animate-fade-in-up opacity-0 animate-delay-300" style={{ animationFillMode: "forwards" }}>
        <CropForm />
      </div>
    </div>
  );
}
