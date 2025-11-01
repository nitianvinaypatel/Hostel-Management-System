'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Search, Check, X, Eye, Building2, User, Calendar, Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import {
    useGetAdminRequisitionsQuery,
    useApproveRequisitionMutation,
    useRejectRequisitionMutation
} from '@/store/api/adminApi'
import { toast } from "sonner"

type Requisition = {
    id: string
    type: string
    student: string
    studentId?: string
    hostel: string
    description: string
    submittedAt: string
    status: "pending" | "approved" | "rejected"
    comments?: string
    processedBy?: string
    processedAt?: string
}

export default function AdminRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [approveDialogOpen, setApproveDialogOpen] = useState(false)
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null)
    const [comments, setComments] = useState("")

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])

    // Redux API hooks
    const { data: response, isLoading, error, refetch } = useGetAdminRequisitionsQuery(
        {
            status: filterStatus === "all" ? undefined : filterStatus,
            search: debouncedSearch || undefined,
            page: 1,
            limit: 100
        },
        {
            refetchOnMountOrArgChange: true
        }
    )
    const [approveRequisition, { isLoading: isApproving }] = useApproveRequisitionMutation()
    const [rejectRequisition, { isLoading: isRejecting }] = useRejectRequisitionMutation()

    const requisitions = response?.data || []

    // Debug logging
    useEffect(() => {
        console.log('Search term:', searchTerm)
        console.log('Debounced search:', debouncedSearch)
        console.log('Filter status:', filterStatus)
        console.log('Requisitions count:', requisitions.length)
    }, [searchTerm, debouncedSearch, filterStatus, requisitions.length])

    const handleViewClick = (requisition: Requisition) => {
        setSelectedRequisition(requisition)
        setViewDialogOpen(true)
    }

    const handleApproveClick = (requisition: Requisition) => {
        setSelectedRequisition(requisition)
        setComments("")
        setApproveDialogOpen(true)
    }

    const handleRejectClick = (requisition: Requisition) => {
        setSelectedRequisition(requisition)
        setComments("")
        setRejectDialogOpen(true)
    }

    const handleApprove = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedRequisition) return

        try {
            await approveRequisition({
                requisitionId: selectedRequisition.id,
                data: { comments: comments || "Approved" }
            }).unwrap()

            toast.success('Requisition approved successfully!')
            setApproveDialogOpen(false)
            setSelectedRequisition(null)
            setComments("")
        } catch (err: any) {
            console.error('Approve error:', err)
            toast.error(err?.data?.message || 'Failed to approve requisition')
        }
    }

    const handleReject = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedRequisition) return

        if (!comments.trim()) {
            toast.error('Please provide a reason for rejection')
            return
        }

        try {
            await rejectRequisition({
                requisitionId: selectedRequisition.id,
                data: { comments }
            }).unwrap()

            toast.success('Requisition rejected successfully!')
            setRejectDialogOpen(false)
            setSelectedRequisition(null)
            setComments("")
        } catch (err: any) {
            console.error('Reject error:', err)
            toast.error(err?.data?.message || 'Failed to reject requisition')
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground animate-pulse">Loading requisitions...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">Failed to load requisitions</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Requisition Approvals
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Review and approve student requisitions
                                </p>
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
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
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

            {/* Main Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">

                <div className="space-y-4">
                    {requisitions.map((req) => (
                        <div key={req.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700 capitalize">
                                            {req.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${req.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            req.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="h-4 w-4 text-purple-600" />
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{req.student}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Building2 className="h-4 w-4 text-pink-600" />
                                        <p className="text-sm text-muted-foreground font-medium">{req.hostel}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{req.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                        <Calendar className="h-3 w-3" />
                                        Submitted: {new Date(req.submittedAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleViewClick(req)}
                                        className="flex-1 lg:flex-none hover:scale-105 transition-transform"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                    </Button>
                                    {req.status === 'pending' && (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => handleApproveClick(req)}
                                                className="flex-1 lg:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
                                            >
                                                <Check className="h-4 w-4 mr-2" />
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleRejectClick(req)}
                                                className="flex-1 lg:flex-none shadow-md"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {requisitions.length === 0 && (
                        <div className="text-center py-12">
                            <AlertCircle className="h-12 w-12 text-muted-foreground opacity-20 mx-auto mb-4" />
                            <p className="text-muted-foreground">No requisitions found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Requisition Details</DialogTitle>
                        <DialogDescription>
                            View complete requisition information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRequisition && (
                        <div className="space-y-4 py-4">
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">Type</Label>
                                <p className="font-semibold capitalize">{selectedRequisition.type}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">Student</Label>
                                <p className="font-semibold">{selectedRequisition.student}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">Hostel</Label>
                                <p className="font-semibold">{selectedRequisition.hostel}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">Description</Label>
                                <p className="text-sm">{selectedRequisition.description}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">Submitted At</Label>
                                <p className="text-sm">{new Date(selectedRequisition.submittedAt).toLocaleString()}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">Status</Label>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${selectedRequisition.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                    selectedRequisition.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                    }`}>
                                    {selectedRequisition.status}
                                </span>
                            </div>
                            {selectedRequisition.comments && (
                                <div className="grid gap-2">
                                    <Label className="text-muted-foreground">Admin Comments</Label>
                                    <p className="text-sm">{selectedRequisition.comments}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Approve Dialog */}
            <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Approve Requisition</DialogTitle>
                        <DialogDescription>
                            Add optional comments and approve this requisition
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleApprove}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="approve-comments">Comments (Optional)</Label>
                                <Textarea
                                    id="approve-comments"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Add any comments or notes..."
                                    rows={4}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setApproveDialogOpen(false)}
                                disabled={isApproving}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isApproving}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                            >
                                {isApproving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Approving...
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Reject Requisition</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejection
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleReject}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="reject-comments">Reason for Rejection *</Label>
                                <Textarea
                                    id="reject-comments"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Explain why this requisition is being rejected..."
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setRejectDialogOpen(false)}
                                disabled={isRejecting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={isRejecting}
                            >
                                {isRejecting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Rejecting...
                                    </>
                                ) : (
                                    <>
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
