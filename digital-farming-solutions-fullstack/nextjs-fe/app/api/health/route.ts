import { NextResponse } from "next/server";

/**
 * Frontend-only health check. Use this to verify the Next.js app is running.
 * For crop/fertilizer data, the app calls the backend (BE) directly — see fe/lib/api.ts.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "frontend",
    message: "Next.js app is up",
  });
}
