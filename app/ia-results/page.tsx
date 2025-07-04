import { IAResultsPage } from "@/components/ia-results/ia-results-page"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Résultats IA RepAIr - Diagnostic de votre objet",
  description: "Découvrez le diagnostic IA de votre objet et les solutions de réparation proposées par RepAIr",
}

export default function IAResults() {
  return (
    <AuthGuard>
      <IAResultsPage />
    </AuthGuard>
  )
}
