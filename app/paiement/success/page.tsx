"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function PaymentSuccessPage() {
  const { refreshUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleSuccessRedirect = async () => {
      await refreshUser() 
      router.push("/profile")
    }

    handleSuccessRedirect()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center text-green-600 text-xl">
      Paiement réussi ! Redirection en cours...
    </div>
  )
}
