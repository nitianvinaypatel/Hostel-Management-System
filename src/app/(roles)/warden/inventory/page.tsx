'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Package } from "lucide-react"

export default function WardenInventory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")

    const inventory = [
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
    ]

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === "all" || item.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "furniture": return "bg-blue-100 text-blue-800"
            case "electronics": return "bg-purple-100 text-purple-800"
            case "equipment": return "bg-green-100 text-green-800"
            case "supplies": return "bg-orange-100 text-orange-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case "good": return "bg-green-100 text-green-800"
            case "fair": return "bg-yellow-100 text-yellow-800"
            case "poor": return "bg-orange-100 text-orange-800"
            case "damaged": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Hostel Inventory</h1>
                    <p className="text-muted-foreground">Maintain and track hostel inventory records</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                </Button>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="all">All Categories</option>
                        <option value="furniture">Furniture</option>
                        <option value="electronics">Electronics</option>
                        <option value="equipment">Equipment</option>
                        <option value="supplies">Supplies</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">ID</th>
                                <th className="text-left py-3 px-4">Item Name</th>
                                <th className="text-left py-3 px-4">Category</th>
                                <th className="text-left py-3 px-4">Quantity</th>
                                <th className="text-left py-3 px-4">Condition</th>
                                <th className="text-left py-3 px-4">Location</th>
                                <th className="text-left py-3 px-4">Last Inspected</th>
                                <th className="text-left py-3 px-4">Next Inspection</th>
                                <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-accent/50">
                                    <td className="py-3 px-4 font-mono text-sm">{item.id}</td>
                                    <td className="py-3 px-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            {item.name}
                                        </div>
                                        {item.notes && (
                                            <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(item.category)}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 font-semibold">{item.quantity}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getConditionColor(item.condition)}`}>
                                            {item.condition}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm">{item.location}</td>
                                    <td className="py-3 px-4 text-sm">{new Date(item.lastInspected).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 text-sm">{new Date(item.nextInspection).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-accent rounded">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Items</p>
                    <p className="text-2xl font-bold">{inventory.length}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Good Condition</p>
                    <p className="text-2xl font-bold text-green-600">
                        {inventory.filter(i => i.condition === 'good').length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Fair Condition</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {inventory.filter(i => i.condition === 'fair').length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Needs Attention</p>
                    <p className="text-2xl font-bold text-red-600">
                        {inventory.filter(i => i.condition === 'poor' || i.condition === 'damaged').length}
                    </p>
                </Card>
            </div>
        </div>
    )
}
