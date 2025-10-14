"use client"

import { useState } from "react"
import { BackButton } from "@/components/common/back-button"
import { Utensils, Clock, Coffee, Sun, Sunset, Moon, Phone, Mail, Info } from "lucide-react"

type MenuItem = {
    day: string
    breakfast: string[]
    lunch: string[]
    snacks: string[]
    dinner: string[]
}

export default function StudentMessMenu() {
    const [selectedDay, setSelectedDay] = useState("Monday")

    const weekMenu: MenuItem[] = [
        {
            day: "Monday",
            breakfast: ["Idli", "Sambar", "Chutney", "Tea/Coffee"],
            lunch: ["Rice", "Dal", "Paneer Curry", "Roti", "Salad"],
            snacks: ["Samosa", "Tea"],
            dinner: ["Rice", "Rajma", "Roti", "Curd"],
        },
        {
            day: "Tuesday",
            breakfast: ["Poha", "Jalebi", "Tea/Coffee"],
            lunch: ["Rice", "Dal", "Chicken Curry", "Roti", "Salad"],
            snacks: ["Pakora", "Tea"],
            dinner: ["Rice", "Mixed Veg", "Roti", "Raita"],
        },
        {
            day: "Wednesday",
            breakfast: ["Upma", "Banana", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Fish Fry", "Roti", "Salad"],
            snacks: ["Bread Pakora", "Tea"],
            dinner: ["Rice", "Chole", "Roti", "Pickle"],
        },
        {
            day: "Thursday",
            breakfast: ["Paratha", "Curd", "Pickle", "Tea/Coffee"],
            lunch: ["Rice", "Dal", "Egg Curry", "Roti", "Salad"],
            snacks: ["Vada", "Tea"],
            dinner: ["Rice", "Kadhi", "Roti", "Papad"],
        },
        {
            day: "Friday",
            breakfast: ["Dosa", "Sambar", "Chutney", "Tea/Coffee"],
            lunch: ["Biryani", "Raita", "Salad"],
            snacks: ["Cutlet", "Tea"],
            dinner: ["Rice", "Dal Makhani", "Roti", "Sweet"],
        },
        {
            day: "Saturday",
            breakfast: ["Puri", "Aloo Sabzi", "Tea/Coffee"],
            lunch: ["Rice", "Dal", "Paneer Butter Masala", "Roti", "Salad"],
            snacks: ["Sandwich", "Tea"],
            dinner: ["Rice", "Palak Paneer", "Roti", "Curd"],
        },
        {
            day: "Sunday",
            breakfast: ["Bread", "Omelette", "Butter", "Tea/Coffee"],
            lunch: ["Special Thali", "Sweet Dish"],
            snacks: ["Cake", "Tea"],
            dinner: ["Rice", "Dal", "Mixed Veg", "Roti", "Ice Cream"],
        },
    ]

    const currentMenu = weekMenu.find((m) => m.day === selectedDay) || weekMenu[0]

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="glass rounded-lg p-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Mess Menu</h1>
                        <p className="text-muted-foreground mt-1">Weekly meal schedule for hostel mess</p>
                    </div>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {weekMenu.map((menu) => (
                        <button
                            key={menu.day}
                            onClick={() => setSelectedDay(menu.day)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedDay === menu.day ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                                }`}
                        >
                            {menu.day}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="glass rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <Coffee className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-semibold">Breakfast</h3>
                    </div>
                    <ul className="space-y-2">
                        {currentMenu.breakfast.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t">
                        <Clock className="h-3 w-3" />
                        <span>7:30 AM - 9:30 AM</span>
                    </div>
                </div>

                <div className="glass rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Sun className="h-5 w-5 text-yellow-500" />
                        </div>
                        <h3 className="text-lg font-semibold">Lunch</h3>
                    </div>
                    <ul className="space-y-2">
                        {currentMenu.lunch.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t">
                        <Clock className="h-3 w-3" />
                        <span>12:30 PM - 2:30 PM</span>
                    </div>
                </div>

                <div className="glass rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                            <Sunset className="h-5 w-5 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-semibold">Snacks</h3>
                    </div>
                    <ul className="space-y-2">
                        {currentMenu.snacks.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t">
                        <Clock className="h-3 w-3" />
                        <span>4:30 PM - 5:30 PM</span>
                    </div>
                </div>

                <div className="glass rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Moon className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold">Dinner</h3>
                    </div>
                    <ul className="space-y-2">
                        {currentMenu.dinner.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t">
                        <Clock className="h-3 w-3" />
                        <span>7:30 PM - 9:30 PM</span>
                    </div>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Mess Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Contact
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground pl-6">
                            <p className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                Mess Manager: +91 XXXXX XXXXX
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                Email: mess@hostel.edu
                            </p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Important Notes
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Menu subject to change</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Special diet available on request</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Feedback welcomed</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
