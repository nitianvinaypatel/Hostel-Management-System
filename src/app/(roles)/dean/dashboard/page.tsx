'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    TrendingUp,
    AlertTriangle,
    Users,
    Building,
    RefreshCw,
    Activity
} from "lucide-react"
import Link from "next/link"

export default function DeanDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const stats = {
        pendingRequisitions: 3,
        approvedThisMonth: 12,
        rejectedThisMonth: 2,
        totalBudget: 4500000,
        budgetSpent: 3200000,
        budgetUtilization: 71.1,
        urgentRequisitions: 1,
        totalHostels: 4
    }

    const recentRequisitions = [
        {
            id: "REQ047",
            requisitionNumber: "REQ-2024-047",
            hostel: "Hostel C",
            title: "Emergency Plumbing Repair",
            estimatedCost: 35000,
            urgency: "urgent",
            submittedAt: "2024-01-13"
        },
        {
            id: "REQ045",
            requisitionNumber: "REQ-2024-045",
            hostel: "Hostel A",
            title: "Electrical Wiring Upgrade - Block A",
            estimatedCost: 85000,
            urgency: "high",
            submittedAt: "2024-01-10"
        },
        {
            id: "REQ046",
            requisitionNumber: "REQ-2024-046",
            hostel: "Hostel B",
            title: "Water Purifier Installation",
            estimatedCost: 45000,
            urgency: "medium",
            submittedAt: "2024-01-12"
        }
    ]

    const hostelOverview = [
        { hostel: "Hostel A", budget: 500000, spent: 385000, pending: 2 },
        { hostel: "Hostel B", budget: 450000, spent: 320000, pending: 1 },
        { hostel: "Hostel C", budget: 400000, spent: 280000, pending: 1 },
        { hostel: "Hostel D", budget: 550000, spent: 425000, pending: 0 }
    ]

    const statCards = [
        {
            title: 'Pending Approval',
            value: stats.pendingRequisitions.toString(),
            icon: Clock,
            href: '/dean/requisitions/pending',
            gradient: 'from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30',
            border: 'border-orange-200/50 dark:border-orange-800/50',
            shadow: 'hover:shadow-orange-500/20',
            iconGradient: 'from-orange-500 to-orange-600',
            iconShadow: 'shadow-orange-500/50',
            textColor: 'text-orange-700 dark:text-orange-300',
            valueColor: 'text-orange-900 dark:text-orange-100',
        },
        {
            title: 'Approved This Month',
            value: stats.approvedThisMonth.toString(),
            icon: CheckCircle,
            href: '/dean/requisitions/approved',
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-green-600',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
        },
        {
            title: 'Rejected This Month',
            value: stats.rejectedThisMonth.toString(),
            icon: XCircle,
            href: '/dean/requisitions/rejected',
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-red-600',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
        },
        {
            title: 'Total Hostels',
            value: stats.totalHostels.toString(),
            icon: Building,
            href: '/dean/reports',
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-blue-600',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
        },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 dark:from-purple-500/20 dark:via-indigo-500/20 dark:to-blue-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Dean Dashboard 🎓
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right space-y-1">
                            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent tabular-nums">
                                {currentTime.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">Current Time</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                </div>
            </div>

            {/* Urgent Alert */}
            {stats.urgentRequisitions > 0 && (
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border-2 border-red-300 dark:border-red-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
                            <AlertTriangle className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-red-900 dark:text-red-100 text-lg">
                                {stats.urgentRequisitions} Urgent Requisition{stats.urgentRequisitions > 1 ? 's' : ''} Awaiting Approval
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300 font-medium">Immediate attention required</p>
                        </div>
                        <Link href="/dean/requisitions/pending">
                            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/50">
                                Review Now
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Stats Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Link
                        key={stat.title}
                        href={stat.href}
                        className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border ${stat.border} rounded-2xl p-6 hover:shadow-2xl ${stat.shadow} hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} group-hover:opacity-80 transition-all duration-300`} />
                        <div className="relative flex items-center justify-between mb-4">
                            <h3 className={`text-sm font-semibold ${stat.textColor}`}>{stat.title}</h3>
                            <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${stat.iconGradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${stat.iconShadow}`}>
                                <stat.icon className="h-7 w-7 text-white" />
                            </div>
                        </div>
                        <p className={`text-4xl font-bold mb-2 ${stat.valueColor}`}>{stat.value}</p>
                    </Link>
                ))}
            </div>

            {/* Budget Overview Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                                <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <span>Budget Overview</span>
                        </h3>
                        <Link href="/dean/funds/usage">
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 rounded-xl">
                                <p className="text-xs text-muted-foreground mb-1 font-medium">Total Budget</p>
                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">₹{(stats.totalBudget / 100000).toFixed(1)}L</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/30 border border-orange-200/50 dark:border-orange-800/50 rounded-xl">
                                <p className="text-xs text-muted-foreground mb-1 font-medium">Spent</p>
                                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">₹{(stats.budgetSpent / 100000).toFixed(1)}L</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold dark:text-white">Budget Utilization</span>
                                <span className="text-sm font-bold text-primary">{stats.budgetUtilization}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-3 rounded-full transition-all duration-500 ${stats.budgetUtilization > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                        stats.budgetUtilization > 75 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                            'bg-gradient-to-r from-green-500 to-green-600'}`}
                                    style={{ width: `${stats.budgetUtilization}%` }}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shadow-green-500/50">
                                    <TrendingUp className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-muted-foreground font-medium">
                                    Available: <span className="font-bold text-green-600 dark:text-green-400">₹{((stats.totalBudget - stats.budgetSpent) / 100000).toFixed(1)}L</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                <Building className="h-5 w-5 text-white" />
                            </div>
                            <span>Hostel Budget Status</span>
                        </h3>
                        <Link href="/dean/funds/budget">
                            <Button variant="outline" size="sm">
                                Manage Budget
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {hostelOverview.map((hostel) => {
                            const utilization = ((hostel.spent / hostel.budget) * 100).toFixed(1)
                            return (
                                <div key={hostel.hostel} className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:shadow-md transition-all duration-300">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold dark:text-white">{hostel.hostel}</span>
                                        <div className="flex items-center gap-2">
                                            {hostel.pending > 0 && (
                                                <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-semibold">
                                                    {hostel.pending} pending
                                                </span>
                                            )}
                                            <span className="text-sm font-bold dark:text-white">{utilization}%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
                                        <span>₹{(hostel.spent / 1000).toFixed(0)}K spent</span>
                                        <span>₹{(hostel.budget / 1000).toFixed(0)}K total</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${parseFloat(utilization) > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                                parseFloat(utilization) > 75 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                                    'bg-gradient-to-r from-green-500 to-green-600'}`}
                                            style={{ width: `${utilization}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Requisitions */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <span>Recent Requisitions Awaiting Approval</span>
                    </h3>
                    <Link href="/dean/requisitions/pending">
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentRequisitions.map((req) => (
                        <div
                            key={req.id}
                            className={`group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.02] ${req.urgency === 'urgent'
                                ? 'border-red-300 dark:border-red-700 border-2'
                                : 'border-transparent hover:border-primary/30'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="font-mono text-xs font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{req.requisitionNumber}</span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${req.urgency === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                            req.urgency === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
                                            }`}>
                                            {req.urgency}
                                        </span>
                                        {req.urgency === 'urgent' && (
                                            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 animate-pulse" />
                                        )}
                                    </div>
                                    <p className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{req.title}</p>
                                    <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                                        <span className="flex items-center gap-1">
                                            <Building className="h-3 w-3" />
                                            {req.hostel}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3" />
                                            ₹{req.estimatedCost.toLocaleString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(req.submittedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <Link href="/dean/requisitions/pending">
                                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all">
                                        Review
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/dean/reports/financial">
                    <div className="group flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 text-blue-900 dark:text-blue-100">Financial Reports</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">View comprehensive financial summaries</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dean/announcements">
                    <div className="group flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 text-purple-900 dark:text-purple-100">Announcements</h3>
                            <p className="text-sm text-purple-700 dark:text-purple-400 font-medium">Send notices to hostels and staff</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dean/feedback">
                    <div className="group flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50 group-hover:scale-110 transition-transform">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 text-green-900 dark:text-green-100">Feedback & Comments</h3>
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium">Provide feedback on major issues</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
