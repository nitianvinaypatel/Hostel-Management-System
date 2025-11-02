'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, DoorOpen, AlertCircle, ClipboardList, DollarSign, Utensils, Activity, Bell, CheckCircle2, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import {
    useGetWardenDashboardStatsQuery,
    useGetWardenRecentActivitiesQuery,
    useGetWardenPendingApprovalsQuery,
} from "@/store/api/wardenApi"

export default function WardenDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())

    // Fetch dashboard data using RTK Query
    const { data: statsData, isLoading: statsLoading } = useGetWardenDashboardStatsQuery()
    const { data: activitiesData, isLoading: activitiesLoading } = useGetWardenRecentActivitiesQuery(10)
    const { data: approvalsData, isLoading: approvalsLoading } = useGetWardenPendingApprovalsQuery(5)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Extract data from API responses
    const stats = statsData?.data
    const recentActivities = activitiesData?.data || []
    const pendingApprovals = approvalsData?.data || []

    // Format currency
    const formatCurrency = (amount: number) => {
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
        return `₹${amount}`
    }

    const statCards = [
        {
            title: "Total Students",
            value: statsLoading ? "..." : stats?.totalStudents?.toString() || "0",
            icon: Users,
            change: "+5 from last week",
            href: "/warden/dashboard",
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-blue-600',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
            changeColor: 'text-green-600 dark:text-green-400'
        },
        {
            title: "Occupancy Rate",
            value: statsLoading ? "..." : `${stats?.occupancyRate?.toFixed(1) || 0}%`,
            icon: DoorOpen,
            change: "+2% from last week",
            href: "/warden/dashboard",
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-green-600',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
            changeColor: 'text-green-600 dark:text-green-400'
        },
        {
            title: "Pending Approvals",
            value: statsLoading ? "..." : stats?.pendingApprovals?.toString() || "0",
            icon: ClipboardList,
            change: "-3 from last week",
            href: "/warden/approvals",
            gradient: 'from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30',
            border: 'border-orange-200/50 dark:border-orange-800/50',
            shadow: 'hover:shadow-orange-500/20',
            iconGradient: 'from-orange-500 to-orange-600',
            iconShadow: 'shadow-orange-500/50',
            textColor: 'text-orange-700 dark:text-orange-300',
            valueColor: 'text-orange-900 dark:text-orange-100',
            changeColor: 'text-green-600 dark:text-green-400'
        },
        {
            title: "Active Complaints",
            value: statsLoading ? "..." : stats?.activeComplaints?.toString() || "0",
            icon: AlertCircle,
            change: "-5 from last week",
            href: "/warden/approvals/complaints",
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-red-600',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
            changeColor: 'text-green-600 dark:text-green-400'
        },
        {
            title: "Pending Requisitions",
            value: statsLoading ? "..." : stats?.pendingRequisitions?.toString() || "0",
            icon: ClipboardList,
            change: "+2 from last week",
            href: "/warden/requisitions",
            gradient: 'from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30',
            border: 'border-purple-200/50 dark:border-purple-800/50',
            shadow: 'hover:shadow-purple-500/20',
            iconGradient: 'from-purple-500 to-purple-600',
            iconShadow: 'shadow-purple-500/50',
            textColor: 'text-purple-700 dark:text-purple-300',
            valueColor: 'text-purple-900 dark:text-purple-100',
            changeColor: 'text-orange-600 dark:text-orange-400'
        },
        {
            title: "Outstanding Payments",
            value: statsLoading ? "..." : formatCurrency(stats?.outstandingPayments || 0),
            icon: DollarSign,
            change: "-₹50K from last week",
            href: "/warden/dashboard",
            gradient: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/30',
            border: 'border-emerald-200/50 dark:border-emerald-800/50',
            shadow: 'hover:shadow-emerald-500/20',
            iconGradient: 'from-emerald-500 to-emerald-600',
            iconShadow: 'shadow-emerald-500/50',
            textColor: 'text-emerald-700 dark:text-emerald-300',
            valueColor: 'text-emerald-900 dark:text-emerald-100',
            changeColor: 'text-green-600 dark:text-green-400'
        },
    ]

    const messRatings = stats?.messRatings || {
        overall: 0,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        totalFeedback: 0
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Warden Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Hostel A - Boys Hostel
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="text-right space-y-1">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent tabular-nums">
                            {currentTime.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">Current Time</p>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                        <p className={`text-xs font-medium ${stat.changeColor}`}>{stat.change}</p>
                    </Link>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activities */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span>Recent Activities</span>
                        </h3>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {activitiesLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : recentActivities.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No recent activities</p>
                        ) : (
                            recentActivities.map((activity, index) => (
                                <div
                                    key={activity.id || index}
                                    className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                                        <Activity className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activity.action}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-xs text-muted-foreground font-medium">
                                                {activity.student || activity.caretaker || activity.message}
                                            </p>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                <ClipboardList className="h-5 w-5 text-white" />
                            </div>
                            <span>Pending Approvals</span>
                        </h3>
                        <Link href="/warden/approvals">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {approvalsLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : pendingApprovals.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No pending approvals</p>
                        ) : (
                            pendingApprovals.map((approval, index) => (
                                <div key={approval.id || index} className="group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <span className="px-2.5 py-1 rounded-full text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700 font-semibold">
                                                {approval.type}
                                            </span>
                                            <p className="font-semibold mt-2 text-gray-900 dark:text-gray-100">{approval.student}</p>
                                            <p className="text-xs text-muted-foreground font-medium mt-1 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Submitted: {new Date(approval.submitted).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Mess Ratings */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                            <Utensils className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">Mess Ratings</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/50 dark:border-amber-800/50">
                            <span className="text-sm font-semibold dark:text-white">Overall Rating</span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">★ {messRatings.overall}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50">
                                <p className="text-xs text-muted-foreground font-medium mb-1">Breakfast</p>
                                <p className="text-xl font-bold text-blue-900 dark:text-blue-100">★ {messRatings.breakfast}</p>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
                                <p className="text-xs text-muted-foreground font-medium mb-1">Lunch</p>
                                <p className="text-xl font-bold text-green-900 dark:text-green-100">★ {messRatings.lunch}</p>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50">
                                <p className="text-xs text-muted-foreground font-medium mb-1">Dinner</p>
                                <p className="text-xl font-bold text-purple-900 dark:text-purple-100">★ {messRatings.dinner}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center pt-2 font-medium">
                            Based on {messRatings.totalFeedback} feedback responses
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Bell className="h-5 w-5 text-white" />
                        </div>
                        <span>Quick Actions</span>
                    </h3>
                    <div className="space-y-3">
                        <Link href="/warden/approvals">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Review Pending Approvals</p>
                                        <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                                            {stats?.pendingApprovals || 0} items awaiting review
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/warden/announcements">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                                        <Bell className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-green-900 dark:text-green-100">Send Announcement</p>
                                        <p className="text-xs text-green-700 dark:text-green-400 font-medium">Broadcast to all students</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/warden/approvals/complaints">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                        <AlertCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-orange-900 dark:text-orange-100">View Complaints</p>
                                        <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">
                                            {stats?.activeComplaints || 0} active complaints
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/warden/reports">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                        <ClipboardList className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-purple-900 dark:text-purple-100">Generate Report</p>
                                        <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">View analytics & insights</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
