import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { supabase } = await import("@/lib/supabase")
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      message: "Connexion Supabase établie.",
      session: data.session ? "active" : "none",
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
