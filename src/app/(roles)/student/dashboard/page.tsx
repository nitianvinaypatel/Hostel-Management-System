"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Bell,
    CreditCard,
    DoorOpen,
    FileText,
    MessageSquare,
    Phone,
    TrendingUp,
} from "lucide-react"

type Notice = {
    id: string
    title: string
    category: "urgent" | "event" | "maintenance" | "general"
    date: string
    isNew?: boolean
}

type Activity = {
    id: string
    type: "request" | "complaint" | "payment" | "notice"
    title: string
    time: string
    status?: string
}

export default function StudentDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const scrollRef = useRef<HTMLDivElement>(null)

    const notices: Notice[] = [
        {
            id: "N001",
            title: "Hostel Maintenance Schedule - Water supply interruption on Sunday",
            category: "maintenance",
            date: "2024-10-14",
            isNew: true,
        },
        {
            id: "N002",
            title: "Diwali Celebration Event on October 25th at 6 PM",
            category: "event",
            date: "2024-10-13",
            isNew: true,
        },
        {
            id: "N003",
            title: "Mess Fee Payment Reminder - Last date October 15th",
            category: "urgent",
            date: "2024-10-12",
        },
        {
            id: "N004",
            title: "New Wi-Fi Password available at hostel office",
            category: "general",
            date: "2024-10-10",
        },
        {
            id: "N005",
            title: "Room Inspection scheduled for October 18th",
            category: "general",
            date: "2024-10-08",
        },
    ]

    const recentActivity: Activity[] = [
        {
            id: "A001",
            type: "request",
            title: "Leave Request approved",
            time: "2 hours ago",
            status: "approved",
        },
        {
            id: "A002",
            type: "complaint",
            title: "Water Supply Issue - In Progress",
            time: "5 hours ago",
            status: "in-progress",
        },
        {
            id: "A003",
            type: "payment",
            title: "Mess Fee payment pending",
            time: "1 day ago",
            status: "pending",
        },
        {
            id: "A004",
            type: "notice",
            title: "New notice posted: Diwali Celebration",
            time: "2 days ago",
        },
        {
            id: "A005",
            type: "request",
            title: "Room Change Request submitted",
            time: "3 days ago",
            status: "pending",
        },
    ]

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

    return (
        <div className="space-y-6">
            <div className="glass rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome Back, Student!</h1>
                        <p className="text-muted-foreground">
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold">
                            {currentTime.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                        <p className="text-sm text-muted-foreground">Current Time</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/student/requests" className="glass rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">My Requests</h3>
                        <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="h-6 w-6 text-blue-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">3</p>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-yellow-500">● 2 pending</span>
                        <span className="text-green-500">● 1 approved</span>
                    </div>
                </Link>

                <Link href="/student/complaints" className="glass rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Complaints</h3>
                        <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageSquare className="h-6 w-6 text-purple-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">1</p>
                    <p className="text-xs text-blue-500">● In progress</p>
                </Link>

                <Link href="/student/payments" className="glass rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Pending Payments</h3>
                        <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CreditCard className="h-6 w-6 text-red-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">₹5,000</p>
                    <p className="text-xs text-red-500">● Due in 5 days</p>
                </Link>

                <Link href="/student/room-allotment" className="glass rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Room Details</h3>
                        <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <DoorOpen className="h-6 w-6 text-green-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">204</p>
                    <p className="text-xs text-muted-foreground">Hostel A, 2nd Floor</p>
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                <span>Latest Notices</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-500">
                                    {notices.filter((n) => n.isNew).length} New
                                </span>
                            </h3>
                            <Link href="/student/notices">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div ref={scrollRef} className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scroll-smooth">
                            {/* Render notices twice for seamless loop */}
                            {[...notices, ...notices].map((notice, index) => (
                                <div
                                    key={`${notice.id}-${index}`}
                                    className="glass rounded-lg p-4 hover:shadow-md transition-all border border-border/50"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {notice.isNew && (
                                                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                                )}
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(
                                                        notice.category
                                                    )}`}
                                                >
                                                    {notice.category}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(notice.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium">{notice.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            <span>Recent Activity</span>
                        </h3>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{activity.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                            {activity.status && (
                                                <>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
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

                    <div className="glass rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            <span>Emergency Contacts</span>
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                <div>
                                    <p className="text-sm font-medium">Hostel Warden</p>
                                    <p className="text-xs text-muted-foreground">+91 XXXXX XXXXX</p>
                                </div>
                                <Button size="sm" variant="outline">
                                    Call
                                </Button>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                <div>
                                    <p className="text-sm font-medium">Security</p>
                                    <p className="text-xs text-muted-foreground">+91 XXXXX XXXXX</p>
                                </div>
                                <Button size="sm" variant="outline">
                                    Call
                                </Button>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                <div>
                                    <p className="text-sm font-medium">Medical Emergency</p>
                                    <p className="text-xs text-muted-foreground">+91 XXXXX XXXXX</p>
                                </div>
                                <Button size="sm" variant="outline">
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
