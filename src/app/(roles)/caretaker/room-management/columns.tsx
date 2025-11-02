"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2, Eye, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Room = {
    _id?: string
    id?: string
    roomNumber: string
    floor: number
    type: 'single' | 'double' | 'triple' | 'quad'
    capacity: number
    currentOccupancy?: number
    occupied?: number
    status: 'available' | 'occupied' | 'full' | 'maintenance'
    amenities: string[]
    maintenanceStatus?: string
    lastCleaned?: string | null
    students?: Array<{
        id: string
        name: string
        email: string
    }>
    hostel?: {
        _id: string
        name: string
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'available':
            return 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/50'
        case 'occupied':
            return 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50'
        case 'full':
            return 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50'
        case 'maintenance':
            return 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50'
        default:
            return 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/50'
    }
}

interface ColumnActions {
    onView: (room: Room) => void
    onEdit: (room: Room) => void
    onDelete: (room: Room) => void
}

export const createColumns = ({ onView, onEdit, onDelete }: ColumnActions): ColumnDef<Room>[] => [
    {
        accessorKey: "roomNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Room Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const room = row.original
            const occupancy = room.currentOccupancy ?? room.occupied ?? 0
            return (
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                    Room {row.getValue("roomNumber")}
                    <div className="text-xs text-muted-foreground mt-0.5">
                        {occupancy}/{room.capacity} occupied
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "floor",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-blue-500/10 -ml-4"
                >
                    Floor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-sm text-gray-900 dark:text-white">
                Floor {row.getValue("floor")}
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
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50 capitalize">
                    {type}
                </span>
            )
        },
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                <Users className="h-4 w-4 text-muted-foreground" />
                {row.getValue("capacity")}
            </div>
        ),
    },
    {
        accessorKey: "status",
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
            const status = row.getValue("status") as string
            return (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusColor(status)}`}>
                    {status === 'available' && <CheckCircle2 className="h-3 w-3" />}
                    {status === 'full' && <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            )
        },
    },
    {
        accessorKey: "amenities",
        header: "Amenities",
        cell: ({ row }) => {
            const amenities = row.getValue("amenities") as string[]
            return (
                <div className="flex flex-wrap gap-1">
                    {amenities.slice(0, 2).map((amenity, idx) => (
                        <span key={idx} className="inline-flex px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {amenity}
                        </span>
                    ))}
                    {amenities.length > 2 && (
                        <span className="inline-flex px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            +{amenities.length - 2}
                        </span>
                    )}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const room = row.original

            return (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onView(room)}
                        className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors group"
                        title="View details"
                    >
                        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </button>
                    <button
                        onClick={() => onEdit(room)}
                        className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
                        title="Edit room"
                    >
                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                    </button>
                    <button
                        onClick={() => onDelete(room)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                        title="Delete room"
                    >
                        <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                    </button>
                </div>
            )
        },
    },
]
