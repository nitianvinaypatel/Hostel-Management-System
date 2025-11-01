'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, DollarSign, TrendingUp, AlertTriangle, Users, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useGetFeeCollectionReportQuery } from '@/store/api/adminApi'
import { toast } from "sonner"

export default function FeeCollectionReport() {
    const { data: response, isLoading, error, refetch } = useGetFeeCollectionReportQuery()

    const handleExport = async (format: 'pdf' | 'excel' = 'pdf') => {
        try {
            toast.success(`Exporting Fee Collection Report as ${format.toUpperCase()}...`)

            const token = localStorage.getItem('token')
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

            const response = await fetch(
                `${baseUrl}/admin/reports/export?reportType=fees&format=${format}`,
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
            a.download = `fee-collection-report.${format === 'pdf' ? 'pdf' : 'xlsx'}`
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
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground animate-pulse">Loading fee collection report...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">Failed to load fee collection report</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    const reportData = response?.data
    if (!reportData) return null

    const { summary, hostels } = reportData

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-2">
                                Fee Collection Report
                            </h1>
                            <p className="text-muted-foreground text-lg">Payment status and collection summary</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleExport('pdf')}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/50"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Due</p>
                    </div>
                    <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">₹{(summary.totalDue / 100000).toFixed(1)}L</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Collected</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">₹{(summary.totalCollected / 100000).toFixed(1)}L</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-red-700 dark:text-red-300">Pending</p>
                    </div>
                    <p className="text-4xl font-bold text-red-600">₹{(summary.totalPending / 100000).toFixed(1)}L</p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Collection Rate</p>
                    </div>
                    <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2">{summary.collectionRate.toFixed(1)}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${summary.collectionRate}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Fee Collection Table */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Hostel-wise Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Hostel</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Students</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Paid Students</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Due</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Collected</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Pending</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Collection Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostels.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{hostel.hostel}</td>
                                    <td className="py-4 px-4 font-medium">{hostel.totalStudents}</td>
                                    <td className="py-4 px-4 font-medium">{hostel.paidStudents}</td>
                                    <td className="py-4 px-4 font-medium">₹{(hostel.totalDue / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4 font-semibold text-green-600">₹{(hostel.collected / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4 font-semibold text-red-600">₹{(hostel.pending / 100000).toFixed(1)}L</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${hostel.rate}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-sm w-12 text-right">{hostel.rate.toFixed(1)}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
