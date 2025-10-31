'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Users,
    Building2,
    ClipboardList,
    AlertCircle,
    DollarSign,
    Loader2,
    Activity,
    Bed,
    CreditCard,
    RefreshCw,
    Clock,
    CheckCircle2,
    Bell
} from 'lucide-react'
import { adminService } from '@/services/admin.service'
import type { DashboardStats } from '@/types/admin'
import Link from 'next/link'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            setLoading(true)
            const response = await adminService.getDashboard()
            setStats(response.data)
        } catch (err) {
            setError('Failed to load dashboard data')
            console.error('Dashboard error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error || !stats) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">{error || 'No data available'}</p>
                <Button onClick={loadDashboard}>Retry</Button>
            </div>
        )
    }

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers.toString(),
            icon: Users,
            href: '/admin/users',
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-blue-600',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
        },
        {
            title: 'Total Students',
            value: stats.totalStudents.toString(),
            icon: Users,
            href: '/admin/users',
            gradient: 'from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30',
            border: 'border-purple-200/50 dark:border-purple-800/50',
            shadow: 'hover:shadow-purple-500/20',
            iconGradient: 'from-purple-500 to-purple-600',
            iconShadow: 'shadow-purple-500/50',
            textColor: 'text-purple-700 dark:text-purple-300',
            valueColor: 'text-purple-900 dark:text-purple-100',
        },
        {
            title: 'Active Hostels',
            value: stats.totalHostels.toString(),
            icon: Building2,
            href: '/admin/hostels',
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-green-600',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
        },
        {
            title: 'Total Complaints',
            value: stats.totalComplaints.toString(),
            icon: AlertCircle,
            href: '/admin/reports/complaints',
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-red-600',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
        },
        {
            title: 'Total Requisitions',
            value: stats.totalRequisitions.toString(),
            icon: ClipboardList,
            href: '/admin/requisitions',
            gradient: 'from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30',
            border: 'border-orange-200/50 dark:border-orange-800/50',
            shadow: 'hover:shadow-orange-500/20',
            iconGradient: 'from-orange-500 to-orange-600',
            iconShadow: 'shadow-orange-500/50',
            textColor: 'text-orange-700 dark:text-orange-300',
            valueColor: 'text-orange-900 dark:text-orange-100',
        },
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.totalRevenue),
            icon: DollarSign,
            href: '/admin/reports/fees',
            gradient: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/30',
            border: 'border-emerald-200/50 dark:border-emerald-800/50',
            shadow: 'hover:shadow-emerald-500/20',
            iconGradient: 'from-emerald-500 to-emerald-600',
            iconShadow: 'shadow-emerald-500/50',
            textColor: 'text-emerald-700 dark:text-emerald-300',
            valueColor: 'text-emerald-900 dark:text-emerald-100',
        },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Admin Dashboard 🎯
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            System-wide overview and management
                        </p>
                    </div>
                    <Button onClick={loadDashboard} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>
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
            {(stats.totalPayments !== undefined || stats.totalRooms !== undefined || stats.availableRooms !== undefined || stats.pendingPayments !== undefined) && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.totalPayments !== undefined && (
                        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/50">
                                    <CreditCard className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                                    <p className="text-2xl font-bold mt-1">{stats.totalPayments}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {stats.totalRooms !== undefined && (
                        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-500/50">
                                    <Bed className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                                    <p className="text-2xl font-bold mt-1">{stats.totalRooms}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {stats.availableRooms !== undefined && (
                        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                                    <CheckCircle2 className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                                    <p className="text-2xl font-bold mt-1">{stats.availableRooms}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {stats.pendingPayments !== undefined && (
                        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/50">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                                    <p className="text-2xl font-bold mt-1">{stats.pendingPayments}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

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
                        <Link href="/admin/analytics">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {stats.recentActivities && stats.recentActivities.length > 0 ? (
                            stats.recentActivities.slice(0, 5).map((activity) => (
                                <div
                                    key={activity.id}
                                    className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                                        <Activity className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activity.description}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {activity.userName || 'System'}
                                            </p>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatDate(activity.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Activity className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">No recent activities</p>
                            </div>
                        )}
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
                        <Link href="/admin/users/add">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                        <Users className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Add New User</p>
                                        <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Create user accounts</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/hostels">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                                        <Building2 className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-green-900 dark:text-green-100">Manage Hostels</p>
                                        <p className="text-xs text-green-700 dark:text-green-400 font-medium">Configure hostel settings</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/notifications">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                        <Bell className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-orange-900 dark:text-orange-100">Send Notification</p>
                                        <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">Broadcast messages</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/reports">
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
