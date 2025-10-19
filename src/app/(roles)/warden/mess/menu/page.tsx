'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Plus } from "lucide-react"

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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Mess Menu</h1>
                    <p className="text-muted-foreground">Weekly meal schedule for Hostel A</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Update Menu
                </Button>
            </div>

            <div className="grid gap-4">
                {weeklyMenu.map((day) => (
                    <Card key={day.day} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold">{day.day}</h3>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-orange-600">Breakfast</h4>
                                    <span className="text-xs text-muted-foreground">{day.breakfast.time}</span>
                                </div>
                                <ul className="space-y-1">
                                    {day.breakfast.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-green-600">Lunch</h4>
                                    <span className="text-xs text-muted-foreground">{day.lunch.time}</span>
                                </div>
                                <ul className="space-y-1">
                                    {day.lunch.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-blue-600">Dinner</h4>
                                    <span className="text-xs text-muted-foreground">{day.dinner.time}</span>
                                </div>
                                <ul className="space-y-1">
                                    {day.dinner.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
