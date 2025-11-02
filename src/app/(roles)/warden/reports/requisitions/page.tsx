'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, ClipboardList, CheckCircle, Clock, XCircle, ArrowUp, TrendingUp, DollarSign } from "lucide-react"
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/warden/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                                Requisitions Report
                            </h1>
                            <p className="text-muted-foreground text-lg">Caretaker requisitions and approval status</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950/50 dark:to-gray-900/30 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <ClipboardList className="h-4 w-4 text-gray-600" />
                        <p className="text-sm font-semibold text-muted-foreground">Total</p>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{requisitionsData.total}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Approved</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{requisitionsData.approved}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/30 backdrop-blur-xl border border-yellow-200/50 dark:border-yellow-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Pending</p>
                    </div>
                    <p className="text-4xl font-bold text-yellow-600">{requisitionsData.pending}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <p className="text-sm font-semibold text-red-700 dark:text-red-300">Rejected</p>
                    </div>
                    <p className="text-4xl font-bold text-red-600">{requisitionsData.rejected}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <ArrowUp className="h-4 w-4 text-purple-600" />
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Escalated</p>
                    </div>
                    <p className="text-4xl font-bold text-purple-600">{requisitionsData.escalated}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Cost</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">₹{(requisitionsData.totalCost / 1000).toFixed(0)}K</p>
                </div>
            </div>

            {/* Type-wise Breakdown */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Type-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Type</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Count</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Approved</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Cost</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Approval Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeData.map((type) => (
                                <tr key={type.type} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{type.type}</td>
                                    <td className="py-4 px-4 font-medium">{type.count}</td>
                                    <td className="py-4 px-4 font-semibold text-green-600">{type.approved}</td>
                                    <td className="py-4 px-4 font-medium">₹{(type.cost / 1000).toFixed(0)}K</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${(type.approved / type.count) * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-sm w-12 text-right">{((type.approved / type.count) * 100).toFixed(1)}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span>Monthly Trend (Last 6 Months)</span>
                </h3>
                <div className="space-y-4">
                    {monthlyData.map((month) => (
                        <div key={month.month} className="group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-16 text-sm font-bold text-gray-900 dark:text-gray-100">{month.month}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs font-semibold text-muted-foreground">Count: {month.count}</span>
                                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">₹{(month.cost / 1000).toFixed(0)}K</span>
                                    </div>
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-7 relative overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-7 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                            style={{ width: `${(month.cost / 285000) * 100}%` }}
                                        >
                                            <span className="text-xs font-bold text-white">
                                                ₹{(month.cost / 1000).toFixed(0)}K
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
