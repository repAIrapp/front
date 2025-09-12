// import { NextRequest, NextResponse } from "next/server"

// function normalizeUser(dbUser: any) {
//   if (!dbUser) return null
//   return {
//     // --- identifiants ---
//     id: dbUser.id || dbUser._id || dbUser.userId, // sécurise
//     _id: dbUser._id, // on garde l’original si besoin

//     // --- noms : snake_case -> camelCase ---
//     firstName: dbUser.firstName ?? dbUser.first_name ?? "",
//     lastName:  dbUser.lastName  ?? dbUser.last_name  ?? "",

//     // --- email ---
//     email: dbUser.email,

//     // --- auth ---
//     authType: dbUser.authType,
//     oauthProvider: dbUser.oauthProvider,

//     // --- préférences ---
//     preferences: dbUser.preferences ?? {},

//     // --- abonnement ---
//     subscription: dbUser.subscription ?? {
//       type: "basic",
//       status: "inactive",
//       date_start: null,
//       date_end: null,
//     },

//     // Tout le reste si tu veux
//     createdAt: dbUser.createdAt,
//     emailVerified: dbUser.emailVerified,
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("repair_token")?.value
//     const raw = req.cookies.get("repair_user")?.value || "{}"
//     const current = JSON.parse(raw)

//     if (!token || !current?.id) {
//       return NextResponse.json({ error: "Non connecté" }, { status: 401 })
//     }

//     const resp = await fetch(`http://localhost:3001/api/users/${current.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     })

//     if (!resp.ok) {
//       const txt = await resp.text()
//       return NextResponse.json({ error: txt || "Erreur DB-service" }, { status: resp.status })
//     }

//     const freshDbUser = await resp.json()
//     const freshUser = normalizeUser(freshDbUser)

//     // IMPORTANT : si pas d'id après normalisation, on ne casse pas le cookie
//     if (!freshUser?.id) {
//       return NextResponse.json({ error: "User sans id après normalisation" }, { status: 500 })
//     }

//     const res = NextResponse.json({ ok: true, user: freshUser })
//     // on réécrit le cookie avec le *format attendu par le front*
//     res.cookies.set("repair_user", JSON.stringify(freshUser), {
//       httpOnly: false,
//       sameSite: "lax",
//       path: "/",
//     })
//     return res
//   } catch (e: any) {
//     return NextResponse.json({ error: e.message || "Erreur interne" }, { status: 500 })
//   }
// }




// import { NextRequest, NextResponse } from "next/server"

// function normalizeUser(dbUser: any) {
//   if (!dbUser) return null
//   return {
//     id: dbUser.id || dbUser._id || dbUser.userId,
//     _id: dbUser._id,
//     firstName: dbUser.firstName ?? dbUser.first_name ?? "",
//     lastName: dbUser.lastName ?? dbUser.last_name ?? "",
//     email: dbUser.email,
//     authType: dbUser.authType,
//     oauthProvider: dbUser.oauthProvider,
//     preferences: dbUser.preferences ?? {},
//     subscription: dbUser.subscription ?? {
//       type: "basic",
//       status: "inactive",
//       date_start: null,
//       date_end: null,
//     },
//     createdAt: dbUser.createdAt,
//     emailVerified: dbUser.emailVerified,
//   }
// }

// function getUserIdFromToken(jwt: string | undefined | null): string | null {
//   if (!jwt) return null
//   try {
//     const [, payloadB64] = jwt.split(".")
//     const json = Buffer.from(payloadB64, "base64").toString("utf8")
//     const payload = JSON.parse(json)
//     return payload.id || payload.sub || null
//   } catch {
//     return null
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("repair_token")?.value
//     const userId = getUserIdFromToken(token)

//     if (!token || !userId) {
//       return NextResponse.json({ error: "Non connecté" }, { status: 401 })
//     }

//     const resp = await fetch(`http://localhost:3001/api/users/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     })

//     if (!resp.ok) {
//       const txt = await resp.text()
//       return NextResponse.json({ error: txt || "Erreur DB-service" }, { status: resp.status })
//     }

//     const freshDbUser = await resp.json()
//     const freshUser = normalizeUser(freshDbUser)

//     if (!freshUser?.id) {
//       return NextResponse.json({ error: "User sans id après normalisation" }, { status: 500 })
//     }

//     const res = NextResponse.json({ ok: true, user: freshUser })

//     // Réécrit le cookie user pour l’UI
//     res.cookies.set("repair_user", JSON.stringify(freshUser), {
//       httpOnly: false,
//       sameSite: "lax",
//       path: "/",
//       secure: true,
//     })

//     return res
//   } catch (e: any) {
//     return NextResponse.json({ error: e.message || "Erreur interne" }, { status: 500 })
//   }
// }




// app/api/user/refresh/route.ts
// import { NextRequest, NextResponse } from "next/server"

// // --- Types explicites ---
// type PlanType = "basic" | "premium"

// interface User {
//   id: string
//   _id?: string
//   firstName: string
//   lastName: string
//   email: string
//   authType?: string
//   oauthProvider?: string
//   preferences?: Record<string, unknown>
//   subscription: {
//     type: PlanType
//     status: string
//     date_start?: string | null
//     date_end?: string | null
//   }
//   createdAt?: string
//   emailVerified?: boolean
// }

// // --- Normalisation avec type de retour explicite ---
// function normalizeUser(dbUser: any): User {
//   return {
//     id: dbUser?.id || dbUser?._id || dbUser?.userId,
//     _id: dbUser?._id,
//     firstName: dbUser?.firstName ?? dbUser?.first_name ?? "",
//     lastName: dbUser?.lastName ?? dbUser?.last_name ?? "",
//     email: dbUser?.email ?? "",
//     authType: dbUser?.authType,
//     oauthProvider: dbUser?.oauthProvider,
//     preferences: dbUser?.preferences ?? {},
//     subscription: dbUser?.subscription ?? {
//       type: "basic",
//       status: "inactive",
//       date_start: null,
//       date_end: null,
//     },
//     createdAt: dbUser?.createdAt,
//     emailVerified: dbUser?.emailVerified,
//   }
// }

