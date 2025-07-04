import { ProfilePage } from "@/components/profile/profile-page"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profil RepAIr - Gérez votre compte",
  description: "Gérez votre profil RepAIr, votre abonnement et vos préférences",
}

export default function Profile() {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  )
}
