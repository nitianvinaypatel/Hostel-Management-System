'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function FinancialSummary() {
    const summary = {
        totalBudget: 4500000,
        totalSpent: 3200000,
        totalPending: 450000,
        totalAvailable: 850000,
        utilizationRate: 71.1
    }

    const hostelWise = [
        { hostel: "Hostel A", allocated: 500000, spent: 385000, pending: 65000, available: 50000 },
        { hostel: "Hostel B", allocated: 450000, spent: 320000, pending: 45000, available: 85000 },
        { hostel: "Hostel C", allocated: 400000, spent: 280000, pending: 35000, available: 85000 },
        { hostel: "Hostel D", allocated: 550000, spent: 425000, pending: 75000, available: 50000 },
    ]

    const categoryWise = [
        { category: "Maintenance", allocated: 1200000, spent: 950000 },
        { category: "Upgrades", allocated: 800000, spent: 580000 },
        { category: "Equipment", allocated: 600000, spent: 450000 },
        { category: "Supplies", allocated: 400000, spent: 320000 },
        { category: "Emergency", allocated: 500000, spent: 125000 },
    ]

    const quarterlyTrend = [
        { quarter: "Q1 2024", budget: 3800000, spent: 2650000, rate: 69.7 },
        { quarter: "Q2 2024", budget: 4000000, spent: 2800000, rate: 70.0 },
        { quarter: "Q3 2024", budget: 4200000, spent: 2950000, rate: 70.2 },
        { quarter: "Q4 2024", budget: 4500000, spent: 3200000, rate: 71.1 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dean/reports">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Financial Summary Report</h1>
                        <p className="text-muted-foreground">Comprehensive financial overview</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Financial Status</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                        <p className="text-2xl font-bold">₹{(summary.totalBudget / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-orange-50">
                        <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                        <p className="text-2xl font-bold text-orange-600">₹{(summary.totalSpent / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">₹{(summary.totalPending / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Available</p>
                        <p className="text-2xl font-bold text-green-600">₹{(summary.totalAvailable / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Utilization</p>
                        <p className="text-2xl font-bold text-primary">{summary.utilizationRate}%</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hostel-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Allocated</th>
                                <th className="text-left py-3 px-4">Spent</th>
                                <th className="text-left py-3 px-4">Pending</th>
                                <th className="text-left py-3 px-4">Available</th>
                                <th className="text-left py-3 px-4">Utilization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostelWise.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b">
                                    <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                    <td className="py-3 px-4">₹{(hostel.allocated / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4 text-orange-600">₹{(hostel.spent / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4 text-yellow-600">₹{(hostel.pending / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4 text-green-600">₹{(hostel.available / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4 font-semibold">
                                        {((hostel.spent / hostel.allocated) * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Category-wise Breakdown</h3>
                    <div className="space-y-3">
                        {categoryWise.map((cat) => (
                            <div key={cat.category}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{cat.category}</span>
                                    <span className="text-sm text-muted-foreground">
                                        ₹{(cat.spent / 1000).toFixed(0)}K / ₹{(cat.allocated / 1000).toFixed(0)}K
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(cat.spent / cat.allocated) * 100}%` }}
                                    >
                                        <span className="text-xs text-white font-medium">
                                            {((cat.spent / cat.allocated) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quarterly Trend</h3>
                    <div className="space-y-4">
                        {quarterlyTrend.map((quarter) => (
                            <div key={quarter.quarter} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{quarter.quarter}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">{quarter.rate}%</span>
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Budget: </span>
                                        <span className="font-medium">₹{(quarter.budget / 100000).toFixed(1)}L</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Spent: </span>
                                        <span className="font-medium text-orange-600">₹{(quarter.spent / 100000).toFixed(1)}L</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
