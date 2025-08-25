import { DiagnosticHistory } from "@/components/history/history-page"
export async function fetchUserDiagnostics(userId: string): Promise<DiagnosticHistory[]> {
  const token = localStorage.getItem("token")
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/ia-requests/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const errorText = await response.text()
    console.error("Erreur API:", errorText)
    throw new Error("Erreur lors de la récupération des diagnostics")
  }

  const data = await response.json()
  return data
}
