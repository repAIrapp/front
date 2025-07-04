import { AuthLayout } from "../../../components/auth/auth-layout"
import { SignInForm } from "../../../components/auth/signin-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Connexion RepAIr - Accédez à votre compte",
  description: "Connectez-vous à votre compte RepAIr pour continuer vos réparations",
}

export default function SignInPage() {
  return (
    <AuthLayout title="Connexion à RepAIr" subtitle="Connectez-vous pour accéder à vos diagnostics et réparations">
      <SignInForm />
    </AuthLayout>
  )
}
