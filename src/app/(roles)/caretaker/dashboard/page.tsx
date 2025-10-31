'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Building2,
    Users,
    AlertCircle,
    ClipboardList,
    DoorOpen,
    CheckCircle2,
    RefreshCw,
    Bed,
    XCircle,
    Clock
} from "lucide-react"

export default function CaretakerDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const stats = {
        totalRooms: 150,
        occupiedRooms: 120,
        availableRooms: 30,
        pendingComplaints: 8,
        urgentComplaints: 2,
        pendingRequests: 5,
        resolvedToday: 12,
        occupancyRate: 80
    }

    const recentActivities = [
        {
            id: 1,
            type: "allocation",
            title: "Room 205 allocated",
            description: "Student #12345 assigned to Room 205",
            time: "2 hours ago",
            icon: DoorOpen,
            color: "blue"
        },
        {
            id: 2,
            type: "resolved",
            title: "Complaint resolved",
            description: "Water leakage in Room 101 fixed",
            time: "5 hours ago",
            icon: CheckCircle2,
            color: "green"
        },
        {
            id: 3,
            type: "requisition",
            title: "Requisition approved",
            description: "AC repair requisition approved by warden",
            time: "1 day ago",
            icon: ClipboardList,
            color: "purple"
        },
        {
            id: 4,
            type: "complaint",
            title: "New complaint filed",
            description: "Electrical issue reported in Room 308",
            time: "2 days ago",
            icon: AlertCircle,
            color: "orange"
        }
    ]

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

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-indigo-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Caretaker Dashboard 🏢
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
                        <Button variant="outline" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
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
                    {recentActivities.map((activity) => (
                        <div
                            key={activity.id}
                            className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                                <activity.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activity.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
