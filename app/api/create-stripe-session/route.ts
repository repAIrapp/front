// import { NextRequest, NextResponse } from "next/server"

// export async function GET(req: NextRequest) {
//   const user = JSON.parse(req.cookies.get("repair_user")?.value || "{}")
//   const userId = user?.id || user?._id
//   const token = req.cookies.get("repair_token")?.value

//   // if (!user?.email || !user?.id || !token) {
//   //   return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 })
//   // }
//   if (!user?.email || !user?.id) {
//   return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 })
// }

//   try {
//     // const res = await fetch("http://localhost:3003/api/payments/create-session", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     email: user.email,
//     //     userId: user.id,
//     //   }),
//     // })
//     const headers: Record<string, string> = { "Content-Type": "application/json" }
// if (token) headers.Authorization = `Bearer ${token}`
//     const res = await fetch("http://localhost:3003/api/payments/create-session", {
//   method: "POST",
//   headers,
//   body: JSON.stringify({ email: user.email, userId: user.id }),
// })

//     const data = await res.json()

//     if (!res.ok) {
//       return NextResponse.json({ error: data.error || "Erreur serveur Stripe" }, { status: 500 })
//     }

//     return NextResponse.redirect(data.url)
//   } catch (error) {
//     console.error("Erreur Stripe frontend route:", error)
//     return NextResponse.json({ error: "Erreur interne" }, { status: 500 })
//   }
// }




import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const raw = req.cookies.get("repair_user")?.value || "{}"
  const user = JSON.parse(raw)
  const token = req.cookies.get("repair_token")?.value || null

  // tolère id ou _id
  const userId = user?.id || user?._id

  // ✅ valide avec userId calculé
  if (!user?.email || !userId) {
    return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 })
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    // facultatif : si ton payment_service ne vérifie pas le token, tu peux ne pas l'envoyer
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch("http://localhost:3003/api/payments/create-session", {
      method: "POST",
      headers,
      body: JSON.stringify({ email: user.email, userId }), // ✅ envoie userId
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
