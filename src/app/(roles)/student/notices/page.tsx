"use client"

import { useState } from "react"
import { BackButton } from "@/components/common/back-button"
import { Bell, Calendar, User, AlertCircle, PartyPopper, Wrench, Info } from "lucide-react"

type Notice = {
    id: string
    title: string
    category: "general" | "urgent" | "event" | "maintenance"
    date: string
    content: string
    author: string
    isPinned?: boolean
}

export default function HostelNotices() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const notices: Notice[] = [
        {
            id: "N001",
            title: "Hostel Maintenance Schedule",
            category: "maintenance",
            date: "2024-10-14",
            content:
                "Water supply will be interrupted on Sunday, October 20th from 9 AM to 2 PM for maintenance work. Please store water accordingly.",
            author: "Hostel Warden",
            isPinned: true,
        },
        {
            id: "N002",
            title: "Diwali Celebration Event",
            category: "event",
            date: "2024-10-13",
            content:
                "Join us for Diwali celebration on October 25th at 6 PM in the hostel common area. Cultural programs and dinner will be organized.",
            author: "Cultural Committee",
        },
        {
            id: "N003",
            title: "Mess Fee Payment Reminder",
            category: "urgent",
            date: "2024-10-12",
            content:
                "Last date to pay mess fee for October is 15th October. Late payment will incur a fine of ₹100 per day.",
            author: "Mess Manager",
            isPinned: true,
        },
        {
            id: "N004",
            title: "New Wi-Fi Password",
            category: "general",
            date: "2024-10-10",
            content: "Wi-Fi password has been updated for security reasons. Please collect the new password from the hostel office.",
            author: "IT Department",
        },
        {
            id: "N005",
            title: "Room Inspection Notice",
            category: "general",
            date: "2024-10-08",
            content:
                "Routine room inspection will be conducted on October 18th. Please ensure your rooms are clean and organized.",
            author: "Hostel Warden",
        },
        {
            id: "N006",
            title: "Sports Day Registration",
            category: "event",
            date: "2024-10-05",
            content:
                "Register for Inter-Hostel Sports Day by October 20th. Events include cricket, football, badminton, and athletics.",
            author: "Sports Committee",
        },
    ]

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "urgent":
                return <AlertCircle className="h-4 w-4" />
            case "event":
                return <PartyPopper className="h-4 w-4" />
            case "maintenance":
                return <Wrench className="h-4 w-4" />
            case "general":
                return <Info className="h-4 w-4" />
            default:
                return <Bell className="h-4 w-4" />
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "urgent":
                return "bg-red-500/10 text-red-500"
            case "event":
                return "bg-purple-500/10 text-purple-500"
            case "maintenance":
                return "bg-orange-500/10 text-orange-500"
            case "general":
                return "bg-blue-500/10 text-blue-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    const filteredNotices = selectedCategory === "all" ? notices : notices.filter((n) => n.category === selectedCategory)

    // Sort by date (latest first)
    const sortedNotices = [...filteredNotices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <BackButton />
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-red-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/50">
                        <Bell className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            Hostel Notices
                        </h1>
                        <p className="text-muted-foreground mt-1 text-lg">Stay updated with latest announcements and events</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === "all"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Bell className="h-4 w-4" />
                        All Notices
                    </button>
                    <button
                        onClick={() => setSelectedCategory("urgent")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === "urgent"
                            ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <AlertCircle className="h-4 w-4" />
                        Urgent
                    </button>
                    <button
                        onClick={() => setSelectedCategory("event")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === "event"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <PartyPopper className="h-4 w-4" />
                        Events
                    </button>
                    <button
                        onClick={() => setSelectedCategory("maintenance")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === "maintenance"
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Wrench className="h-4 w-4" />
                        Maintenance
                    </button>
                    <button
                        onClick={() => setSelectedCategory("general")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === "general"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Info className="h-4 w-4" />
                        General
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {sortedNotices.length > 0 ? (
                    <>
                        <h2 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                                <Bell className="h-4 w-4 text-white" />
                            </div>
                            All Notices
                        </h2>
                        {sortedNotices.map((notice) => (
                            <div key={notice.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{notice.title}</h3>
                                            <span
                                                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md ${getCategoryColor(
                                                    notice.category
                                                )}`}
                                            >
                                                {getCategoryIcon(notice.category)}
                                                {notice.category.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{notice.content}</p>
                                        <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(notice.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                <User className="h-3.5 w-3.5" />
                                                {notice.author}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 text-center shadow-lg">
                        <Bell className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium">No notices found in this category</p>
                    </div>
                )}
            </div>

            <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 backdrop-blur-xl border border-indigo-200/50 dark:border-indigo-800/50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <Info className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Notice Board Information
                    </span>
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h4 className="font-bold text-base text-indigo-900 dark:text-indigo-100">Contact for Queries</h4>
                        <div className="space-y-3">
                            <p className="text-sm font-medium p-3 rounded-xl bg-white/60 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200">Hostel Office: +91 XXXXX XXXXX</p>
                            <p className="text-sm font-medium p-3 rounded-xl bg-white/60 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200">Email: hostel@university.edu</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-base text-indigo-900 dark:text-indigo-100">Important</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1.5 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Check notices regularly</span>
                            </li>
                            <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1.5 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Follow all instructions</span>
                            </li>
                            <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/40">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1.5 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Report urgent matters immediately</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
