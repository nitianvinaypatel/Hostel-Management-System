"use client"

import { useEffect, useState } from "react"
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { logout, setCredentials } from "@/store/slices/authSlice"
import { clearAuthCookie, getAuthCookie, getAuthToken } from "@/lib/auth"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function NavUser() {
    const { isMobile } = useSidebar()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [mounted, setMounted] = useState(false)

    // Get user from Redux store
    const { user } = useAppSelector((state) => state.auth)

    // Load user from localStorage on mount
    useEffect(() => {
        setMounted(true)
        if (!user) {
            const storedUser = getAuthCookie()
            const storedToken = getAuthToken()
            if (storedUser && storedToken) {
                dispatch(setCredentials({ user: storedUser, token: storedToken }))
            }
        }
    }, [user, dispatch])

    const handleLogout = () => {
        // Clear Redux state
        dispatch(logout())

        // Clear localStorage
        clearAuthCookie()

        // Redirect to login
        router.push("/login")
    }

    // Don't render until mounted (avoid hydration mismatch)
    if (!mounted) {
        return null
    }

    // If no user, show loading or default
    if (!user) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.profileImage || ""} alt={user.name} />
                                <AvatarFallback className="rounded-lg">
                                    {user.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.profileImage || ""} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                    <span className="truncate text-xs text-muted-foreground capitalize">{user.role}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
