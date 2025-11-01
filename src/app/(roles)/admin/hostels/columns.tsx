"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Hostel = {
    _id: string
    name: string
    code: string
    type: "boys" | "girls" | "mixed"
    totalRooms: number
    totalCapacity: number
    occupiedCapacity: number
    facilities: string[]
    isActive: boolean
    address?: string
    contactNumber?: string
}

interface ColumnActions {
    onEdit: (hostel: Hostel) => void
    onDelete: (hostel: Hostel) => void
}

export const createColumns = ({ onEdit, onDelete }: ColumnActions): ColumnDef<Hostel>[] => [
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
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => (
            <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {row.getValue("code")}
            </div>
        ),
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const type = row.getValue("type") as string
            return (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 capitalize">
                    {type}
                </span>
            )
        },
    },
    {
        accessorKey: "totalRooms",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Rooms
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {row.getValue("totalRooms")}
            </div>
        ),
    },
    {
        accessorKey: "totalCapacity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Capacity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {row.getValue("totalCapacity")}
            </div>
        ),
    },
    {
        accessorKey: "occupiedCapacity",
        header: "Occupancy",
        cell: ({ row }) => {
            const hostel = row.original
            const occupancyPercentage = hostel.totalCapacity > 0
                ? Math.round((hostel.occupiedCapacity / hostel.totalCapacity) * 100)
                : 0

            const getOccupancyColor = (percentage: number) => {
                if (percentage >= 90) return 'from-red-500/10 to-pink-500/10 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-800/50'
                if (percentage >= 70) return 'from-orange-500/10 to-yellow-500/10 text-orange-700 dark:text-orange-300 border-orange-200/50 dark:border-orange-800/50'
                return 'from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-800/50'
            }

            return (
                <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                        {hostel.occupiedCapacity}/{hostel.totalCapacity}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r border ${getOccupancyColor(occupancyPercentage)}`}>
                        {occupancyPercentage}%
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "facilities",
        header: "Facilities",
        cell: ({ row }) => {
            const facilities = row.getValue("facilities") as string[]
            return (
                <div className="flex flex-wrap gap-1">
                    {facilities.slice(0, 2).map((facility, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-lg border border-purple-200 dark:border-purple-800"
                        >
                            {facility}
                        </span>
                    ))}
                    {facilities.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg">
                            +{facilities.length - 2}
                        </span>
                    )}
                </div>
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
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const hostel = row.original

            return (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onEdit(hostel)}
                        className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors group"
                        title="Edit hostel"
                    >
                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </button>
                    <button
                        onClick={() => onDelete(hostel)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                        title="Delete hostel"
                    >
                        <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                    </button>
                </div>
            )
        },
    },
]
