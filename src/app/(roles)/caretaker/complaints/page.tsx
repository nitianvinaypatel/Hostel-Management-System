'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, Clock, CheckCircle2, AlertTriangle, Send, Eye, ArrowLeft, Loader2, Forward } from "lucide-react"
import Link from "next/link"
import {
    useGetCaretakerComplaintsQuery,
    useUpdateComplaintStatusMutation,
    useForwardComplaintToWardenMutation
} from '@/store/api/caretakerApi'
import { toast } from "sonner"


export default function CaretakerComplaints() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'resolved'>("all")
    const [filterPriority, setFilterPriority] = useState<'low' | 'medium' | 'high' | undefined>(undefined)
    const [page, setPage] = useState(1)
    const limit = 10

    // API hooks
    const { data: complaintsResponse, isLoading, error, refetch } = useGetCaretakerComplaintsQuery({
        page,
        limit,
        status: filterStatus,
        priority: filterPriority,
        search: searchQuery
    })

    const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation()
    const [forwardToWarden, { isLoading: isForwarding }] = useForwardComplaintToWardenMutation()

    // Handle nested response structure
    const complaints = Array.isArray((complaintsResponse?.data as any)?.complaints)
        ? (complaintsResponse?.data as any).complaints
        : Array.isArray(complaintsResponse?.data)
            ? complaintsResponse.data
            : []

    const pagination = (complaintsResponse?.data as any)?.pagination
    const total = pagination?.total || complaintsResponse?.total || 0
    const totalPages = pagination?.pages || (complaintsResponse?.limit ? Math.ceil(total / complaintsResponse.limit) : 1)

    // Calculate stats from complaints
    const stats = {
        total,
        pending: complaints.filter((c: any) => c.status === 'pending').length,
        inProgress: complaints.filter((c: any) => c.status === 'in_progress').length,
        resolved: complaints.filter((c: any) => c.status === 'resolved').length
    }

    const handleStatusUpdate = async (complaintId: string, status: 'pending' | 'in_progress' | 'resolved') => {
        try {
            await updateStatus({
                id: complaintId,
                data: { status }
            }).unwrap()
            toast.success(`Complaint marked as ${status.replace('_', ' ')}`)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update status')
        }
    }

    const handleForward = async (complaintId: string) => {
        try {
            await forwardToWarden({
                id: complaintId,
                data: {
                    notes: 'Forwarded for higher attention',
                    priority: 'high'
                }
            }).unwrap()
            toast.success('Complaint forwarded to warden')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to forward complaint')
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 dark:from-orange-500/20 dark:via-red-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/caretaker/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                                    Complaints Management
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    View and manage student complaints ({stats.total} total)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search complaints..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="h-10 w-[140px] rounded-md border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white px-3 text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            {/* Priority Filter */}
                            <select
                                value={filterPriority || "all"}
                                onChange={(e) => setFilterPriority(e.target.value === "all" ? undefined : e.target.value as any)}
                                className="h-10 w-[140px] rounded-md border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white px-3 text-sm"
                            >
                                <option value="all">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg shadow-gray-500/50">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
                            <p className="text-xs text-muted-foreground mt-1">Pending</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</div>
                            <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</div>
                            <p className="text-xs text-muted-foreground mt-1">Resolved</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Complaints List */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                    <p className="text-lg text-muted-foreground">Failed to load complaints</p>
                    <Button onClick={() => refetch()}>Retry</Button>
                </div>
            ) : complaints.length === 0 ? (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">No complaints found</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {complaints.map((complaint: any) => {
                            const getStatusBadge = (status: string) => {
                                switch (status) {
                                    case 'pending':
                                        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: Clock }
                                    case 'in_progress':
                                        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: AlertTriangle }
                                    case 'resolved':
                                        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle2 }
                                    default:
                                        return { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', icon: MessageSquare }
                                }
                            }

                            const getPriorityBadge = (priority: string) => {
                                switch (priority) {
                                    case 'high':
                                        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                    case 'medium':
                                        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                    case 'low':
                                        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    default:
                                        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                                }
                            }

                            const statusBadge = getStatusBadge(complaint.status)
                            const StatusIcon = statusBadge.icon

                            return (
                                <div key={complaint._id || complaint.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{complaint.title || complaint.subject}</h3>
                                                    <span className={`inline-flex items-center gap-1 ${statusBadge.bg} ${statusBadge.text} px-2.5 py-1 rounded-full text-xs font-semibold capitalize`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {complaint.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        Reported by: <strong className="text-gray-900 dark:text-white">{complaint.student?.name || complaint.studentName || 'Unknown'}</strong>
                                                    </span>
                                                    {complaint.room && (
                                                        <>
                                                            <span className="text-gray-600 dark:text-gray-400">•</span>
                                                            <span className="text-gray-600 dark:text-gray-400">
                                                                Room {complaint.room.roomNumber || complaint.roomNumber}
                                                            </span>
                                                        </>
                                                    )}
                                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {new Date(complaint.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{complaint.description}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs ${getPriorityBadge(complaint.priority)} px-2.5 py-1 rounded-full font-semibold capitalize`}>
                                                        {complaint.priority} Priority
                                                    </span>
                                                    {complaint.category && (
                                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold capitalize">
                                                            {complaint.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                            {complaint.status === 'pending' && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => handleStatusUpdate(complaint._id || complaint.id, 'in_progress')}
                                                    disabled={isUpdating}
                                                >
                                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                                    Mark In Progress
                                                </Button>
                                            )}
                                            {complaint.status === 'in_progress' && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => handleStatusUpdate(complaint._id || complaint.id, 'resolved')}
                                                    disabled={isUpdating}
                                                >
                                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                                    Mark Resolved
                                                </Button>
                                            )}
                                            {complaint.status !== 'resolved' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleForward(complaint._id || complaint.id)}
                                                    disabled={isForwarding}
                                                >
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Forward to Warden
                                                </Button>
                                            )}
                                            <Button size="sm" variant="ghost">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} complaints
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
