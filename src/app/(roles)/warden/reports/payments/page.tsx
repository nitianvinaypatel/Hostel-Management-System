'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react"
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/warden/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-2">
                                Payments Report 💰
                            </h1>
                            <p className="text-muted-foreground text-lg">Fee collection and outstanding payments</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Due</p>
                    </div>
                    <p className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">₹{(paymentsData.totalDue / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground font-medium">{paymentsData.totalStudents} students</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Collected</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600 mb-2">₹{(paymentsData.collected / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground font-medium">{paymentsData.paidStudents} students</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-red-700 dark:text-red-300">Pending</p>
                    </div>
                    <p className="text-4xl font-bold text-red-600 mb-2">₹{(paymentsData.pending / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground font-medium">{paymentsData.totalStudents - paymentsData.paidStudents} students</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Collection Rate</p>
                    </div>
                    <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2">{paymentsData.collectionRate}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${paymentsData.collectionRate}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Fee Type Breakdown */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Fee Type Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Fee Type</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Due</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Collected</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Pending</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Collection Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeBreakdown.map((fee) => (
                                <tr key={fee.type} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{fee.type}</td>
                                    <td className="py-4 px-4 font-medium">₹{(fee.due / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4 font-semibold text-green-600">₹{(fee.collected / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4 font-semibold text-red-600">₹{(fee.pending / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${(fee.collected / fee.due) * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-sm w-12 text-right">{((fee.collected / fee.due) * 100).toFixed(1)}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Monthly Collection */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span>Monthly Collection (Last 6 Months)</span>
                    </h3>
                    <div className="space-y-4">
                        {monthlyCollection.map((month) => (
                            <div key={month.month} className="group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 text-sm font-bold text-gray-900 dark:text-gray-100">{month.month}</div>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-7 relative overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-7 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                            style={{ width: `${(month.collected / 1950000) * 100}%` }}
                                        >
                                            <span className="text-xs font-bold text-white">
                                                ₹{(month.collected / 100000).toFixed(1)}L
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Defaulters */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <span>Payment Defaulters</span>
                    </h3>
                    <div className="space-y-3">
                        {defaulters.map((defaulter) => (
                            <div key={defaulter.studentId} className="group p-4 rounded-xl bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200/50 dark:border-red-800/50 hover:shadow-lg transition-all duration-300">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-gray-100">{defaulter.name}</p>
                                        <p className="text-sm text-muted-foreground font-medium">{defaulter.studentId}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700">
                                        {defaulter.days} days overdue
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Amount Due:</span>
                                        <span className="font-bold text-red-600">₹{defaulter.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Due Date:</span>
                                        <span className="font-medium">{new Date(defaulter.dueDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
