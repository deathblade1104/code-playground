"use client";

import { useState } from "react";
import { getApiUrl, apiRequest } from "@/lib/api";
import { CropSelect } from "@/components/CropSelect";

const baseInputClass =
  "w-full px-4 py-3.5 rounded-xl bg-surface-elevated border text-[var(--text-primary)] placeholder:text-slate-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-accent-emerald/20";

function getInputClass(invalid?: boolean): string {
  return `${baseInputClass} ${invalid ? "border-red-500/50 focus:border-red-500" : "border-border focus:border-accent-emerald"}`;
}

const nutrientFields = [
  { name: "N" as const, label: "Nitrogen", hint: "0–140", min: 0, max: 140 },
  { name: "P" as const, label: "Phosphorous", hint: "5–145", min: 5, max: 145 },
  { name: "K" as const, label: "Potassium", hint: "5–205", min: 5, max: 205 },
];

export function FertiliserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    Crop: "",
    N: "",
    P: "",
    K: "",
    soil_moisture: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateNutrient = (name: string, value: string, min: number, max: number): string | null => {
    if (value.trim() === "") return "Required";
    const num = Number(value);
    if (Number.isNaN(num)) return "Enter a valid number";
    if (num < min) return `Min ${min}`;
    if (num > max) return `Max ${max}`;
    return null;
  };

  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.Crop.trim()) errors.Crop = "Select a crop";
    nutrientFields.forEach(({ name, min, max }) => {
      const err = validateNutrient(name, formData[name], min, max);
      if (err) errors[name] = err;
    });
    const sm = formData.soil_moisture.trim();
    if (!sm) errors.soil_moisture = "Required";
    else if (Number.isNaN(Number(sm))) errors.soil_moisture = "Enter a valid number";
    setFieldErrors(errors);
    setTouched({
      Crop: true,
      N: true,
      P: true,
      K: true,
      soil_moisture: true,
    });
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setResult(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      const config = nutrientFields.find((f) => f.name === name);
      const err = config
        ? validateNutrient(name, value, config.min, config.max)
        : value.trim() === "" ? "Required" : Number.isNaN(Number(value)) ? "Enter a valid number" : null;
      setFieldErrors((prev) => (err ? { ...prev, [name]: err } : { ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const config = nutrientFields.find((f) => f.name === name);
    const err = config
      ? validateNutrient(name, value, config.min, config.max)
      : name === "soil_moisture"
        ? (value.trim() === "" ? "Required" : Number.isNaN(Number(value)) ? "Enter a valid number" : null)
        : null;
    setFieldErrors((prev) => (err ? { ...prev, [name]: err } : { ...prev, [name]: "" }));
  };

  const handleCropChange = (value: string) => {
    setError(null);
    setResult(null);
    setFormData((prev) => ({ ...prev, Crop: value }));
    if (fieldErrors.Crop) setFieldErrors((prev) => ({ ...prev, Crop: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateAll()) return;
    setLoading(true);
    try {
      const body = {
        Crop: formData.Crop,
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        soil_moisture: Number(formData.soil_moisture),
      };
      const apiUrl = getApiUrl();
      const res = await apiRequest<{ payload?: string }>(`${apiUrl}/api/suggest`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setError(res.errorMessage);
        setLoading(false);
        return;
      }
      setResult(res.data?.payload ?? "No suggestion returned.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setError(null);
    setFormData({ Crop: "", N: "", P: "", K: "", soil_moisture: "" });
    setFieldErrors({});
    setTouched({});
  };

  return (
    <div className="max-w-xl mx-auto p-6 md:p-8 rounded-3xl border border-border bg-surface-elevated/50 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Crop & soil
          </h3>
          <div>
            <CropSelect
              id="Crop"
              value={formData.Crop}
              onChange={handleCropChange}
              disabled={loading}
              aria-label="Search or select crop"
            />
            {touched.Crop && fieldErrors.Crop && (
              <p className="mt-1 text-xs text-red-400" role="alert">
                {fieldErrors.Crop}
              </p>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Soil nutrients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nutrientFields.map(({ name, label, hint, min, max }) => (
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
                  placeholder={hint}
                  value={formData[name]}
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
          <div>
            <label htmlFor="soil_moisture" className="block text-sm font-medium text-slate-400 mb-1">
              Soil moisture
            </label>
            <input
              id="soil_moisture"
              name="soil_moisture"
              type="number"
              inputMode="decimal"
              placeholder="e.g. 0.5"
              value={formData.soil_moisture}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!fieldErrors.soil_moisture}
              aria-describedby={fieldErrors.soil_moisture ? "soil_moisture-error" : "soil_moisture-hint"}
              className={getInputClass(!!fieldErrors.soil_moisture && !!touched.soil_moisture)}
            />
            {touched.soil_moisture && fieldErrors.soil_moisture ? (
              <p id="soil_moisture-error" className="mt-1 text-xs text-red-400" role="alert">
                {fieldErrors.soil_moisture}
              </p>
            ) : (
              <p id="soil_moisture-hint" className="mt-1 text-xs text-slate-500">
                Moisture content value
              </p>
            )}
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
              Suggesting…
            </span>
          ) : (
            "Suggest fertilizer"
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
            <p className="text-sm text-slate-400 mb-1">Suggested fertilizer</p>
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
