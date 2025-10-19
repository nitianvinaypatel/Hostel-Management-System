'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComplaintsReport() {
    const complaintsData = [
        { hostel: "Hostel A", total: 45, resolved: 38, pending: 5, inProgress: 2, avgResolutionTime: "2.3 days" },
        { hostel: "Hostel B", total: 32, resolved: 28, pending: 3, inProgress: 1, avgResolutionTime: "1.8 days" },
        { hostel: "Hostel C", total: 28, resolved: 20, pending: 6, inProgress: 2, avgResolutionTime: "3.1 days" },
    ]

    const categoryData = [
        { category: "Maintenance", count: 42, percentage: 40 },
        { category: "Cleanliness", count: 28, percentage: 27 },
        { category: "Food Quality", count: 18, percentage: 17 },
        { category: "Security", count: 10, percentage: 10 },
        { category: "Others", count: 7, percentage: 6 },
    ]

    const totalComplaints = complaintsData.reduce((sum, h) => sum + h.total, 0)
    const totalResolved = complaintsData.reduce((sum, h) => sum + h.resolved, 0)
    const totalPending = complaintsData.reduce((sum, h) => sum + h.pending, 0)
    const resolutionRate = ((totalResolved / totalComplaints) * 100).toFixed(1)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/reports">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Complaints Summary Report</h1>
                        <p className="text-muted-foreground">Overview of complaints and resolution status</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Complaints</p>
                        <p className="text-2xl font-bold">{totalComplaints}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                        <p className="text-2xl font-bold text-green-600">{totalResolved}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{totalPending}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Resolution Rate</p>
                        <p className="text-2xl font-bold text-primary">{resolutionRate}%</p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-4">Hostel-wise Breakdown</h3>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Total</th>
                                <th className="text-left py-3 px-4">Resolved</th>
                                <th className="text-left py-3 px-4">In Progress</th>
                                <th className="text-left py-3 px-4">Pending</th>
                                <th className="text-left py-3 px-4">Avg Resolution Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaintsData.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b">
                                    <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                    <td className="py-3 px-4">{hostel.total}</td>
                                    <td className="py-3 px-4 text-green-600">{hostel.resolved}</td>
                                    <td className="py-3 px-4 text-blue-600">{hostel.inProgress}</td>
                                    <td className="py-3 px-4 text-yellow-600">{hostel.pending}</td>
                                    <td className="py-3 px-4">{hostel.avgResolutionTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-lg font-semibold mb-4">Complaints by Category</h3>
                <div className="space-y-3">
                    {categoryData.map((cat) => (
                        <div key={cat.category} className="flex items-center gap-4">
                            <div className="w-32 text-sm font-medium">{cat.category}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                <div
                                    className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                                    style={{ width: `${cat.percentage}%` }}
                                >
                                    <span className="text-xs text-white font-medium">{cat.count}</span>
                                </div>
                            </div>
                            <div className="w-16 text-sm text-muted-foreground text-right">{cat.percentage}%</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
