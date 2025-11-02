"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import {
    MessageSquare,
    Plus,
    X,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader,
    FileText,
    Tag,
    ArrowLeft,
    Loader2,
} from "lucide-react"
import {
    useGetStudentComplaintsQuery,
    useCreateComplaintMutation
} from '@/store/api/studentApi'

export default function StudentComplaints() {
    const [showForm, setShowForm] = useState(false)
    const [page, setPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState('')
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    })
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    // Fetch complaints from API
    const { data: complaintsData, isLoading, error } = useGetStudentComplaintsQuery({
        page,
        limit: 10,
        status: statusFilter
    })

    // Create complaint mutation
    const [createComplaint, { isLoading: isSubmitting }] = useCreateComplaintMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setValidationErrors({})

        const payload = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
        }

        console.log('Submitting complaint:', payload)

        try {
            const result = await createComplaint(payload).unwrap()
            console.log('Complaint created:', result)
            toast.success('Complaint submitted successfully!')
            setShowForm(false)
            setFormData({ title: "", category: "", description: "" })
        } catch (error: any) {
            console.error('Error submitting complaint:', error)
            console.error('Error data:', error?.data)

            // Handle validation errors
            if (error?.data?.errors && Array.isArray(error.data.errors)) {
                const errors: Record<string, string> = {}
                error.data.errors.forEach((err: any) => {
                    errors[err.field] = err.message
                })
                setValidationErrors(errors)
                toast.error('Please fix the validation errors')
            } else {
                const errorMessage = error?.data?.message || error?.data?.error || 'Failed to submit complaint'
                toast.error(errorMessage)
            }
        }
    }

    // Debug logging
    console.log('Complaints API Response:', complaintsData)
    console.log('Complaints Data:', complaintsData?.data)

    // Extract complaints from nested structure
    const complaints = complaintsData?.data?.complaints || []
    const pagination = complaintsData?.data?.pagination || null

    console.log('Processed complaints:', complaints)
    console.log('Pagination:', pagination)

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />
            case "in-progress":
                return <Loader className="h-4 w-4" />
            case "resolved":
                return <CheckCircle className="h-4 w-4" />
            default:
                return <AlertCircle className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/10 text-yellow-500"
            case "in-progress":
                return "bg-blue-500/10 text-blue-500"
            case "resolved":
                return "bg-green-500/10 text-green-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-400">Failed to load complaints</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/student/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Complaints
                                </h1>
                                <p className="text-muted-foreground text-lg">Track and manage your complaints</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className={`h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${showForm
                                ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-red-500/30'
                                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/30'
                                }`}
                        >
                            {showForm ? (
                                <>
                                    <X className="h-5 w-5" />
                                    Cancel
                                </>
                            ) : (
                                <>
                                    <Plus className="h-5 w-5" />
                                    New Complaint
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        Submit New Complaint
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                Complaint Title *
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value })
                                    if (validationErrors.title) {
                                        setValidationErrors({ ...validationErrors, title: '' })
                                    }
                                }}
                                placeholder="Brief title of your complaint"
                                className={`h-12 rounded-xl border-2 ${validationErrors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm`}
                                required
                            />
                            {validationErrors.title && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {validationErrors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                                    <Tag className="h-4 w-4 text-white" />
                                </div>
                                Category *
                            </Label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => {
                                    setFormData({ ...formData, category: e.target.value })
                                    if (validationErrors.category) {
                                        setValidationErrors({ ...validationErrors, category: '' })
                                    }
                                }}
                                className={`flex h-12 w-full rounded-xl border-2 ${validationErrors.category ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-pink-500 dark:focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300`}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="electrical">Electrical</option>
                                <option value="plumbing">Plumbing</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="cleanliness">Cleanliness</option>
                                <option value="security">Security</option>
                                <option value="other">Other</option>
                            </select>
                            {validationErrors.category && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {validationErrors.category}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="description" className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <span className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                        <MessageSquare className="h-4 w-4 text-white" />
                                    </div>
                                    Description *
                                </span>
                                <span className={`text-xs ${formData.description.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {formData.description.length}/1000
                                </span>
                            </Label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => {
                                    setFormData({ ...formData, description: e.target.value })
                                    if (validationErrors.description) {
                                        setValidationErrors({ ...validationErrors, description: '' })
                                    }
                                }}
                                placeholder="Provide detailed description of your complaint (max 1000 characters)"
                                className={`flex min-h-[140px] w-full rounded-xl border-2 ${validationErrors.description || formData.description.length > 1000 ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3 text-sm font-medium focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none`}
                                maxLength={1000}
                                required
                            />
                            {validationErrors.description && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {validationErrors.description}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-base shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-5 w-5" />
                                    Submit Complaint
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            )}

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    My Complaints ({complaints.length})
                </h2>
                {complaints.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No complaints yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Click "New Complaint" to submit your first complaint</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {complaints.map((complaint) => (
                            <div key={complaint.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{complaint.title}</h3>
                                            <span
                                                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md ${getStatusColor(
                                                    complaint.status
                                                )}`}
                                            >
                                                {getStatusIcon(complaint.status)}
                                                {complaint.status.replace("-", " ").toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{complaint.description}</p>
                                        <div className="flex items-center gap-4 text-xs font-medium">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                <FileText className="h-3.5 w-3.5" />
                                                ID: {complaint.id}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                <Tag className="h-3.5 w-3.5" />
                                                {complaint.category || 'N/A'}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                                                <Clock className="h-3.5 w-3.5" />
                                                {new Date(complaint.date || complaint.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
