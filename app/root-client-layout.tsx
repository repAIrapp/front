
"use client"

import { usePathname } from "next/navigation"
import { AuthProvider } from "@/contexts/auth-context"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
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
      <Toaster />

      {isAuthPage ? (
        <>{children}</>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      )}
    </AuthProvider>
  )
}
