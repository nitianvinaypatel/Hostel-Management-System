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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Budget Allocation</h1>
                    <p className="text-muted-foreground">Approve and manage budget allocations for hostels</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Allocation
                </Button>
            </div>

            {showForm && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Create New Budget Allocation</h3>
                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hostel">Hostel</Label>
                                <select id="hostel" className="w-full px-3 py-2 border rounded-md">
                                    <option value="">Select Hostel</option>
                                    <option value="hostel-a">Hostel A</option>
                                    <option value="hostel-b">Hostel B</option>
                                    <option value="hostel-c">Hostel C</option>
                                    <option value="hostel-d">Hostel D</option>
                                    <option value="all">All Hostels</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select id="category" className="w-full px-3 py-2 border rounded-md">
                                    <option value="maintenance">Maintenance</option>
                                    <option value="upgrades">Upgrades</option>
                                    <option value="supplies">Supplies</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="emergency">Emergency</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (₹)</Label>
                                <Input id="amount" type="number" placeholder="Enter amount" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fiscalYear">Fiscal Year</Label>
                                <Input id="fiscalYear" placeholder="e.g., 2024-25" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="allocatedFor">Allocated For</Label>
                            <textarea
                                id="allocatedFor"
                                placeholder="Purpose of allocation"
                                className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit">Approve Allocation</Button>
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid gap-4">
                {budgetAllocations.map((allocation) => {
                    const utilizationRate = ((allocation.spent / allocation.amount) * 100).toFixed(1)
                    return (
                        <Card key={allocation.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <DollarSign className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">{allocation.hostel}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(allocation.category)}`}>
                                            {allocation.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${allocation.status === 'active' ? 'bg-green-100 text-green-800' :
                                            allocation.status === 'exhausted' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                            {allocation.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-3">{allocation.allocatedFor}</p>

                                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                                        <div className="p-3 border rounded-lg">
                                            <p className="text-xs text-muted-foreground mb-1">Total Allocated</p>
                                            <p className="text-lg font-bold">₹{(allocation.amount / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-orange-50">
                                            <p className="text-xs text-muted-foreground mb-1">Spent</p>
                                            <p className="text-lg font-bold text-orange-600">₹{(allocation.spent / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-green-50">
                                            <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                                            <p className="text-lg font-bold text-green-600">₹{(allocation.remaining / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-primary/5">
                                            <p className="text-xs text-muted-foreground mb-1">Utilization</p>
                                            <p className="text-lg font-bold text-primary">{utilizationRate}%</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Budget Utilization</span>
                                            <span className="font-medium">{utilizationRate}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${parseFloat(utilizationRate) > 90 ? 'bg-red-500' :
                                                    parseFloat(utilizationRate) > 75 ? 'bg-orange-500' :
                                                        'bg-green-500'}`}
                                                style={{ width: `${utilizationRate}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span>Fiscal Year: {allocation.fiscalYear}</span>
                                        <span>Allocated: {new Date(allocation.allocatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
