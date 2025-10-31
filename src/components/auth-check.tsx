"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setCredentials } from "@/store/slices/authSlice"
import { getAuthCookie, getAuthToken } from "@/lib/auth"

export function AuthCheck({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user, isAuthenticated } = useAppSelector((state) => state.auth)

    useEffect(() => {
        // Try to restore session from localStorage
        if (!isAuthenticated) {
            const storedUser = getAuthCookie()
            const storedToken = getAuthToken()

            if (storedUser && storedToken) {
                dispatch(setCredentials({ user: storedUser, token: storedToken }))
                return
            }

            // No stored session, redirect to login
            router.push("/login")
            return
        }

        // Check role-based access
        if (requiredRole && user && user.role !== requiredRole) {
            router.push(`/${user.role}/dashboard`)
        }
    }, [router, requiredRole, isAuthenticated, user, dispatch])

    // Show loading or nothing while checking auth
    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
