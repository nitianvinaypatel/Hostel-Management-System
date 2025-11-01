'use client'

import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Building2, DollarSign, MessageSquare, Wrench, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
    useGetOccupancyReportQuery,
    useGetComplaintsReportQuery,
    useGetFeeCollectionReportQuery,
    useGetMaintenanceReportQuery
} from '@/store/api/adminApi'
import { toast } from "sonner"

export default function AdminReports() {
    // Fetch all reports to show summary data
    const { data: occupancyData } = useGetOccupancyReportQuery()
    const { data: complaintsData } = useGetComplaintsReportQuery()
    const { data: feesData } = useGetFeeCollectionReportQuery()
    const { data: maintenanceData } = useGetMaintenanceReportQuery()

    const handleGenerate = async (reportType: string, format: 'pdf' | 'excel' = 'pdf') => {
        try {
            toast.success(`Generating ${reportType} report as ${format.toUpperCase()}...`)

            const token = localStorage.getItem('token')
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

            const response = await fetch(
                `${baseUrl}/admin/reports/export?reportType=${reportType}&format=${format}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (!response.ok) throw new Error('Export failed')

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${reportType}-report.${format === 'pdf' ? 'pdf' : 'xlsx'}`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            toast.success('Report generated and downloaded successfully!')
        } catch (error) {
            console.error('Generate report error:', error)
            toast.error('Failed to generate report')
        }
    }

    const handleDownload = (reportName: string) => {
        toast.success(`Downloading ${reportName}...`)
    }

    const reportTypes = [
        {
            title: "Hostel Occupancy Report",
            description: occupancyData?.data?.summary
                ? `${occupancyData.data.summary.overallRate.toFixed(1)}% occupancy rate`
                : "Current occupancy status across all hostels",
            icon: Building2,
            url: "/admin/reports/occupancy",
            lastGenerated: new Date().toISOString().split('T')[0],
            gradient: 'from-blue-50 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            iconGradient: 'from-blue-500 to-cyan-500',
            iconShadow: 'shadow-blue-500/50',
            reportType: 'occupancy'
        },
        {
            title: "Fee Collection Report",
            description: feesData?.data?.summary
                ? `${feesData.data.summary.collectionRate.toFixed(1)}% collection rate`
                : "Payment status and collection summary",
            icon: DollarSign,
            url: "/admin/reports/fees",
            lastGenerated: new Date().toISOString().split('T')[0],
            gradient: 'from-green-50 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            iconGradient: 'from-green-500 to-emerald-500',
            iconShadow: 'shadow-green-500/50',
            reportType: 'fees'
        },
        {
            title: "Complaints Summary",
            description: complaintsData?.data?.summary
                ? `${complaintsData.data.summary.resolutionRate.toFixed(1)}% resolution rate`
                : "Overview of complaints and resolution status",
            icon: MessageSquare,
            url: "/admin/reports/complaints",
            lastGenerated: new Date().toISOString().split('T')[0],
            gradient: 'from-red-50 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            iconGradient: 'from-red-500 to-rose-500',
            iconShadow: 'shadow-red-500/50',
            reportType: 'complaints'
        },
        {
            title: "Maintenance Costs",
            description: maintenanceData?.data?.summary
                ? `₹${maintenanceData.data.summary.totalCost.toLocaleString('en-IN')} total cost`
                : "Breakdown of maintenance expenses",
            icon: Wrench,
            url: "/admin/reports/maintenance",
            lastGenerated: new Date().toISOString().split('T')[0],
            gradient: 'from-purple-50 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30',
            border: 'border-purple-200/50 dark:border-purple-800/50',
            iconGradient: 'from-purple-500 to-pink-500',
            iconShadow: 'shadow-purple-500/50',
            reportType: 'maintenance'
        },
    ]

    const recentReports = [
        { id: "1", name: "Monthly Occupancy - December 2024", type: "Occupancy", date: "2024-12-31", size: "2.4 MB" },
        { id: "2", name: "Fee Collection - Q4 2024", type: "Fees", date: "2024-12-30", size: "1.8 MB" },
        { id: "3", name: "Complaints Analysis - December 2024", type: "Complaints", date: "2024-12-29", size: "1.2 MB" },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/admin/dashboard">
                        <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                            Reports
                        </h1>
                        <p className="text-muted-foreground text-lg">Generate and view system reports</p>
                    </div>
                </div>
            </div>

            {/* Report Types Grid */}
            <div className="grid gap-5 md:grid-cols-2">
                {reportTypes.map((report) => {
                    const Icon = report.icon
                    return (
                        <div key={report.title} className={`group p-6 rounded-xl bg-gradient-to-br ${report.gradient} border ${report.border} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${report.iconGradient} flex items-center justify-center shadow-lg ${report.iconShadow} group-hover:scale-110 transition-transform flex-shrink-0`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{report.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-2 font-medium">{report.description}</p>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link href={report.url} className="flex-1">
                                    <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Report
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => handleGenerate(report.reportType)}
                                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Reports */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span>Recent Reports</span>
                </h3>
                <div className="space-y-3">
                    {recentReports.map((report) => (
                        <div key={report.id} className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01]">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                    <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-gray-100">{report.name}</p>
                                    <p className="text-sm text-muted-foreground font-medium">
                                        {report.type} • {new Date(report.date).toLocaleDateString()} • {report.size}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => alert(`Viewing ${report.name}...`)}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownload(report.name)}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
