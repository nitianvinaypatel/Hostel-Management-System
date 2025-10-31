'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Utensils, Coffee, Sun, Moon, Calendar, Edit, Save } from "lucide-react"

export default function CaretakerMessManagement() {
    const [selectedDay, setSelectedDay] = useState("Monday")

    const weekMenu = [
        {
            day: "Monday",
            breakfast: "Idli, Sambar, Chutney",
            lunch: "Rice, Dal, Sabzi, Roti",
            dinner: "Chapati, Paneer Curry, Rice"
        },
        {
            day: "Tuesday",
            breakfast: "Poha, Tea",
            lunch: "Rice, Rajma, Salad",
            dinner: "Roti, Mix Veg, Dal"
        },
        {
            day: "Wednesday",
            breakfast: "Upma, Coffee",
            lunch: "Rice, Chole, Roti",
            dinner: "Chapati, Dal Fry, Rice"
        },
        {
            day: "Thursday",
            breakfast: "Paratha, Curd",
            lunch: "Rice, Kadhi, Pakora",
            dinner: "Roti, Aloo Gobi, Dal"
        },
        {
            day: "Friday",
            breakfast: "Dosa, Sambar, Chutney",
            lunch: "Rice, Rajma, Salad",
            dinner: "Chapati, Paneer Butter Masala"
        },
        {
            day: "Saturday",
            breakfast: "Bread, Butter, Jam",
            lunch: "Biryani, Raita, Salad",
            dinner: "Roti, Mix Veg, Dal"
        },
        {
            day: "Sunday",
            breakfast: "Puri, Aloo Sabzi",
            lunch: "Rice, Special Curry, Roti",
            dinner: "Chapati, Dal Makhani, Rice"
        }
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-red-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-red-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                        <Utensils className="h-7 w-7 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            Mess Menu Management 🍽️
                        </h1>
                        <p className="text-muted-foreground text-lg">Manage weekly mess menu and meal schedules</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Week Menu */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Current Week Menu</h3>
                                <p className="text-sm text-muted-foreground">View this week's meal schedule</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                        {weekMenu.map((menu) => (
                            <div key={menu.day} className="border-l-4 border-amber-500 dark:border-amber-400 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{menu.day}</h3>
                                    <Button size="sm" variant="ghost" onClick={() => setSelectedDay(menu.day)}>
                                        <Edit className="h-3 w-3 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Coffee className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Breakfast</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{menu.breakfast}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Sun className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Lunch</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{menu.lunch}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Dinner</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{menu.dinner}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Update Menu Form */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <Edit className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Update Menu</h3>
                                <p className="text-sm text-muted-foreground">Update the mess menu for any day</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Day</FieldLabel>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm [&>option]:text-gray-900 [&>option]:dark:text-white"
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(e.target.value)}
                                >
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <Coffee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    Breakfast
                                </FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter breakfast menu"
                                    className="bg-white dark:bg-gray-800"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <Sun className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    Lunch
                                </FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter lunch menu"
                                    className="bg-white dark:bg-gray-800"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    Dinner
                                </FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter dinner menu"
                                    className="bg-white dark:bg-gray-800"
                                />
                            </Field>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-900 dark:text-blue-300">
                                    <strong>Note:</strong> Changes will be reflected immediately for all students. Make sure to verify the menu before updating.
                                </p>
                            </div>

                            <Button type="submit" className="w-full">
                                <Save className="h-4 w-4 mr-2" />
                                Update Menu
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <Utensils className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">450</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Menu Updates</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">12</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                            <Coffee className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">This Week</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">Week 12</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
