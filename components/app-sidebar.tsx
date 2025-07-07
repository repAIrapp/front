// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import { Home, Camera, Wrench, BarChart3, User, LogIn, UserPlus } from "lucide-react"
// import { useIsMobile } from "@/hooks/use-mobile"

// const navigationItems = [
//   {
//     title: "Accueil",
//     url: "#accueil",
//     icon: Home,
//   },
//   {
//   title: "Diagnostic RepAIr",
//   url: "/diagnostic",
//   icon: Camera,
// },

//   {
//     title: "Comment ça marche",
//     url: "#comment-ca-marche",
//     icon: Wrench,
//   },
//   // {
//   //   title: "Impact",
//   //   url: "#impact",
//   //   icon: BarChart3,
//   // },
// ]

// const authItems = [
//   {
//     title: "Se connecter",
//     url: "/auth/signin",
//     icon: LogIn,
//   },
//   {
//     title: "S'inscrire",
//     url: "/auth/signup",
//     icon: UserPlus,
//   },
// ]

// export function AppSidebar() {
//   const { setOpenMobile } = useSidebar()
//   const isMobile = useIsMobile()

//   const handleLinkClick = () => {
//     if (isMobile) {
//       setOpenMobile(false)
//     }
//   }

//   return (
//     <Sidebar variant="sidebar" collapsible="offcanvas">
//       <SidebarHeader>
//         <div className="flex items-center space-x-2 px-2 py-2">
//           <Image src="/logo-repair.png" alt="RepAIr Logo" width={32} height={32} className="h-8 w-8" />
//           <span className="text-xl font-bold text-repair-green">RepAIr</span>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url} className="flex items-center space-x-2" onClick={handleLinkClick}>
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {authItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link href={item.url} className="flex items-center space-x-2" onClick={handleLinkClick}>
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton onClick={handleLinkClick}>
//               <User className="h-4 w-4" />
//               <span>Profil RepAIr</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>

//       <SidebarRail />
//     </Sidebar>
//   )
// }



"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Home,
  Camera,
  Wrench,
  CreditCard,
  User,
  LogIn,
  UserPlus,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const navigationItems = [
  {
    title: "Accueil",
    url: "/",
    icon: Home,
  },
  {
    title: "Diagnostic RepAIr",
    url: "/diagnostic",
    icon: Camera,
  },
  {
    title: "Comment ça marche",
    url: "/#comment-ca-marche",
    icon: Wrench,
  },
  {
    title: "Paiement",
    url: "/profile",
    icon: CreditCard,
  },
]

const authItems = [
  {
    title: "Se connecter",
    url: "/auth/signin",
    icon: LogIn,
  },
  {
    title: "S'inscrire",
    url: "/auth/signup",
    icon: UserPlus,
  },
]

export function AppSidebar() {
  const { setOpenMobile } = useSidebar()
  const isMobile = useIsMobile()

  // ✅ Ne pas afficher du tout si pas mobile
  if (!isMobile) return null

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      // className="bg-gradient-to-br from-white via-repair-green/5 to-repair-blue/10 text-gray-800 shadow-lg"
      className="bg-white dark:bg-gray-900 z-50"
    >
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2 py-2">
          <Image
            src="/logo-repair.png"
            alt="RepAIr Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-repair-green">RepAIr</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2 hover:text-repair-green transition-colors"
                      onClick={handleLinkClick}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {authItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2 hover:text-repair-green transition-colors"
                      onClick={handleLinkClick}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/profile"
                className="flex items-center space-x-2 hover:text-repair-green transition-colors"
                onClick={handleLinkClick}
              >
                <User className="h-4 w-4" />
                <span>Profil RepAIr</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
