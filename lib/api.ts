// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// export async function apiFetch(
//   endpoint: string,
//   options: RequestInit = {},
//   useAuth = true
// ) {
//   const token = typeof window !== "undefined" ? localStorage.getItem("repair_token") : null

//   // Normalise les headers
//   const normalizedHeaders: Record<string, string> = {
//     "Content-Type": "application/json",
//   }

//   // Si headers existent déjà, les convertir proprement
//   if (options.headers instanceof Headers) {
//     options.headers.forEach((value, key) => {
//       normalizedHeaders[key] = value
//     })
//   } else if (Array.isArray(options.headers)) {
//     for (const [key, value] of options.headers) {
//       normalizedHeaders[key] = value
//     }
//   } else if (typeof options.headers === "object" && options.headers !== null) {
//     Object.assign(normalizedHeaders, options.headers as Record<string, string>)
//   }

//   if (useAuth && token) {
//     normalizedHeaders["Authorization"] = `Bearer ${token}`
//   }

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: normalizedHeaders,
//   })

//   const data = await res.json()
//   if (!res.ok) throw new Error(data.error || "Erreur réseau")

//   return data
// }
