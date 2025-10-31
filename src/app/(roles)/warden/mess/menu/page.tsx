'use client'

import { Button } from "@/components/ui/button"
import { Edit, Plus, Utensils, Clock } from "lucide-react"

export default function MessMenu() {
    const weeklyMenu = [
        {
            day: "Monday",
            breakfast: { items: ["Idli", "Sambar", "Chutney", "Tea/Coffee"], time: "7:30 AM - 9:30 AM" },
            lunch: { items: ["Rice", "Dal", "Sabzi", "Roti", "Curd"], time: "12:00 PM - 2:00 PM" },
            dinner: { items: ["Rice", "Rajma", "Roti", "Salad"], time: "7:00 PM - 9:00 PM" }
        },
        {
            day: "Tuesday",
            breakfast: { items: ["Poha", "Jalebi", "Tea/Coffee"], time: "7:30 AM - 9:30 AM" },
            lunch: { items: ["Rice", "Sambar", "Dry Sabzi", "Roti", "Papad"], time: "12:00 PM - 2:00 PM" },
            dinner: { items: ["Rice", "Chole", "Roti", "Raita"], time: "7:00 PM - 9:00 PM" }
        },
        {
            day: "Wednesday",
            breakfast: { items: ["Upma", "Banana", "Tea/Coffee"], time: "7:30 AM - 9:30 AM" },
            lunch: { items: ["Rice", "Dal Fry", "Aloo Gobi", "Roti", "Pickle"], time: "12:00 PM - 2:00 PM" },
            dinner: { items: ["Rice", "Paneer Curry", "Roti", "Salad"], time: "7:00 PM - 9:00 PM" }
        },
        {
            day: "Thursday",
            breakfast: { items: ["Paratha", "Curd", "Pickle", "Tea/Coffee"], time: "7:30 AM - 9:30 AM" },
            lunch: { items: ["Rice", "Kadhi", "Bhindi Fry", "Roti", "Papad"], time: "12:00 PM - 2:00 PM" },
            dinner: { items: ["Rice", "Dal Makhani", "Roti", "Raita"], time: "7:00 PM - 9:00 PM" }
        },
        {
            day: "Friday",
            breakfast: { items: ["Dosa", "Sambar", "Chutney", "Tea/Coffee"], time: "7:30 AM - 9:30 AM" },
            lunch: { items: ["Rice", "Rasam", "Cabbage Sabzi", "Roti", "Curd"], time: "12:00 PM - 2:00 PM" },
            dinner: { items: ["Rice", "Egg Curry", "Roti", "Salad"], time: "7:00 PM - 9:00 PM" }
        },
        {
            day: "Saturday",
            breakfast: { items: ["Puri", "Aloo Sabzi", "Tea/Coffee"], time: "7:30 AM - 9:30 AM" },
            lunch: { items: ["Rice", "Dal", "Mix Veg", "Roti", "Sweet"], time: "12:00 PM - 2:00 PM" },
            dinner: { items: ["Rice", "Chicken Curry", "Roti", "Raita"], time: "7:00 PM - 9:00 PM" }
        },
        {
            day: "Sunday",
            breakfast: { items: ["Bread", "Omelette", "Butter", "Tea/Coffee"], time: "8:00 AM - 10:00 AM" },
            lunch: { items: ["Rice", "Special Curry", "Roti", "Papad", "Ice Cream"], time: "12:30 PM - 2:30 PM" },
            dinner: { items: ["Rice", "Dal", "Roti", "Salad"], time: "7:00 PM - 9:00 PM" }
        },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                            Mess Menu 🍛
                        </h1>
                        <p className="text-muted-foreground text-lg">Weekly meal schedule for Hostel A</p>
                    </div>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        Update Menu
                    </Button>
                </div>
            </div>

            {/* Weekly Menu */}
            <div className="grid gap-5">
                {weeklyMenu.map((day) => (
                    <div key={day.day} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">{day.day}</h3>
                            <Button variant="outline" size="sm" className="w-full md:w-auto">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Breakfast */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/50">
                                            <Utensils className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-orange-700 dark:text-orange-300">Breakfast</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.breakfast.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.breakfast.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Lunch */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md shadow-green-500/50">
                                            <Utensils className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-green-700 dark:text-green-300">Lunch</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.lunch.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.lunch.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Dinner */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/50">
                                            <Utensils className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-blue-700 dark:text-blue-300">Dinner</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.dinner.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.dinner.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
