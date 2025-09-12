'use client'

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // useEffect(() => {
  //   const token = searchParams.get("token")
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split(".")[1]))

  //     const user = {
  //       id: payload.id,
  //       email: payload.email,
  //       firstName: payload.first_name,
  //       lastName: payload.last_name,
  //     }

  //     document.cookie = `repair_token=${token}; path=/; secure; samesite=strict`
  //     document.cookie = `repair_user=${encodeURIComponent(JSON.stringify(user))}; path=/; secure; samesite=strict`

  //     localStorage.setItem("repair_token", token)
  //     localStorage.setItem("repair_user", JSON.stringify(user))

  //     router.push("/")
  //   } else {
  //     router.push("/auth/signin")
  //   }
  // }, [])
  useEffect(() => {
  (async () => {
    const token = searchParams.get("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    try {
      // poser le token
      document.cookie = `repair_token=${token}; path=/; secure; samesite=lax`;
      localStorage.setItem("repair_token", token);

      // (optionnel) user minimal pour éviter flash visuel
      const payload = JSON.parse(atob(token.split(".")[1]));
      const minimalUser = {
        id: payload.id,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
      };
      document.cookie = `repair_user=${encodeURIComponent(JSON.stringify(minimalUser))}; path=/; secure; samesite=lax`;
      localStorage.setItem("repair_user", JSON.stringify(minimalUser));

      // 🔁 PROFIL COMPLET normalisé (inclut subscription premium)
      const res = await fetch("/api/user/refresh", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.user) {
        localStorage.setItem("repair_user", JSON.stringify(data.user));
      }
    } finally {
      router.push("/");
    }
  })();
}, []);


  return <p>Connexion en cours...</p>
}
