"use client";

import { useState, useRef, useEffect } from "react";
import { getApiUrl, apiRequest } from "@/lib/api";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-surface-elevated border border-border text-[var(--text-primary)] placeholder:text-slate-500 focus:border-accent-emerald focus:ring-2 focus:ring-accent-emerald/20 transition-all duration-200 outline-none";

type CropSelectProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
};

export function CropSelect({
  value,
  onChange,
  disabled = false,
  id = "Crop",
  "aria-label": ariaLabel = "Select crop",
}: CropSelectProps) {
  const [crops, setCrops] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let cancelled = false;
    const apiUrl = getApiUrl();
    apiRequest<string[]>(`${apiUrl}/api/crops`)
      .then((result) => {
        if (!cancelled && result.ok) setCrops(result.data ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = query.trim()
    ? crops.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : crops;
  const showList = open && !loading && filtered.length > 0;

  const select = (crop: string) => {
    onChange(crop);
    setQuery(crop);
    setOpen(false);
    setHighlightIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showList) {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        select(filtered[highlightIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setQuery(value);
        setHighlightIndex(0);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!showList) return;
    listRef.current?.querySelector(`[data-index="${highlightIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, showList]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery(value);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1.5">
        Crop
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={open ? "crop-list" : undefined}
          aria-activedescendant={showList ? `crop-option-${highlightIndex}` : undefined}
          aria-label={ariaLabel}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlightIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          placeholder={loading ? "Loading crops…" : "Search or select a crop"}
          className={inputClass}
          autoComplete="off"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          {loading ? (
            <span className="h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin inline-block" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </div>
      {showList && (
        <ul
          id="crop-list"
          ref={listRef}
          role="listbox"
          className="absolute z-10 w-full mt-1 py-1 max-h-56 overflow-auto rounded-xl border border-border bg-surface-elevated shadow-card"
        >
          {filtered.map((crop, i) => (
            <li
              key={crop}
              data-index={i}
              id={`crop-option-${i}`}
              role="option"
              aria-selected={value === crop}
              className={`px-4 py-2.5 cursor-pointer transition-colors ${
                i === highlightIndex
                  ? "bg-accent-emerald/20 text-accent-mint"
                  : "text-[var(--text-primary)] hover:bg-surface-muted"
              }`}
              onMouseEnter={() => setHighlightIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                select(crop);
              }}
            >
              {crop}
            </li>
          ))}
        </ul>
      )}
      {open && !loading && query.trim() && filtered.length === 0 && (
        <p className="absolute z-10 w-full mt-1 px-4 py-3 rounded-xl border border-border bg-surface-elevated text-slate-400 text-sm">
          No crops match &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}
