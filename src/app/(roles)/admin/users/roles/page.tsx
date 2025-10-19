'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Check } from "lucide-react"

export default function RolesPermissions() {
    const roles = [
        {
            name: "Admin",
            description: "Full system access",
            permissions: ["manage_users", "manage_hostels", "manage_fees", "view_reports", "send_notifications", "system_backup"]
        },
        {
            name: "Dean",
            description: "High-level oversight",
            permissions: ["approve_requisitions", "view_reports", "send_announcements"]
        },
        {
            name: "Warden",
            description: "Hostel management",
            permissions: ["manage_students", "approve_requests", "view_complaints", "create_requisitions"]
        },
        {
            name: "Caretaker",
            description: "Day-to-day operations",
            permissions: ["manage_rooms", "handle_complaints", "manage_mess", "allot_rooms"]
        },
        {
            name: "Student",
            description: "Basic access",
            permissions: ["view_profile", "submit_complaints", "make_requests", "view_notices", "make_payments"]
        }
    ]

    const allPermissions = [
        "manage_users", "manage_hostels", "manage_fees", "view_reports", "send_notifications",
        "system_backup", "approve_requisitions", "send_announcements", "manage_students",
        "approve_requests", "view_complaints", "create_requisitions", "manage_rooms",
        "handle_complaints", "manage_mess", "allot_rooms", "view_profile", "submit_complaints",
        "make_requests", "view_notices", "make_payments"
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Roles & Permissions</h1>
                <p className="text-muted-foreground">Manage user roles and their permissions</p>
            </div>

            <div className="grid gap-6">
                {roles.map((role) => (
                    <Card key={role.name} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Shield className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{role.name}</h3>
                                    <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {allPermissions.map((permission) => (
                                <div
                                    key={permission}
                                    className={`flex items-center gap-2 p-2 rounded border ${role.permissions.includes(permission)
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-gray-50 border-gray-200 opacity-50'
                                        }`}
                                >
                                    {role.permissions.includes(permission) && (
                                        <Check className="h-4 w-4 text-green-600" />
                                    )}
                                    <span className="text-xs">{permission.replace(/_/g, ' ')}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
