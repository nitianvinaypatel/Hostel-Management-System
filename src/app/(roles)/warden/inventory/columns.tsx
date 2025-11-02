"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Eye, Package, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export type InventoryItem = {
    id: string
    name: string
    category: "furniture" | "electronics" | "equipment" | "supplies"
    quantity: number
    condition: "good" | "fair" | "poor" | "damaged"
    location: string
    lastInspected: string
    nextInspection: string
    notes?: string
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case "furniture": return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700"
        case "electronics": return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700"
        case "equipment": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700"
        case "supplies": return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700"
        default: return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700"
    }
}

const getConditionColor = (condition: string) => {
    switch (condition) {
        case "good": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700"
        case "fair": return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
        case "poor": return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700"
        case "damaged": return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700"
        default: return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700"
    }
}

interface ColumnActions {
    onEdit: (item: InventoryItem) => void
    onView: (item: InventoryItem) => void
}

export const createColumns = ({ onEdit, onView }: ColumnActions): ColumnDef<InventoryItem>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-teal-500/10 -ml-4"
                >
                    Item Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const item = row.original
            return (
                <div>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-teal-600" />
                        <span className="font-bold text-gray-900 dark:text-gray-100">{row.getValue("name")}</span>
                    </div>
                    {item.notes && (
                        <p className="text-xs text-muted-foreground mt-1 font-medium italic">{item.notes}</p>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-teal-500/10 -ml-4"
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const category = row.getValue("category") as string
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(category)}`}>
                    {category}
                </span>
            )
        },
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-teal-500/10 -ml-4"
                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {row.getValue("quantity")}
            </div>
        ),
    },
    {
        accessorKey: "condition",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-teal-500/10 -ml-4"
                >
                    Condition
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const condition = row.getValue("condition") as string
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getConditionColor(condition)}`}>
                    {condition}
                </span>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {row.getValue("location")}
            </div>
        ),
    },
    {
        accessorKey: "lastInspected",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-teal-500/10 -ml-4"
                >
                    Last Inspected
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {new Date(row.getValue("lastInspected")).toLocaleDateString()}
            </div>
        ),
    },
    {
        accessorKey: "nextInspection",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-teal-500/10 -ml-4"
                >
                    Next Inspection
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {new Date(row.getValue("nextInspection")).toLocaleDateString()}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const item = row.original

            return (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onView(item)}
                        className="p-2 hover:bg-teal-500/10 rounded-lg transition-colors group"
                        title="View details"
                    >
                        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
                    </button>
                    <button
                        onClick={() => onEdit(item)}
                        className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors group"
                        title="Edit item"
                    >
                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </button>
                </div>
            )
        },
    },
]
