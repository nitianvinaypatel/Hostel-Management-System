'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, AlertCircle, Building2, DoorOpen, CheckCircle2, XCircle, Clock, ArrowLeft, Loader2 } from "lucide-react"
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

type Approval = {
    id: string
    type: "room-allotment" | "hostel-change" | "complaint"
    student: string
    studentId: string
    email: string
    phone: string
    details: string
    reason: string
    submittedAt: string
    status: "pending" | "approved" | "rejected"
}

export default function WardenApprovals() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState<"all" | "room-allotment" | "hostel-change" | "complaint">("all")
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending")
    const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)

    // Fetch approvals using RTK Query
    const { data, isLoading, error } = useGetWardenApprovalsQuery({
        type: filterType === 'all' ? undefined : filterType,
        status: filterStatus === 'all' ? undefined : filterStatus,
        search: searchTerm || undefined,
        page: 1,
        limit: 20
    })

    const [approveRequest, { isLoading: isApproving }] = useApproveWardenRequestMutation()
    const [rejectRequest, { isLoading: isRejecting }] = useRejectWardenRequestMutation()

    const approvals = data?.data || []
    const stats = data?.stats || {
        totalApprovals: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    }

    // Remove mock data - now using API
    /*const [approvals, setApprovals] = useState<Approval[]>([
        {
            id: "1",
            type: "room-allotment",
            student: "John Doe",
            studentId: "STU001",
            email: "john.doe@university.edu",
            phone: "+1234567890",
            details: "Room 201, Block A",
            reason: "Closer to classes and better study environment",
            submittedAt: "2024-01-15T10:30:00",
            status: "pending"
        },
        {
            id: "2",
            type: "hostel-change",
            student: "Jane Smith",
            studentId: "STU002",
            email: "jane.smith@university.edu",
            phone: "+1234567891",
            details: "From Hostel A to Hostel B",
            reason: "Medical reasons - need ground floor accommodation",
            submittedAt: "2024-01-15T09:15:00",
            status: "pending"
        },
        {
            id: "3",
            type: "complaint",
            student: "Mike Johnson",
            studentId: "STU003",
            email: "mike.johnson@university.edu",
            phone: "+1234567892",
            details: "AC not working in Room 305",
            reason: "AC has been malfunctioning for 3 days, room temperature unbearable",
            submittedAt: "2024-01-14T16:45:00",
            status: "pending"
        },
        {
            id: "4",
            type: "room-allotment",
            student: "Sarah Williams",
            studentId: "STU004",
            email: "sarah.williams@university.edu",
            phone: "+1234567893",
            details: "Room 102, Block B",
            reason: "Roommate request with Emily Davis",
            submittedAt: "2024-01-13T14:20:00",
            status: "approved"
        },
        {
            id: "5",
            type: "hostel-change",
            student: "Robert Brown",
            studentId: "STU005",
            email: "robert.brown@university.edu",
            phone: "+1234567894",
            details: "From Hostel C to Hostel A",
            reason: "Closer to department and library",
            submittedAt: "2024-01-12T11:00:00",
            status: "rejected"
        },
        {
            id: "6",
            type: "complaint",
            student: "Emily Davis",
            studentId: "STU006",
            email: "emily.davis@university.edu",
            phone: "+1234567895",
            details: "Water leakage in bathroom - Room 405",
            reason: "Severe water leakage causing damage to personal belongings",
            submittedAt: "2024-01-14T08:30:00",
            status: "pending"
        },
        {
            id: "7",
            type: "room-allotment",
            student: "David Wilson",
            studentId: "STU007",
            email: "david.wilson@university.edu",
            phone: "+1234567896",
            details: "Room 310, Block C",
            reason: "Need single occupancy room for health reasons",
            submittedAt: "2024-01-13T15:45:00",
            status: "pending"
        },
        {
            id: "8",
            type: "complaint",
            student: "Lisa Anderson",
            studentId: "STU008",
            email: "lisa.anderson@university.edu",
            phone: "+1234567897",
            details: "Broken window in Room 205",
            reason: "Window broken during storm, security concern",
            submittedAt: "2024-01-11T13:20:00",
            status: "approved"
        },
    ])*/

    const filteredApprovals = approvals

    const statCards = [
        {
            title: 'Total Approvals',
            value: stats.totalApprovals.toString(),
            icon: Clock,
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

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "room-allotment": return "Room Allotment"
            case "hostel-change": return "Hostel Change"
            case "complaint": return "Complaint"
            default: return type
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "room-allotment": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700"
            case "hostel-change": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700"
            case "complaint": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700"
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-300 dark:border-gray-700"
        }
    }

    const handleView = (approval: Approval) => {
        setSelectedApproval(approval)
        setViewDialogOpen(true)
    }

    const handleApprove = async (approvalId: string) => {
        try {
            await approveRequest({ id: approvalId, comments: 'Approved' }).unwrap()
            toast.success("Approval request approved successfully!")
        } catch (error) {
            toast.error("Failed to approve request")
            console.error(error)
        }
    }

    const handleReject = async (approvalId: string) => {
        try {
            await rejectRequest({ id: approvalId, comments: 'Rejected' }).unwrap()
            toast.error("Approval request rejected")
        } catch (error) {
            toast.error("Failed to reject request")
            console.error(error)
        }
    }

    const handleQuickFilter = (type: typeof filterType, status: typeof filterStatus = "all") => {
        setFilterType(type)
        setFilterStatus(status)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                                    All Approvals
                                </h1>
                                <p className="text-muted-foreground text-lg">Review and approve student requests</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search approvals..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            {/* Type Filter */}
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                                className="px-4 py-2 h-10 border rounded-lg bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 font-medium text-sm"
                            >
                                <option value="all">All Types</option>
                                <option value="room-allotment">Room Allotment</option>
                                <option value="hostel-change">Hostel Change</option>
                                <option value="complaint">Complaint</option>
                            </select>
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
                            if (index === 1) handleQuickFilter("all", "pending")
                            else if (index === 2) handleQuickFilter("all", "approved")
                            else if (index === 3) handleQuickFilter("all", "rejected")
                            else handleQuickFilter("all", "all")
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
                        <span className="ml-3 text-muted-foreground">Loading approvals...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500 opacity-50" />
                        <p className="text-red-500 text-lg">Failed to load approvals</p>
                        <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
                    </div>
                ) : filteredApprovals.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground text-lg">No approvals found</p>
                        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredApprovals.map((approval) => (
                            <div key={approval.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(approval.type)}`}>
                                                {getTypeLabel(approval.type)}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${approval.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                approval.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                                }`}>
                                                {approval.status}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{approval.student}</h3>
                                        <p className="text-sm mb-2 font-medium text-gray-700 dark:text-gray-300">{approval.details}</p>
                                        <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold">Reason:</span> {approval.reason}</p>
                                        <p className="text-xs text-muted-foreground font-medium">
                                            Submitted: {new Date(approval.submittedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 lg:flex-none"
                                            onClick={() => handleView(approval)}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                        {approval.status === 'pending' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="flex-1 lg:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
                                                    onClick={() => handleApprove(approval.id)}
                                                    disabled={isApproving || isRejecting}
                                                >
                                                    {isApproving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="flex-1 lg:flex-none shadow-md"
                                                    onClick={() => handleReject(approval.id)}
                                                    disabled={isApproving || isRejecting}
                                                >
                                                    {isRejecting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <X className="h-4 w-4 mr-2" />}
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </div>
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
                        <DialogTitle className="text-2xl">Approval Details</DialogTitle>
                        <DialogDescription>
                            Review the complete information for this request
                        </DialogDescription>
                    </DialogHeader>
                    {selectedApproval && (
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(selectedApproval.type)}`}>
                                    {getTypeLabel(selectedApproval.type)}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedApproval.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                    selectedApproval.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                    }`}>
                                    {selectedApproval.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Student Name</label>
                                        <p className="text-base font-medium mt-1">{selectedApproval.student}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Student ID</label>
                                        <p className="text-base font-medium mt-1">{selectedApproval.studentId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Email</label>
                                        <p className="text-base font-medium mt-1">{selectedApproval.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                                        <p className="text-base font-medium mt-1">{selectedApproval.phone}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Details</label>
                                    <p className="text-base font-medium mt-1">{selectedApproval.details}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Reason</label>
                                    <p className="text-base font-medium mt-1">{selectedApproval.reason}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Submitted At</label>
                                    <p className="text-base font-medium mt-1">
                                        {new Date(selectedApproval.submittedAt).toLocaleString("en-US", {
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
                        {selectedApproval?.status === 'pending' && (
                            <>
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                    onClick={() => {
                                        handleApprove(selectedApproval.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        handleReject(selectedApproval.id)
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
