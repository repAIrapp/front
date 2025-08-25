import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function RepAIrHomePage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <main>
              <HeroSection />
              <HowItWorksSection />
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
