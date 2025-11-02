"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, UserMinus, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type Allocation = {
    id: string
    studentId: string
    studentName: string
    enrollmentNumber: string
    roomNumber: string
    floor: number
    hostelName: string
    allocatedBy: string
    allocatedAt: string
    status: string
    bedPreference?: string
    notes?: string
}

interface ColumnActions {
    onView: (allocation: Allocation) => void
    onDeallocate: (allocation: Allocation) => void
}

export const createColumns = ({ onView, onDeallocate }: ColumnActions): ColumnDef<Allocation>[] => [
    {
        accessorKey: "studentName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Student Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                        {row.original.studentName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {row.original.enrollmentNumber}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: "hostelName",
        header: "Hostel",
        cell: ({ row }) => {
            return (
                <span className="text-sm text-gray-900 dark:text-white">
                    {row.original.hostelName}
                </span>
            )
        },
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
                    Room
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                        Room {row.original.roomNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Floor {row.original.floor}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: "allocatedBy",
        header: "Allocated By",
        cell: ({ row }) => {
            return (
                <span className="text-sm text-gray-900 dark:text-white">
                    {row.original.allocatedBy}
                </span>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge
                    variant={status === 'completed' ? 'default' : 'secondary'}
                    className="capitalize"
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "allocatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Allocated On
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="text-sm">
                    {new Date(row.original.allocatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(row.original)}
                        className="h-8 w-8 p-0"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeallocate(row.original)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                        <UserMinus className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
]
