"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAuthCookie } from "@/lib/auth"

export function AuthCheck({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
    const router = useRouter()

    useEffect(() => {
        const user = getAuthCookie()

        if (!user) {
            router.push("/login")
            return
        }

        if (requiredRole && user.role !== requiredRole) {
            router.push(`/${user.role}/dashboard`)
        }
    }, [router, requiredRole])

    return <>{children}</>
}
