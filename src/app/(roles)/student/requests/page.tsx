"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import {
    FileText,
    Plus,
    X,
    Clock,
    CheckCircle,
    XCircle,
    Tag,
    Calendar,
    ArrowLeft,
    Loader,
    Loader2,
    AlertCircle,
} from "lucide-react"
import {
    useGetStudentRequestsQuery,
    useCreateRequestMutation
} from '@/store/api/studentApi'

export default function StudentRequests() {
    const [showForm, setShowForm] = useState(false)
    const [statusFilter, setStatusFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [formData, setFormData] = useState({
        type: "",
        subject: "",
        description: "",
        startDate: "",
        endDate: "",
    })

    // Fetch requests from API
    const { data: requestsData, isLoading, error } = useGetStudentRequestsQuery({
        status: statusFilter,
        type: typeFilter
    })

    // Create request mutation
    const [createRequest, { isLoading: isSubmitting }] = useCreateRequestMutation()

    console.log('Requests API Response:', requestsData)
    console.log('Requests Data:', requestsData?.data)

    // Handle nested response structure
    const requests = Array.isArray(requestsData?.data)
        ? requestsData.data
        : requestsData?.data?.requests || []

    console.log('Processed requests:', requests)
    console.log('Is array?', Array.isArray(requests))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload: any = {
            type: formData.type,
            subject: formData.subject,
            description: formData.description,
        }

        // Add dates for leave requests
        if (formData.type === 'leave' && formData.startDate && formData.endDate) {
            payload.startDate = formData.startDate
            payload.endDate = formData.endDate
        }

        console.log('Submitting request:', payload)

        try {
            const result = await createRequest(payload).unwrap()
            console.log('Request created:', result)
            toast.success('Request submitted successfully!')
            setShowForm(false)
            setFormData({ type: "", subject: "", description: "", startDate: "", endDate: "" })
        } catch (error: any) {
            console.error('Error submitting request:', error)
            console.error('Error data:', error?.data)
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to submit request'
            toast.error(errorMessage)
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
                    <p className="text-lg text-gray-600 dark:text-gray-400">Failed to load requests</p>
                </div>
            </div>
        )
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />
            case "approved":
                return <CheckCircle className="h-4 w-4" />
            case "rejected":
                return <XCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/10 text-yellow-500"
            case "approved":
                return "bg-green-500/10 text-green-500"
            case "rejected":
                return "bg-red-500/10 text-red-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/student/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                    Requests
                                </h1>
                                <p className="text-muted-foreground text-lg">Submit and track your requests</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className={`h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${showForm
                                ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-red-500/30'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/30'
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
                                    New Request
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        Submit New Request
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="type" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <Tag className="h-4 w-4 text-white" />
                                </div>
                                Request Type *
                            </Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="leave">Leave Request</option>
                                <option value="room_change">Room Change</option>
                                <option value="hostel_change">Hostel Change</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                Subject *
                            </Label>
                            <Input
                                id="subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Brief subject of your request"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        {formData.type === 'leave' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <Label htmlFor="startDate" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <Calendar className="h-4 w-4" />
                                        Start Date *
                                    </Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required={formData.type === 'leave'}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="endDate" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <Calendar className="h-4 w-4" />
                                        End Date *
                                    </Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required={formData.type === 'leave'}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                Description *
                            </Label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Provide detailed description of your request"
                                className="flex min-h-[140px] w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3 text-sm font-medium focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                                required
                            />
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
                                    Submit Request
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
                    My Requests ({requests.length})
                </h2>
                {requests.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No requests yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Click "New Request" to submit your first request</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {requests.map((request: any) => (
                            <div key={request._id || request.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{request.subject}</h3>
                                            <span
                                                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md ${getStatusColor(
                                                    request.status
                                                )}`}
                                            >
                                                {getStatusIcon(request.status)}
                                                {request.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{request.description}</p>
                                        <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                <Tag className="h-3.5 w-3.5" />
                                                {request.type?.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(request.createdAt || request.date).toLocaleDateString()}
                                            </span>
                                            {request.startDate && request.endDate && (
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                                                </span>
                                            )}
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
