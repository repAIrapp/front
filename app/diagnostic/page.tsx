// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { DiagnosticSection } from "@/components/diagnostic-section" 

// export default function DiagnosticPage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <DiagnosticSection />
//       </main>
//       <Footer />
//     </>
//   )
// }


import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ImpactSection } from "@/components/impact-section"
import { Footer } from "@/components/footer"
import { DiagnosticSection } from "@/components/diagnostic-section"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"

export default function RepAIrHomePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Header />
          <main>
            <HeroSection />
            <DiagnosticSection />
            <HowItWorksSection />
            <ImpactSection />
          </main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
