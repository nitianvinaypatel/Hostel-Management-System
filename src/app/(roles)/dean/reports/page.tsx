'use client'

import { Button } from "@/components/ui/button"
import {
    DollarSign,
    Users,
    MessageSquare,
    TrendingUp,
    FileText,
    Download,
    ArrowRight,
    BarChart3,
    PieChart,
    Activity
} from "lucide-react"
import Link from "next/link"

export default function DeanReports() {
    const reportCategories = [
        {
            id: "financial",
            title: "Financial Summary",
            description: "Comprehensive financial overview including budget allocation, spending, and utilization across all hostels",
            icon: DollarSign,
            link: "/dean/reports/financial",
            gradient: 'from-green-50 to-emerald-100/50 dark:from-green-950/50 dark:to-emerald-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            iconGradient: 'from-green-500 to-emerald-600',
            stats: {
                totalBudget: "₹45L",
                spent: "₹32L",
                utilization: "71.1%"
            }
        },
        {
            id: "occupancy",
            title: "Occupancy Report",
            description: "Detailed hostel occupancy statistics including block-wise and floor-wise distribution",
            icon: Users,
            link: "/dean/reports/occupancy",
            gradient: 'from-blue-50 to-cyan-100/50 dark:from-blue-950/50 dark:to-cyan-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            iconGradient: 'from-blue-500 to-cyan-600',
            stats: {
                totalCapacity: "2000",
                occupied: "1847",
                occupancy: "92.4%"
            }
        },
        {
            id: "complaints",
            title: "Complaints Summary",
            description: "Overview of complaints received, resolved, and pending with category-wise breakdown",
            icon: MessageSquare,
            link: "/dean/reports/complaints",
            gradient: 'from-orange-50 to-amber-100/50 dark:from-orange-950/50 dark:to-amber-900/30',
            border: 'border-orange-200/50 dark:border-orange-800/50',
            iconGradient: 'from-orange-500 to-amber-600',
            stats: {
                total: "156",
                resolved: "142",
                pending: "14"
            }
        }
    ]

    const quickStats = [
        {
            label: "Total Reports Generated",
            value: "48",
            period: "This Month",
            trend: "+12%",
            trendUp: true
        },
        {
            label: "Active Hostels",
            value: "4",
            period: "All Operational",
            trend: "100%",
            trendUp: true
        },
        {
            label: "Budget Utilization",
            value: "71.1%",
            period: "Current FY",
            trend: "+5.2%",
            trendUp: true
        },
        {
            label: "Avg. Resolution Time",
            value: "3.2 days",
            period: "Last 30 Days",
            trend: "-0.8 days",
            trendUp: true
        }
    ]

    const recentReports = [
        {
            id: "1",
            type: "Financial",
            title: "Q4 Financial Summary Report",
            generatedAt: "2024-01-15",
            generatedBy: "System",
            size: "2.4 MB"
        },
        {
            id: "2",
            type: "Occupancy",
            title: "January Occupancy Report",
            generatedAt: "2024-01-14",
            generatedBy: "Admin",
            size: "1.8 MB"
        },
        {
            id: "3",
            type: "Complaints",
            title: "Monthly Complaints Analysis",
            generatedAt: "2024-01-13",
            generatedBy: "System",
            size: "1.2 MB"
        }
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Reports & Analytics 📊
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">Comprehensive reports and insights across all hostels</p>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Reports
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {quickStats.map((stat, index) => (
                    <div key={index} className="relative overflow-hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold mb-2 dark:text-white">{stat.value}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground font-medium">{stat.period}</span>
                            <span className={`text-xs font-semibold flex items-center gap-1 ${stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                <TrendingUp className={`h-3 w-3 ${!stat.trendUp && 'rotate-180'}`} />
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Categories */}
            <div className="grid gap-6 lg:grid-cols-3">
                {reportCategories.map((category) => {
                    const Icon = category.icon
                    return (
                        <div key={category.id} className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} backdrop-blur-xl border ${category.border} rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group`}>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.iconGradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="h-7 w-7 text-white" />
                            </div>

                            <h3 className="text-xl font-bold mb-2 dark:text-white">{category.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 font-medium">{category.description}</p>

                            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                                {Object.entries(category.stats).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-xs text-muted-foreground capitalize font-medium">{key}</p>
                                        <p className="text-sm font-bold dark:text-white">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <Link href={category.link}>
                                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all">
                                    View Report
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    )
                })}
            </div>

            {/* Recent Reports & Custom Generator */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span>Recent Reports</span>
                        </h3>
                        <Button variant="outline" size="sm" className="rounded-xl">
                            View All
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {recentReports.map((report) => (
                            <div key={report.id} className="group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 cursor-pointer">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FileText className="h-4 w-4 text-primary" />
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${report.type === 'Financial' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                                report.type === 'Occupancy' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                                    'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'}`}>
                                                {report.type}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-sm mb-1 dark:text-white">{report.title}</p>
                                        <div className="flex gap-3 text-xs text-muted-foreground font-medium">
                                            <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                                            <span>By {report.generatedBy}</span>
                                            <span>{report.size}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="rounded-xl">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Custom Report Generator</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">
                        Generate custom reports with specific parameters and date ranges
                    </p>

                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-semibold mb-2 block dark:text-white">Report Type</label>
                            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 font-medium">
                                <option>Financial Summary</option>
                                <option>Occupancy Report</option>
                                <option>Complaints Analysis</option>
                                <option>Requisitions Summary</option>
                                <option>Budget Utilization</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-semibold mb-2 block dark:text-white">From Date</label>
                                <input type="date" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-2 block dark:text-white">To Date</label>
                                <input type="date" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-2 block dark:text-white">Hostel</label>
                            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 font-medium">
                                <option>All Hostels</option>
                                <option>Hostel A</option>
                                <option>Hostel B</option>
                                <option>Hostel C</option>
                                <option>Hostel D</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-2 block dark:text-white">Format</label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 rounded-xl">
                                    <FileText className="h-4 w-4 mr-2" />
                                    PDF
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-xl">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Excel
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-xl">
                                    <PieChart className="h-4 w-4 mr-2" />
                                    CSV
                                </Button>
                            </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg shadow-purple-500/50 rounded-xl">
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                        </Button>
                    </div>
                </div>
            </div>

            {/* Report Schedule */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Report Schedule</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">
                    Automated reports are generated and sent to your email
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold dark:text-white">Daily Summary</span>
                            <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">Active</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Every day at 9:00 AM</p>
                        <p className="text-xs text-muted-foreground font-medium">Last sent: Today, 9:00 AM</p>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold dark:text-white">Weekly Report</span>
                            <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">Active</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Every Monday at 8:00 AM</p>
                        <p className="text-xs text-muted-foreground font-medium">Last sent: Jan 15, 8:00 AM</p>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold dark:text-white">Monthly Report</span>
                            <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">Active</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">1st of every month at 8:00 AM</p>
                        <p className="text-xs text-muted-foreground font-medium">Last sent: Jan 1, 8:00 AM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
