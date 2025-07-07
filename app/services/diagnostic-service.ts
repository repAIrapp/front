
// export async function fetchUserDiagnostics(userId: string) {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/diagnostic/user/${userId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   })

import { DiagnosticHistory } from "@/components/history/history-page"

//   if (!response.ok) {
//     throw new Error("Erreur lors de la récupération des diagnostics")
//   }

//   const data = await response.json()
//   return data 
// }

export async function fetchUserDiagnostics(userId: string): Promise<DiagnosticHistory[]> {
  const token = localStorage.getItem("token")
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/ia-requests/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  console.log("💡 Réponse API:", response.status, response.statusText)

  if (!response.ok) {
    const errorText = await response.text()
    console.error("❌ Erreur API:", errorText)
    throw new Error("Erreur lors de la récupération des diagnostics")
  }

  const data = await response.json()
  return data
}
