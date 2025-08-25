
import { Suspense } from "react"
import EmailVerificationContent from "./Emailverificationcontent"

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Chargement…</div>}>
      <EmailVerificationContent />
    </Suspense>
  )
}

