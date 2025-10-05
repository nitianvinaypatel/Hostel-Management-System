import authData from "@/data/auth.json"

export type User = {
    id: string
    email: string
    role: "admin" | "student" | "warden" | "dean" | "caretaker"
    name: string
}

export function authenticateUser(email: string, password: string): User | null {
    const user = authData.users.find(
        (u) => u.email === email && u.password === password
    )

    if (user) {
        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword as User
    }

    return null
}

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
    }
}

export function getRoleDashboardPath(role: string): string {
    return `/${role}/dashboard`
}
