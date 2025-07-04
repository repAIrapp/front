"use client"

import { usePathname } from "next/navigation"
import { AuthProvider } from "@/contexts/auth-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"

export function RootClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")

  return (
    <AuthProvider>
      <SidebarProvider>
        {!isAuthPage && <AppSidebar />}
        {children}
      </SidebarProvider>
      <Toaster />
    </AuthProvider>
  )
}
