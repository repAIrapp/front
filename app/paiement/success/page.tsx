// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/contexts/auth-context"

// export default function PaymentSuccessPage() {
//   const { refreshUser } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     const handleSuccessRedirect = async () => {
//       await refreshUser() 
//       router.push("/profile")
//     }

//     handleSuccessRedirect()
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center text-green-600 text-xl">
//       Paiement réussi ! Redirection en cours...
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
    ;(async () => {
      try {
        await refreshUser()           // ← met à jour cookie + state
      } finally {
        router.replace("/profile")    // ← évite de revenir sur /success
      }
    })()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center text-green-600 text-xl">
      Paiement réussi ! Redirection en cours...
    </div>
  )
}
