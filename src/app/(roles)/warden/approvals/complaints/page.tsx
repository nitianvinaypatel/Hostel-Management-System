'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, ArrowLeft, AlertTriangle, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"
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
    useGetWardenComplaintsQuery,
    useAssignWardenComplaintMutation,
    useResolveWardenComplaintMutation,
    useEscalateWardenComplaintMutation,
} from '@/store/api/wardenApi'

type Complaint = {
    id: string
    studentId: string
    studentName: string
    email: string
    phone: string
    category: "maintenance" | "cleanliness" | "food" | "security" | "other"
    description: string
    priority: "urgent" | "high" | "medium" | "low"
    status: "pending" | "in-progress" | "resolved" | "escalated"
    forwardedBy: string
    forwardedAt: string
    roomNumber: string
}

export default function ComplaintsApproval() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterPriority, setFilterPriority] = useState<"all" | "urgent" | "high" | "medium" | "low">("all")
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "resolved" | "escalated">("pending")
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)

    // Fetch complaints using RTK Query
    const { data, isLoading, error } = useGetWardenComplaintsQuery({
        priority: filterPriority === 'all' ? undefined : filterPriority,
        status: filterStatus === 'all' ? undefined : filterStatus,
        search: searchTerm || undefined,
        page: 1,
        limit: 20
    })

    const [assignComplaint, { isLoading: isAssigning }] = useAssignWardenComplaintMutation()
    const [resolveComplaint, { isLoading: isResolving }] = useResolveWardenComplaintMutation()
    const [escalateComplaint, { isLoading: isEscalating }] = useEscalateWardenComplaintMutation()

    const complaints = data?.data || []
    const stats = data?.stats || {
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    }

    // Remove mock data
    /*const [complaints, setComplaints] = useState<Complaint[]>([
        {
            id: "C001",
            studentId: "STU003",
            studentName: "Mike Johnson",
            email: "mike.johnson@university.edu",
            phone: "+1234567892",
            category: "maintenance",
            description: "AC not working in Room 305, Block C. Temperature is unbearable, affecting studies.",
            priority: "urgent",
            status: "pending",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-15T14:20:00",
            roomNumber: "305, Block C"
        },
        {
            id: "C002",
            studentId: "STU006",
            studentName: "Emily Davis",
            email: "emily.davis@university.edu",
            phone: "+1234567895",
            category: "cleanliness",
            description: "Common washroom on 2nd floor needs immediate cleaning, unhygienic conditions",
            priority: "high",
            status: "in-progress",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-15T11:45:00",
            roomNumber: "Common Area - 2nd Floor"
        },
        {
            id: "C003",
            studentId: "STU005",
            studentName: "Robert Brown",
            email: "robert.brown@university.edu",
            phone: "+1234567894",
            category: "food",
            description: "Food quality has deteriorated in the past week. Multiple students complaining about taste and hygiene.",
            priority: "high",
            status: "pending",
            forwardedBy: "Caretaker - Shyam Singh",
            forwardedAt: "2024-01-15T09:30:00",
            roomNumber: "Mess Hall"
        },
        {
            id: "C004",
            studentId: "STU004",
            studentName: "Sarah Williams",
            email: "sarah.williams@university.edu",
            phone: "+1234567893",
            category: "security",
            description: "Main gate lock not working properly since yesterday, security concern",
            priority: "urgent",
            status: "pending",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-14T18:00:00",
            roomNumber: "Main Gate"
        },
        {
            id: "C005",
            studentId: "STU008",
            studentName: "Lisa Anderson",
            email: "lisa.anderson@university.edu",
            phone: "+1234567897",
            category: "maintenance",
            description: "Broken window in Room 205, cold air entering, need urgent repair",
            priority: "high",
            status: "resolved",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-11T13:20:00",
            roomNumber: "205, Block B"
        },
        {
            id: "C006",
            studentId: "STU016",
            studentName: "William Garcia",
            email: "william.garcia@university.edu",
            phone: "+1234567805",
            category: "cleanliness",
            description: "Garbage not collected for 3 days in Block A, creating bad smell",
            priority: "medium",
            status: "pending",
            forwardedBy: "Caretaker - Shyam Singh",
            forwardedAt: "2024-01-14T10:15:00",
            roomNumber: "Block A - Ground Floor"
        },
        {
            id: "C007",
            studentId: "STU017",
            studentName: "Ava Martinez",
            email: "ava.martinez@university.edu",
            phone: "+1234567806",
            category: "other",
            description: "Wi-Fi not working in entire Block D since morning, affecting online classes",
            priority: "urgent",
            status: "in-progress",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-15T08:00:00",
            roomNumber: "Block D - All Floors"
        },
        {
            id: "C008",
            studentId: "STU018",
            studentName: "Ethan Wilson",
            email: "ethan.wilson@university.edu",
            phone: "+1234567807",
            category: "maintenance",
            description: "Water leakage from ceiling in Room 410, damaging personal belongings",
            priority: "urgent",
            status: "escalated",
            forwardedBy: "Caretaker - Shyam Singh",
            forwardedAt: "2024-01-13T16:30:00",
            roomNumber: "410, Block C"
        },
    ])*/

    const filteredComplaints = complaints

    const statCards = [
        {
            title: 'Total Complaints',
            value: stats.total.toString(),
            icon: AlertCircle,
            gradient: 'from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30',
            border: 'border-red-200/50 dark:border-red-800/50',
            shadow: 'hover:shadow-red-500/20',
            iconGradient: 'from-red-500 to-red-600',
            iconShadow: 'shadow-red-500/50',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
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
            title: 'In Progress',
            value: stats.inProgress.toString(),
            icon: AlertTriangle,
            gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30',
            border: 'border-blue-200/50 dark:border-blue-800/50',
            shadow: 'hover:shadow-blue-500/20',
            iconGradient: 'from-blue-500 to-blue-600',
            iconShadow: 'shadow-blue-500/50',
            textColor: 'text-blue-700 dark:text-blue-300',
            valueColor: 'text-blue-900 dark:text-blue-100',
        },
        {
            title: 'Resolved',
            value: stats.resolved.toString(),
            icon: CheckCircle2,
            gradient: 'from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30',
            border: 'border-green-200/50 dark:border-green-800/50',
            shadow: 'hover:shadow-green-500/20',
            iconGradient: 'from-green-500 to-green-600',
            iconShadow: 'shadow-green-500/50',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
        },
    ]

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "maintenance": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700"
            case "cleanliness": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700"
            case "food": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700"
            case "security": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700"
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-300 dark:border-gray-700"
        }
    }

    const handleView = (complaint: Complaint) => {
        setSelectedComplaint(complaint)
        setViewDialogOpen(true)
    }

    const handleAssign = async (complaintId: string) => {
        try {
            await assignComplaint({
                id: complaintId,
                data: { caretakerId: 'caretaker-id', comments: 'Assigned to caretaker' }
            }).unwrap()
            toast.success("Complaint assigned to caretaker!")
        } catch (error) {
            toast.error("Failed to assign complaint")
            console.error(error)
        }
    }

    const handleResolve = async (complaintId: string) => {
        try {
            await resolveComplaint({
                id: complaintId,
                data: { resolutionNotes: 'Issue resolved successfully' }
            }).unwrap()
            toast.success("Complaint marked as resolved!")
        } catch (error) {
            toast.error("Failed to resolve complaint")
            console.error(error)
        }
    }

    const handleEscalate = async (complaintId: string) => {
        try {
            await escalateComplaint({
                id: complaintId,
                data: { escalationReason: 'Requires immediate attention', escalateTo: 'admin' }
            }).unwrap()
            toast.info("Complaint escalated to admin")
        } catch (error) {
            toast.error("Failed to escalate complaint")
            console.error(error)
        }
    }

    const handleQuickFilter = (status: typeof filterStatus) => {
        setFilterStatus(status)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-rose-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-red-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/approvals">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
                                    Forwarded Complaints
                                </h1>
                                <p className="text-muted-foreground text-lg">Review and resolve complaints from caretakers</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search complaints..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            {/* Priority Filter */}
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)}
                                className="px-4 py-2 h-10 border rounded-lg bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 font-medium text-sm"
                            >
                                <option value="all">All Priorities</option>
                                <option value="urgent">Urgent</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                                className="px-4 py-2 h-10 border rounded-lg bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 font-medium text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
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
                            else if (index === 2) handleQuickFilter("in-progress")
                            else if (index === 3) handleQuickFilter("resolved")
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
                        <span className="ml-3 text-muted-foreground">Loading complaints...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500 opacity-50" />
                        <p className="text-red-500 text-lg">Failed to load complaints</p>
                        <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
                    </div>
                ) : filteredComplaints.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground text-lg">No complaints found</p>
                        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredComplaints.map((complaint) => (
                            <div key={complaint.id} className={`group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${complaint.priority === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30'}`}>
                                <div className="flex items-start gap-4">
                                    {complaint.priority === 'urgent' && (
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse flex-shrink-0">
                                            <AlertTriangle className="h-6 w-6 text-white" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{complaint.id}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(complaint.category)}`}>
                                                {complaint.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${complaint.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                complaint.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                    complaint.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                                }`}>
                                                {complaint.priority}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${complaint.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                complaint.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                                    complaint.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                        'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                                                }`}>
                                                {complaint.status}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{complaint.studentName} <span className="text-sm text-muted-foreground font-normal">({complaint.studentId})</span></h3>
                                        <p className="text-sm mb-3 font-medium text-gray-700 dark:text-gray-300">{complaint.description}</p>

                                        <div className="grid md:grid-cols-3 gap-3 text-sm mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-semibold text-muted-foreground">Location:</span>
                                                <span className="font-medium">{complaint.roomNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-muted-foreground">Forwarded by:</span>
                                                <span className="font-medium">{complaint.forwardedBy}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{new Date(complaint.forwardedAt).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 sm:flex-none"
                                                onClick={() => handleView(complaint)}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                            {complaint.status === 'pending' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md"
                                                        onClick={() => handleAssign(complaint.id)}
                                                        disabled={isAssigning || isResolving || isEscalating}
                                                    >
                                                        {isAssigning ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                                        Assign to Caretaker
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex-1 sm:flex-none"
                                                        onClick={() => handleEscalate(complaint.id)}
                                                        disabled={isAssigning || isResolving || isEscalating}
                                                    >
                                                        {isEscalating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                                        Escalate to Admin
                                                    </Button>
                                                </>
                                            )}
                                            {complaint.status === 'in-progress' && (
                                                <Button
                                                    size="sm"
                                                    className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
                                                    onClick={() => handleResolve(complaint.id)}
                                                    disabled={isAssigning || isResolving || isEscalating}
                                                >
                                                    {isResolving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                                    Mark as Resolved
                                                </Button>
                                            )}
                                        </div>
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
                        <DialogTitle className="text-2xl">Complaint Details</DialogTitle>
                        <DialogDescription>
                            Review the complete information for this complaint
                        </DialogDescription>
                    </DialogHeader>
                    {selectedComplaint && (
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{selectedComplaint.id}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(selectedComplaint.category)}`}>
                                    {selectedComplaint.category.toUpperCase()}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedComplaint.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                    selectedComplaint.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                        selectedComplaint.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                    }`}>
                                    {selectedComplaint.priority.toUpperCase()}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedComplaint.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                    selectedComplaint.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                        selectedComplaint.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                            'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                                    }`}>
                                    {selectedComplaint.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Student Name</label>
                                        <p className="text-base font-medium mt-1">{selectedComplaint.studentName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Student ID</label>
                                        <p className="text-base font-medium mt-1">{selectedComplaint.studentId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Email</label>
                                        <p className="text-base font-medium mt-1">{selectedComplaint.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                                        <p className="text-base font-medium mt-1">{selectedComplaint.phone}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Location</label>
                                    <p className="text-base font-medium mt-1">{selectedComplaint.roomNumber}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted-foreground">Description</label>
                                    <p className="text-base font-medium mt-1">{selectedComplaint.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Forwarded By</label>
                                        <p className="text-base font-medium mt-1">{selectedComplaint.forwardedBy}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted-foreground">Forwarded At</label>
                                        <p className="text-base font-medium mt-1">
                                            {new Date(selectedComplaint.forwardedAt).toLocaleString("en-US", {
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
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>
                        {selectedComplaint?.status === 'pending' && (
                            <>
                                <Button
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                                    onClick={() => {
                                        handleAssign(selectedComplaint.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    Assign to Caretaker
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleEscalate(selectedComplaint.id)
                                        setViewDialogOpen(false)
                                    }}
                                >
                                    Escalate to Admin
                                </Button>
                            </>
                        )}
                        {selectedComplaint?.status === 'in-progress' && (
                            <Button
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                onClick={() => {
                                    handleResolve(selectedComplaint.id)
                                    setViewDialogOpen(false)
                                }}
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark as Resolved
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}
