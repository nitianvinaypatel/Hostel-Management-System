import { DashboardLayout } from "@/components/common/dashboard-layout"
import { wardenMenuItems } from "@/constants/menu-items"

export default function WardenLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout menuItems={wardenMenuItems} role="warden">
            {children}
        </DashboardLayout>
    )
}
