"use client";

import { useState, useRef, useEffect } from "react";
import { getApiUrl, apiRequest } from "@/lib/api";

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  hint: string;
  min: number;
  max: number;
  step?: string;
};

const fields: FieldConfig[] = [
  { name: "N", label: "Nitrogen", placeholder: "e.g. 50", hint: "0–140", min: 0, max: 140 },
  { name: "P", label: "Phosphorous", placeholder: "e.g. 50", hint: "5–145", min: 5, max: 145 },
  { name: "K", label: "Potassium", placeholder: "e.g. 50", hint: "5–205", min: 5, max: 205 },
  { name: "ph", label: "Soil pH", placeholder: "e.g. 6.5", hint: "0–14", min: 0, max: 14, step: "0.1" },
  { name: "temperature", label: "Temperature (°C)", placeholder: "e.g. 25", hint: "Typical range 10–40", min: -50, max: 60 },
  { name: "humidity", label: "Humidity (%)", placeholder: "e.g. 60", hint: "0–100", min: 0, max: 100 },
  { name: "rainfall", label: "Rainfall (mm)", placeholder: "e.g. 100", hint: "0–300", min: 0, max: 500 },
];

const baseInputClass =
  "w-full px-4 py-3.5 rounded-xl bg-surface-elevated border text-[var(--text-primary)] placeholder:text-slate-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-accent-emerald/20";

function getInputClass(invalid?: boolean): string {
  return `${baseInputClass} ${invalid ? "border-red-500/50 focus:border-red-500" : "border-border focus:border-accent-emerald"}`;
}

export function CropForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus({ preventScroll: true });
  }, []);

  const validateField = (name: string, value: string): string | null => {
    const config = fields.find((f) => f.name === name);
    if (!config) return null;
    const num = Number(value);
    if (value.trim() === "") return "Required";
    if (Number.isNaN(num)) return "Enter a valid number";
    if (num < config.min) return `Min ${config.min}`;
    if (num > config.max) return `Max ${config.max}`;
    return null;
  };

  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    fields.forEach(({ name }) => {
      const err = validateField(name, formData[name] ?? "");
      if (err) errors[name] = err;
    });
    setFieldErrors(errors);
    setTouched(fields.reduce((acc, { name }) => ({ ...acc, [name]: true }), {} as Record<string, boolean>));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setResult(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      const err = validateField(name, value);
      setFieldErrors((prev) => (err ? { ...prev, [name]: err } : { ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFieldErrors((prev) => (err ? { ...prev, [name]: err } : { ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateAll()) return;
    setLoading(true);
    try {
      const body: Record<string, number> = {};
      fields.forEach(({ name }) => {
        body[name] = Number(formData[name]);
      });
      const apiUrl = getApiUrl();
      const res = await apiRequest<{ payload?: string }>(`${apiUrl}/api/recommend`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setError(res.errorMessage);
        setLoading(false);
        return;
      }
      setResult(res.data?.payload ?? "No recommendation returned.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setError(null);
    setFormData({});
    setFieldErrors({});
    setTouched({});
    firstInputRef.current?.focus({ preventScroll: true });
  };

  const soilFields = fields.filter((f) => ["N", "P", "K", "ph"].includes(f.name));
  const climateFields = fields.filter((f) => ["temperature", "humidity", "rainfall"].includes(f.name));

  return (
    <div className="max-w-xl mx-auto p-6 md:p-8 rounded-3xl border border-border bg-surface-elevated/50 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Soil nutrients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {soilFields.map(({ name, label, placeholder, hint, min, max, step }) => (
              <div key={name} className={smGridFull(name) ? "sm:col-span-2" : ""}>
                <label htmlFor={name} className="block text-sm font-medium text-slate-400 mb-1">
                  {label}
                </label>
                <input
                  ref={name === "N" ? firstInputRef : undefined}
                  id={name}
                  name={name}
                  type="number"
                  inputMode="decimal"
                  min={min}
                  max={max}
                  step={step ?? "1"}
                  placeholder={placeholder}
                  value={formData[name] ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldErrors[name]}
                  aria-describedby={fieldErrors[name] ? `${name}-error` : `${name}-hint`}
                  className={getInputClass(!!fieldErrors[name] && !!touched[name])}
                />
                {touched[name] && fieldErrors[name] ? (
                  <p id={`${name}-error`} className="mt-1 text-xs text-red-400" role="alert">
                    {fieldErrors[name]}
                  </p>
                ) : (
                  <p id={`${name}-hint`} className="mt-1 text-xs text-slate-500">{hint}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Climate
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {climateFields.map(({ name, label, placeholder, hint, min, max, step }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-slate-400 mb-1">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type="number"
                  inputMode="decimal"
                  min={min}
                  max={max}
                  step={step ?? "1"}
                  placeholder={placeholder}
                  value={formData[name] ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldErrors[name]}
                  aria-describedby={fieldErrors[name] ? `${name}-error` : `${name}-hint`}
                  className={getInputClass(!!fieldErrors[name] && !!touched[name])}
                />
                {touched[name] && fieldErrors[name] ? (
                  <p id={`${name}-error`} className="mt-1 text-xs text-red-400" role="alert">
                    {fieldErrors[name]}
                  </p>
                ) : (
                  <p id={`${name}-hint`} className="mt-1 text-xs text-slate-500">{hint}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-display font-semibold text-surface bg-gradient-to-r from-accent-emerald to-accent-mint text-white shadow-glow hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-surface border-t-transparent rounded-full animate-spin" />
              Recommending…
            </span>
          ) : (
            "Recommend crop"
          )}
        </button>
      </form>

      {error && (
        <div
          className="mt-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-scale-in"
          role="alert"
        >
          {error}
        </div>
      )}

      {result && (
        <div
          className="mt-6 p-5 rounded-2xl bg-accent-emerald/10 border border-border-hover animate-scale-in space-y-4"
          role="status"
        >
          <div>
            <p className="text-sm text-slate-400 mb-1">Recommended crop</p>
            <p className="font-display font-semibold text-accent-mint text-xl">{result}</p>
          </div>
          <button
            type="button"
            onClick={handleTryAgain}
            className="text-sm font-medium text-accent-mint hover:text-accent-emerald transition-colors"
          >
            ← Try another
          </button>
        </div>
      )}
    </div>
  );
}

function smGridFull(name: string): boolean {
  return name === "ph";
}
