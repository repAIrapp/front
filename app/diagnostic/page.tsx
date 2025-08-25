import { DiagnosticSection } from "@/components/diagnostic-section"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"

export default function RepAIrHomePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <main>
            <DiagnosticSection />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
