import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const user = JSON.parse(req.cookies.get("repair_user")?.value || "{}")
  const token = req.cookies.get("repair_token")?.value

  if (!user?.email || !user?.id || !token) {
    return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 })
  }

  try {
    const res = await fetch("http://localhost:3003/api/payments/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        userId: user.id,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Erreur serveur Stripe" }, { status: 500 })
    }

    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error("Erreur Stripe frontend route:", error)
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 })
  }
}
