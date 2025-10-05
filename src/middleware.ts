import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/register', '/forgot-password']
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    // If accessing a protected route, check for auth
    if (!isPublicRoute && pathname !== '/') {
        // In a real app, you'd check for a session token
        // For now, we'll let client-side handle redirects
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
