'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Building2, ClipboardList, AlertCircle, TrendingUp, DollarSign, Loader2 } from 'lucide-react'
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
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Total Students',
            value: stats.totalStudents.toString(),
            icon: Users,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
        },
        {
            title: 'Active Hostels',
            value: stats.totalHostels.toString(),
            icon: Building2,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Total Complaints',
            value: stats.totalComplaints.toString(),
            icon: AlertCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        },
        {
            title: 'Total Requisitions',
            value: stats.totalRequisitions.toString(),
            icon: ClipboardList,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.totalRevenue),
            icon: DollarSign,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">System-wide overview and management</p>
                </div>
                <Button onClick={loadDashboard} variant="outline">
                    Refresh
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                    <p className="text-2xl font-bold mt-2">{stats.totalPayments}</p>
                </Card>
                {stats.totalRooms !== undefined && (
                    <Card className="p-6">
                        <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                        <p className="text-2xl font-bold mt-2">{stats.totalRooms}</p>
                    </Card>
                )}
                {stats.availableRooms !== undefined && (
                    <Card className="p-6">
                        <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                        <p className="text-2xl font-bold mt-2">{stats.availableRooms}</p>
                    </Card>
                )}
                {stats.pendingPayments !== undefined && (
                    <Card className="p-6">
                        <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                        <p className="text-2xl font-bold mt-2">{stats.pendingPayments}</p>
                    </Card>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                        {stats.recentActivities && stats.recentActivities.length > 0 ? (
                            stats.recentActivities.slice(0, 5).map((activity) => (
                                <div key={activity.id} className="flex justify-between items-start border-b pb-3 last:border-0">
                                    <div>
                                        <p className="font-medium">{activity.description}</p>
                                        <p className="text-sm text-muted-foreground">{activity.userName || 'System'}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatDate(activity.timestamp)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No recent activities</p>
                        )}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid gap-3">
                        <Link href="/admin/users/add">
                            <Button variant="outline" className="w-full justify-start">
                                <Users className="h-4 w-4 mr-2" />
                                Add New User
                            </Button>
                        </Link>
                        <Link href="/admin/hostels">
                            <Button variant="outline" className="w-full justify-start">
                                <Building2 className="h-4 w-4 mr-2" />
                                Manage Hostels
                            </Button>
                        </Link>
                        <Link href="/admin/notifications">
                            <Button variant="outline" className="w-full justify-start">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Send Notification
                            </Button>
                        </Link>
                        <Link href="/admin/reports">
                            <Button variant="outline" className="w-full justify-start">
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Generate Report
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}
