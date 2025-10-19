'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FeeCollectionReport() {
    const feeData = [
        { hostel: "Hostel A", totalStudents: 210, paidStudents: 195, totalDue: 12180000, collected: 11310000, pending: 870000, rate: 92.9 },
        { hostel: "Hostel B", totalStudents: 170, paidStudents: 165, totalDue: 10370000, collected: 10065000, pending: 305000, rate: 97.1 },
        { hostel: "Hostel C", totalStudents: 120, paidStudents: 105, totalDue: 6960000, collected: 6090000, pending: 870000, rate: 87.5 },
    ]

    const totalDue = feeData.reduce((sum, h) => sum + h.totalDue, 0)
    const totalCollected = feeData.reduce((sum, h) => sum + h.collected, 0)
    const totalPending = feeData.reduce((sum, h) => sum + h.pending, 0)
    const collectionRate = ((totalCollected / totalDue) * 100).toFixed(1)

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
                        <h1 className="text-3xl font-bold">Fee Collection Report</h1>
                        <p className="text-muted-foreground">Payment status and collection summary</p>
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
                        <p className="text-sm text-muted-foreground mb-1">Total Due</p>
                        <p className="text-2xl font-bold">₹{(totalDue / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Collected</p>
                        <p className="text-2xl font-bold text-green-600">₹{(totalCollected / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-red-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-red-600">₹{(totalPending / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Collection Rate</p>
                        <p className="text-2xl font-bold text-primary">{collectionRate}%</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Total Students</th>
                                <th className="text-left py-3 px-4">Paid Students</th>
                                <th className="text-left py-3 px-4">Total Due</th>
                                <th className="text-left py-3 px-4">Collected</th>
                                <th className="text-left py-3 px-4">Pending</th>
                                <th className="text-left py-3 px-4">Collection Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeData.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b">
                                    <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                    <td className="py-3 px-4">{hostel.totalStudents}</td>
                                    <td className="py-3 px-4">{hostel.paidStudents}</td>
                                    <td className="py-3 px-4">₹{(hostel.totalDue / 100000).toFixed(1)}L</td>
                                    <td className="py-3 px-4 text-green-600">₹{(hostel.collected / 100000).toFixed(1)}L</td>
                                    <td className="py-3 px-4 text-red-600">₹{(hostel.pending / 100000).toFixed(1)}L</td>
                                    <td className="py-3 px-4 font-semibold">{hostel.rate}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
