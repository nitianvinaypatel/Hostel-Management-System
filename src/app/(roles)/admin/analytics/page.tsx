'use client'

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, DollarSign, AlertCircle, Building2 } from "lucide-react"

export default function AdminAnalytics() {
    const kpiData = [
        { title: "Occupancy Rate", value: "87%", change: "+5%", trend: "up", icon: Building2 },
        { title: "Monthly Revenue", value: "₹12.5L", change: "+18%", trend: "up", icon: DollarSign },
        { title: "Active Students", value: "500", change: "+12", trend: "up", icon: Users },
        { title: "Pending Complaints", value: "23", change: "-15%", trend: "down", icon: AlertCircle },
    ]

    const occupancyTrend = [
        { month: "Jul", rate: 82 },
        { month: "Aug", rate: 85 },
        { month: "Sep", rate: 83 },
        { month: "Oct", rate: 86 },
        { month: "Nov", rate: 84 },
        { month: "Dec", rate: 87 },
    ]

    const revenueTrend = [
        { month: "Jul", amount: 950000 },
        { month: "Aug", amount: 1020000 },
        { month: "Sep", amount: 980000 },
        { month: "Oct", amount: 1150000 },
        { month: "Nov", amount: 1080000 },
        { month: "Dec", amount: 1250000 },
    ]

    const complaintsTrend = [
        { month: "Jul", count: 45 },
        { month: "Aug", count: 38 },
        { month: "Sep", count: 42 },
        { month: "Oct", count: 35 },
        { month: "Nov", count: 28 },
        { month: "Dec", count: 23 },
    ]

    const hostelPerformance = [
        { hostel: "Hostel A", occupancy: 87.5, revenue: 450000, complaints: 8, rating: 4.5 },
        { hostel: "Hostel B", occupancy: 85.0, revenue: 420000, complaints: 6, rating: 4.7 },
        { hostel: "Hostel C", occupancy: 75.0, revenue: 380000, complaints: 9, rating: 4.2 },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Comprehensive insights and trends</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi) => (
                    <Card key={kpi.title} className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <kpi.icon className="h-5 w-5 text-muted-foreground" />
                            {kpi.trend === 'up' ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                        <p className={`text-sm mt-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.change} from last month
                        </p>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Occupancy Trend (Last 6 Months)</h3>
                    <div className="space-y-3">
                        {occupancyTrend.map((data) => (
                            <div key={data.month} className="flex items-center gap-4">
                                <div className="w-12 text-sm font-medium">{data.month}</div>
                                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${data.rate}%` }}
                                    >
                                        <span className="text-xs text-white font-medium">{data.rate}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue Trend (Last 6 Months)</h3>
                    <div className="space-y-3">
                        {revenueTrend.map((data) => (
                            <div key={data.month} className="flex items-center gap-4">
                                <div className="w-12 text-sm font-medium">{data.month}</div>
                                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(data.amount / 1250000) * 100}%` }}
                                    >
                                        <span className="text-xs text-white font-medium">₹{(data.amount / 100000).toFixed(1)}L</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Complaints Trend (Last 6 Months)</h3>
                    <div className="space-y-3">
                        {complaintsTrend.map((data) => (
                            <div key={data.month} className="flex items-center gap-4">
                                <div className="w-12 text-sm font-medium">{data.month}</div>
                                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-red-500 h-6 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(data.count / 45) * 100}%` }}
                                    >
                                        <span className="text-xs text-white font-medium">{data.count}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Hostel Performance</h3>
                    <div className="space-y-4">
                        {hostelPerformance.map((hostel) => (
                            <div key={hostel.hostel} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold">{hostel.hostel}</h4>
                                    <span className="text-sm text-yellow-600">★ {hostel.rating}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Occupancy</p>
                                        <p className="font-medium">{hostel.occupancy}%</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Revenue</p>
                                        <p className="font-medium">₹{(hostel.revenue / 100000).toFixed(1)}L</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Complaints</p>
                                        <p className="font-medium">{hostel.complaints}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
