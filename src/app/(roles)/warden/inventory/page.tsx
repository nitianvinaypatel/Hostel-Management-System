'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Search, Plus, Package, CheckCircle, AlertTriangle, ArrowLeft, XCircle, Loader2 } from "lucide-react"
import { DataTable } from "./data-table"
import { createColumns, InventoryItem } from "./columns"
import {
    useGetWardenInventoryQuery,
    useAddWardenInventoryItemMutation,
    useUpdateWardenInventoryItemMutation,
    useDeleteWardenInventoryItemMutation
} from "@/store/api/wardenApi"

export default function WardenInventory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState<'all' | 'furniture' | 'electronics' | 'equipment' | 'supplies'>("all")
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: "",
        category: "furniture" as InventoryItem["category"],
        quantity: 0,
        condition: "good" as InventoryItem["condition"],
        location: "",
        notes: "",
    })
    const [newItemData, setNewItemData] = useState({
        name: "",
        category: "furniture" as InventoryItem["category"],
        quantity: 0,
        condition: "good" as InventoryItem["condition"],
        location: "",
        notes: "",
    })

    // RTK Query hooks
    const { data: inventoryData, isLoading, error } = useGetWardenInventoryQuery({
        category: filterCategory,
        search: searchTerm
    })
    const [addItem, { isLoading: isAdding }] = useAddWardenInventoryItemMutation()
    const [updateItem, { isLoading: isUpdating }] = useUpdateWardenInventoryItemMutation()
    const [deleteItem] = useDeleteWardenInventoryItemMutation()

    const inventory = inventoryData?.data || []
    const [mockInventory] = useState<InventoryItem[]>([
        {
            id: "INV001",
            name: "Study Tables",
            category: "furniture",
            quantity: 120,
            condition: "good",
            location: "All Blocks",
            lastInspected: "2024-01-10",
            nextInspection: "2024-04-10"
        },
        {
            id: "INV002",
            name: "Ceiling Fans",
            category: "electronics",
            quantity: 150,
            condition: "good",
            location: "All Rooms",
            lastInspected: "2024-01-08",
            nextInspection: "2024-04-08",
            notes: "5 fans need replacement in Block C"
        },
        {
            id: "INV003",
            name: "Mattresses",
            category: "furniture",
            quantity: 240,
            condition: "fair",
            location: "All Blocks",
            lastInspected: "2024-01-05",
            nextInspection: "2024-07-05",
            notes: "15 mattresses need replacement"
        },
        {
            id: "INV004",
            name: "Water Coolers",
            category: "equipment",
            quantity: 12,
            condition: "good",
            location: "Common Areas",
            lastInspected: "2024-01-12",
            nextInspection: "2024-02-12"
        },
        {
            id: "INV005",
            name: "Fire Extinguishers",
            category: "equipment",
            quantity: 30,
            condition: "good",
            location: "All Floors",
            lastInspected: "2024-01-01",
            nextInspection: "2024-07-01",
            notes: "All units checked and refilled"
        },
        {
            id: "INV006",
            name: "Cleaning Supplies",
            category: "supplies",
            quantity: 50,
            condition: "good",
            location: "Storage Room",
            lastInspected: "2024-01-15",
            nextInspection: "2024-02-15"
        },
    ])

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === "all" || item.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const handleViewDetails = (item: InventoryItem) => {
        setSelectedItem(item)
        setViewDialogOpen(true)
    }

    const handleEditClick = (item: InventoryItem) => {
        setSelectedItem(item)
        setEditFormData({
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            condition: item.condition,
            location: item.location,
            notes: item.notes || "",
        })
        setEditDialogOpen(true)
    }

    const handleEditSubmit = async () => {
        if (!selectedItem) return

        try {
            await updateItem({
                id: selectedItem.id,
                data: {
                    name: editFormData.name,
                    category: editFormData.category,
                    quantity: editFormData.quantity,
                    condition: editFormData.condition,
                    location: editFormData.location,
                    notes: editFormData.notes,
                }
            }).unwrap()

            toast.success(`Item ${editFormData.name} updated successfully!`)
            setEditDialogOpen(false)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update item')
            console.error('Failed to update item:', err)
        }
    }

    const handleAddItem = async () => {
        try {
            await addItem({
                name: newItemData.name,
                category: newItemData.category,
                quantity: newItemData.quantity,
                condition: newItemData.condition,
                location: newItemData.location,
                notes: newItemData.notes,
            }).unwrap()

            toast.success("New inventory item added successfully!")
            setAddDialogOpen(false)
            setNewItemData({
                name: "",
                category: "furniture",
                quantity: 0,
                condition: "good",
                location: "",
                notes: "",
            })
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to add item')
            console.error('Failed to add item:', err)
        }
    }

    const handleDeleteItem = async (itemId: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return

        try {
            await deleteItem(itemId).unwrap()
            toast.success('Item deleted successfully!')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to delete item')
            console.error('Failed to delete item:', err)
        }
    }

    const columns = createColumns({
        onEdit: handleEditClick,
        onView: handleViewDetails,
    })

    // Use real data if available, otherwise use mock data for stats
    const displayInventory = inventory.length > 0 ? inventory : mockInventory

    const stats = {
        total: displayInventory.length,
        good: displayInventory.filter(i => i.condition === 'good').length,
        fair: displayInventory.filter(i => i.condition === 'fair').length,
        needsAttention: displayInventory.filter(i => i.condition === 'poor' || i.condition === 'damaged').length,
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-500" />
                    <p className="text-muted-foreground">Loading inventory...</p>
                </div>
            </div>
        )
    }

    const statCards = [
        {
            title: 'Total Items',
            value: stats.total.toString(),
            icon: Package,
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-cyan-500',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
        },
        {
            title: 'Good Condition',
            value: stats.good.toString(),
            icon: CheckCircle,
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-emerald-500',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
        },
        {
            title: 'Fair Condition',
            value: stats.fair.toString(),
            icon: AlertTriangle,
            gradient: 'from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/30',
            border: 'border-yellow-200/50 dark:border-yellow-800/50',
            shadow: 'hover:shadow-yellow-500/20',
            iconGradient: 'from-yellow-500 to-amber-500',
            iconShadow: 'shadow-yellow-500/50',
            textColor: 'text-yellow-700 dark:text-yellow-300',
            valueColor: 'text-yellow-900 dark:text-yellow-100',
        },
        {
            title: 'Needs Attention',
            value: stats.needsAttention.toString(),
            icon: XCircle,
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-rose-500',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
        },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-green-500/10 dark:from-teal-500/20 dark:via-emerald-500/20 dark:to-green-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-green-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                    Hostel Inventory
                                </h1>
                                <p className="text-muted-foreground text-lg">Maintain and track hostel inventory records</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search inventory..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
                                className="px-4 py-2 border border-gray-300/50 dark:border-gray-700/50 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="all">All Categories</option>
                                <option value="furniture">Furniture</option>
                                <option value="electronics">Electronics</option>
                                <option value="equipment">Equipment</option>
                                <option value="supplies">Supplies</option>
                            </select>
                            <Button
                                onClick={() => setAddDialogOpen(true)}
                                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg shadow-teal-500/50"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Item
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border ${stat.border} rounded-2xl p-6 hover:shadow-2xl ${stat.shadow} hover:-translate-y-1 transition-all duration-300 group`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} group-hover:opacity-80 transition-all duration-300`} />
                        <div className="relative flex items-center justify-between mb-4">
                            <h3 className={`text-sm font-semibold ${stat.textColor}`}>{stat.title}</h3>
                            <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${stat.iconGradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${stat.iconShadow}`}>
                                <stat.icon className="h-7 w-7 text-white" />
                            </div>
                        </div>
                        <p className={`text-4xl font-bold mb-2 ${stat.valueColor}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Inventory Table */}
            <DataTable columns={columns} data={filteredInventory} globalFilter={searchTerm} onGlobalFilterChange={setSearchTerm} />

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Inventory Item Details</DialogTitle>
                        <DialogDescription>Complete information about the inventory item</DialogDescription>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Item ID</Label>
                                    <p className="font-semibold">{selectedItem.id}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Name</Label>
                                    <p className="font-semibold">{selectedItem.name}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Category</Label>
                                    <p className="font-semibold capitalize">{selectedItem.category}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Quantity</Label>
                                    <p className="font-semibold">{selectedItem.quantity}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Condition</Label>
                                    <p className="font-semibold capitalize">{selectedItem.condition}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Location</Label>
                                    <p className="font-semibold">{selectedItem.location}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Last Inspected</Label>
                                    <p className="font-semibold">{new Date(selectedItem.lastInspected).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Next Inspection</Label>
                                    <p className="font-semibold">{new Date(selectedItem.nextInspection).toLocaleDateString()}</p>
                                </div>
                                {selectedItem.notes && (
                                    <div className="col-span-2">
                                        <Label className="text-muted-foreground">Notes</Label>
                                        <p className="font-semibold">{selectedItem.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Inventory Item</DialogTitle>
                        <DialogDescription>Update inventory item information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Item Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <select
                                    id="edit-category"
                                    value={editFormData.category}
                                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value as InventoryItem["category"] })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="furniture">Furniture</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="supplies">Supplies</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-quantity">Quantity</Label>
                                <Input
                                    id="edit-quantity"
                                    type="number"
                                    value={editFormData.quantity}
                                    onChange={(e) => setEditFormData({ ...editFormData, quantity: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-condition">Condition</Label>
                                <select
                                    id="edit-condition"
                                    value={editFormData.condition}
                                    onChange={(e) => setEditFormData({ ...editFormData, condition: e.target.value as InventoryItem["condition"] })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="poor">Poor</option>
                                    <option value="damaged">Damaged</option>
                                </select>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="edit-location">Location</Label>
                                <Input
                                    id="edit-location"
                                    value={editFormData.location}
                                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="edit-notes">Notes</Label>
                                <textarea
                                    id="edit-notes"
                                    value={editFormData.notes}
                                    onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[80px]"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isUpdating}>Cancel</Button>
                        <Button onClick={handleEditSubmit} disabled={isUpdating}>
                            {isUpdating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Item Dialog */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Inventory Item</DialogTitle>
                        <DialogDescription>Add a new item to the hostel inventory</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-name">Item Name</Label>
                                <Input
                                    id="new-name"
                                    placeholder="Enter item name"
                                    value={newItemData.name}
                                    onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-category">Category</Label>
                                <select
                                    id="new-category"
                                    value={newItemData.category}
                                    onChange={(e) => setNewItemData({ ...newItemData, category: e.target.value as InventoryItem["category"] })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="furniture">Furniture</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="supplies">Supplies</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-quantity">Quantity</Label>
                                <Input
                                    id="new-quantity"
                                    type="number"
                                    placeholder="Enter quantity"
                                    value={newItemData.quantity}
                                    onChange={(e) => setNewItemData({ ...newItemData, quantity: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-condition">Condition</Label>
                                <select
                                    id="new-condition"
                                    value={newItemData.condition}
                                    onChange={(e) => setNewItemData({ ...newItemData, condition: e.target.value as InventoryItem["condition"] })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="poor">Poor</option>
                                    <option value="damaged">Damaged</option>
                                </select>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="new-location">Location</Label>
                                <Input
                                    id="new-location"
                                    placeholder="Enter location"
                                    value={newItemData.location}
                                    onChange={(e) => setNewItemData({ ...newItemData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="new-notes">Notes (Optional)</Label>
                                <textarea
                                    id="new-notes"
                                    placeholder="Enter any additional notes"
                                    value={newItemData.notes}
                                    onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[80px]"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddDialogOpen(false)} disabled={isAdding}>Cancel</Button>
                        <Button onClick={handleAddItem} disabled={isAdding}>
                            {isAdding ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                'Add Item'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
