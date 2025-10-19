'use client'

import { Card } from "@/components/ui/card"
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
    PieChart
} from "lucide-react"
import Link from "next/link"

export default function DeanReports() {
    const reportCategories = [
        {
            id: "financial",
            title: "Financial Summary",
            description: "Comprehensive financial overview including budget allocation, spending, and utilization across all hostels",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50",
            link: "/dean/reports/financial",
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
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            link: "/dean/reports/occupancy",
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
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            link: "/dean/reports/complaints",
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Comprehensive reports and insights across all hostels</p>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export All Reports
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {quickStats.map((stat, index) => (
                    <Card key={index} className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{stat.period}</span>
                            <span className={`text-xs font-medium flex items-center gap-1 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                <TrendingUp className={`h-3 w-3 ${!stat.trendUp && 'rotate-180'}`} />
                                {stat.trend}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {reportCategories.map((category) => {
                    const Icon = category.icon
                    return (
                        <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}>
                                <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>

                            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

                            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-accent/50 rounded-lg">
                                {Object.entries(category.stats).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                                        <p className="text-sm font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <Link href={category.link}>
                                <Button className="w-full">
                                    View Report
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </Card>
                    )
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Recent Reports</h3>
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {recentReports.map((report) => (
                            <Card key={report.id} className="p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FileText className="h-4 w-4 text-primary" />
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${report.type === 'Financial' ? 'bg-green-100 text-green-800' :
                                                report.type === 'Occupancy' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-orange-100 text-orange-800'}`}>
                                                {report.type}
                                            </span>
                                        </div>
                                        <p className="font-medium text-sm mb-1">{report.title}</p>
                                        <div className="flex gap-3 text-xs text-muted-foreground">
                                            <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                                            <span>By {report.generatedBy}</span>
                                            <span>{report.size}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Custom Report Generator</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Generate custom reports with specific parameters and date ranges
                    </p>

                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Report Type</label>
                            <select className="w-full px-3 py-2 border rounded-md">
                                <option>Financial Summary</option>
                                <option>Occupancy Report</option>
                                <option>Complaints Analysis</option>
                                <option>Requisitions Summary</option>
                                <option>Budget Utilization</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium mb-1 block">From Date</label>
                                <input type="date" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">To Date</label>
                                <input type="date" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Hostel</label>
                            <select className="w-full px-3 py-2 border rounded-md">
                                <option>All Hostels</option>
                                <option>Hostel A</option>
                                <option>Hostel B</option>
                                <option>Hostel C</option>
                                <option>Hostel D</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Format</label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                    <FileText className="h-4 w-4 mr-2" />
                                    PDF
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Excel
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <PieChart className="h-4 w-4 mr-2" />
                                    CSV
                                </Button>
                            </div>
                        </div>

                        <Button className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                        </Button>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Report Schedule</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Automated reports are generated and sent to your email
                </p>

                <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Daily Summary</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">Every day at 9:00 AM</p>
                        <p className="text-xs text-muted-foreground">Last sent: Today, 9:00 AM</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Weekly Report</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">Every Monday at 8:00 AM</p>
                        <p className="text-xs text-muted-foreground">Last sent: Jan 15, 8:00 AM</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Monthly Report</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">1st of every month at 8:00 AM</p>
                        <p className="text-xs text-muted-foreground">Last sent: Jan 1, 8:00 AM</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
