'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react"

export default function MessFeedback() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterMeal, setFilterMeal] = useState("all")

    const overallStats = {
        averageRating: 4.2,
        totalFeedback: 156,
        qualityAvg: 4.3,
        quantityAvg: 4.0,
        tasteAvg: 4.1,
        trend: "+0.3"
    }

    const mealStats = [
        { meal: "Breakfast", rating: 4.5, feedback: 52, trend: "up" },
        { meal: "Lunch", rating: 4.0, feedback: 54, trend: "down" },
        { meal: "Dinner", rating: 4.1, feedback: 50, trend: "up" },
    ]

    const recentFeedback = [
        {
            id: "1",
            studentName: "John Doe",
            date: "2024-01-15",
            mealType: "breakfast",
            rating: 5,
            qualityRating: 5,
            quantityRating: 4,
            tasteRating: 5,
            comments: "Excellent breakfast today! Idlis were soft and sambar was delicious."
        },
        {
            id: "2",
            studentName: "Jane Smith",
            date: "2024-01-15",
            mealType: "lunch",
            rating: 3,
            qualityRating: 3,
            quantityRating: 4,
            tasteRating: 3,
            comments: "Food quality has decreased. Dal was too watery."
        },
        {
            id: "3",
            studentName: "Mike Johnson",
            date: "2024-01-14",
            mealType: "dinner",
            rating: 4,
            qualityRating: 4,
            quantityRating: 4,
            tasteRating: 4,
            comments: "Good dinner. Rajma was well cooked."
        },
        {
            id: "4",
            studentName: "Sarah Williams",
            date: "2024-01-14",
            mealType: "breakfast",
            rating: 5,
            qualityRating: 5,
            quantityRating: 5,
            tasteRating: 5,
            comments: "Loved the poha today! Perfect taste and quantity."
        },
    ]

    const filteredFeedback = recentFeedback.filter(feedback => {
        const matchesSearch = feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.comments.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Mess Quality Feedback</h1>
                <p className="text-muted-foreground">Monitor and analyze student feedback on mess food</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Overall Rating</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl font-bold">{overallStats.averageRating}</p>
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                        {overallStats.trend} from last week
                    </p>
                </Card>

                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Quality</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl font-bold">{overallStats.qualityAvg}</p>
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </div>
                </Card>

                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Quantity</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl font-bold">{overallStats.quantityAvg}</p>
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </div>
                </Card>

                <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Taste</p>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl font-bold">{overallStats.tasteAvg}</p>
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Meal-wise Ratings</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {mealStats.map((meal) => (
                        <div key={meal.meal} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold">{meal.meal}</h4>
                                {meal.trend === 'up' ? (
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-2xl font-bold">{meal.rating}</p>
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-sm text-muted-foreground">{meal.feedback} responses</p>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search feedback..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={filterMeal}
                        onChange={(e) => setFilterMeal(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="all">All Meals</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredFeedback.map((feedback) => (
                        <Card key={feedback.id} className="p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-semibold">{feedback.studentName}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(feedback.date).toLocaleDateString()} • {feedback.mealType}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {renderStars(feedback.rating)}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Quality</p>
                                    <div className="flex items-center gap-1">
                                        {renderStars(feedback.qualityRating)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Quantity</p>
                                    <div className="flex items-center gap-1">
                                        {renderStars(feedback.quantityRating)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Taste</p>
                                    <div className="flex items-center gap-1">
                                        {renderStars(feedback.tasteRating)}
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm">{feedback.comments}</p>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
