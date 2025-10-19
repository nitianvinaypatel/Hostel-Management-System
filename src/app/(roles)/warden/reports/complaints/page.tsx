'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WardenComplaintsReport() {
    const complaintsData = {
        total: 45,
        resolved: 38,
        pending: 5,
        inProgress: 2,
        avgResolutionTime: "2.3 days"
    }

    const categoryData = [
        { category: "Maintenance", count: 18, resolved: 15, pending: 3 },
        { category: "Cleanliness", count: 12, resolved: 11, pending: 1 },
        { category: "Food Quality", count: 8, resolved: 7, pending: 1 },
        { category: "Security", count: 4, resolved: 3, pending: 1 },
        { category: "Others", count: 3, resolved: 2, pending: 1 },
    ]

    const monthlyTrend = [
        { month: "Aug", total: 52, resolved: 45 },
        { month: "Sep", total: 48, resolved: 42 },
        { month: "Oct", total: 55, resolved: 48 },
        { month: "Nov", total: 42, resolved: 38 },
        { month: "Dec", total: 38, resolved: 35 },
        { month: "Jan", total: 45, resolved: 38 },
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
                        <h1 className="text-3xl font-bold">Complaints Report</h1>
                        <p className="text-muted-foreground">Summary of complaints and resolution status</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
                <div className="grid gap-4 md:grid-cols-5">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Complaints</p>
                        <p className="text-2xl font-bold">{complaintsData.total}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                        <p className="text-2xl font-bold text-green-600">{complaintsData.resolved}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-blue-50">
                        <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">{complaintsData.inProgress}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{complaintsData.pending}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Avg Resolution</p>
                        <p className="text-lg font-bold text-primary">{complaintsData.avgResolutionTime}</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Category-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Category</th>
                                <th className="text-left py-3 px-4">Total</th>
                                <th className="text-left py-3 px-4">Resolved</th>
                                <th className="text-left py-3 px-4">Pending</th>
                                <th className="text-left py-3 px-4">Resolution Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((cat) => (
                                <tr key={cat.category} className="border-b">
                                    <td className="py-3 px-4 font-medium">{cat.category}</td>
                                    <td className="py-3 px-4">{cat.count}</td>
                                    <td className="py-3 px-4 text-green-600">{cat.resolved}</td>
                                    <td className="py-3 px-4 text-yellow-600">{cat.pending}</td>
                                    <td className="py-3 px-4 font-semibold">
                                        {((cat.resolved / cat.count) * 100).toFixed(1)}%
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
                    {monthlyTrend.map((month) => (
                        <div key={month.month} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">{month.month}</div>
                            <div className="flex-1">
                                <div className="flex gap-2 mb-1">
                                    <span className="text-xs text-muted-foreground">Total: {month.total}</span>
                                    <span className="text-xs text-green-600">Resolved: {month.resolved}</span>
                                </div>
                                <div className="flex gap-1">
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div
                                            className="bg-green-500 h-6 rounded-full"
                                            style={{ width: `${(month.resolved / month.total) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium w-12 text-right">
                                        {((month.resolved / month.total) * 100).toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
