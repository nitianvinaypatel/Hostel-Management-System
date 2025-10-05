import { DashboardLayout } from "@/components/common/dashboard-layout"
import { deanMenuItems } from "@/constants/menu-items"

export default function DeanLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout menuItems={deanMenuItems} role="dean">
            {children}
        </DashboardLayout>
    )
}
