'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClipboardList, Search, CheckCircle2, XCircle, Clock, ArrowRightLeft, Building2, Eye, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import {
    useGetCaretakerRequestsQuery,
    useApproveRequestMutation,
    useRejectRequestMutation
} from '@/store/api/caretakerApi'
import { toast } from "sonner"

export default function Requests() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>("all")
    const [filterType, setFilterType] = useState<'all' | 'room_change' | 'hostel_change'>("all")
    const [page, setPage] = useState(1)
    const limit = 10

    // API hooks
    const { data: requestsResponse, isLoading, error, refetch } = useGetCaretakerRequestsQuery({
        page,
        limit,
        status: filterStatus,
        type: filterType,
        search: searchQuery
    })

    const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation()
    const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation()

    // Handle nested response structure
    const requests = Array.isArray((requestsResponse?.data as any)?.requests)
        ? (requestsResponse?.data as any).requests
        : Array.isArray(requestsResponse?.data)
            ? requestsResponse.data
            : []

    const pagination = (requestsResponse?.data as any)?.pagination
    const total = pagination?.total || requestsResponse?.total || 0
    const totalPages = pagination?.pages || (requestsResponse?.limit ? Math.ceil(total / requestsResponse.limit) : 1)

    // Calculate stats
    const stats = {
        total,
        pending: requests.filter((r: any) => r.status === 'pending').length,
        approved: requests.filter((r: any) => r.status === 'approved').length,
        rejected: requests.filter((r: any) => r.status === 'rejected').length
    }

    const handleApprove = async (requestId: string) => {
        try {
            await approveRequest({
                id: requestId,
                data: { notes: 'Approved by caretaker' }
            }).unwrap()
            toast.success('Request approved successfully')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to approve request')
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            await rejectRequest({
                id: requestId,
                data: {
                    reason: 'Rejected by caretaker',
                    notes: 'Request does not meet requirements'
                }
            }).unwrap()
            toast.success('Request rejected')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to reject request')
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
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
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    Change Requests
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Manage student room and hostel change requests ({stats.total} total)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search requests..."
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
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            {/* Type Filter */}
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as any)}
                                className="h-10 w-[140px] rounded-md border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white px-3 text-sm"
                            >
                                <option value="all">All Types</option>
                                <option value="room_change">Room Change</option>
                                <option value="hostel_change">Hostel Change</option>
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
                            <p className="text-xs text-muted-foreground mt-1">Total Requests</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg shadow-gray-500/50">
                            <ClipboardList className="h-6 w-6 text-white" />
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
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.approved}</div>
                            <p className="text-xs text-muted-foreground mt-1">Approved</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
                            <p className="text-xs text-muted-foreground mt-1">Rejected</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <XCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <XCircle className="h-12 w-12 text-destructive" />
                    <p className="text-lg text-muted-foreground">Failed to load requests</p>
                    <Button onClick={() => refetch()}>Retry</Button>
                </div>
            ) : requests.length === 0 ? (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 text-center">
                    <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">No requests found</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {requests.map((request: any) => {
                            const getStatusBadge = (status: string) => {
                                switch (status) {
                                    case 'pending':
                                        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: Clock }
                                    case 'approved':
                                        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle2 }
                                    case 'rejected':
                                        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: XCircle }
                                    default:
                                        return { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', icon: ClipboardList }
                                }
                            }

                            const statusBadge = getStatusBadge(request.status)
                            const StatusIcon = statusBadge.icon
                            const isRoomChange = request.type === 'room_change'

                            return (
                                <div key={request._id || request.id} className={`bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${request.status !== 'pending' ? 'opacity-70' : ''}`}>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${isRoomChange ? 'from-blue-500 to-cyan-500 shadow-blue-500/50' : 'from-purple-500 to-pink-500 shadow-purple-500/50'} flex items-center justify-center shadow-lg`}>
                                                    {isRoomChange ? <ArrowRightLeft className="h-6 w-6 text-white" /> : <Building2 className="h-6 w-6 text-white" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white capitalize">{request.type?.replace('_', ' ')} Request</h3>
                                                        <span className={`inline-flex items-center gap-1 ${statusBadge.bg} ${statusBadge.text} px-2.5 py-1 rounded-full text-xs font-semibold capitalize`}>
                                                            <StatusIcon className="h-3 w-3" />
                                                            {request.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{request.student?.name || request.studentName || 'Unknown Student'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                                <div className="flex-1">
                                                    <p className="text-xs text-muted-foreground mb-1">Current {isRoomChange ? 'Room' : 'Hostel'}</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{request.currentRoom || request.currentHostel || 'N/A'}</p>
                                                </div>
                                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <p className="text-xs text-muted-foreground mb-1">Requested {isRoomChange ? 'Room' : 'Hostel'}</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{request.requestedRoom || request.requestedHostel || 'N/A'}</p>
                                                </div>
                                            </div>
                                            {request.reason && (
                                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                                    <p className="text-xs text-muted-foreground mb-1">Reason</p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">{request.reason}</p>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-4 text-xs">
                                                <span className="text-gray-600 dark:text-gray-400">Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                            {request.status === 'pending' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() => handleApprove(request._id || request.id)}
                                                        disabled={isApproving}
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                                        Approve Request
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleReject(request._id || request.id)}
                                                        disabled={isRejecting}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-2" />
                                                        Reject Request
                                                    </Button>
                                                </>
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
                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} requests
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


