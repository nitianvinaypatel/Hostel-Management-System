'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowUp, AlertTriangle, Clock, DollarSign, User, CheckCircle2, XCircle, AlertCircle, ArrowLeft, ClipboardList, Loader2 } from "lucide-react"
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
    useGetWardenRequisitionsQuery,
    useApproveWardenRequisitionMutation,
    useRejectWardenRequisitionMutation,
    useEscalateWardenRequisitionMutation,
} from '@/store/api/wardenApi'

type Requisition = {
    id: string
    caretakerId: string
    caretakerName: string
    caretakerEmail: string
    caretakerPhone: string
    type: "maintenance" | "supplies" | "equipment" | "other"
    title: string
    description: string
    estimatedCost: number
    priority: "urgent" | "high" | "medium" | "low"
    status: "pending" | "approved" | "rejected" | "escalated"
    submittedAt: string
    reviewedAt?: string
}

export default function WardenRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected" | "escalated">("pending")
    const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)

    // Fetch requisitions using RTK Query
    const { data, isLoading, error } = useGetWardenRequisitionsQuery({
        status: filterStatus === 'all' ? undefined : filterStatus,
        search: searchTerm || undefined,
        page: 1,
        limit: 20
    })

    const [approveRequisition, { isLoading: isApproving }] = useApproveWardenRequisitionMutation()
    const [rejectRequisition, { isLoading: isRejecting }] = useRejectWardenRequisitionMutation()
    const [escalateRequisition, { isLoading: isEscalating }] = useEscalateWardenRequisitionMutation()

    const requisitions = data?.data || []
    const stats = data?.stats || {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    }

    // Remove mock data
    /*const [requisitions, setRequisitions] = useState<Requisition[]>([
        {
            id: "REQ001",
            caretakerId: "CT001",
            caretakerName: "Ram Kumar",
            caretakerEmail: "ram.kumar@hostel.edu",
            caretakerPhone: "+1234567900",
            type: "maintenance",
            title: "Plumbing Repair - Block A",
            description: "Multiple taps leaking on 2nd and 3rd floor. Need immediate plumber service to prevent water wastage and damage.",
            estimatedCost: 15000,
            priority: "urgent",
            status: "pending",
            submittedAt: "2024-01-15T10:30:00"
        },
        {
            id: "REQ002",
            caretakerId: "CT002",
            caretakerName: "Shyam Singh",
            caretakerEmail: "shyam.singh@hostel.edu",
            caretakerPhone: "+1234567901",
            type: "supplies",
            title: "Cleaning Supplies Restock",
            description: "Need to restock cleaning supplies for the month - detergents, mops, brooms, disinfectants, and garbage bags.",
            estimatedCost: 8000,
            priority: "medium",
            status: "pending",
            submittedAt: "2024-01-15T09:15:00"
        },
        {
            id: "REQ003",
            caretakerId: "CT001",
            caretakerName: "Ram Kumar",
            caretakerEmail: "ram.kumar@hostel.edu",
            caretakerPhone: "+1234567900",
            type: "equipment",
            title: "Replace Broken Fans - Block C",
            description: "5 ceiling fans in Block C rooms need replacement. Not working since last week, students complaining about heat.",
            estimatedCost: 25000,
            priority: "high",
            status: "approved",
            submittedAt: "2024-01-14T16:45:00",
            reviewedAt: "2024-01-15T08:30:00"
        },
        {
            id: "REQ004",
            caretakerId: "CT003",
            caretakerName: "Mohan Lal",
            caretakerEmail: "mohan.lal@hostel.edu",
            caretakerPhone: "+1234567902",
            type: "maintenance",
            title: "Electrical Wiring Check - Mess Hall",
            description: "Frequent power fluctuations in mess hall. Need electrician for complete wiring check and repair to prevent accidents.",
            estimatedCost: 35000,
            priority: "urgent",
            status: "pending",
            submittedAt: "2024-01-14T14:20:00"
        },
        {
            id: "REQ005",
            caretakerId: "CT002",
            caretakerName: "Shyam Singh",
            caretakerEmail: "shyam.singh@hostel.edu",
            caretakerPhone: "+1234567901",
            type: "equipment",
            title: "New Water Purifiers - Block B",
            description: "Current water purifiers in Block B are old and not functioning properly. Need 3 new RO water purifiers.",
            estimatedCost: 45000,
            priority: "high",
            status: "escalated",
            submittedAt: "2024-01-13T11:00:00",
            reviewedAt: "2024-01-14T09:00:00"
        },
        {
            id: "REQ006",
            caretakerId: "CT001",
            caretakerName: "Ram Kumar",
            caretakerEmail: "ram.kumar@hostel.edu",
            caretakerPhone: "+1234567900",
            type: "supplies",
            title: "Pest Control Service",
            description: "Monthly pest control service required for all blocks. Last service was done 6 weeks ago.",
            estimatedCost: 12000,
            priority: "medium",
            status: "approved",
            submittedAt: "2024-01-12T14:30:00",
            reviewedAt: "2024-01-13T10:15:00"
        },
        {
            id: "REQ007",
            caretakerId: "CT003",
            caretakerName: "Mohan Lal",
            caretakerEmail: "mohan.lal@hostel.edu",
            caretakerPhone: "+1234567902",
            type: "maintenance",
            title: "Roof Waterproofing - Block D",
            description: "Roof leakage issues in Block D during rain. Need waterproofing treatment before monsoon season.",
            estimatedCost: 55000,
            priority: "high",
            status: "pending",
            submittedAt: "2024-01-14T08:45:00"
        },
        {
            id: "REQ008",
            caretakerId: "CT002",
            caretakerName: "Shyam Singh",
            caretakerEmail: "shyam.singh@hostel.edu",
            caretakerPhone: "+1234567901",
            type: "other",
            title: "Fire Safety Equipment Inspection",
            description: "Annual fire safety equipment inspection and refilling of fire extinguishers as per safety regulations.",
            estimatedCost: 18000,
            priority: "high",
            status: "pending",
            submittedAt: "2024-01-13T16:20:00"
        },
    ])*/

    const filteredRequisitions = requisitions

    const statCards = [
        {
            title: 'Total Requisitions',
            value: stats.total.toString(),
            icon: ClipboardList,
            gradient: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/30',
            border: 'border-emerald-200/50 dark:border-emerald-800/50',
            shadow: 'hover:shadow-emerald-500/20',
            iconGradient: 'from-emerald-500 to-emerald-600',
            iconShadow: 'shadow-emerald-500/50',
            textColor: 'text-emerald-700 dark:text-emerald-300',
            valueColor: 'text-emerald-900 dark:text-emerald-100',
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

    const getTypeColor = (type: string) => {
        switch (type) {
            case "maintenance": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700"
            case "supplies": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700"
            case "equipment": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700"
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-300 dark:border-gray-700"
        }
    }

    const handleView = (requisition: Requisition) => {
        setSelectedRequisition(requisition)
        setViewDialogOpen(true)
    }

    const handleApprove = async (reqId: string) => {
        try {
            await approveRequisition({ id: reqId, comments: 'Requisition approved' }).unwrap()
            toast.success("Requisition approved successfully!")
        } catch (error) {
            toast.error("Failed to approve requisition")
            console.error(error)
        }
    }

    const handleReject = async (reqId: string) => {
        try {
            await rejectRequisition({ id: reqId, comments: 'Requisition rejected' }).unwrap()
            toast.error("Requisition rejected")
        } catch (error) {
            toast.error("Failed to reject requisition")
            console.error(error)
        }
    }

    const handleEscalate = async (reqId: string) => {
        try {
            await escalateRequisition({
                id: reqId,
                data: { escalationReason: 'Requires Dean approval' }
            }).unwrap()
            toast.info("Requisition escalated to Dean")
        } catch (error) {
            toast.error("Failed to escalate requisition")
            console.error(error)
        }
    }

    const handleQuickFilter = (status: typeof filterStatus) => {
        setFilterStatus(status)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:via-teal-500/20 dark:to-cyan-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-cyan-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                    Caretaker Requisitions
                                </h1>
                                <p className="text-muted-foreground text-lg">Review and approve requisitions from caretakers</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search requisitions..."
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
                                <option value="escalated">Escalated</option>
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
                        <span className="ml-3 text-muted-foreground">Loading requisitions...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500 opacity-50" />
                        <p className="text-red-500 text-lg">Failed to load requisitions</p>
                        <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
                    </div>
                ) : filteredRequisitions.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground text-lg">No requisitions found</p>
                        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredRequisitions.map((req) => (
                            <div key={req.id} className={`group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${req.priority === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30'}`}>
                                <div className="flex items-start gap-4 mb-4">
                                    {req.priority === 'urgent' && (
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse flex-shrink-0">
                                            <AlertTriangle className="h-6 w-6 text-white" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{req.id}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(req.type)}`}>
                                                {req.type}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${req.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                req.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                    req.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                                }`}>
                                                {req.priority}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${req.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                req.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                    req.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                        'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{req.title}</h3>
                                        <p className="text-sm mb-4 font-medium text-gray-700 dark:text-gray-300">{req.description}</p>

                                        <div className="grid md:grid-cols-3 gap-3 mb-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-semibold">Requested by</p>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{req.caretakerName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-semibold">Estimated Cost</p>
                                                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹{req.estimatedCost.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-semibold">Submitted</p>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{new Date(req.submittedAt).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {req.reviewedAt && (
                                            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1 mb-3">
                                                <Clock className="h-3 w-3" />
                                                Reviewed: {new Date(req.reviewedAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        variant="outline"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => handleView(req)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    {req.status === 'pending' && (
                                        <>
                                            <Button
                                                className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
                                                onClick={() => handleApprove(req.id)}
                                                disabled={isApproving || isRejecting || isEscalating}
                                            >
                                                {isApproving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                                Approve
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1 sm:flex-none"
                                                onClick={() => handleEscalate(req.id)}
                                                disabled={isApproving || isRejecting || isEscalating}
                                            >
                                                {isEscalating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ArrowUp className="h-4 w-4 mr-2" />}
                                                Escalate to Dean
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="flex-1 sm:flex-none shadow-md"
                                                onClick={() => handleReject(req.id)}
                                                disabled={isApproving || isRejecting || isEscalating}
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
                        <DialogTitle className="text-2xl">Requisition Details</DialogTitle>
                        <DialogDescription>
                            Review the complete information for this requisition
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRequisition && (
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{selectedRequisition.id}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(selectedRequisition.type)}`}>
                                    {selectedRequisition.type.toUpperCase()}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedRequisition.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                    selectedRequisition.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                        selectedRequisition.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                    }`}>
                                    {selectedRequisition.priority.toUpperCase()}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedRequisition.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                    selectedRequisition.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                        selectedRequisition.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                            'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                                    }`}>
                                    {selectedRequisition.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Title</label>
                                    <p className="text-base font-bold mt-1">{selectedRequisition.title}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Description</label>
                                    <p className="text-base font-medium mt-1">{selectedRequisition.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Caretaker Name</label>
                                        <p className="text-base font-medium mt-1">{selectedRequisition.caretakerName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Caretaker ID</label>
                                        <p className="text-base font-medium mt-1">{selectedRequisition.caretakerId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Email</label>
                                        <p className="text-base font-medium mt-1">{selectedRequisition.caretakerEmail}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                                        <p className="text-base font-medium mt-1">{selectedRequisition.caretakerPhone}</p>
                                    </div>
                                </div>

                                <div className="p-4 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/30">
                                    <label className="text-sm font-semibold text-muted-foreground">Estimated Cost</label>
                                    <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">₹{selectedRequisition.estimatedCost.toLocaleString()}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Submitted At</label>
                                        <p className="text-base font-medium mt-1">
                                            {new Date(selectedRequisition.submittedAt).toLocaleString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </p>
                                    </div>
                                    {selectedRequisition.reviewedAt && (
                                        <div>
                                            <label className="text-sm font-semibold text-muted-foreground">Reviewed At</label>
                                            <p className="text-base font-medium mt-1">
                                                {new Date(selectedRequisition.reviewedAt).toLocaleString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>
                        {selectedRequisition?.status === 'pending' && (
                            <>
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                    onClick={() => {
                                        handleApprove(selectedRequisition.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleEscalate(selectedRequisition.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    <ArrowUp className="h-4 w-4 mr-2" />
                                    Escalate to Dean
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        handleReject(selectedRequisition.id)
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
