import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Pages publiques (accessibles sans authentification)
  const publicPaths = ["/auth/signin", "/auth/signup", "/auth/forgot-password"]

  // Vérifier si c'est une page publique
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Si c'est une page publique, laisser passer
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Pour les autres pages, la vérification se fera côté client avec AuthGuard
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo-repair.png).*)",
  ],
}
