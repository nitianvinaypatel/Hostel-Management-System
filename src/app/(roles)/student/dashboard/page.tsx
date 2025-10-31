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
    Phone,
    TrendingUp,
    Loader2,
} from "lucide-react"
import { studentService } from "@/services/student.service"
import type { StudentDashboardData, Notice, Activity } from "@/types/student"

export default function StudentDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const scrollRef = useRef<HTMLDivElement>(null)
    const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Get user from Redux store
    const { user } = useAppSelector((state) => state.auth)

    // Get first name from full name
    const firstName = dashboardData?.user?.name?.split(' ')[0] || user?.name?.split(' ')[0] || 'Student'

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await studentService.getDashboard()
            if (response.success) {
                setDashboardData(response.data)
            }
        } catch (err) {
            setError('Failed to load dashboard data')
            console.error('Dashboard error:', err)
        } finally {
            setLoading(false)
        }
    }

    const notices: Notice[] = dashboardData?.latestNotices || []
    const recentActivity: Activity[] = dashboardData?.recentActivity || []

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

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "request":
                return <FileText className="h-4 w-4" />
            case "complaint":
                return <MessageSquare className="h-4 w-4" />
            case "payment":
                return <CreditCard className="h-4 w-4" />
            case "notice":
                return <Bell className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "approved":
                return "text-green-500"
            case "pending":
                return "text-yellow-500"
            case "in-progress":
                return "text-blue-500"
            default:
                return "text-muted-foreground"
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                            Welcome Back, {firstName}! 👋
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
                    <p className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-100">3</p>
                    <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400"><span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" /> 2 pending</span>
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> 1 approved</span>
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
                    <p className="text-4xl font-bold mb-2 text-purple-900 dark:text-purple-100">1</p>
                    <p className="text-xs font-medium flex items-center gap-1 text-blue-600 dark:text-blue-400"><span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> In progress</p>
                </Link>

                <Link href="/student/payments" className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-600/0 group-hover:from-red-400/10 group-hover:to-red-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Pending Payments</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-500/50">
                            <CreditCard className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-red-900 dark:text-red-100">₹5,000</p>
                    <p className="text-xs font-medium flex items-center gap-1 text-red-600 dark:text-red-400"><span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Due in 5 days</p>
                </Link>

                <Link href="/student/room-allotment" className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/10 group-hover:to-green-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300">Room Details</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-green-500/50">
                            <DoorOpen className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-green-900 dark:text-green-100">204</p>
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">Hostel A, 2nd Floor</p>
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
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
                                <Button variant="outline" size="sm" className=" text-white transition-colors">
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

                <div className="space-y-6">
                    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <span>Recent Activity</span>
                        </h3>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">{activity.title}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-xs text-muted-foreground font-medium">{activity.time}</p>
                                            {activity.status && (
                                                <>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className={`text-xs font-semibold ${getStatusColor(activity.status)}`}>
                                                        {activity.status}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-bold mb-5 flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-lg shadow-rose-500/50">
                                <Phone className="h-5 w-5 text-white" />
                            </div>
                            <span>Emergency Contacts</span>
                        </h3>
                        <div className="space-y-3">
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div>
                                    <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Hostel Warden</p>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">+91 XXXXX XXXXX</p>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all">
                                    Call
                                </Button>
                            </div>
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div>
                                    <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Security</p>
                                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">+91 XXXXX XXXXX</p>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-md hover:shadow-lg transition-all">
                                    Call
                                </Button>
                            </div>
                            <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200/50 dark:border-red-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <div>
                                    <p className="text-sm font-bold text-red-900 dark:text-red-100">Medical Emergency</p>
                                    <p className="text-xs text-red-700 dark:text-red-400 font-medium">+91 XXXXX XXXXX</p>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0 shadow-md hover:shadow-lg transition-all">
                                    Call
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
