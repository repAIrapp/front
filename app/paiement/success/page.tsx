// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/contexts/auth-context"

// export default function PaymentSuccessPage() {
//   const { isLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     // recharge la page ou redirige vers le profil pour afficher les infos à jour
//     const timeout = setTimeout(() => {
//       router.push("/profile")
//     }, 3000)

//     return () => clearTimeout(timeout)
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center text-green-600 text-xl">
//       🎉 Paiement réussi ! Redirection en cours...
//     </div>
//   )
// }


"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function PaymentSuccessPage() {
  const { refreshUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleSuccessRedirect = async () => {
      await refreshUser() // ✅ recharge le user depuis la BDD
      router.push("/profile")
    }

    handleSuccessRedirect()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center text-green-600 text-xl">
      🎉 Paiement réussi ! Redirection en cours...
    </div>
  )
}
