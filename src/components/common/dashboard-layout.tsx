"use client"

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

type MenuItem = {
    title: string
    url: string
    icon: string
}

type DashboardLayoutProps = {
    children: React.ReactNode
    menuItems: MenuItem[]
    role: string
}

export function DashboardLayout({ children, menuItems, role }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar items={menuItems} role={role} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-2 px-4 flex-1">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Overview</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/20">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
