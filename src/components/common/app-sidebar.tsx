"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as LucideIcons from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

type MenuItem = {
    title: string
    url: string
    icon: string
}

type AppSidebarProps = {
    items: MenuItem[]
    role: string
}

const roleConfig = {
    admin: {
        icon: "👑",
        name: "Admin Portal",
    },
    student: {
        icon: "🎓",
        name: "Student Portal",
    },
    warden: {
        icon: "🛡️",
        name: "Warden Portal",
    },
    dean: {
        icon: "⭐",
        name: "Dean Portal",
    },
    caretaker: {
        icon: "🔧",
        name: "Caretaker Portal",
    },
}

export function AppSidebar({ items, role, ...props }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.student

    const getIcon = (iconName: string) => {
        const Icon = (LucideIcons as any)[iconName]
        return Icon || LucideIcons.Circle
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background">
                                <span className="text-lg">{config.icon}</span>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Hostel MS</span>
                                <span className="truncate text-xs text-muted-foreground capitalize">
                                    {role}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map((item) => {
                            const Icon = getIcon(item.icon)
                            const isActive = pathname === item.url
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                                        <Link href={item.url}>
                                            <Icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: "User Name",
                    email: "user@example.com",
                    avatar: "/avatars/user.jpg"
                }} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
