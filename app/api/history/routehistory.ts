"use client"

import { DiagnosticHistory } from "@/components/history/history-page"

export async function fetchUserDiagnostics(userId: string, token: string): Promise<DiagnosticHistory[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/api/ia-requests/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Erreur API IA:", res.status)
      return []
    }

    const raw = await res.json()
    const mapped = raw.map((item: any) => ({
      id: item._id,
      objectType: item.objectType || "Inconnu",
      objectName: item.objectName || "Objet réparé",
      imageUrl: item.imageUrl ? `${process.env.NEXT_PUBLIC_DB_API_URL}/${item.imageUrl}` : "/placeholder.svg",
      date: item.createdAt,
      problem: item.text || "Problème non spécifié",
      status: item.status || "completed",
      confidence: item.confidence || Math.floor(Math.random() * 20) + 80,
      estimatedCost: item.estimatedCost,
      actualCost: item.actualCost,
      repairTime: item.repairTime,
    }))

    return mapped
  } catch (error) {
    console.error("Erreur fetchUserDiagnostics:", error)
    return []
  }
}
