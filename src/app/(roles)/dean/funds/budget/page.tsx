'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, DollarSign } from "lucide-react"

export default function BudgetAllocation() {
    const [showForm, setShowForm] = useState(false)

    const budgetAllocations = [
        {
            id: "1",
            hostel: "Hostel A",
            category: "maintenance",
            amount: 500000,
            allocatedFor: "Annual maintenance and repairs",
            fiscalYear: "2024-25",
            allocatedAt: "2024-04-01",
            status: "active",
            spent: 385000,
            remaining: 115000
        },
        {
            id: "2",
            hostel: "Hostel B",
            category: "upgrades",
            amount: 300000,
            allocatedFor: "Infrastructure upgrades",
            fiscalYear: "2024-25",
            allocatedAt: "2024-04-01",
            status: "active",
            spent: 180000,
            remaining: 120000
        },
        {
            id: "3",
            hostel: "Hostel C",
            category: "equipment",
            amount: 200000,
            allocatedFor: "New equipment purchase",
            fiscalYear: "2024-25",
            allocatedAt: "2024-04-01",
            status: "active",
            spent: 150000,
            remaining: 50000
        },
        {
            id: "4",
            hostel: "All Hostels",
            category: "emergency",
            amount: 500000,
            allocatedFor: "Emergency fund for all hostels",
            fiscalYear: "2024-25",
            allocatedAt: "2024-04-01",
            status: "active",
            spent: 125000,
            remaining: 375000
        },
    ]

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "maintenance": return "bg-orange-100 text-orange-800"
            case "upgrades": return "bg-purple-100 text-purple-800"
            case "equipment": return "bg-blue-100 text-blue-800"
            case "supplies": return "bg-green-100 text-green-800"
            case "emergency": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                            Budget Allocation 💵
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">Approve and manage budget allocations for hostels</p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        New Allocation
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Create New Budget Allocation</h3>
                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hostel" className="font-semibold dark:text-white">Hostel</Label>
                                <select id="hostel" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 font-medium">
                                    <option value="">Select Hostel</option>
                                    <option value="hostel-a">Hostel A</option>
                                    <option value="hostel-b">Hostel B</option>
                                    <option value="hostel-c">Hostel C</option>
                                    <option value="hostel-d">Hostel D</option>
                                    <option value="all">All Hostels</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="font-semibold dark:text-white">Category</Label>
                                <select id="category" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 font-medium">
                                    <option value="maintenance">Maintenance</option>
                                    <option value="upgrades">Upgrades</option>
                                    <option value="supplies">Supplies</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="emergency">Emergency</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount" className="font-semibold dark:text-white">Amount (₹)</Label>
                                <Input id="amount" type="number" placeholder="Enter amount" className="h-10 rounded-xl bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fiscalYear" className="font-semibold dark:text-white">Fiscal Year</Label>
                                <Input id="fiscalYear" placeholder="e.g., 2024-25" className="h-10 rounded-xl bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="allocatedFor" className="font-semibold dark:text-white">Allocated For</Label>
                            <textarea
                                id="allocatedFor"
                                placeholder="Purpose of allocation"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl min-h-[80px] bg-white/50 dark:bg-gray-800/50"
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/50 rounded-xl">
                                Approve Allocation
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {budgetAllocations.map((allocation) => {
                    const utilizationRate = ((allocation.spent / allocation.amount) * 100).toFixed(1)
                    return (
                        <div key={allocation.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                                            <DollarSign className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold dark:text-white">{allocation.hostel}</h3>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(allocation.category)} dark:bg-opacity-30`}>
                                            {allocation.category}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${allocation.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                            allocation.status === 'exhausted' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700'}`}>
                                            {allocation.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 font-medium">{allocation.allocatedFor}</p>

                                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                                            <p className="text-xs text-muted-foreground mb-1 font-medium">Total Allocated</p>
                                            <p className="text-xl font-bold dark:text-white">₹{(allocation.amount / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-xl bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20">
                                            <p className="text-xs text-muted-foreground mb-1 font-medium">Spent</p>
                                            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">₹{(allocation.spent / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div className="p-4 border border-green-200 dark:border-green-800 rounded-xl bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20">
                                            <p className="text-xs text-muted-foreground mb-1 font-medium">Remaining</p>
                                            <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{(allocation.remaining / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div className="p-4 border border-primary/30 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                                            <p className="text-xs text-muted-foreground mb-1 font-medium">Utilization</p>
                                            <p className="text-xl font-bold text-primary">{utilizationRate}%</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-muted-foreground font-medium">Budget Utilization</span>
                                            <span className="font-bold dark:text-white">{utilizationRate}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-500 ${parseFloat(utilizationRate) > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                                    parseFloat(utilizationRate) > 75 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                                        'bg-gradient-to-r from-green-500 to-green-600'}`}
                                                style={{ width: `${utilizationRate}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                                        <span>Fiscal Year: {allocation.fiscalYear}</span>
                                        <span>Allocated: {new Date(allocation.allocatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <Button variant="outline" size="sm" className="rounded-xl">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
