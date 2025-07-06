"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function EmailVerificationPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      const userId = searchParams.get("userId")

      if (!userId) {
        setStatus("error")
        return
      }

      try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}/verify-email`, {
          method: "PATCH",
        })

        if (!res.ok) throw new Error("Échec de la vérification")

        setStatus("success")

        // ✅ Redirection après succès (optionnelle)
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      } catch (err) {
        console.error(err)
        setStatus("error")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {status === "loading" && <p className="text-xl">Vérification de votre email en cours...</p>}
      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600">Email vérifié avec succès ✅</h1>
          <p className="mt-4 text-gray-700">Redirection vers la connexion...</p>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">Erreur de vérification ❌</h1>
          <p className="mt-4 text-gray-700">Le lien est peut-être invalide ou expiré.</p>
        </>
      )}
    </div>
  )
}
