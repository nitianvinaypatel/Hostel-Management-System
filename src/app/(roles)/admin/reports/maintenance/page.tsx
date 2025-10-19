'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MaintenanceReport() {
    const maintenanceData = [
        { hostel: "Hostel A", electrical: 45000, plumbing: 32000, carpentry: 18000, painting: 25000, others: 15000, total: 135000 },
        { hostel: "Hostel B", electrical: 38000, plumbing: 28000, carpentry: 15000, painting: 20000, others: 12000, total: 113000 },
        { hostel: "Hostel C", electrical: 42000, plumbing: 35000, carpentry: 22000, painting: 18000, others: 10000, total: 127000 },
    ]

    const monthlyTrend = [
        { month: "Jul", amount: 95000 },
        { month: "Aug", amount: 112000 },
        { month: "Sep", amount: 88000 },
        { month: "Oct", amount: 125000 },
        { month: "Nov", amount: 98000 },
        { month: "Dec", amount: 107000 },
    ]

    const totalCost = maintenanceData.reduce((sum, h) => sum + h.total, 0)
    const avgCostPerHostel = (totalCost / maintenanceData.length).toFixed(0)

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
                        <h1 className="text-3xl font-bold">Maintenance Costs Report</h1>
                        <p className="text-muted-foreground">Breakdown of maintenance expenses</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Maintenance Cost</p>
                        <p className="text-2xl font-bold">₹{(totalCost / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Avg Cost per Hostel</p>
                        <p className="text-2xl font-bold">₹{(Number(avgCostPerHostel) / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Hostels</p>
                        <p className="text-2xl font-bold">{maintenanceData.length}</p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-4">Cost Breakdown by Hostel</h3>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Electrical</th>
                                <th className="text-left py-3 px-4">Plumbing</th>
                                <th className="text-left py-3 px-4">Carpentry</th>
                                <th className="text-left py-3 px-4">Painting</th>
                                <th className="text-left py-3 px-4">Others</th>
                                <th className="text-left py-3 px-4">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceData.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b">
                                    <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                    <td className="py-3 px-4">₹{(hostel.electrical / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4">₹{(hostel.plumbing / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4">₹{(hostel.carpentry / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4">₹{(hostel.painting / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4">₹{(hostel.others / 1000).toFixed(0)}K</td>
                                    <td className="py-3 px-4 font-bold">₹{(hostel.total / 1000).toFixed(0)}K</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-lg font-semibold mb-4">Monthly Trend (Last 6 Months)</h3>
                <div className="space-y-3">
                    {monthlyTrend.map((month) => (
                        <div key={month.month} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">{month.month}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                                <div
                                    className="bg-primary h-8 rounded-full flex items-center justify-end pr-3"
                                    style={{ width: `${(month.amount / 125000) * 100}%` }}
                                >
                                    <span className="text-xs text-white font-medium">₹{(month.amount / 1000).toFixed(0)}K</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
