'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

export default function FundUsage() {
    const overallFunds = {
        totalAllocated: 4500000,
        totalSpent: 3200000,
        totalPending: 450000,
        totalAvailable: 850000,
        utilizationRate: 71.1
    }

    const hostelFunds = [
        {
            hostel: "Hostel A",
            allocated: 500000,
            spent: 385000,
            pending: 65000,
            available: 50000,
            requisitionsTotal: 12,
            requisitionsApproved: 9,
            requisitionsCompleted: 8
        },
        {
            hostel: "Hostel B",
            allocated: 450000,
            spent: 320000,
            pending: 45000,
            available: 85000,
            requisitionsTotal: 10,
            requisitionsApproved: 8,
            requisitionsCompleted: 7
        },
        {
            hostel: "Hostel C",
            allocated: 400000,
            spent: 280000,
            pending: 35000,
            available: 85000,
            requisitionsTotal: 8,
            requisitionsApproved: 6,
            requisitionsCompleted: 5
        },
        {
            hostel: "Hostel D",
            allocated: 550000,
            spent: 425000,
            pending: 75000,
            available: 50000,
            requisitionsTotal: 14,
            requisitionsApproved: 11,
            requisitionsCompleted: 9
        },
    ]

    const monthlyTrend = [
        { month: "Aug", allocated: 3800000, spent: 2650000 },
        { month: "Sep", allocated: 4000000, spent: 2800000 },
        { month: "Oct", allocated: 4200000, spent: 2950000 },
        { month: "Nov", allocated: 4300000, spent: 3050000 },
        { month: "Dec", allocated: 4400000, spent: 3150000 },
        { month: "Jan", allocated: 4500000, spent: 3200000 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Fund Usage Monitoring</h1>
                    <p className="text-muted-foreground">Track hostel fund allocation and utilization</p>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Fund Status</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Allocated</p>
                        <p className="text-2xl font-bold">₹{(overallFunds.totalAllocated / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-orange-50">
                        <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                        <p className="text-2xl font-bold text-orange-600">₹{(overallFunds.totalSpent / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">₹{(overallFunds.totalPending / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Available</p>
                        <p className="text-2xl font-bold text-green-600">₹{(overallFunds.totalAvailable / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Utilization Rate</p>
                        <p className="text-2xl font-bold text-primary">{overallFunds.utilizationRate}%</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hostel-wise Fund Breakdown</h3>
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
                                <th className="text-left py-3 px-4">Requisitions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostelFunds.map((hostel) => {
                                const utilization = ((hostel.spent / hostel.allocated) * 100).toFixed(1)
                                return (
                                    <tr key={hostel.hostel} className="border-b hover:bg-accent/50">
                                        <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                        <td className="py-3 px-4">₹{(hostel.allocated / 1000).toFixed(0)}K</td>
                                        <td className="py-3 px-4 text-orange-600">₹{(hostel.spent / 1000).toFixed(0)}K</td>
                                        <td className="py-3 px-4 text-yellow-600">₹{(hostel.pending / 1000).toFixed(0)}K</td>
                                        <td className="py-3 px-4 text-green-600">₹{(hostel.available / 1000).toFixed(0)}K</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{utilization}%</span>
                                                {parseFloat(utilization) > 80 ? (
                                                    <TrendingUp className="h-4 w-4 text-red-600" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-green-600" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm">
                                                <span className="text-muted-foreground">Total: </span>
                                                <span className="font-medium">{hostel.requisitionsTotal}</span>
                                                <span className="text-muted-foreground"> | Approved: </span>
                                                <span className="font-medium text-green-600">{hostel.requisitionsApproved}</span>
                                                <span className="text-muted-foreground"> | Done: </span>
                                                <span className="font-medium text-blue-600">{hostel.requisitionsCompleted}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Fund Trend (Last 6 Months)</h3>
                <div className="space-y-3">
                    {monthlyTrend.map((month) => (
                        <div key={month.month} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">{month.month}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1 text-sm">
                                    <span className="text-muted-foreground">Allocated: ₹{(month.allocated / 100000).toFixed(1)}L</span>
                                    <span className="text-orange-600">Spent: ₹{(month.spent / 100000).toFixed(1)}L</span>
                                </div>
                                <div className="relative w-full bg-gray-200 rounded-full h-6">
                                    <div
                                        className="absolute bg-orange-500 h-6 rounded-full"
                                        style={{ width: `${(month.spent / month.allocated) * 100}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white">
                                            {((month.spent / month.allocated) * 100).toFixed(1)}%
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
