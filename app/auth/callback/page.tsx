"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]))

      const user = {
        id: payload.id,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
      }

      localStorage.setItem("repair_token", token)
      localStorage.setItem("repair_user", JSON.stringify(user))
      router.push("/") // ou tableau de bord
    } else {
      router.push("/auth/signin")
    }
  }, [])

  return <p>Connexion en cours...</p>
}