// function getUserIdFromToken(jwt: string | null | undefined): string | null {
//   if (!jwt) return null
//   try {
//     const [, payloadB64] = jwt.split(".")
//     const json = Buffer.from(payloadB64, "base64").toString("utf8")
//     const payload = JSON.parse(json)
//     return payload.id || payload.sub || null
//   } catch {
//     return null
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     // 1) Récupérer le token (cookie, puis fallback header)
//     let token: string | null =
//       req.cookies.get("repair_token")?.value || null

//     if (!token) {
//       const auth =
//         req.headers.get("authorization") ||
//         req.headers.get("Authorization")
//       if (auth?.startsWith("Bearer ")) token = auth.slice("Bearer ".length)
//     }

//     const userId = getUserIdFromToken(token)
//     if (!token || !userId) {
//       return NextResponse.json({ error: "Non connecté" }, { status: 401 })
//     }

//     // 2) Lire l'utilisateur coté service Users
//     const resp = await fetch(`http://localhost:3001/api/users/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     })
//     if (!resp.ok) {
//       const txt = await resp.text()
//       return NextResponse.json({ error: txt || "Erreur DB-service" }, { status: resp.status })
//     }

//     // 3) Normaliser et typer le résultat
//     const dbUser = await resp.json()
//     const freshUser: User = normalizeUser(dbUser)

//     if (!freshUser.id) {
//       return NextResponse.json({ error: "User sans id après normalisation" }, { status: 500 })
//     }

//     // 4) Réponse + cookie utilisateur pour l'UI
//     const res = NextResponse.json({ ok: true, user: freshUser })
//     res.cookies.set("repair_user", JSON.stringify(freshUser), {
//       httpOnly: false,
//       sameSite: "lax",
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//     })
//     return res
//   } catch (e: any) {
//     return NextResponse.json({ error: e.message || "Erreur interne" }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from "next/server"

// --- Types explicites ---
type PlanType = "basic" | "premium"

interface User {
  id: string
  _id?: string
  firstName: string
  lastName: string
  email: string
  authType?: string
  oauthProvider?: string
  preferences?: Record<string, unknown>
  subscription: {
    type: PlanType
    status: string
    date_start?: string | null
    date_end?: string | null
  }
  createdAt?: string
  emailVerified?: boolean
}

// Représente la forme "brute" renvoyée par ton service Users (avec variantes de champs)
interface RawUser {
  id?: string
  _id?: string
  userId?: string
  firstName?: string
  first_name?: string
  lastName?: string
  last_name?: string
  email?: string
  authType?: string
  oauthProvider?: string
  preferences?: Record<string, unknown>
  subscription?: {
    type?: PlanType
    status?: string
    date_start?: string | null
    date_end?: string | null
  }
  createdAt?: string
  emailVerified?: boolean
}

// --- Normalisation avec types explicites ---
// On accepte "unknown" puis on restreint vers RawUser pour éviter any
function normalizeUser(input: unknown): User {
  const dbUser = (input ?? {}) as RawUser

  return {
    id: dbUser.id ?? dbUser._id ?? dbUser.userId ?? "",
    _id: dbUser._id,
    firstName: dbUser.firstName ?? dbUser.first_name ?? "",
    lastName: dbUser.lastName ?? dbUser.last_name ?? "",
    email: dbUser.email ?? "",
    authType: dbUser.authType,
    oauthProvider: dbUser.oauthProvider,
    preferences: dbUser.preferences ?? {},
    subscription: {
      type: dbUser.subscription?.type ?? "basic",
      status: dbUser.subscription?.status ?? "inactive",
      date_start: dbUser.subscription?.date_start ?? null,
      date_end: dbUser.subscription?.date_end ?? null,
    },
    createdAt: dbUser.createdAt,
    emailVerified: dbUser.emailVerified,
  }
}

function getUserIdFromToken(jwt: string | null | undefined): string | null {
  if (!jwt) return null
  try {
    const [, payloadB64] = jwt.split(".")
    const json = Buffer.from(payloadB64, "base64").toString("utf8")
    const payload = JSON.parse(json) as Record<string, unknown>
    const id =
      (payload["id"] as string | undefined) ??
      (payload["sub"] as string | undefined) ??
      null
    return id
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1) Récupérer le token (cookie, puis fallback header)
    let token: string | null = req.cookies.get("repair_token")?.value || null

    if (!token) {
      const auth = req.headers.get("authorization") || req.headers.get("Authorization")
      if (auth?.startsWith("Bearer ")) token = auth.slice("Bearer ".length)
    }

    const userId = getUserIdFromToken(token)
    if (!token || !userId) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 })
    }

    // 2) Lire l'utilisateur coté service Users
    const resp = await fetch(`http://localhost:3001/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (!resp.ok) {
      const txt = await resp.text()
      return NextResponse.json({ error: txt || "Erreur DB-service" }, { status: resp.status })
    }

    // 3) Normaliser et typer le résultat
    const raw = (await resp.json()) as unknown
    const freshUser: User = normalizeUser(raw)

    if (!freshUser.id) {
      return NextResponse.json({ error: "User sans id après normalisation" }, { status: 500 })
    }

    // 4) Réponse + cookie utilisateur pour l'UI
    const res = NextResponse.json({ ok: true, user: freshUser })
    res.cookies.set("repair_user", JSON.stringify(freshUser), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
    return res
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erreur interne"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
