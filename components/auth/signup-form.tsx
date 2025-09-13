"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OAuthButtons } from "./oauth-buttons"
import { AuthSeparator } from "./auth-separator"
import { Eye, EyeOff, UserPlus, Info, CheckCircle2, XCircle } from "lucide-react"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

type PasswordCheck = {
  label: string
  ok: boolean
}

function buildPartsForBan(firstName: string, lastName: string, email: string) {
  const local = (email || "").split("@")[0] || ""
  return [firstName, lastName, local]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase())
}

function computePasswordChecks(
  password: string,
  firstName: string,
  lastName: string,
  email: string
): PasswordCheck[] {
  const lower = password.toLowerCase()
  const parts = buildPartsForBan(firstName, lastName, email)

  const checks: PasswordCheck[] = [
    { label: "Au moins 12 caractères", ok: password.length >= 12 && password.length <= 128 },
    { label: "Au moins une minuscule", ok: /[a-z]/.test(password) },
    { label: "Au moins une majuscule", ok: /[A-Z]/.test(password) },
    { label: "Au moins un chiffre", ok: /\d/.test(password) },
    { label: "Au moins un caractère spécial", ok: /[^\w\s]/.test(password) },
    {
      label: "Ne pas inclure votre nom/prénom/email",
      ok: !parts.some((p) => p.length >= 3 && lower.includes(p)),
    },
    { label: "Évitez les répétitions (aaa, !!!)", ok: !/(.)\1{2,}/.test(password) },
    {
      label: "Évitez les suites de chiffres (1234, 9876)",
      ok: !/0123|1234|2345|3456|4567|5678|6789|9876|8765/i.test(password),
    },
  ]

  return checks
}

function firstFailedMessage(checks: PasswordCheck[]): string | null {
  const failed = checks.find((c) => !c.ok)
  return failed ? failed.label : null
}
function PasswordRulesInfo({
  password,
  firstName,
  lastName,
  email,
}: {
  password: string
  firstName: string
  lastName: string
  email: string
}) {
  const checks = useMemo(
    () => computePasswordChecks(password, firstName, lastName, email),
    [password, firstName, lastName, email]
  )

  return (
    <HoverCard openDelay={80} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label="Afficher les règles du mot de passe"
          className="inline-flex items-center rounded-full p-1 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-repair-green"
        >
          <Info className="h-4 w-4 text-muted-foreground" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="text-sm mb-2 font-medium">Règles du mot de passe</p>
        <ul className="space-y-1.5">
          {checks.map((c) => (
            <li key={c.label} className="flex items-center text-sm">
              {c.ok ? (
                <CheckCircle2 className="h-4 w-4 mr-2" aria-hidden="true" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" aria-hidden="true" />
              )}
              <span className={c.ok ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Astuce&nbsp;: une phrase longue et mémorable est souvent plus sûre qu’un mot court compliqué.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

export function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { signup } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const checks = useMemo(
    () =>
      computePasswordChecks(
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.email
      ),
    [formData.password, formData.firstName, formData.lastName, formData.email]
  )

  const passwordsMatch =
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Vérification côté client (mêmes règles que backend)
    const failedMsg = firstFailedMessage(checks)
    if (failedMsg) {
      alert(failedMsg)
      setIsLoading(false)
      return
    }

    if (!passwordsMatch) {
      alert("Les mots de passe ne correspondent pas.")
      setIsLoading(false)
      return
    }

    try {
      await signup(formData)
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert("Erreur lors de l’inscription")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <OAuthButtons mode="signup" />
      <AuthSeparator />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Votre prénom"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="border-gray-300 focus:border-repair-green focus:ring-repair-green"
              autoComplete="given-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Votre nom"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="border-gray-300 focus:border-repair-green focus:ring-repair-green"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="border-gray-300 focus:border-repair-green focus:ring-repair-green"
            autoComplete="email"
          />
        </div>

        {/* Mot de passe */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <PasswordRulesInfo
              password={formData.password}
              firstName={formData.firstName}
              lastName={formData.lastName}
              email={formData.email}
            />
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border-gray-300 focus:border-repair-green focus:ring-repair-green pr-10"
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Confirmation mot de passe */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Répétez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="border-gray-300 focus:border-repair-green focus:ring-repair-green pr-10"
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          {formData.confirmPassword.length > 0 && (
            <div className="flex items-center text-sm">
              {passwordsMatch ? (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              <span className={passwordsMatch ? "text-foreground" : "text-muted-foreground"}>
                {passwordsMatch
                  ? "Les mots de passe correspondent"
                  : "Les mots de passe ne correspondent pas"}
              </span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-repair-green-700 hover:bg-repair-green/90 text-white h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            "Création du compte RepAIr..."
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Créer mon compte RepAIr
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Déjà un compte RepAIr ?{" "}
          <Link href="/auth/signin" className="text-repair-blue-600 hover:text-repair-blue/80 font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}

