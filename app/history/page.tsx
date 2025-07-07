import { HistoryPage } from "../../components/history/history-page"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Historique RepAIr - Mes diagnostics passés",
  description: "Consultez l'historique de tous vos diagnostics et réparations effectués avec RepAIr",
}

export default function History() {
  return (
    <AuthGuard>
      <HistoryPage />
    </AuthGuard>
  )
}
