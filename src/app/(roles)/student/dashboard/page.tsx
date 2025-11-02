"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAppSelector } from "@/store/hooks"
import {
    Bell,
    CreditCard,
    DoorOpen,
    FileText,
    MessageSquare,
    Loader2,
    Utensils,
    Coffee,
    Sun,
    Sunset,
    Moon,
} from "lucide-react"
import type { StudentDashboardData, Notice } from "@/types/student"
import { useGetStudentDashboardQuery, useGetTodayMessMenuQuery } from "@/store/api/studentApi"
import { AlertCircle } from "lucide-react"

export default function StudentDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const scrollRef = useRef<HTMLDivElement>(null)

    // Get user from Redux store
    const { user } = useAppSelector((state) => state.auth)

    // Fetch dashboard data using RTK Query
    const { data: dashboardResponse, isLoading: loading, error } = useGetStudentDashboardQuery()
    const dashboardData = dashboardResponse?.data

    // Fetch today's mess menu
    const { data: messMenuResponse } = useGetTodayMessMenuQuery()
    const todayMenu = messMenuResponse?.data

    // Get first name from full name
    const firstName = dashboardData?.user?.name?.split(' ')[0] || user?.name?.split(' ')[0] || 'Student'

    const notices = (dashboardData?.latestNotices || []) as Notice[]

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let scrollInterval: NodeJS.Timeout
        let isPaused = false

        const startScrolling = () => {
            if (isPaused) return

            scrollInterval = setInterval(() => {
                if (!scrollContainer) return

                // Check if we've reached the halfway point (original content end)
                const halfwayPoint = scrollContainer.scrollHeight / 2

                if (scrollContainer.scrollTop >= halfwayPoint) {
                    // Reset to the beginning without animation
                    scrollContainer.scrollTop = 0
                } else {
                    scrollContainer.scrollTop += 1
                }
            }, 50)
        }

        const stopScrolling = () => {
            isPaused = true
            clearInterval(scrollInterval)
        }

        const resumeScrolling = () => {
            isPaused = false
            startScrolling()
        }

        startScrolling()

        scrollContainer.addEventListener("mouseenter", stopScrolling)
        scrollContainer.addEventListener("mouseleave", resumeScrolling)

        return () => {
            clearInterval(scrollInterval)
            scrollContainer.removeEventListener("mouseenter", stopScrolling)
            scrollContainer.removeEventListener("mouseleave", resumeScrolling)
        }
    }, [])

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "urgent":
                return "bg-red-500/10 text-red-500 border-red-500/20"
            case "event":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20"
            case "maintenance":
                return "bg-orange-500/10 text-orange-500 border-orange-500/20"
            case "general":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }



    if (loading) {
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
                    <p className="text-lg text-gray-600 dark:text-gray-400">Failed to load dashboard</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Please try refreshing the page</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Welcome Back, {firstName}!
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="text-right space-y-1">
                        <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent tabular-nums">
                            {currentTime.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">Current Time</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/student/requests" className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:to-blue-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">My Requests</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/50">
                            <FileText className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-100">
                        {dashboardData?.stats?.myRequests?.total || 0}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                            {dashboardData?.stats?.myRequests?.pending || 0} pending
                        </span>
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            {dashboardData?.stats?.myRequests?.approved || 0} approved
                        </span>
                    </div>
                </Link>

                <Link href="/student/complaints" className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-600/0 group-hover:from-purple-400/10 group-hover:to-purple-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Complaints</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/50">
                            <MessageSquare className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-purple-900 dark:text-purple-100">
                        {dashboardData?.stats?.complaints?.total || 0}
                    </p>
                    <p className="text-xs font-medium flex items-center gap-1 text-blue-600 dark:text-blue-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        {dashboardData?.stats?.complaints?.inProgress || 0} in progress
                    </p>
                </Link>

                <Link href="/student/room-allotment" className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/10 group-hover:to-green-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300">Room Details</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-green-500/50">
                            <DoorOpen className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-green-900 dark:text-green-100">
                        {dashboardData?.stats?.roomDetails?.roomNumber || 'N/A'}
                    </p>
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">
                        {dashboardData?.stats?.roomDetails?.hostelName
                            ? `${dashboardData.stats.roomDetails.hostelName}${dashboardData.stats.roomDetails.floor ? `, ${dashboardData.stats.roomDetails.floor}${dashboardData.stats.roomDetails.floor === 1 ? 'st' : dashboardData.stats.roomDetails.floor === 2 ? 'nd' : dashboardData.stats.roomDetails.floor === 3 ? 'rd' : 'th'} Floor` : ''}`
                            : 'Not Allotted'}
                    </p>
                </Link>

                <Link href="/student/payments" className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-600/0 group-hover:from-red-400/10 group-hover:to-red-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Pending Payments</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-500/50">
                            <CreditCard className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-red-900 dark:text-red-100">
                        ₹{dashboardData?.stats?.pendingPayments?.total?.toLocaleString('en-IN') || '0'}
                    </p>
                    <p className="text-xs font-medium flex items-center gap-1 text-red-600 dark:text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        {dashboardData?.stats?.pendingPayments?.nextDueDate
                            ? `Due ${new Date(dashboardData.stats.pendingPayments.nextDueDate).toLocaleDateString()}`
                            : 'No pending payments'}
                    </p>
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Today's Mess Menu Preview */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                <Utensils className="h-5 w-5 text-white" />
                            </div>
                            <span>Today's Mess Menu</span>
                            <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg">
                                {currentTime.toLocaleDateString("en-US", { weekday: "long" })}
                            </span>
                        </h3>
                        <Link href="/student/mess-menu">
                            <Button variant="outline" size="sm" className="text-black dark:text-white transition-colors">
                                Full Menu
                            </Button>
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Breakfast */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <Coffee className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                <h4 className="font-bold text-orange-900 dark:text-orange-100">Breakfast</h4>
                                <span className="text-xs text-orange-600 dark:text-orange-400 ml-auto">
                                    {todayMenu?.breakfast?.time || '7:30 - 9:30 AM'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                {(todayMenu?.breakfast?.items || ["Idli", "Sambar", "Chutney", "Tea/Coffee"]).map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                        <span className="text-gray-800 dark:text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lunch */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200/50 dark:border-yellow-800/50 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <Sun className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                <h4 className="font-bold text-yellow-900 dark:text-yellow-100">Lunch</h4>
                                <span className="text-xs text-yellow-600 dark:text-yellow-400 ml-auto">
                                    {todayMenu?.lunch?.time || '12:30 - 2:30 PM'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                {(todayMenu?.lunch?.items || ["Rice", "Dal", "Paneer Curry", "Roti", "Salad"]).map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                        <span className="text-gray-800 dark:text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Snacks */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/30 dark:to-rose-950/30 border border-pink-200/50 dark:border-pink-800/50 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <Sunset className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                                <h4 className="font-bold text-pink-900 dark:text-pink-100">Snacks</h4>
                                <span className="text-xs text-pink-600 dark:text-pink-400 ml-auto">
                                    {todayMenu?.snacks?.time || '4:30 - 5:30 PM'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                {(todayMenu?.snacks?.items || ["Samosa", "Tea"]).map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                                        <span className="text-gray-800 dark:text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dinner */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <h4 className="font-bold text-blue-900 dark:text-blue-100">Dinner</h4>
                                <span className="text-xs text-blue-600 dark:text-blue-400 ml-auto">
                                    {todayMenu?.dinner?.time || '7:30 - 9:30 PM'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                {(todayMenu?.dinner?.items || ["Rice", "Rajma", "Roti", "Curd"]).map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        <span className="text-gray-800 dark:text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Latest Notices */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                                <Bell className="h-5 w-5 text-white" />
                            </div>
                            <span>Latest Notices</span>
                            {notices.filter((n) => n.isNew).length > 0 && (
                                <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg shadow-red-500/50 animate-pulse">
                                    {notices.filter((n) => n.isNew).length} New
                                </span>
                            )}
                        </h3>
                        <Link href="/student/notices">
                            <Button variant="outline" size="sm" className=" dark:text-white transition-colors">
                                View All
                            </Button>
                        </Link>
                    </div>
                    <div ref={scrollRef} className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {/* Render notices twice for seamless loop */}
                        {[...notices, ...notices].map((notice, index) => (
                            <div
                                key={`${notice.id}-${index}`}
                                className="group relative bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            {notice.isNew && (
                                                <span className="relative flex h-2.5 w-2.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                                </span>
                                            )}
                                            <span
                                                className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getCategoryColor(
                                                    notice.category ?? "general"
                                                )}`}
                                            >
                                                {notice.category}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {new Date(notice.date ?? new Date()).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{notice.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
