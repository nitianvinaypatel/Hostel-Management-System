'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-rose-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-red-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/warden/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent mb-2">
                                Complaints Report 📋
                            </h1>
                            <p className="text-muted-foreground text-lg">Summary of complaints and resolution status</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg shadow-red-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-5">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950/50 dark:to-gray-900/30 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Total Complaints</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{complaintsData.total}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Resolved</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{complaintsData.resolved}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">In Progress</p>
                    </div>
                    <p className="text-4xl font-bold text-blue-600">{complaintsData.inProgress}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/30 backdrop-blur-xl border border-yellow-200/50 dark:border-yellow-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Pending</p>
                    </div>
                    <p className="text-4xl font-bold text-yellow-600">{complaintsData.pending}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Avg Resolution</p>
                    <p className="text-2xl font-bold text-purple-600">{complaintsData.avgResolutionTime}</p>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Category-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Category</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Resolved</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Pending</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Resolution Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((cat) => (
                                <tr key={cat.category} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-gray-100">{cat.category}</td>
                                    <td className="py-4 px-4 font-medium">{cat.count}</td>
                                    <td className="py-4 px-4 font-semibold text-green-600">{cat.resolved}</td>
                                    <td className="py-4 px-4 font-semibold text-yellow-600">{cat.pending}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                                                    style={{ width: `${(cat.resolved / cat.count) * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-sm w-12 text-right">{((cat.resolved / cat.count) * 100).toFixed(1)}%</span>
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
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span>Monthly Trend (Last 6 Months)</span>
                </h3>
                <div className="space-y-4">
                    {monthlyTrend.map((month) => (
                        <div key={month.month} className="group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-16 text-sm font-bold text-gray-900 dark:text-gray-100">{month.month}</div>
                                <div className="flex-1">
                                    <div className="flex gap-4 mb-2">
                                        <span className="text-xs font-semibold text-muted-foreground">Total: {month.total}</span>
                                        <span className="text-xs font-semibold text-green-600">Resolved: {month.resolved}</span>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-7 relative overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-green-500 to-green-600 h-7 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                                style={{ width: `${(month.resolved / month.total) * 100}%` }}
                                            >
                                                <span className="text-xs font-bold text-white">
                                                    {month.resolved}/{month.total}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold w-14 text-right text-gray-900 dark:text-gray-100">
                                            {((month.resolved / month.total) * 100).toFixed(0)}%
                                        </span>
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
