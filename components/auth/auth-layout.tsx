import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-repair-green/5 via-white to-repair-blue/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et retour à l'accueil */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image src="/logo-repair.png" alt="RepAIr Logo" width={48} height={48} className="h-12 w-12" />
            <span className="text-3xl font-bold text-repair-green">RepAIr</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </CardHeader>
          <CardContent className="pt-0">{children}</CardContent>
        </Card>

        {/* Lien retour */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-repair-green transition-colors">
            ← Retour à RepAIr
          </Link>
        </div>
      </div>
    </div>
  )
}
