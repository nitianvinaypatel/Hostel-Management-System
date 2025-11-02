"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import {
    MessageSquare,
    Star,
    Send,
    ArrowLeft,
    Loader,
    Loader2,
    ThumbsUp,
    Lightbulb,
    Utensils,
    Building2,
    Users,
    Wifi,
    Droplet,
    CheckCircle,
    Clock,
    MessageCircle,
    AlertCircle,
} from "lucide-react"
import {
    useGetAllFeedbackQuery,
    useSubmitFeedbackMutation
} from '@/store/api/studentApi'

type FeedbackCategory = "hostel" | "mess" | "facilities" | "staff" | "other"

export default function StudentFeedback() {
    const [activeTab, setActiveTab] = useState<"submit" | "history">("submit")
    const [statusFilter, setStatusFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)

    const [formData, setFormData] = useState({
        category: "" as FeedbackCategory | "",
        subject: "",
        description: "",
    })
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    // Fetch feedback from API
    const { data: feedbackData, isLoading, error, refetch } = useGetAllFeedbackQuery({
        status: statusFilter,
        category: categoryFilter
    })

    // Submit feedback mutation
    const [submitFeedback, { isLoading: isSubmitting }] = useSubmitFeedbackMutation()

    console.log('Feedback API Response:', feedbackData)
    console.log('Feedback Data:', feedbackData?.data)

    // Extract feedbacks from nested structure
    const feedbacks = feedbackData?.data?.feedbacks || []

    console.log('Processed feedbacks:', feedbacks)
    console.log('Feedbacks count:', feedbacks.length)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setValidationErrors({})

        if (!formData.category) {
            toast.error('Please select a category!')
            return
        }

        if (rating === 0) {
            toast.error('Please provide a rating!')
            return
        }

        if (formData.description.length < 10) {
            setValidationErrors({ description: 'Description must be at least 10 characters long' })
            toast.error('Description must be at least 10 characters long')
            return
        }

        const payload = {
            category: formData.category,
            subject: formData.subject,
            description: formData.description,
            rating: rating
        }

        console.log('Submitting feedback:', payload)

        try {
            const result = await submitFeedback(payload).unwrap()
            console.log('Feedback submitted:', result)
            toast.success('Feedback submitted successfully!')

            // Reset form
            setFormData({
                category: "",
                subject: "",
                description: "",
            })
            setRating(0)
            setValidationErrors({})

            // Refetch feedback data
            await refetch()

            // Switch to history tab
            setActiveTab("history")
        } catch (error: any) {
            console.error('Error submitting feedback:', error)
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
                const errorMessage = error?.data?.message || error?.data?.error || 'Failed to submit feedback'
                toast.error(errorMessage)
            }
        }
    }

    if (isLoading && activeTab === "history") {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const getCategoryIcon = (category: FeedbackCategory) => {
        switch (category) {
            case "hostel":
                return <Building2 className="h-4 w-4" />
            case "mess":
                return <Utensils className="h-4 w-4" />
            case "facilities":
                return <Wifi className="h-4 w-4" />
            case "staff":
                return <Users className="h-4 w-4" />
            default:
                return <MessageSquare className="h-4 w-4" />
        }
    }

    const getCategoryColor = (category: FeedbackCategory) => {
        switch (category) {
            case "hostel":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case "mess":
                return "bg-orange-500/10 text-orange-500 border-orange-500/20"
            case "facilities":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20"
            case "staff":
                return "bg-green-500/10 text-green-500 border-green-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />
            case "reviewed":
                return <MessageCircle className="h-4 w-4" />
            case "resolved":
                return <CheckCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/10 text-yellow-500"
            case "reviewed":
                return "bg-blue-500/10 text-blue-500"
            case "resolved":
                return "bg-green-500/10 text-green-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                                Feedback & Suggestions
                            </h1>
                            <p className="text-muted-foreground text-lg">Share your thoughts and help us improve</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("submit")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "submit"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Send className="h-4 w-4" />
                        Submit Feedback
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "history"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <MessageSquare className="h-4 w-4" />
                        My Feedback ({feedbacks.length})
                    </button>
                </div>

                {activeTab === "submit" ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Category Selection */}
                        <div className="space-y-4">
                            <Label className="text-lg font-bold flex items-center gap-2 dark:text-white">
                                <Lightbulb className="h-5 w-5 text-amber-500" />
                                Select Category *
                            </Label>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: "hostel" })}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${formData.category === "hostel"
                                        ? "border-blue-500 bg-blue-50/80 dark:bg-blue-950/30 shadow-lg shadow-blue-500/30"
                                        : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-blue-300"
                                        }`}
                                >
                                    <Building2 className={`h-8 w-8 mx-auto mb-3 ${formData.category === "hostel" ? "text-blue-500" : "text-gray-400"}`} />
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Hostel Services</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Room, cleanliness, maintenance</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: "mess" })}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${formData.category === "mess"
                                        ? "border-orange-500 bg-orange-50/80 dark:bg-orange-950/30 shadow-lg shadow-orange-500/30"
                                        : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-orange-300"
                                        }`}
                                >
                                    <Utensils className={`h-8 w-8 mx-auto mb-3 ${formData.category === "mess" ? "text-orange-500" : "text-gray-400"}`} />
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Mess Food Quality</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Food taste, hygiene, variety</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: "facilities" })}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${formData.category === "facilities"
                                        ? "border-purple-500 bg-purple-50/80 dark:bg-purple-950/30 shadow-lg shadow-purple-500/30"
                                        : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-purple-300"
                                        }`}
                                >
                                    <Wifi className={`h-8 w-8 mx-auto mb-3 ${formData.category === "facilities" ? "text-purple-500" : "text-gray-400"}`} />
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Facilities</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Wi-Fi, water, electricity</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: "staff" })}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${formData.category === "staff"
                                        ? "border-green-500 bg-green-50/80 dark:bg-green-950/30 shadow-lg shadow-green-500/30"
                                        : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-green-300"
                                        }`}
                                >
                                    <Users className={`h-8 w-8 mx-auto mb-3 ${formData.category === "staff" ? "text-green-500" : "text-gray-400"}`} />
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Staff Behavior</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Warden, caretaker, mess staff</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: "other" })}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${formData.category === "other"
                                        ? "border-pink-500 bg-pink-50/80 dark:bg-pink-950/30 shadow-lg shadow-pink-500/30"
                                        : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-pink-300"
                                        }`}
                                >
                                    <MessageSquare className={`h-8 w-8 mx-auto mb-3 ${formData.category === "other" ? "text-pink-500" : "text-gray-400"}`} />
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Other</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">General suggestions</p>
                                </button>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="space-y-4">
                            <Label className="text-lg font-bold flex items-center gap-2 dark:text-white">
                                <Star className="h-5 w-5 text-amber-500" />
                                Rate Your Experience *
                            </Label>
                            <div className="flex items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200/50 dark:border-amber-800/50">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-transform hover:scale-125"
                                    >
                                        <Star
                                            className={`h-10 w-10 ${star <= (hoveredRating || rating)
                                                ? "fill-amber-500 text-amber-500"
                                                : "text-gray-300 dark:text-gray-600"
                                                }`}
                                        />
                                    </button>
                                ))}
                                <span className="ml-4 text-2xl font-bold text-amber-600 dark:text-amber-400">
                                    {rating > 0 ? `${rating}/5` : "Not rated"}
                                </span>
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="space-y-3">
                            <Label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                    <MessageSquare className="h-4 w-4 text-white" />
                                </div>
                                Subject *
                            </Label>
                            <Input
                                id="subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Brief subject of your feedback"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <Label htmlFor="description" className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <span className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                        <MessageSquare className="h-4 w-4 text-white" />
                                    </div>
                                    Detailed Feedback *
                                </span>
                                <span className={`text-xs ${formData.description.length < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {formData.description.length}/10 min
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
                                placeholder="Share your detailed feedback or suggestions (minimum 10 characters)..."
                                className={`flex min-h-[160px] w-full rounded-xl border-2 ${validationErrors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3 text-sm font-medium focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none`}
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
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-base shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    Submit Feedback
                                </>
                            )}
                        </Button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        {feedbacks.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No feedback submitted yet</p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Click "Submit Feedback" to share your thoughts</p>
                            </div>
                        ) : (
                            feedbacks.map((feedback: any) => (
                                <div key={feedback._id || feedback.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{feedback.subject}</h3>
                                                    <span
                                                        className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md border ${getCategoryColor(feedback.category)}`}
                                                    >
                                                        {getCategoryIcon(feedback.category)}
                                                        {feedback.category.toUpperCase()}
                                                    </span>
                                                    <span
                                                        className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md ${getStatusColor(feedback.status)}`}
                                                    >
                                                        {getStatusIcon(feedback.status)}
                                                        {feedback.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{feedback.description}</p>
                                                <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
                                                    <span className="flex items-center gap-1.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < feedback.rating
                                                                    ? "fill-amber-500 text-amber-500"
                                                                    : "text-gray-300 dark:text-gray-600"
                                                                    }`}
                                                            />
                                                        ))}
                                                        <span className="ml-1 text-amber-600 dark:text-amber-400 font-bold">{feedback.rating}/5</span>
                                                    </span>
                                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {new Date(feedback.createdAt || feedback.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Response Section */}
                                        {feedback.response && (
                                            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                    <span className="font-semibold text-sm text-green-900 dark:text-green-100">Response from Management</span>
                                                    {feedback.responseDate && (
                                                        <span className="text-xs text-green-600 dark:text-green-400 ml-auto">
                                                            {new Date(feedback.responseDate).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-green-800 dark:text-green-200">{feedback.response}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
