"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { useAuth } from "../contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Crown,History } from "lucide-react"


export function Header() {
  const { user, logout, isAuthenticated } = useAuth()

  // const getUserInitials = () => {
  //   if (!user) return "U"
  //   return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  // }
  const getUserInitials = () => {
    if (!user || !user.firstName || !user.lastName) return "U"
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Image src="/logo-repair.png" alt="RepAIr Logo" width={40} height={40} className="h-10 w-10" />
          <span className="text-2xl font-bold text-repair-green">RepAIr</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-repair-green transition-colors">
            Accueil
          </Link>
          <Link href="/diagnostic" className="text-sm font-medium text-gray-700 hover:text-repair-green transition-colors">
            Diagnostic RepAIr
          </Link>
          <a
            href="#comment-ca-marche"
            className="text-sm font-medium text-gray-700 hover:text-repair-green transition-colors"
          >
            Comment ça marche
          </a>
          {/* <a href="#impact" className="text-sm font-medium text-gray-700 hover:text-repair-green transition-colors">
            Impact
          </a> */}
        </nav>
        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-repair-green text-white text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/history">
                      <History className="mr-2 h-4 w-4" />
                      <span>Historique</span>
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil RepAIr</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile#subscription">
                      <Crown className="mr-2 h-4 w-4" />
                      <span>Abonnement</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Se connecter</Link>
              </Button>
              <Button className="bg-repair-blue hover:bg-repair-blue/90 text-white" asChild>
                <Link href="/auth/signup">S'inscrire</Link>
              </Button>
            </div>
          )}
          <SidebarTrigger className="md:hidden" />
        </div>
      </div>
    </header>
  )
}


