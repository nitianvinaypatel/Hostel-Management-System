'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WardenPaymentsReport() {
    const paymentsData = {
        totalStudents: 210,
        paidStudents: 195,
        totalDue: 12180000,
        collected: 11310000,
        pending: 870000,
        collectionRate: 92.9
    }

    const feeBreakdown = [
        { type: "Hostel Fee", due: 5250000, collected: 4875000, pending: 375000 },
        { type: "Mess Fee", due: 3780000, collected: 3528000, pending: 252000 },
        { type: "Security Deposit", due: 2100000, collected: 2100000, pending: 0 },
        { type: "Maintenance Fee", due: 1050000, collected: 807000, pending: 243000 },
    ]

    const monthlyCollection = [
        { month: "Aug", collected: 1850000 },
        { month: "Sep", collected: 1920000 },
        { month: "Oct", collected: 1780000 },
        { month: "Nov", collected: 1950000 },
        { month: "Dec", collected: 1890000 },
        { month: "Jan", collected: 1920000 },
    ]

    const defaulters = [
        { studentId: "S045", name: "John Doe", amount: 58000, dueDate: "2024-01-10", days: 5 },
        { studentId: "S078", name: "Jane Smith", amount: 58000, dueDate: "2024-01-12", days: 3 },
        { studentId: "S112", name: "Mike Johnson", amount: 29000, dueDate: "2024-01-08", days: 7 },
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
                        <h1 className="text-3xl font-bold">Payments Report</h1>
                        <p className="text-muted-foreground">Fee collection and outstanding payments</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Due</p>
                        <p className="text-2xl font-bold">₹{(paymentsData.totalDue / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-muted-foreground mt-1">{paymentsData.totalStudents} students</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Collected</p>
                        <p className="text-2xl font-bold text-green-600">₹{(paymentsData.collected / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-muted-foreground mt-1">{paymentsData.paidStudents} students</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-red-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-red-600">₹{(paymentsData.pending / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-muted-foreground mt-1">{paymentsData.totalStudents - paymentsData.paidStudents} students</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Collection Rate</p>
                        <p className="text-2xl font-bold text-primary">{paymentsData.collectionRate}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${paymentsData.collectionRate}%` }}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Fee Type Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Fee Type</th>
                                <th className="text-left py-3 px-4">Total Due</th>
                                <th className="text-left py-3 px-4">Collected</th>
                                <th className="text-left py-3 px-4">Pending</th>
                                <th className="text-left py-3 px-4">Collection Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeBreakdown.map((fee) => (
                                <tr key={fee.type} className="border-b">
                                    <td className="py-3 px-4 font-medium">{fee.type}</td>
                                    <td className="py-3 px-4">₹{(fee.due / 100000).toFixed(1)}L</td>
                                    <td className="py-3 px-4 text-green-600">₹{(fee.collected / 100000).toFixed(1)}L</td>
                                    <td className="py-3 px-4 text-red-600">₹{(fee.pending / 100000).toFixed(1)}L</td>
                                    <td className="py-3 px-4 font-semibold">
                                        {((fee.collected / fee.due) * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Monthly Collection (Last 6 Months)</h3>
                    <div className="space-y-3">
                        {monthlyCollection.map((month) => (
                            <div key={month.month} className="flex items-center gap-4">
                                <div className="w-16 text-sm font-medium">{month.month}</div>
                                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(month.collected / 1950000) * 100}%` }}
                                    >
                                        <span className="text-xs text-white font-medium">
                                            ₹{(month.collected / 100000).toFixed(1)}L
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Defaulters</h3>
                    <div className="space-y-3">
                        {defaulters.map((defaulter) => (
                            <div key={defaulter.studentId} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold">{defaulter.name}</p>
                                        <p className="text-sm text-muted-foreground">{defaulter.studentId}</p>
                                    </div>
                                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                        {defaulter.days} days overdue
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Amount Due:</span>
                                    <span className="font-semibold text-red-600">₹{defaulter.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Due Date:</span>
                                    <span>{new Date(defaulter.dueDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
