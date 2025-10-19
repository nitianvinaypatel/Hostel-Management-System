'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WardenRequisitionsReport() {
    const requisitionsData = {
        total: 28,
        approved: 20,
        pending: 5,
        rejected: 2,
        escalated: 1,
        totalCost: 285000,
        approvedCost: 215000
    }

    const typeData = [
        { type: "Maintenance", count: 12, approved: 9, cost: 145000 },
        { type: "Supplies", count: 8, approved: 6, cost: 65000 },
        { type: "Equipment", count: 6, approved: 4, cost: 55000 },
        { type: "Other", count: 2, approved: 1, cost: 20000 },
    ]

    const monthlyData = [
        { month: "Aug", count: 22, cost: 195000 },
        { month: "Sep", count: 25, cost: 220000 },
        { month: "Oct", count: 30, cost: 275000 },
        { month: "Nov", count: 24, cost: 210000 },
        { month: "Dec", count: 26, cost: 245000 },
        { month: "Jan", count: 28, cost: 285000 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/warden/reports">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Requisitions Report</h1>
                        <p className="text-muted-foreground">Caretaker requisitions and approval status</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold">{requisitionsData.total}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{requisitionsData.approved}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{requisitionsData.pending}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-red-50">
                        <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">{requisitionsData.rejected}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-purple-50">
                        <p className="text-sm text-muted-foreground mb-1">Escalated</p>
                        <p className="text-2xl font-bold text-purple-600">{requisitionsData.escalated}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                        <p className="text-lg font-bold text-primary">₹{(requisitionsData.totalCost / 1000).toFixed(0)}K</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Type-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Type</th>
                                <th className="text-left py-3 px-4">Total Count</th>
                                <th className="text-left py-3 px-4">Approved</th>
                                <th className="text-left py-3 px-4">Total Cost</th>
                                <th className="text-left py-3 px-4">Approval Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeData.map((type) => (
                                <tr key={type.type} className="border-b">
                                    <td className="py-3 px-4 font-medium">{type.type}</td>
                                    <td className="py-3 px-4">{type.count}</td>
                                    <td className="py-3 px-4 text-green-600">{type.approved}</td>
                                    <td className="py-3 px-4">₹{(type.cost / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4 font-semibold">
                                        {((type.approved / type.count) * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Trend (Last 6 Months)</h3>
                <div className="space-y-3">
                    {monthlyData.map((month) => (
                        <div key={month.month} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">{month.month}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs text-muted-foreground">Count: {month.count}</span>
                                    <span className="text-xs font-medium">₹{(month.cost / 1000).toFixed(0)}K</span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(month.cost / 285000) * 100}%` }}
                                    >
                                        <span className="text-xs text-white font-medium">
                                            ₹{(month.cost / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
