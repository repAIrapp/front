import { AuthLayout } from "../../../components/auth/auth-layout"
import { SignUpForm } from "../../../components/auth/signup-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Créer un compte RepAIr - Rejoignez la révolution de la réparation",
  description: "Créez votre compte RepAIr et commencez à réparer vos objets grâce à l'intelligence artificielle",
}

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Créer un compte RepAIr"
      subtitle="Rejoignez la communauté RepAIr et commencez à réparer plutôt que jeter"
    >
      <SignUpForm />
    </AuthLayout>
  )
}
