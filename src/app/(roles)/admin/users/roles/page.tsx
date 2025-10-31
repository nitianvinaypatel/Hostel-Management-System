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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Roles & Permissions 🔐
                    </h1>
                    <p className="text-muted-foreground text-lg">Manage user roles and their permissions</p>
                </div>
            </div>

            {/* Roles Grid */}
            <div className="grid gap-6">
                {roles.map((role) => (
                    <div key={role.name} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{role.name}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">{role.description}</p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all"
                            >
                                Edit
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {allPermissions.map((permission) => (
                                <div
                                    key={permission}
                                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${role.permissions.includes(permission)
                                        ? 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50 shadow-sm'
                                        : 'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30 border-gray-200/30 dark:border-gray-700/30 opacity-40'
                                        }`}
                                >
                                    {role.permissions.includes(permission) && (
                                        <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md shadow-green-500/50 flex-shrink-0">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                    <span className={`text-xs font-medium capitalize ${role.permissions.includes(permission)
                                        ? 'text-green-900 dark:text-green-100'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                        {permission.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
