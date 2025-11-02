'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Building2,
    Users,
    AlertCircle,
    ClipboardList,
    DoorOpen,
    CheckCircle2,
    Bed,
    XCircle,
    Clock,
    Loader2
} from "lucide-react"
import { useGetCaretakerDashboardQuery } from "@/store/api/caretakerApi"

export default function CaretakerDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const { data: dashboardData, isLoading, error } = useGetCaretakerDashboardQuery()

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Extract stats from API response or use defaults
    const stats = dashboardData?.data?.stats ? {
        totalRooms: dashboardData.data.stats.totalRooms || 0,
        occupiedRooms: dashboardData.data.stats.occupiedRooms || 0,
        availableRooms: dashboardData.data.stats.availableRooms || 0,
        pendingComplaints: dashboardData.data.stats.pendingComplaints || 0,
        urgentComplaints: dashboardData.data.stats.urgentComplaints || 0,
        pendingRequests: dashboardData.data.stats.pendingRequests || 0,
        resolvedToday: dashboardData.data.stats.resolvedToday || 0,
        occupancyRate: Math.round(dashboardData.data.stats.occupancyRate || 0)
    } : {
        totalRooms: 0,
        occupiedRooms: 0,
        availableRooms: 0,
        pendingComplaints: 0,
        urgentComplaints: 0,
        pendingRequests: 0,
        resolvedToday: 0,
        occupancyRate: 0
    }

    // Extract recent activities from API response
    const recentActivities = dashboardData?.data?.recentActivities || []

    // Map activity types to icons
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'allocation':
            case 'room_allocation':
                return DoorOpen
            case 'resolved':
            case 'complaint_resolved':
                return CheckCircle2
            case 'requisition':
            case 'requisition_approved':
                return ClipboardList
            case 'complaint':
            case 'new_complaint':
                return AlertCircle
            case 'request':
                return ClipboardList
            default:
                return Clock
        }
    }

    // Format time ago
    const formatTimeAgo = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInMs = now.getTime() - date.getTime()
        const diffInMinutes = Math.floor(diffInMs / 60000)
        const diffInHours = Math.floor(diffInMs / 3600000)
        const diffInDays = Math.floor(diffInMs / 86400000)

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
        } else {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
        }
    }

    const statCards = [
        {
            title: 'Total Rooms',
            value: stats.totalRooms.toString(),
            icon: Building2,
            href: '/caretaker/room-management',
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-blue-600',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
        },
        {
            title: 'Occupied Rooms',
            value: stats.occupiedRooms.toString(),
            icon: Bed,
            href: '/caretaker/room-management',
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-green-600',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
        },
        {
            title: 'Available Rooms',
            value: stats.availableRooms.toString(),
            icon: DoorOpen,
            href: '/caretaker/room-management',
            gradient: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/30',
            border: 'border-emerald-200/50 dark:border-emerald-800/50',
            shadow: 'hover:shadow-emerald-500/20',
            iconGradient: 'from-emerald-500 to-emerald-600',
            iconShadow: 'shadow-emerald-500/50',
            textColor: 'text-emerald-700 dark:text-emerald-300',
            valueColor: 'text-emerald-900 dark:text-emerald-100',
        },
        {
            title: 'Pending Complaints',
            value: stats.pendingComplaints.toString(),
            icon: AlertCircle,
            href: '/caretaker/complaints',
            gradient: 'from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30',
            border: 'border-orange-200/50 dark:border-orange-800/50',
            shadow: 'hover:shadow-orange-500/20',
            iconGradient: 'from-orange-500 to-orange-600',
            iconShadow: 'shadow-orange-500/50',
            textColor: 'text-orange-700 dark:text-orange-300',
            valueColor: 'text-orange-900 dark:text-orange-100',
        },
        {
            title: 'Urgent Complaints',
            value: stats.urgentComplaints.toString(),
            icon: XCircle,
            href: '/caretaker/complaints',
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-red-600',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
        },
        {
            title: 'Pending Requests',
            value: stats.pendingRequests.toString(),
            icon: ClipboardList,
            href: '/caretaker/requisitions',
            gradient: 'from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30',
            border: 'border-purple-200/50 dark:border-purple-800/50',
            shadow: 'hover:shadow-purple-500/20',
            iconGradient: 'from-purple-500 to-purple-600',
            iconShadow: 'shadow-purple-500/50',
            textColor: 'text-purple-700 dark:text-purple-300',
            valueColor: 'text-purple-900 dark:text-purple-100',
        },
    ]

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
                    <p className="text-muted-foreground">Failed to load dashboard data</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-indigo-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Caretaker Dashboard
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
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tabular-nums">
                                {currentTime.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">Current Time</p>
                        </div>
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
                    </Link>
                ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.resolvedToday}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.occupancyRate}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Clock className="h-5 w-5 text-white" />
                        </div>
                        <span>Recent Activities</span>
                    </h3>
                </div>
                <div className="space-y-3">
                    {recentActivities.length > 0 ? (
                        recentActivities.map((activity: any, index: number) => {
                            const ActivityIcon = getActivityIcon(activity.type)
                            return (
                                <div
                                    key={activity.id || index}
                                    className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                                        <ActivityIcon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {activity.time ? formatTimeAgo(activity.time) : 'Recently'}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No recent activities</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
