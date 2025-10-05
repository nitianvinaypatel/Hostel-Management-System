import { DashboardLayout } from "@/components/common/dashboard-layout"
import { adminMenuItems } from "@/constants/menu-items"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout menuItems={adminMenuItems} role="admin">
            {children}
        </DashboardLayout>
    )
}
