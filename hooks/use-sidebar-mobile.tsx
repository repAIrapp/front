"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

export function useSidebarMobile() {
  const { openMobile, setOpenMobile, toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()

  const closeMobileMenu = () => {
    if (isMobile && openMobile) {
      setOpenMobile(false)
    }
  }

  return {
    openMobile,
    setOpenMobile,
    toggleSidebar,
    closeMobileMenu,
    isMobile,
  }
}
