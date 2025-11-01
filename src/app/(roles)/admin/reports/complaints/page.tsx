'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, AlertCircle, CheckCircle, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"
import { useGetComplaintsReportQuery } from '@/store/api/adminApi'
import { toast } from "sonner"

export default function ComplaintsReport() {
    const { data: response, isLoading, error, refetch } = useGetComplaintsReportQuery()

    const handleExport = async (format: 'pdf' | 'excel' = 'pdf') => {
        try {
            toast.success(`Exporting Complaints Report as ${format.toUpperCase()}...`)

            const token = localStorage.getItem('token')
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

            const response = await fetch(
                `${baseUrl}/admin/reports/export?reportType=complaints&format=${format}`,
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
            a.download = `complaints-report.${format === 'pdf' ? 'pdf' : 'xlsx'}`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            toast.success('Report exported successfully!')
        } catch (error) {
            console.error('Export error:', error)
            toast.error('Failed to export report')
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground animate-pulse">Loading complaints report...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">Failed to load complaints report</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    const reportData = response?.data
    if (!reportData) return null

    const { summary, hostels, categories } = reportData

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-rose-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-red-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent mb-2">
                                Complaints Summary Report
                            </h1>
                            <p className="text-muted-foreground text-lg">Overview of complaints and resolution status</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleExport('pdf')}
                        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg shadow-red-500/50"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950/50 dark:to-gray-900/30 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Total Complaints</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{summary.totalComplaints}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Resolved</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{summary.totalResolved}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/30 backdrop-blur-xl border border-yellow-200/50 dark:border-yellow-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Pending</p>
                    </div>
                    <p className="text-4xl font-bold text-yellow-600">{summary.totalPending}</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Resolution Rate</p>
                    <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2">{summary.resolutionRate.toFixed(1)}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${summary.resolutionRate}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Hostel-wise Breakdown */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Hostel-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Hostel</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Resolved</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">In Progress</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Pending</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Avg Resolution Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostels.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{hostel.hostel}</td>
                                    <td className="py-4 px-4 font-medium">{hostel.total}</td>
                                    <td className="py-4 px-4 font-semibold text-green-600">{hostel.resolved}</td>
                                    <td className="py-4 px-4 font-semibold text-blue-600">{hostel.inProgress}</td>
                                    <td className="py-4 px-4 font-semibold text-yellow-600">{hostel.pending}</td>
                                    <td className="py-4 px-4 font-medium">{hostel.avgResolutionTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span>Complaints by Category</span>
                </h3>
                <div className="space-y-4">
                    {categories.map((cat) => (
                        <div key={cat.category} className="group p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-32 text-sm font-bold text-gray-900 dark:text-gray-100 capitalize">{cat.category}</div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-7 relative overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-7 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                        style={{ width: `${cat.percentage}%` }}
                                    >
                                        <span className="text-xs font-bold text-white">{cat.count}</span>
                                    </div>
                                </div>
                                <div className="w-16 text-sm text-muted-foreground text-right font-bold">{cat.percentage.toFixed(1)}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
