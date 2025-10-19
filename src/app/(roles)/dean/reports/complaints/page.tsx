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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dean/reports">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Complaints Summary Report</h1>
                        <p className="text-muted-foreground">Comprehensive complaints analysis and resolution tracking</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Complaints Status</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Complaints</p>
                        <p className="text-2xl font-bold">{overallStats.totalComplaints}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                        <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                        <p className="text-2xl font-bold text-green-600">{overallStats.resolved}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-orange-50">
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-orange-600">{overallStats.pending}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Resolution Rate</p>
                        <p className="text-2xl font-bold text-primary">{overallStats.resolutionRate}%</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-blue-50">
                        <p className="text-sm text-muted-foreground mb-1">Avg. Resolution</p>
                        <p className="text-2xl font-bold text-blue-600">{overallStats.avgResolutionTime}d</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-purple-50">
                        <p className="text-sm text-muted-foreground mb-1">This Month</p>
                        <p className="text-2xl font-bold text-purple-600">{overallStats.thisMonth}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Resolution Rate</span>
                        <span className="text-sm font-bold text-primary">{overallStats.resolutionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${overallStats.resolutionRate}%` }}
                        >
                            <span className="text-xs text-white font-medium">{overallStats.resolutionRate}%</span>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Category-wise Breakdown</h3>
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
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Hostel-wise Breakdown</h3>
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
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Priority-wise Distribution</h3>
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
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Trend (Last 6 Months)</h3>
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
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>
                <div className="space-y-3">
                    {recentComplaints.map((complaint) => (
                        <Card key={complaint.id} className="p-4">
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
                        </Card>
                    ))}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                                <p className="font-medium mb-1">High Resolution Rate</p>
                                <p className="text-sm text-muted-foreground">
                                    91% of complaints are resolved, indicating effective complaint management
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                                <p className="font-medium mb-1">Quick Response Time</p>
                                <p className="text-sm text-muted-foreground">
                                    Average resolution time of 3.2 days shows prompt action on complaints
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                            <MessageSquare className="h-5 w-5 text-orange-600 mt-1" />
                            <div>
                                <p className="font-medium mb-1">Top Category</p>
                                <p className="text-sm text-muted-foreground">
                                    Maintenance complaints are the most common (45 total), requiring focused attention
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 text-purple-600 mt-1" />
                            <div>
                                <p className="font-medium mb-1">Critical Priority</p>
                                <p className="text-sm text-muted-foreground">
                                    All 8 critical complaints resolved with average time of 0.5 days - excellent performance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
