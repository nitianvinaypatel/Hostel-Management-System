'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp, TrendingDown, Utensils, ArrowLeft, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"
import { useGetWardenMessFeedbackQuery } from "@/store/api/wardenApi"

export default function MessFeedback() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterMeal, setFilterMeal] = useState("all")

    // RTK Query hook
    const { data: feedbackData, isLoading, error } = useGetWardenMessFeedbackQuery(undefined)

    const summary = feedbackData?.data?.summary || {
        overall: 0,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        totalFeedback: 0
    }

    const feedbacks = feedbackData?.data?.feedbacks || []

    // Calculate meal stats from feedbacks
    const mealStats = [
        {
            meal: "Breakfast",
            rating: summary.breakfast || 0,
            feedback: feedbacks.filter(f => f.mealType === 'breakfast').length,
            trend: summary.breakfast >= 4 ? "up" : "down"
        },
        {
            meal: "Lunch",
            rating: summary.lunch || 0,
            feedback: feedbacks.filter(f => f.mealType === 'lunch').length,
            trend: summary.lunch >= 4 ? "up" : "down"
        },
        {
            meal: "Dinner",
            rating: summary.dinner || 0,
            feedback: feedbacks.filter(f => f.mealType === 'dinner').length,
            trend: summary.dinner >= 4 ? "up" : "down"
        },
    ]

    const filteredFeedback = feedbacks.filter(feedback => {
        const matchesSearch = feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
        const matchesMeal = filterMeal === "all" || feedback.mealType === filterMeal
        return matchesSearch && matchesMeal
    })

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ))
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-amber-500" />
                    <p className="text-muted-foreground">Loading feedback...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="text-red-500 text-5xl">⚠️</div>
                    <p className="text-muted-foreground">Failed to load feedback</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                                    Mess Quality Feedback
                                </h1>
                                <p className="text-muted-foreground text-lg">Monitor and analyze student feedback on mess food</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search feedback..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            {/* Meal Filter */}
                            <select
                                value={filterMeal}
                                onChange={(e) => setFilterMeal(e.target.value)}
                                className="px-4 py-2 h-10 border rounded-lg bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 font-medium text-sm"
                            >
                                <option value="all">All Meals</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30 backdrop-blur-xl border border-amber-200/50 dark:border-amber-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30" />
                    <div className="relative">
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2">Overall Rating</p>
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-4xl font-bold text-amber-900 dark:text-amber-100">{summary.overall.toFixed(1)}</p>
                            <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {summary.totalFeedback} total responses
                        </p>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30" />
                    <div className="relative">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Breakfast</p>
                        <div className="flex items-center gap-2">
                            <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">{summary.breakfast.toFixed(1)}</p>
                            <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30" />
                    <div className="relative">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">Lunch</p>
                        <div className="flex items-center gap-2">
                            <p className="text-4xl font-bold text-green-900 dark:text-green-100">{summary.lunch.toFixed(1)}</p>
                            <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30" />
                    <div className="relative">
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Dinner</p>
                        <div className="flex items-center gap-2">
                            <p className="text-4xl font-bold text-purple-900 dark:text-purple-100">{summary.dinner.toFixed(1)}</p>
                            <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Meal-wise Ratings */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                        <Utensils className="h-5 w-5 text-white" />
                    </div>
                    <span>Meal-wise Ratings</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mealStats.map((meal) => (
                        <div key={meal.meal} className="group p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{meal.meal}</h4>
                                {meal.trend === 'up' ? (
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shadow-green-500/50">
                                        <TrendingUp className="h-4 w-4 text-white" />
                                    </div>
                                ) : (
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md shadow-red-500/50">
                                        <TrendingDown className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{meal.rating}</p>
                                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{meal.feedback} responses</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Feedback */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                        <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <span>Recent Feedback ({filteredFeedback.length})</span>
                </h3>

                <div className="space-y-4">
                    {filteredFeedback.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                            <p className="text-muted-foreground">No feedback found</p>
                        </div>
                    ) : (
                        filteredFeedback.map((feedback) => (
                            <div key={feedback.id} className="group p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{feedback.studentName}</h4>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {new Date(feedback.date).toLocaleDateString()} • <span className="capitalize">{feedback.mealType}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-700">
                                        {renderStars(feedback.rating)}
                                    </div>
                                </div>

                                {feedback.comment && (
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 italic">"{feedback.comment}"</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
