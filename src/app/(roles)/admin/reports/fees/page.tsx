'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, DollarSign, TrendingUp, AlertTriangle, Users } from "lucide-react"
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-2">
                                Fee Collection Report 💰
                            </h1>
                            <p className="text-muted-foreground text-lg">Payment status and collection summary</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Due</p>
                    </div>
                    <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">₹{(totalDue / 100000).toFixed(1)}L</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Collected</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">₹{(totalCollected / 100000).toFixed(1)}L</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-red-700 dark:text-red-300">Pending</p>
                    </div>
                    <p className="text-4xl font-bold text-red-600">₹{(totalPending / 100000).toFixed(1)}L</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Collection Rate</p>
                    </div>
                    <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2">{collectionRate}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${collectionRate}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Fee Collection Table */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Hostel-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Hostel</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Students</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Paid Students</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Due</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Collected</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Pending</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Collection Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeData.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{hostel.hostel}</td>
                                    <td className="py-4 px-4 font-medium">{hostel.totalStudents}</td>
                                    <td className="py-4 px-4 font-medium">{hostel.paidStudents}</td>
                                    <td className="py-4 px-4 font-medium">₹{(hostel.totalDue / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4 font-semibold text-green-600">₹{(hostel.collected / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4 font-semibold text-red-600">₹{(hostel.pending / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${hostel.rate}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-sm w-12 text-right">{hostel.rate}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
