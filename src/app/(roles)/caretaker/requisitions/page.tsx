'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { ClipboardList, Plus, CheckCircle2, Clock, XCircle, Upload, DollarSign, FileText, AlertTriangle, ArrowLeft, Loader2, Search } from "lucide-react"
import Link from "next/link"
import {
    useGetCaretakerRequisitionsQuery,
    useGetCaretakerRequisitionByIdQuery,
    useCreateRequisitionMutation,
    useUploadRequisitionDocumentsMutation
} from '@/store/api/caretakerApi'
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function CaretakerRequisitions() {
    const [selectedCategory, setSelectedCategory] = useState<'maintenance' | 'repair' | 'inventory' | 'other'>("maintenance")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>("medium")
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>("all")
    const [filterCategory, setFilterCategory] = useState<'all' | 'maintenance' | 'repair' | 'inventory' | 'other'>("all")
    const [page, setPage] = useState(1)
    const limit = 10
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [selectedRequisition, setSelectedRequisition] = useState<any>(null)

    // API hooks
    const { data: requisitionsResponse, isLoading, error, refetch } = useGetCaretakerRequisitionsQuery({
        page,
        limit,
        status: filterStatus,
        category: filterCategory
    })

    const [createRequisition, { isLoading: isCreating }] = useCreateRequisitionMutation()
    const [uploadDocuments, { isLoading: isUploading }] = useUploadRequisitionDocumentsMutation()

    // Handle nested response structure
    const requisitions = Array.isArray((requisitionsResponse?.data as any)?.requisitions)
        ? (requisitionsResponse?.data as any).requisitions
        : Array.isArray(requisitionsResponse?.data)
            ? requisitionsResponse.data
            : []

    const pagination = (requisitionsResponse?.data as any)?.pagination
    const total = pagination?.total || requisitionsResponse?.total || 0
    const totalPages = pagination?.pages || (requisitionsResponse?.limit ? Math.ceil(total / requisitionsResponse.limit) : 1)

    // Calculate stats
    const stats = {
        total,
        pending: requisitions.filter((r: any) => r.status === 'pending').length,
        approved: requisitions.filter((r: any) => r.status === 'approved').length,
        rejected: requisitions.filter((r: any) => r.status === 'rejected').length
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !description.trim() || !amount) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            const result = await createRequisition({
                title,
                description,
                category: selectedCategory,
                amount: parseFloat(amount),
                urgency
            }).unwrap()

            // Upload documents if any
            if (selectedFiles && selectedFiles.length > 0 && result.data?.id) {
                try {
                    const formData = new FormData()
                    Array.from(selectedFiles).forEach((file) => {
                        formData.append('documents', file)
                    })

                    await uploadDocuments({
                        id: result.data.id,
                        documents: formData
                    }).unwrap()

                    toast.success('Requisition submitted with documents')
                } catch (uploadError: any) {
                    toast.warning('Requisition created but document upload failed')
                }
            } else {
                toast.success('Requisition submitted successfully')
            }

            // Reset form
            setTitle("")
            setDescription("")
            setAmount("")
            setSelectedCategory("maintenance")
            setUrgency("medium")
            setSelectedFiles(null)
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
            if (fileInput) fileInput.value = ''
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to submit requisition')
        }
    }

    const handleViewRequisition = (requisition: any) => {
        setSelectedRequisition(requisition)
        setViewDialogOpen(true)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            case 'pending':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
            case 'rejected':
                return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle2 className="h-3 w-3" />
            case 'pending':
                return <Clock className="h-3 w-3" />
            case 'rejected':
                return <XCircle className="h-3 w-3" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-fuchsia-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/caretaker/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    Requisitions
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Submit and track maintenance, repair, and inventory requests ({stats.total} total)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
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
                            {/* Category Filter */}
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value as any)}
                                className="h-10 w-[140px] rounded-md border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white px-3 text-sm"
                            >
                                <option value="all">All Categories</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="repair">Repair</option>
                                <option value="inventory">Inventory</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg shadow-gray-500/50">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.pending}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Approved</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.approved}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <XCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.rejected}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File New Requisition */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <Plus className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">File New Requisition</h3>
                                <p className="text-sm text-muted-foreground">Submit a requisition for maintenance, repair, or inventory</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Title</FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter requisition title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-white dark:bg-gray-800"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Category</FieldLabel>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm capitalize"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                                >
                                    <option value="maintenance">Maintenance</option>
                                    <option value="repair">Repair</option>
                                    <option value="inventory">Inventory</option>
                                    <option value="other">Other</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Description</FieldLabel>
                                <textarea
                                    className="flex min-h-20 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none"
                                    placeholder="Describe the requisition in detail..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Estimated Amount
                                </FieldLabel>
                                <Input
                                    type="number"
                                    placeholder="Enter estimated amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="bg-white dark:bg-gray-800"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Urgency
                                </FieldLabel>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm capitalize"
                                    value={urgency}
                                    onChange={(e) => setUrgency(e.target.value as any)}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Upload Documents (Optional)
                                </FieldLabel>
                                <Input
                                    type="file"
                                    multiple
                                    onChange={(e) => setSelectedFiles(e.target.files)}
                                    className="bg-white dark:bg-gray-800"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                                <FieldDescription>
                                    Upload invoices, estimates, or related documents
                                    {selectedFiles && selectedFiles.length > 0 && (
                                        <span className="text-green-600 dark:text-green-400 ml-2">
                                            • {selectedFiles.length} file(s) selected
                                        </span>
                                    )}
                                </FieldDescription>
                            </Field>
                            <Button type="submit" className="w-full" disabled={isCreating || isUploading}>
                                {isCreating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Submit Requisition
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Requisition History */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Requisition History</h3>
                                <p className="text-sm text-muted-foreground">Track your submitted requisitions</p>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                <AlertTriangle className="h-12 w-12 text-destructive" />
                                <p className="text-lg text-muted-foreground">Failed to load requisitions</p>
                                <Button onClick={() => refetch()}>Retry</Button>
                            </div>
                        ) : requisitions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64">
                                <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg text-muted-foreground">No requisitions found</p>
                            </div>
                        ) : (
                            requisitions.map((req: any) => (
                                <div key={req._id || req.id} className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{req.title}</h3>
                                            <p className="text-xs text-muted-foreground mt-1 capitalize">{req.category}</p>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(req.status)}`}>
                                            {getStatusIcon(req.status)}
                                            {req.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <DollarSign className="h-3 w-3" />
                                            Amount: ₹{req.amount?.toLocaleString('en-IN') || 0}
                                        </p>
                                        {req.urgency && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">Urgency: {req.urgency}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground">{new Date(req.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
