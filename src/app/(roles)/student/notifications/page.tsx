"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Bell,
    AlertTriangle,
    Info,
    CheckCircle,
    Clock,
    ArrowLeft,
    Trash2,
    Check,
    Filter,
    Search,
    Loader2,
    AlertCircle as AlertCircleIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useDeleteNotificationMutation
} from '@/store/api/studentApi'

type NotificationType = "announcement" | "emergency" | "policy" | "maintenance" | "event" | "payment"

type Notification = {
    id: string
    title: string
    message: string
    type: NotificationType
    sentAt: string
    sentBy: string
    isRead: boolean
    priority: "high" | "medium" | "low"
}

const initialNotifications: Notification[] = [
    {
        id: "N001",
        title: "Emergency: Water Supply Interruption",
        message: "Water supply will be interrupted tomorrow from 9 AM to 2 PM for maintenance work. Please store water accordingly.",
        type: "emergency",
        sentAt: "2024-11-01T10:30:00",
        sentBy: "Hostel Administration",
        isRead: false,
        priority: "high",
    },
    {
        id: "N002",
        title: "Diwali Celebration Event",
        message: "Join us for Diwali celebration on November 5th at 6 PM in the hostel common area. Cultural programs and dinner will be organized.",
        type: "event",
        sentAt: "2024-10-30T14:20:00",
        sentBy: "Cultural Committee",
        isRead: false,
        priority: "medium",
    },
    {
        id: "N003",
        title: "Mess Fee Payment Reminder",
        message: "Last date to pay mess fee for November is 5th November. Late payment will incur a fine of ₹100 per day.",
        type: "payment",
        sentAt: "2024-10-29T09:00:00",
        sentBy: "Mess Manager",
        isRead: true,
        priority: "high",
    },
    {
        id: "N004",
        title: "New Wi-Fi Password Updated",
        message: "Wi-Fi password has been updated for security reasons. Please collect the new password from the hostel office during working hours.",
        type: "announcement",
        sentAt: "2024-10-28T16:45:00",
        sentBy: "IT Department",
        isRead: true,
        priority: "medium",
    },
    {
        id: "N005",
        title: "Room Inspection Schedule",
        message: "Routine room inspection will be conducted on November 8th. Please ensure your rooms are clean and organized.",
        type: "announcement",
        sentAt: "2024-10-27T11:30:00",
        sentBy: "Hostel Warden",
        isRead: true,
        priority: "low",
    },
    {
        id: "N006",
        title: "Hostel Policy Update",
        message: "New visitor policy has been implemented. All visitors must register at the gate and obtain a visitor pass. Valid ID proof is mandatory.",
        type: "policy",
        sentAt: "2024-10-25T10:00:00",
        sentBy: "Dean of Students",
        isRead: true,
        priority: "high",
    },
    {
        id: "N007",
        title: "Maintenance Work Completed",
        message: "The electrical maintenance work in Block A has been completed. All rooms now have stable power supply.",
        type: "maintenance",
        sentAt: "2024-10-24T18:00:00",
        sentBy: "Maintenance Team",
        isRead: true,
        priority: "low",
    },
]

