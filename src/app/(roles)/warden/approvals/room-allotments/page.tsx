'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowLeft, Clock, DoorOpen, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
    useGetWardenApprovalsQuery,
    useApproveWardenRequestMutation,
    useRejectWardenRequestMutation,
} from '@/store/api/wardenApi'

type RoomAllotment = {
    id: string
    studentId: string
    studentName: string
    email: string
    phone: string
    currentRoom: string
    requestedRoom: string
    reason: string
    submittedAt: string
    status: "pending" | "approved" | "rejected"
}

export default function RoomAllotments() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending")
    const [selectedAllotment, setSelectedAllotment] = useState<RoomAllotment | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)

    // Fetch room allotment requests using RTK Query
    const { data, isLoading, error } = useGetWardenApprovalsQuery({
        type: 'room-allotment',
        status: filterStatus === 'all' ? undefined : filterStatus,
        search: searchTerm || undefined,
        page: 1,
        limit: 20
    })

    const [approveRequest, { isLoading: isApproving }] = useApproveWardenRequestMutation()
    const [rejectRequest, { isLoading: isRejecting }] = useRejectWardenRequestMutation()

    const allotments = (data?.data || []) as unknown as RoomAllotment[]
    const stats = {
        total: data?.stats?.totalApprovals || 0,
        pending: data?.stats?.pending || 0,
        approved: data?.stats?.approved || 0,
        rejected: data?.stats?.rejected || 0
    }

    // Remove mock data
    /*const [allotments, setAllotments] = useState<RoomAllotment[]>([
        {
            id: "1",
            studentId: "STU001",
            studentName: "John Doe",
            email: "john.doe@university.edu",
            phone: "+1234567890",
            currentRoom: "105, Block A",
            requestedRoom: "201, Block A",
            reason: "Closer to classes, better study environment. Current room is far from academic buildings.",
            submittedAt: "2024-01-15T10:30:00",
            status: "pending"
        },
        {
            id: "2",
            studentId: "STU004",
            studentName: "Sarah Williams",
            email: "sarah.williams@university.edu",
            phone: "+1234567893",
            currentRoom: "None",
            requestedRoom: "102, Block B",
            reason: "New admission, roommate request with Emily Davis for better study coordination",
            submittedAt: "2024-01-15T09:15:00",
            status: "pending"
        },
        {
            id: "3",
            studentId: "STU003",
            studentName: "Mike Johnson",
            email: "mike.johnson@university.edu",
            phone: "+1234567892",
            currentRoom: "305, Block C",
            requestedRoom: "210, Block A",
            reason: "Medical reasons - need ground floor access due to mobility issues",
            submittedAt: "2024-01-14T16:45:00",
            status: "approved"
        },
        {
            id: "4",
            studentId: "STU007",
            studentName: "David Wilson",
            email: "david.wilson@university.edu",
            phone: "+1234567896",
            currentRoom: "None",
            requestedRoom: "310, Block C",
            reason: "Need single occupancy room for health reasons and better focus on studies",
            submittedAt: "2024-01-13T15:45:00",
            status: "pending"
        },
        {
            id: "5",
            studentId: "STU009",
            studentName: "Alex Turner",
            email: "alex.turner@university.edu",
            phone: "+1234567898",
            currentRoom: "208, Block B",
            requestedRoom: "405, Block A",
            reason: "Requested room has better ventilation and natural light",
            submittedAt: "2024-01-12T11:20:00",
            status: "rejected"
        },
        {
            id: "6",
            studentId: "STU010",
            studentName: "Emma Brown",
            email: "emma.brown@university.edu",
            phone: "+1234567899",
            currentRoom: "None",
            requestedRoom: "215, Block B",
            reason: "New student, prefer quieter floor for better concentration",
            submittedAt: "2024-01-14T14:30:00",
            status: "pending"
        },
        {
            id: "7",
            studentId: "STU011",
            studentName: "James Miller",
            email: "james.miller@university.edu",
            phone: "+1234567800",
            currentRoom: "112, Block C",
            requestedRoom: "303, Block A",
            reason: "Closer to library and study areas, current room too noisy",
            submittedAt: "2024-01-13T09:00:00",
            status: "approved"
        },
    ])*/

    const filteredAllotments = allotments

    const statCards = [
        {
            title: 'Total Requests',
            value: stats.total.toString(),
            icon: DoorOpen,
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-blue-600',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
        },
        {
            title: 'Pending',
            value: stats.pending.toString(),
            icon: Clock,
            gradient: 'from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/30',
            border: 'border-yellow-200/50 dark:border-yellow-800/50',
            shadow: 'hover:shadow-yellow-500/20',
            iconGradient: 'from-yellow-500 to-yellow-600',
            iconShadow: 'shadow-yellow-500/50',
            textColor: 'text-yellow-700 dark:text-yellow-300',
            valueColor: 'text-yellow-900 dark:text-yellow-100',
        },
        {
            title: 'Approved',
            value: stats.approved.toString(),
            icon: CheckCircle2,
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-green-600',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
        },
        {
            title: 'Rejected',
            value: stats.rejected.toString(),
            icon: XCircle,
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-red-600',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
        },
    ]

    const handleView = (allotment: RoomAllotment) => {
        setSelectedAllotment(allotment)
        setViewDialogOpen(true)
    }

    const handleApprove = async (allotmentId: string) => {
        try {
            await approveRequest({ id: allotmentId, comments: 'Room allotment approved' }).unwrap()
            toast.success("Room allotment request approved successfully!")
        } catch (error) {
            toast.error("Failed to approve request")
            console.error(error)
        }
    }

    const handleReject = async (allotmentId: string) => {
        try {
            await rejectRequest({ id: allotmentId, comments: 'Room allotment rejected' }).unwrap()
            toast.error("Room allotment request rejected")
        } catch (error) {
            toast.error("Failed to reject request")
            console.error(error)
        }
    }

    const handleQuickFilter = (status: typeof filterStatus) => {
        setFilterStatus(status)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/approvals">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                    Room Allotment Requests
                                </h1>
                                <p className="text-muted-foreground text-lg">Review and approve room allotment requests</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search requests..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                                className="px-4 py-2 h-10 border rounded-lg bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 font-medium text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <button
                        key={stat.title}
                        onClick={() => {
                            if (index === 1) handleQuickFilter("pending")
                            else if (index === 2) handleQuickFilter("approved")
                            else if (index === 3) handleQuickFilter("rejected")
                            else handleQuickFilter("all")
                        }}
                        className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border ${stat.border} rounded-2xl p-6 hover:shadow-2xl ${stat.shadow} hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-left`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} group-hover:opacity-80 transition-all duration-300`} />
                        <div className="relative flex items-center justify-between mb-4">
                            <h3 className={`text-sm font-semibold ${stat.textColor}`}>{stat.title}</h3>
                            <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${stat.iconGradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${stat.iconShadow}`}>
                                <stat.icon className="h-7 w-7 text-white" />
                            </div>
                        </div>
                        <p className={`text-4xl font-bold mb-2 ${stat.valueColor}`}>{stat.value}</p>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <span className="ml-3 text-muted-foreground">Loading requests...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500 opacity-50" />
                        <p className="text-red-500 text-lg">Failed to load requests</p>
                        <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
                    </div>
                ) : filteredAllotments.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground text-lg">No room allotment requests found</p>
                        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredAllotments.map((allotment) => (
                            <div key={allotment.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                                <div className="flex flex-col gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{allotment.studentName}</h3>
                                            <span className="text-sm text-muted-foreground font-medium">({allotment.studentId})</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${allotment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                allotment.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                                }`}>
                                                {allotment.status}
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DoorOpen className="h-4 w-4 text-muted-foreground" />
                                                    <p className="text-xs text-muted-foreground font-semibold">Current Room</p>
                                                </div>
                                                <p className="font-bold text-gray-900 dark:text-gray-100">{allotment.currentRoom}</p>
                                            </div>
                                            <div className="p-4 border-2 border-primary rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DoorOpen className="h-4 w-4 text-primary" />
                                                    <p className="text-xs text-muted-foreground font-semibold">Requested Room</p>
                                                </div>
                                                <p className="font-bold text-primary">{allotment.requestedRoom}</p>
                                            </div>
                                        </div>

                                        <div className="mb-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-1 font-semibold">Reason</p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{allotment.reason}</p>
                                        </div>

                                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Submitted: {new Date(allotment.submittedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        variant="outline"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => handleView(allotment)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    {allotment.status === 'pending' && (
                                        <>
                                            <Button
                                                className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
                                                onClick={() => handleApprove(allotment.id)}
                                                disabled={isApproving || isRejecting}
                                            >
                                                {isApproving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                                Approve
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="flex-1 sm:flex-none shadow-md"
                                                onClick={() => handleReject(allotment.id)}
                                                disabled={isApproving || isRejecting}
                                            >
                                                {isRejecting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <X className="h-4 w-4 mr-2" />}
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Room Allotment Details</DialogTitle>
                        <DialogDescription>
                            Review the complete information for this room allotment request
                        </DialogDescription>
                    </DialogHeader>
                    {selectedAllotment && (
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedAllotment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                    selectedAllotment.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                    }`}>
                                    {selectedAllotment.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Student Name</label>
                                        <p className="text-base font-medium mt-1">{selectedAllotment.studentName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Student ID</label>
                                        <p className="text-base font-medium mt-1">{selectedAllotment.studentId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Email</label>
                                        <p className="text-base font-medium mt-1">{selectedAllotment.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                                        <p className="text-base font-medium mt-1">{selectedAllotment.phone}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50">
                                        <label className="text-sm font-semibold text-muted-foreground">Current Room</label>
                                        <p className="text-base font-bold mt-1">{selectedAllotment.currentRoom}</p>
                                    </div>
                                    <div className="p-4 border-2 border-primary rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                                        <label className="text-sm font-semibold text-muted-foreground">Requested Room</label>
                                        <p className="text-base font-bold mt-1 text-primary">{selectedAllotment.requestedRoom}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Reason</label>
                                    <p className="text-base font-medium mt-1">{selectedAllotment.reason}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Submitted At</label>
                                    <p className="text-base font-medium mt-1">
                                        {new Date(selectedAllotment.submittedAt).toLocaleString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>
                        {selectedAllotment?.status === 'pending' && (
                            <>
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                    onClick={() => {
                                        handleApprove(selectedAllotment.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        handleReject(selectedAllotment.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Reject
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}
