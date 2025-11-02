"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import * as LucideIcons from "lucide-react"
import { ChevronDown } from "lucide-react"

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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

type SubMenuItem = {
    title: string
    url: string
}

type MenuItem = {
    title: string
    url?: string
    icon: string
    items?: SubMenuItem[]
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

    const getIcon = (iconName: string): React.ComponentType => {
        const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType | undefined
        return Icon || LucideIcons.Circle
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-gradient-to-r data-[state=open]:from-primary/10 data-[state=open]:to-primary/5 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300">
                            <div className="flex items-center justify-center">
                                <Image
                                    src="/images/Logo_NITMZ.png"
                                    alt="NIT Mizoram Logo"
                                    width={46}
                                    height={46}
                                    className="object-contain w-auto h-auto"
                                />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">NIT Mizoram</span>
                                <span className="truncate text-xs font-semibold text-muted-foreground capitalize">
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

                            // Handle items with sub-menu
                            if (item.items && item.items.length > 0) {
                                const isAnySubItemActive = item.items.some(subItem => pathname === subItem.url)

                                return (
                                    <Collapsible key={item.title} asChild defaultOpen={isAnySubItemActive} className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    className={isAnySubItemActive ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 font-semibold" : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300"}
                                                >
                                                    <Icon />
                                                    <span>{item.title}</span>
                                                    <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem) => {
                                                        const isActive = pathname === subItem.url
                                                        return (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={isActive}
                                                                    className={isActive ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-l-2 border-green-500 font-semibold" : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300"}
                                                                >
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            }

                            // Handle regular menu items
                            const isActive = pathname === item.url
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={item.title}
                                        className={isActive ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-l-4 border-green-500 font-semibold shadow-sm" : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300"}
                                    >
                                        <Link href={item.url!}>
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
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
