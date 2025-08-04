"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OAuthButtons } from "./oauth-buttons"
import { AuthSeparator } from "./auth-separator"
import { Eye, EyeOff, UserPlus } from "lucide-react"

export function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   // Simulation d'inscription
  //   console.log("Inscription RepAIr:", formData)

  //   setTimeout(() => {
  //     setIsLoading(false)
  //     alert("Compte RepAIr créé avec succès !")
  //   }, 2000)
  // }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    await signup(formData)
  } catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message)
  } else {
    alert("Erreur lors de l’inscription")
  }
}
finally {
    setIsLoading(false)
  }
}

 const { signup } = useAuth()

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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
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
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-repair-green hover:bg-repair-green/90 text-white h-11"
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
          <Link href="/auth/signin" className="text-repair-blue hover:text-repair-blue/80 font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
