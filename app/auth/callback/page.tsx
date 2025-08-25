import { Suspense } from "react"
import AuthCallbackContent from "./AuthCallbackContent"

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p>Chargement en cours…</p>}>
      <AuthCallbackContent />
    </Suspense>
  )
}
