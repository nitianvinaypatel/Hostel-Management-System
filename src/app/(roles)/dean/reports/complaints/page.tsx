'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, MessageSquare, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function ComplaintsReport() {
    const overallStats = {
        totalComplaints: 156,
        resolved: 142,
        pending: 14,
        resolutionRate: 91.0,
        avgResolutionTime: 3.2,
        thisMonth: 28
    }

    const categoryData = [
        { category: "Maintenance", total: 45, resolved: 42, pending: 3, resolutionRate: 93.3, avgTime: 2.8 },
        { category: "Food Quality", total: 32, resolved: 28, pending: 4, resolutionRate: 87.5, avgTime: 1.5 },
        { category: "Cleanliness", total: 28, resolved: 26, pending: 2, resolutionRate: 92.9, avgTime: 2.1 },
        { category: "Electricity", total: 22, resolved: 21, pending: 1, resolutionRate: 95.5, avgTime: 1.8 },
        { category: "Water Supply", total: 15, resolved: 14, pending: 1, resolutionRate: 93.3, avgTime: 2.5 },
        { category: "Internet/WiFi", total: 14, resolved: 11, pending: 3, resolutionRate: 78.6, avgTime: 4.2 }
    ]

    const hostelData = [
        { hostel: "Hostel A", total: 42, resolved: 39, pending: 3, resolutionRate: 92.9, avgTime: 3.1 },
        { hostel: "Hostel B", total: 38, resolved: 35, pending: 3, resolutionRate: 92.1, avgTime: 3.0 },
        { hostel: "Hostel C", total: 45, resolved: 40, pending: 5, resolutionRate: 88.9, avgTime: 3.5 },
        { hostel: "Hostel D", total: 31, resolved: 28, pending: 3, resolutionRate: 90.3, avgTime: 3.2 }
    ]

    const monthlyTrend = [
        { month: "Aug", total: 24, resolved: 22, resolutionRate: 91.7 },
        { month: "Sep", total: 26, resolved: 24, resolutionRate: 92.3 },
        { month: "Oct", total: 28, resolved: 25, resolutionRate: 89.3 },
        { month: "Nov", total: 25, resolved: 23, resolutionRate: 92.0 },
        { month: "Dec", total: 25, resolved: 23, resolutionRate: 92.0 },
        { month: "Jan", total: 28, resolved: 25, resolutionRate: 89.3 }
    ]

    const priorityData = [
        { priority: "Critical", count: 8, resolved: 8, avgTime: 0.5 },
        { priority: "High", count: 35, resolved: 33, avgTime: 1.8 },
        { priority: "Medium", count: 68, resolved: 62, avgTime: 3.5 },
        { priority: "Low", count: 45, resolved: 39, avgTime: 5.2 }
    ]

    const recentComplaints = [
        {
            id: "COMP-156",
            hostel: "Hostel C",
            category: "Maintenance",
            title: "Water Leakage in Room 304",
            priority: "high",
            status: "pending",
            submittedAt: "2024-01-15",
            submittedBy: "Student"
        },
        {
            id: "COMP-155",
            hostel: "Hostel B",
            category: "Internet/WiFi",
            title: "WiFi Not Working - Block B",
            priority: "medium",
            status: "pending",
            submittedAt: "2024-01-14",
            submittedBy: "Student"
        },
        {
            id: "COMP-154",
            hostel: "Hostel A",
            category: "Food Quality",
            title: "Poor Food Quality in Mess",
            priority: "high",
            status: "resolved",
            submittedAt: "2024-01-13",
            resolvedAt: "2024-01-14",
            submittedBy: "Student"
        }
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dean/reports">
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                                Complaints Summary Report 📝
                            </h1>
                            <p className="text-muted-foreground text-lg mt-2">Comprehensive complaints analysis and resolution tracking</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Overall Complaints Status</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Total Complaints</p>
                        <p className="text-3xl font-bold dark:text-white">{overallStats.totalComplaints}</p>
                    </div>
                    <div className="p-5 border border-green-200 dark:border-green-800 rounded-xl bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Resolved</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{overallStats.resolved}</p>
                    </div>
                    <div className="p-5 border border-orange-200 dark:border-orange-800 rounded-xl bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Pending</p>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{overallStats.pending}</p>
                    </div>
                    <div className="p-5 border border-primary/30 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Resolution Rate</p>
                        <p className="text-3xl font-bold text-primary">{overallStats.resolutionRate}%</p>
                    </div>
                    <div className="p-5 border border-blue-200 dark:border-blue-800 rounded-xl bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Avg. Resolution</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{overallStats.avgResolutionTime}d</p>
                    </div>
                    <div className="p-5 border border-purple-200 dark:border-purple-800 rounded-xl bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">This Month</p>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{overallStats.thisMonth}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold dark:text-white">Resolution Rate</span>
                        <span className="text-sm font-bold text-primary">{overallStats.resolutionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                            style={{ width: `${overallStats.resolutionRate}%` }}
                        >
                            <span className="text-xs text-white font-medium">{overallStats.resolutionRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Category-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Category</th>
                                <th className="text-left py-3 px-4">Total</th>
                                <th className="text-left py-3 px-4">Resolved</th>
                                <th className="text-left py-3 px-4">Pending</th>
                                <th className="text-left py-3 px-4">Resolution Rate</th>
                                <th className="text-left py-3 px-4">Avg. Time (days)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((cat) => (
                                <tr key={cat.category} className="border-b hover:bg-accent/50">
                                    <td className="py-3 px-4 font-medium">{cat.category}</td>
                                    <td className="py-3 px-4">{cat.total}</td>
                                    <td className="py-3 px-4 text-green-600 font-medium">{cat.resolved}</td>
                                    <td className="py-3 px-4 text-orange-600 font-medium">{cat.pending}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{cat.resolutionRate}%</span>
                                            {cat.resolutionRate > 90 ? (
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-orange-600" />
                                            )}
                                        </div>
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className={`h-2 rounded-full ${cat.resolutionRate > 90 ? 'bg-green-500' :
                                                    cat.resolutionRate > 85 ? 'bg-blue-500' :
                                                        'bg-orange-500'}`}
                                                style={{ width: `${cat.resolutionRate}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`font-medium ${cat.avgTime < 2 ? 'text-green-600' :
                                            cat.avgTime < 4 ? 'text-blue-600' :
                                                'text-orange-600'}`}>
                                            {cat.avgTime}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Hostel-wise Breakdown</h3>
                    <div className="space-y-3">
                        {hostelData.map((hostel) => (
                            <div key={hostel.hostel} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-medium">{hostel.hostel}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">{hostel.resolutionRate}%</span>
                                        {hostel.resolutionRate > 90 ? (
                                            <TrendingUp className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-orange-600" />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total</p>
                                        <p className="text-lg font-bold">{hostel.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Resolved</p>
                                        <p className="text-lg font-bold text-green-600">{hostel.resolved}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Pending</p>
                                        <p className="text-lg font-bold text-orange-600">{hostel.pending}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Avg. Time</p>
                                        <p className="text-lg font-bold text-blue-600">{hostel.avgTime}d</p>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${hostel.resolutionRate > 90 ? 'bg-green-500' :
                                            hostel.resolutionRate > 85 ? 'bg-blue-500' :
                                                'bg-orange-500'}`}
                                        style={{ width: `${hostel.resolutionRate}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Priority-wise Distribution</h3>
                    <div className="space-y-3">
                        {priorityData.map((priority) => (
                            <div key={priority.priority} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${priority.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                            priority.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                priority.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                            {priority.priority}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {priority.resolved}/{priority.count} resolved
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total</p>
                                        <p className="text-lg font-bold">{priority.count}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Resolved</p>
                                        <p className="text-lg font-bold text-green-600">{priority.resolved}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Avg. Time</p>
                                        <p className="text-lg font-bold text-blue-600">{priority.avgTime}d</p>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${priority.priority === 'Critical' ? 'bg-red-500' :
                                            priority.priority === 'High' ? 'bg-orange-500' :
                                                priority.priority === 'Medium' ? 'bg-yellow-500' :
                                                    'bg-blue-500'}`}
                                        style={{ width: `${(priority.resolved / priority.count) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Monthly Trend (Last 6 Months)</h3>
                <div className="space-y-3">
                    {monthlyTrend.map((month) => (
                        <div key={month.month} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">{month.month}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1 text-sm">
                                    <span className="text-muted-foreground">
                                        {month.resolved} resolved of {month.total} total
                                    </span>
                                    <span className="font-semibold">{month.resolutionRate}%</span>
                                </div>
                                <div className="relative w-full bg-gray-200 rounded-full h-6">
                                    <div
                                        className={`absolute h-6 rounded-full ${month.resolutionRate > 90 ? 'bg-green-500' :
                                            month.resolutionRate > 85 ? 'bg-blue-500' :
                                                'bg-orange-500'}`}
                                        style={{ width: `${month.resolutionRate}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white">
                                            {month.resolutionRate}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Recent Complaints</h3>
                <div className="space-y-3">
                    {recentComplaints.map((complaint) => (
                        <div key={complaint.id} className="p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-mono text-xs font-semibold">{complaint.id}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                            'bg-orange-100 text-orange-800'}`}>
                                            {complaint.status}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${complaint.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                            {complaint.priority}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                            {complaint.category}
                                        </span>
                                    </div>
                                    <p className="font-medium text-sm mb-1">{complaint.title}</p>
                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                        <span>{complaint.hostel}</span>
                                        <span>By {complaint.submittedBy}</span>
                                        <span>Submitted: {new Date(complaint.submittedAt).toLocaleDateString()}</span>
                                        {complaint.resolvedAt && (
                                            <span>Resolved: {new Date(complaint.resolvedAt).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Key Insights</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50 flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">High Resolution Rate</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    91% of complaints are resolved, indicating effective complaint management
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 flex-shrink-0">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">Quick Response Time</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Average resolution time of 3.2 days shows prompt action on complaints
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50 flex-shrink-0">
                                <MessageSquare className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">Top Category</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Maintenance complaints are the most common (45 total), requiring focused attention
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 flex-shrink-0">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">Critical Priority</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    All 8 critical complaints resolved with average time of 0.5 days - excellent performance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
