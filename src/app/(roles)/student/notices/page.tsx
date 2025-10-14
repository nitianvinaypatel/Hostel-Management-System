"use client"

import { useState } from "react"
import { BackButton } from "@/components/common/back-button"
import { Bell, Calendar, User, AlertCircle, PartyPopper, Wrench, Info, Pin } from "lucide-react"

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

    const pinnedNotices = filteredNotices.filter((n) => n.isPinned)
    const regularNotices = filteredNotices.filter((n) => !n.isPinned)

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="glass rounded-lg p-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bell className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Hostel Notices</h1>
                        <p className="text-muted-foreground mt-1">Stay updated with latest announcements and events</p>
                    </div>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === "all" ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                            }`}
                    >
                        <Bell className="h-4 w-4" />
                        All Notices
                    </button>
                    <button
                        onClick={() => setSelectedCategory("urgent")}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === "urgent" ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                            }`}
                    >
                        <AlertCircle className="h-4 w-4" />
                        Urgent
                    </button>
                    <button
                        onClick={() => setSelectedCategory("event")}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === "event" ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                            }`}
                    >
                        <PartyPopper className="h-4 w-4" />
                        Events
                    </button>
                    <button
                        onClick={() => setSelectedCategory("maintenance")}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === "maintenance"
                            ? "bg-primary text-primary-foreground"
                            : "glass hover:shadow-md"
                            }`}
                    >
                        <Wrench className="h-4 w-4" />
                        Maintenance
                    </button>
                    <button
                        onClick={() => setSelectedCategory("general")}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === "general" ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                            }`}
                    >
                        <Info className="h-4 w-4" />
                        General
                    </button>
                </div>
            </div>

            {pinnedNotices.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Pin className="h-5 w-5 text-primary" />
                        Pinned Notices
                    </h2>
                    {pinnedNotices.map((notice) => (
                        <div
                            key={notice.id}
                            className="glass rounded-lg p-6 hover:shadow-lg transition-all border-2 border-primary/20"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold">{notice.title}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(
                                                notice.category
                                            )}`}
                                        >
                                            {getCategoryIcon(notice.category)}
                                            {notice.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{notice.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(notice.date).toLocaleDateString()}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            {notice.author}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                {regularNotices.length > 0 ? (
                    <>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Recent Notices
                        </h2>
                        {regularNotices.map((notice) => (
                            <div key={notice.id} className="glass rounded-lg p-6 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold">{notice.title}</h3>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(
                                                    notice.category
                                                )}`}
                                            >
                                                {getCategoryIcon(notice.category)}
                                                {notice.category}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{notice.content}</p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(notice.date).toLocaleDateString()}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {notice.author}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="glass rounded-lg p-12 text-center">
                        <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No notices found in this category</p>
                    </div>
                )}
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Notice Board Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Contact for Queries</h4>
                        <p className="text-sm text-muted-foreground">Hostel Office: +91 XXXXX XXXXX</p>
                        <p className="text-sm text-muted-foreground">Email: hostel@university.edu</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Important</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Check notices regularly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Follow all instructions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Report urgent matters immediately</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
