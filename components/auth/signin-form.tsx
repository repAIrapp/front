"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OAuthButtons } from "./oauth-buttons"
import { AuthSeparator } from "./auth-separator"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login(formData.email, formData.password)
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur RepAIr",
      })
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <OAuthButtons mode="signin" />

      <AuthSeparator />

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="border-gray-300 focus:border-repair-blue focus:ring-repair-blue"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link href="/auth/forgot-password" className="text-sm text-repair-blue hover:text-repair-blue/80">
              Mot de passe oublié ?
            </Link>
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
              className="border-gray-300 focus:border-repair-blue focus:ring-repair-blue pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-black dark:text-white"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

      <Button
  type="submit"
  className="w-full bg-repair-blue-600 hover:bg-repair-blue-700 text-white h-11"
  disabled={isLoading}
>
  {isLoading ? (
    "Connexion à RepAIr..."
  ) : (
    <>
      <LogIn className="w-4 h-4 mr-2" />
      Se connecter à RepAIr
    </>
  )}
</Button>

      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte RepAIr ?{" "}
          <Link href="/auth/signup" className="text-repair-green hover:text-repair-green/80 font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
