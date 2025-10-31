"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/theme-toggle"

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

type DashboardLayoutProps = {
    children: React.ReactNode
    menuItems: MenuItem[]
    role: string
}

export function DashboardLayout({ children, menuItems, role }: DashboardLayoutProps) {
    const pathname = usePathname()

    // Get current page title from menu items based on pathname
    const getCurrentPageTitle = () => {
        // Check top-level items
        const currentItem = menuItems.find((item) => item.url === pathname)
        if (currentItem) return currentItem.title

        // Check nested items
        for (const item of menuItems) {
            if (item.items) {
                const subItem = item.items.find((sub) => sub.url === pathname)
                if (subItem) return subItem.title
            }
        }

        return "Overview"
    }

    // Get role display name
    const getRoleDisplayName = () => {
        return role.charAt(0).toUpperCase() + role.slice(1)
    }

    const currentPageTitle = getCurrentPageTitle()
    const roleDisplayName = getRoleDisplayName()

    return (
        <SidebarProvider>
            <AppSidebar items={menuItems} role={role} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-2 px-4 flex-1">
                        <SidebarTrigger className="-ml-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-300 dark:bg-gray-700" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={`/${role}/dashboard`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                        {roleDisplayName} Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block text-gray-400 dark:text-gray-600" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-gray-900 dark:text-gray-100 font-semibold">{currentPageTitle}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2 px-4">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-6 bg-gradient-to-br from-background via-background to-muted/20">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
