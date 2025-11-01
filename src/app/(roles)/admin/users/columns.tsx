"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2, UserCheck, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"

export type User = {
    _id: string
    name: string
    email: string
    phone?: string
    phoneNumber?: string
    role: "student" | "caretaker" | "warden" | "dean" | "admin"
    isActive: boolean
    lastLogin?: string
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

interface ColumnActions {
    onEdit: (user: User) => void
    onDelete: (user: User) => void
    onToggleStatus: (user: User) => void
}

export const createColumns = ({ onEdit, onDelete, onToggleStatus }: ColumnActions): ColumnDef<User>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-semibold text-gray-900 dark:text-gray-100">
                {row.getValue("name")}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="text-sm text-muted-foreground">
                {row.getValue("email")}
            </div>
        ),
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const user = row.original
            return (
                <div className="text-sm text-muted-foreground">
                    {user.phone || user.phoneNumber || '-'}
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            return (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 capitalize">
                    {role}
                </span>
            )
        },
    },
    {
        accessorKey: "isActive",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean
            return isActive ? (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/50 flex items-center gap-1 w-fit">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Active
                </span>
            ) : (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/50">
                    Inactive
                </span>
            )
        },
    },
    {
        accessorKey: "lastLogin",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Last Login
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-sm text-muted-foreground">
                {formatDate(row.getValue("lastLogin"))}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onEdit(user)}
                        className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors group"
                        title="Edit user"
                    >
                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </button>
                    <button
                        onClick={() => onToggleStatus(user)}
                        className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
                        title={user.isActive ? 'Deactivate' : 'Activate'}
                    >
                        {user.isActive ? (
                            <UserX className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                        ) : (
                            <UserCheck className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                        )}
                    </button>
                    <button
                        onClick={() => onDelete(user)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                        title="Delete user"
                    >
                        <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                    </button>
                </div>
            )
        },
    },
]
