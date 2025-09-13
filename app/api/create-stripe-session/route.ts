import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const raw = req.cookies.get("repair_user")?.value || "{}"
  const user = JSON.parse(raw)
  const token = req.cookies.get("repair_token")?.value || null

  // tolère id ou _id
  const userId = user?.id || user?._id

  
  if (!user?.email || !userId) {
    return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 })
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/create-session`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email: user.email, userId }), 
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Erreur serveur Stripe" }, { status: 500 })
    }

    // Optionnel : 303 pour éviter re-POST si jamais on passe par un POST (ici on est en GET)
    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error("Erreur Stripe frontend route:", error)
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 })
  }
}
