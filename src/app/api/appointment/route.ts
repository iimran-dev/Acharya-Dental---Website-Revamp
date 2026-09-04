import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/appointment
 * Creates a new appointment request from the website contact form.
 *
 * Request body (JSON):
 *   name      string  required
 *   phone     string  required
 *   email     string  optional (default "")
 *   treatment string  optional (default "")
 *   date      string  optional (default ""), ISO yyyy-mm-dd
 *   message   string  optional (default "")
 *
 * Returns 201 on success, 400 on validation error, 500 on server error.
 */
export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const data = (body ?? {}) as Record<string, unknown>;

    // ---- Validate required fields ----
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please provide your full name." },
        { status: 400 },
      );
    }
    if (!phone || phone.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid phone number." },
        { status: 400 },
      );
    }

    // ---- Sanitize optional fields ----
    const email =
      typeof data.email === "string" ? data.email.trim().slice(0, 200) : "";
    const treatment =
      typeof data.treatment === "string"
        ? data.treatment.trim().slice(0, 100)
        : "";
    const date =
      typeof data.date === "string" ? data.date.trim().slice(0, 20) : "";
    const message =
      typeof data.message === "string" ? data.message.trim().slice(0, 2000) : "";

    // Basic email shape check if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // ---- Persist ----
    const appointment = await db.appointment.create({
      data: { name, phone, email, treatment, date, message },
    });

    return NextResponse.json(
      {
        ok: true,
        id: appointment.id,
        message: "Appointment request received.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[/api/appointment] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again shortly." },
      { status: 500 },
    );
  }
}

/**
 * GET /api/appointment
 * Lightweight health check used by the page to confirm the endpoint exists.
 * Does not expose patient data.
 */
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "/api/appointment" });
}
