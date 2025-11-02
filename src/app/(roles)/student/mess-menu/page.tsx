"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Utensils, Clock, Coffee, Sun, Sunset, Moon, Phone, Mail, Info, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import {
    useGetMessMenuQuery,
    useGetTodayMessMenuQuery,
    useGetMessInfoQuery
} from '@/store/api/studentApi'

type MenuItem = {
    day: string
    breakfast: string[]
    lunch: string[]
    snacks: string[]
    dinner: string[]
}

export default function StudentMessMenu() {
    const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }))

    // Fetch mess menu from API
    const { data: menuData, isLoading: loadingMenu, error: menuError } = useGetMessMenuQuery()
    const { data: todayData, isLoading: loadingToday } = useGetTodayMessMenuQuery()
    const { data: infoData, isLoading: loadingInfo } = useGetMessInfoQuery()

    console.log('Mess Menu Data:', menuData)
    console.log('Today Menu:', todayData)
    console.log('Mess Info:', infoData)

    const weekMenu = menuData?.data?.menu || []
    const messInfo = infoData?.data || {}

    const currentMenu = weekMenu.find((m: any) => m.day === selectedDay) || weekMenu[0] || {
        day: selectedDay,
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: []
    }

    if (loadingMenu) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (menuError) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-400">Failed to load mess menu</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                                Mess Menu
                            </h1>
                            <p className="text-muted-foreground text-lg">Weekly meal schedule for hostel mess</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {weekMenu.map((menu: any) => (
                        <button
                            key={menu.day}
                            onClick={() => setSelectedDay(menu.day)}
                            className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 ${selectedDay === menu.day
                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40 scale-105"
                                : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {menu.day}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 backdrop-blur-xl border border-orange-200/50 dark:border-orange-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                            <Coffee className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100">Breakfast</h3>
                    </div>
                    <ul className="space-y-3">
                        {currentMenu.breakfast.map((item: any, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg bg-white/60 dark:bg-gray-900/40 hover:scale-105 transition-transform">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-700 dark:text-orange-300 mt-6 pt-4 border-t border-orange-200 dark:border-orange-800">
                        <Clock className="h-4 w-4" />
                        <span>7:30 AM - 9:30 AM</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-amber-950/30 backdrop-blur-xl border border-yellow-200/50 dark:border-yellow-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <Sun className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-100">Lunch</h3>
                    </div>
                    <ul className="space-y-3">
                        {currentMenu.lunch.map((item: any, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg bg-white/60 dark:bg-gray-900/40 hover:scale-105 transition-transform">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500" />
                                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs font-semibold text-yellow-700 dark:text-yellow-300 mt-6 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                        <Clock className="h-4 w-4" />
                        <span>12:30 PM - 2:30 PM</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/30 dark:to-rose-950/30 backdrop-blur-xl border border-pink-200/50 dark:border-pink-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/50">
                            <Sunset className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-pink-900 dark:text-pink-100">Snacks</h3>
                    </div>
                    <ul className="space-y-3">
                        {currentMenu.snacks.map((item: any, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg bg-white/60 dark:bg-gray-900/40 hover:scale-105 transition-transform">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs font-semibold text-pink-700 dark:text-pink-300 mt-6 pt-4 border-t border-pink-200 dark:border-pink-800">
                        <Clock className="h-4 w-4" />
                        <span>4:30 PM - 5:30 PM</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Moon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Dinner</h3>
                    </div>
                    <ul className="space-y-3">
                        {currentMenu.dinner.map((item: any, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg bg-white/60 dark:bg-gray-900/40 hover:scale-105 transition-transform">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300 mt-6 pt-4 border-t border-blue-200 dark:border-blue-800">
                        <Clock className="h-4 w-4" />
                        <span>7:30 PM - 9:30 PM</span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-800/50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                        <Info className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        Mess Information
                    </span>
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h4 className="font-bold text-base flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                                <Phone className="h-4 w-4 text-white" />
                            </div>
                            Contact
                        </h4>
                        <div className="space-y-3 pl-2">
                            <p className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40 text-sm font-medium text-gray-800 dark:text-gray-200">
                                <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                Mess Manager: {messInfo.contactNumber || '+91 XXXXX XXXXX'}
                            </p>
                            <p className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40 text-sm font-medium text-gray-800 dark:text-gray-200">
                                <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                Email: {messInfo.email || 'mess@hostel.edu'}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-base flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                                <Info className="h-4 w-4 text-white" />
                            </div>
                            Important Notes
                        </h4>
                        <ul className="space-y-3 pl-2">
                            {messInfo.notes && messInfo.notes.length > 0 ? (
                                messInfo.notes.map((note: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-1.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{note}</span>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-1.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Menu subject to change</span>
                                    </li>
                                    <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-1.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Special diet available on request</span>
                                    </li>
                                    <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-1.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Feedback welcomed</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