export default function StudentNotifications() {
    const [filterType, setFilterType] = useState<NotificationType | "all">("all")
    const [filterRead, setFilterRead] = useState<"all" | "read" | "unread">("all")
    const [searchQuery, setSearchQuery] = useState("")

    // Fetch notifications from API
    const { data: notificationsData, isLoading, error } = useGetNotificationsQuery({
        type: filterType === "all" ? undefined : filterType,
        isRead: filterRead === "all" ? undefined : filterRead === "read"
    })

    // Mutations
    const [markAsRead] = useMarkNotificationAsReadMutation()
    const [markAllAsRead] = useMarkAllNotificationsAsReadMutation()
    const [deleteNotification] = useDeleteNotificationMutation()

    console.log('Notifications Data:', notificationsData)
    console.log('Notifications Data.data:', notificationsData?.data)

    // Handle nested response structure
    const notifications = Array.isArray(notificationsData?.data)
        ? notificationsData.data
        : notificationsData?.data?.notifications || []

    console.log('Processed notifications:', notifications)
    console.log('Is array?', Array.isArray(notifications))

    const handleMarkAsRead = async (id: string) => {
        try {
            await markAsRead(id).unwrap()
            toast.success('Marked as read')
        } catch (error: any) {
            console.error('Error marking as read:', error)
            toast.error(error?.data?.message || 'Failed to mark as read')
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead().unwrap()
            toast.success('All notifications marked as read')
        } catch (error: any) {
            console.error('Error marking all as read:', error)
            toast.error(error?.data?.message || 'Failed to mark all as read')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteNotification(id).unwrap()
            toast.success('Notification deleted')
        } catch (error: any) {
            console.error('Error deleting notification:', error)
            toast.error(error?.data?.message || 'Failed to delete notification')
        }
    }

    if (isLoading) {
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
                    <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-400">Failed to load notifications</p>
                </div>
            </div>
        )
    }

    const getTypeIcon = (type: NotificationType) => {
        switch (type) {
            case "emergency":
                return <AlertTriangle className="h-5 w-5" />
            case "announcement":
                return <Bell className="h-5 w-5" />
            case "policy":
                return <Info className="h-5 w-5" />
            case "maintenance":
                return <Info className="h-5 w-5" />
            case "event":
                return <Bell className="h-5 w-5" />
            case "payment":
                return <AlertTriangle className="h-5 w-5" />
            default:
                return <Bell className="h-5 w-5" />
        }
    }

    const getTypeColor = (type: NotificationType) => {
        switch (type) {
            case "emergency":
                return "bg-red-500/10 text-red-500 border-red-500/20"
            case "announcement":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case "policy":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20"
            case "maintenance":
                return "bg-orange-500/10 text-orange-500 border-orange-500/20"
            case "event":
                return "bg-green-500/10 text-green-500 border-green-500/20"
            case "payment":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
            case "medium":
                return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
            case "low":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
            default:
                return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
        }
    }

    // Filter notifications
    const filteredNotifications = notifications.filter((notif: any) => {
        const matchesType = filterType === "all" || notif.type === filterType
        const matchesRead = filterRead === "all" ||
            (filterRead === "read" && notif.isRead) ||
            (filterRead === "unread" && !notif.isRead)
        const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notif.message.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesType && matchesRead && matchesSearch
    })

    const unreadCount = notifications.filter((n: any) => !n.isRead).length

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/student/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                        Notifications
                                    </h1>
                                    {unreadCount > 0 && (
                                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold animate-pulse">
                                            {unreadCount} New
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-lg">Stay updated with important announcements</p>
                            </div>
                        </div>
                        {unreadCount > 0 && (
                            <Button
                                onClick={handleMarkAllAsRead}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark All as Read
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search notifications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white/80 dark:bg-gray-800/80"
                            />
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as NotificationType | "all")}
                            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
                        >
                            <option value="all">All Types</option>
                            <option value="emergency">Emergency</option>
                            <option value="announcement">Announcement</option>
                            <option value="event">Event</option>
                            <option value="payment">Payment</option>
                            <option value="policy">Policy</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>

                    {/* Read Status Filter */}
                    <select
                        value={filterRead}
                        onChange={(e) => setFilterRead(e.target.value as "all" | "read" | "unread")}
                        className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 text-center shadow-lg">
                        <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium">No notifications found</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your filters</p>
                    </div>
                ) : (
                    filteredNotifications.map((notif: any) => (
                        <div
                            key={notif._id || notif.id}
                            className={`group bg-gradient-to-br backdrop-blur-xl border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${notif.isRead
                                ? "from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 border-gray-200/60 dark:border-gray-700/60"
                                : "from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200/60 dark:border-blue-800/60 shadow-lg"
                                } ${notif.type === "emergency" ? "border-l-4 border-l-red-500" : ""}`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${notif.type === "emergency"
                                    ? "bg-gradient-to-br from-red-500 to-red-600 animate-pulse"
                                    : notif.type === "payment"
                                        ? "bg-gradient-to-br from-yellow-500 to-amber-600"
                                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                                    }`}>
                                    <div className="text-white">
                                        {getTypeIcon(notif.type)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <h3 className={`font-bold text-lg ${notif.isRead ? "text-gray-900 dark:text-gray-100" : "text-blue-900 dark:text-blue-100"}`}>
                                                    {notif.title}
                                                </h3>
                                                <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${getTypeColor(notif.type)}`}>
                                                    {notif.type.toUpperCase()}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(notif.priority)}`}>
                                                    {notif.priority}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                                                {notif.message}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(notif.sentAt).toLocaleString()}
                                                </span>
                                                <span>By {notif.sentBy}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {!notif.isRead && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleMarkAsRead(notif._id || notif.id)}
                                                    className="rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDelete(notif._id || notif.id)}
                                                className="rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
