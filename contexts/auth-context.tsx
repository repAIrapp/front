"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  subscription?: {
    type: "basic" | "premium"
    status: string
    date_start?: string
    date_end?: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  loginWithGoogle: () => void
  loginWithFacebook: () => void
  signupWithGoogle: () => void
  refreshUser: () => Promise<void>
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth()
  }, [])
  const redirectToGoogleOAuth = (intent: 'login' | 'signup') => {
    const baseURL = "http://localhost:3004/auth"; 
    window.location.href = `${baseURL}?intent=${intent}`;
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("repair_token")
      const userData = localStorage.getItem("repair_user")

      if (token && userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Erreur lors de la vérification d'authentification:", error)
    } finally {
      setIsLoading(false)
    }
  }
  const refreshUser = async () => {
  const token = localStorage.getItem("repair_token")
  const userData = localStorage.getItem("repair_user")
  if (!token || !userData) return

  const parsedUser = JSON.parse(userData)
  const res = await fetch(`http://localhost:3001/api/users/${parsedUser.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const updatedUser = await res.json()
  localStorage.setItem("repair_user", JSON.stringify(updatedUser))
  setUser(updatedUser)
}

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          authType: "local",
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Erreur de connexion")

      const token = data.token
      const payload = JSON.parse(atob(token.split(".")[1]))

      const user: User = {
        id: payload.id,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
      }
      localStorage.setItem("repair_token", token)
      localStorage.setItem("repair_user", JSON.stringify(user))
      setUser(user)

      const redirectTo = localStorage.getItem("repair_redirect") || "/"
      localStorage.removeItem("repair_redirect")
      router.push(redirectTo)
    } catch (error: any) {
      throw new Error(error.message || "Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

 
  const signup = async (userData: SignupData) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName,
          authType: "local",
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Erreur d'inscription")

      const token = data.token
      const userPayload = JSON.parse(atob(token.split(".")[1]))

      const user: User = {
        id: userPayload.id,
        email: userPayload.email,
        firstName: userPayload.first_name,
        lastName: userPayload.last_name,
      }

      localStorage.setItem("repair_token", token)
      localStorage.setItem("repair_user", JSON.stringify(user))
      setUser(user)

      router.push("/auth/signin")
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la création du compte")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("repair_token")
    localStorage.removeItem("repair_user")
    setUser(null)
    router.push("/auth/signin")
  }

  const loginWithGoogle = async () => {
    window.location.href = "http://localhost:3004/auth?intent=login";
  };

  const signupWithGoogle = async () => {
    window.location.href = "http://localhost:3004/auth?intent=signup";
  };

  const loginWithFacebook = async () => {
    window.location.href = "http://localhost:3004/auth/facebook";
  };


  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loginWithGoogle,
    signupWithGoogle,
    loginWithFacebook,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider")
  }
  return context
}
