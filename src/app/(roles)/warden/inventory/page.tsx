'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Package, CheckCircle, AlertTriangle, Calendar } from "lucide-react"

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

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-green-500/10 dark:from-teal-500/20 dark:via-emerald-500/20 dark:to-green-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-green-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                            Hostel Inventory 📦
                        </h1>
                        <p className="text-muted-foreground text-lg">Maintain and track hostel inventory records</p>
                    </div>
                    <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg shadow-teal-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Package className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Items</p>
                    </div>
                    <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">{inventory.length}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Good Condition</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">
                        {inventory.filter(i => i.condition === 'good').length}
                    </p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/30 backdrop-blur-xl border border-yellow-200/50 dark:border-yellow-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Fair Condition</p>
                    </div>
                    <p className="text-4xl font-bold text-yellow-600">
                        {inventory.filter(i => i.condition === 'fair').length}
                    </p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-red-700 dark:text-red-300">Needs Attention</p>
                    </div>
                    <p className="text-4xl font-bold text-red-600">
                        {inventory.filter(i => i.condition === 'poor' || i.condition === 'damaged').length}
                    </p>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-medium"
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
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">ID</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Item Name</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Category</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Quantity</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Condition</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Location</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Last Inspected</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Next Inspection</th>
                                <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-mono text-sm font-bold bg-gray-100 dark:bg-gray-800 rounded-lg">{item.id}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-teal-600" />
                                            <span className="font-bold text-gray-900 dark:text-gray-100">{item.name}</span>
                                        </div>
                                        {item.notes && (
                                            <p className="text-xs text-muted-foreground mt-1 font-medium italic">{item.notes}</p>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-bold text-lg text-gray-900 dark:text-gray-100">{item.quantity}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getConditionColor(item.condition)}`}>
                                            {item.condition}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">{item.location}</td>
                                    <td className="py-4 px-4 text-sm font-medium flex items-center gap-1">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        {new Date(item.lastInspected).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-muted-foreground" />
                                            {new Date(item.nextInspection).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors hover:scale-110 duration-200">
                                                <Edit className="h-4 w-4 text-primary" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
