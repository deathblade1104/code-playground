/**
 * Backend API base URL. The frontend must only call the backend (BE);
 * the BE is the only service that calls the ML API. Set NEXT_PUBLIC_API_URL
 * in .env.local (e.g. http://localhost:8080).
 */
export const getApiUrl = (): string =>
  (typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL ?? "")
    : process.env.NEXT_PUBLIC_API_URL) || "http://localhost:8080";

/** Generic API response envelope from the backend */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  path?: string;
  timestamp?: string;
  details?: string;
}

/** Result of parsing an API response for use in UI */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; errorMessage: string };

/**
 * Call the API and parse the generic response. Handles both success and error
 * envelopes and network failures.
 */
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    const json: ApiResponse<T> = await res.json();

    if (!res.ok) {
      const errorMessage =
        json.error ?? json.message ?? `Request failed (${res.status})`;
      return { ok: false, errorMessage };
    }

    if (!json.success || json.data === undefined) {
      return {
        ok: false,
        errorMessage: json.error ?? json.message ?? "Invalid response",
      };
    }

    return { ok: true, data: json.data };
  } catch {
    return { ok: false, errorMessage: "Network error. Please try again." };
  }
}
