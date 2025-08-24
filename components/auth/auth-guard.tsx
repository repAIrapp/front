"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "../../contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Stocker la page demandée pour redirection après connexion
      localStorage.setItem("repair_redirect", pathname)
      router.push("/auth/signin")
    }
  }, [isAuthenticated, isLoading, router, pathname])

  // Affichage du loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-repair-green/5 via-white to-repair-blue/5 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Image src="/logo-repair.png" alt="RepAIr Logo" width={48} height={48} className="h-12 w-12" />
              <span className="text-2xl font-bold text-repair-green ml-2">RepAIr</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-repair-blue" />
              <span className="text-gray-600">Vérification de l&apos;authentification...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Si non authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null
  }

  // Si authentifié, afficher le contenu
  return <>{children}</>
}
