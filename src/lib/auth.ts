import { User } from "@/types/user"

export function setAuthCookie(user: User) {
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user))
    }
}

export function getAuthCookie(): User | null {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user")
        return user ? JSON.parse(user) : null
    }
    return null
}

export function clearAuthCookie() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }
}

export function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token")
    }
    return null
}

export function getRoleDashboardPath(role: string): string {
    return `/${role}/dashboard`
}
