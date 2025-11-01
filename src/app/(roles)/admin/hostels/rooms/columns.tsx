"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"

export type Room = {
    _id: string
    roomNumber: string
    hostelId: string
    hostelName?: string
    floor: number
    capacity: number
    roomType: "single" | "double" | "triple" | "quad"
    facilities: string[]
    monthlyRent: number
    status: "available" | "occupied" | "maintenance" | "reserved"
}

interface ColumnsProps {
    onEdit: (room: Room) => void
    onDelete: (room: Room) => void
}

export const createColumns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Room>[] => [
    {
        accessorKey: "hostelName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Hostel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-medium text-gray-900 dark:text-gray-100">
                {row.getValue("hostelName") || 'N/A'}
            </div>
        ),
    },
    {
        accessorKey: "floor",
        header: "Floor",
        cell: ({ row }) => (
            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm shadow-sm">
                {row.getValue("floor")}F
            </span>
        ),
    },
    {
        accessorKey: "roomNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Room Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {row.getValue("roomNumber")}
            </div>
        ),
    },
    {
        accessorKey: "roomType",
        header: "Type",
        cell: ({ row }) => (
            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 font-semibold text-sm capitalize shadow-sm">
                {row.getValue("roomType")}
            </span>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
        cell: ({ row }) => (
            <div className="text-gray-600 dark:text-gray-400 font-medium">
                {row.getValue("capacity")} persons
            </div>
        ),
    },
    {
        accessorKey: "monthlyRent",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Rent
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("monthlyRent"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(amount)
            return <div className="font-semibold text-gray-900 dark:text-gray-100">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${status === 'occupied'
                        ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-800/50'
                        : status === 'available'
                            ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50'
                            : 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200/50 dark:border-yellow-800/50'
                    }`}>
                    {status}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const room = row.original
            return (
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(room)}
                        className="text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(room)}
                        className="text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
]
