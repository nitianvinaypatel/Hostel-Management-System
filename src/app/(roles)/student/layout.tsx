import { DashboardLayout } from "@/components/common/dashboard-layout"
import { AuthCheck } from "@/components/auth-check"
import { studentMenuItems } from "@/constants/menu-items"

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthCheck requiredRole="student">
            <DashboardLayout menuItems={studentMenuItems} role="student">
                {children}
            </DashboardLayout>
        </AuthCheck>
    )
}
