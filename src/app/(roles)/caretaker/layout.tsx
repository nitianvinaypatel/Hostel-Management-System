import { DashboardLayout } from "@/components/common/dashboard-layout"
import { caretakerMenuItems } from "@/constants/menu-items"

export default function CaretakerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout menuItems={caretakerMenuItems} role="caretaker">
            {children}
        </DashboardLayout>
    )
}
