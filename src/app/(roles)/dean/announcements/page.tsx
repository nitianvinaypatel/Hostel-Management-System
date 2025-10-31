'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Send, Megaphone, AlertTriangle, FileText, Users, Building } from "lucide-react"

export default function DeanAnnouncements() {
    const [showForm, setShowForm] = useState(false)
    const [announcementType, setAnnouncementType] = useState("general")
    const [selectedHostels, setSelectedHostels] = useState<string[]>([])
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])

    const recentAnnouncements = [
        {
            id: "ANN-015",
            type: "urgent",
            title: "Emergency Maintenance - Water Supply Shutdown",
            message: "Water supply will be temporarily shut down on Jan 20 from 10 AM to 2 PM for emergency repairs. Please store water in advance.",
            targetHostels: ["All Hostels"],
            targetRoles: ["Students", "Wardens", "Caretakers"],
            createdAt: "2024-01-15 09:30",
            createdBy: "Dean Office"
        },
        {
            id: "ANN-014",
            type: "policy",
            title: "New Hostel Entry/Exit Policy",
            message: "Effective from Feb 1, all students must register their entry and exit times at the hostel gate. This is mandatory for security purposes.",
            targetHostels: ["All Hostels"],
            targetRoles: ["Students", "Wardens"],
            createdAt: "2024-01-14 14:20",
            createdBy: "Dean Office"
        },
        {
            id: "ANN-013",
            type: "notice",
            title: "Hostel Fee Payment Deadline",
            message: "Reminder: Hostel fees for the current semester must be paid by Jan 31. Late payment will incur a penalty of ₹500.",
            targetHostels: ["All Hostels"],
            targetRoles: ["Students"],
            createdAt: "2024-01-13 11:00",
            createdBy: "Dean Office"
        },
        {
            id: "ANN-012",
            type: "general",
            title: "Hostel Day Celebration",
            message: "Annual Hostel Day will be celebrated on Feb 15. All students are invited to participate in various cultural activities.",
            targetHostels: ["All Hostels"],
            targetRoles: ["Students", "Wardens"],
            createdAt: "2024-01-12 16:45",
            createdBy: "Dean Office"
        },
        {
            id: "ANN-011",
            type: "notice",
            title: "Mess Menu Update",
            message: "New mess menu has been finalized based on student feedback. The updated menu will be effective from Jan 20.",
            targetHostels: ["Hostel A", "Hostel B"],
            targetRoles: ["Students"],
            createdAt: "2024-01-11 10:15",
            createdBy: "Dean Office"
        }
    ]

    const handleHostelToggle = (hostel: string) => {
        setSelectedHostels(prev =>
            prev.includes(hostel)
                ? prev.filter(h => h !== hostel)
                : [...prev, hostel]
        )
    }

    const handleRoleToggle = (role: string) => {
        setSelectedRoles(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Announcement submitted")
        setShowForm(false)
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "urgent": return "bg-red-100 text-red-800 border-red-300"
            case "policy": return "bg-purple-100 text-purple-800 border-purple-300"
            case "notice": return "bg-blue-100 text-blue-800 border-blue-300"
            case "general": return "bg-green-100 text-green-800 border-green-300"
            default: return "bg-gray-100 text-gray-800 border-gray-300"
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "urgent": return <AlertTriangle className="h-4 w-4" />
            case "policy": return <FileText className="h-4 w-4" />
            case "notice": return <Megaphone className="h-4 w-4" />
            case "general": return <Users className="h-4 w-4" />
            default: return null
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            Announcements 📢
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">Send notices and announcements to hostels</p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        New Announcement
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Create New Announcement</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="font-semibold dark:text-white">Announcement Type</Label>
                            <select
                                id="type"
                                value={announcementType}
                                onChange={(e) => setAnnouncementType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 font-medium"
                            >
                                <option value="general">General</option>
                                <option value="notice">Notice</option>
                                <option value="policy">Policy Update</option>
                                <option value="urgent">Urgent Alert</option>
                            </select>
                            <p className="text-xs text-muted-foreground font-medium">
                                {announcementType === "urgent" && "⚠️ Urgent alerts will be highlighted and sent immediately"}
                                {announcementType === "policy" && "📋 Policy updates will be marked as important"}
                                {announcementType === "notice" && "📢 Regular notices for general information"}
                                {announcementType === "general" && "ℹ️ General announcements for all users"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="font-semibold dark:text-white">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter announcement title"
                                required
                                className="h-10 rounded-xl bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="font-semibold dark:text-white">Message</Label>
                            <textarea
                                id="message"
                                placeholder="Enter announcement message"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl min-h-[120px] bg-white/50 dark:bg-gray-800/50"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold dark:text-white">Target Hostels</Label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                <label className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selectedHostels.includes("all")}
                                        onChange={() => handleHostelToggle("all")}
                                        className="rounded"
                                    />
                                    <Building className="h-4 w-4" />
                                    <span className="text-sm font-medium">All Hostels</span>
                                </label>
                                {["Hostel A", "Hostel B", "Hostel C", "Hostel D"].map((hostel) => (
                                    <label
                                        key={hostel}
                                        className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedHostels.includes(hostel)}
                                            onChange={() => handleHostelToggle(hostel)}
                                            disabled={selectedHostels.includes("all")}
                                            className="rounded"
                                        />
                                        <Building className="h-4 w-4" />
                                        <span className="text-sm font-medium">{hostel}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold dark:text-white">Target Audience</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {["All", "Students", "Wardens", "Caretakers"].map((role) => (
                                    <label
                                        key={role}
                                        className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role)}
                                            onChange={() => handleRoleToggle(role)}
                                            className="rounded"
                                        />
                                        <Users className="h-4 w-4" />
                                        <span className="text-sm font-medium">{role}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold dark:text-white">Notification Options</Label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span className="text-sm font-medium">Send email notification</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span className="text-sm font-medium">Send SMS notification</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span className="text-sm font-medium">Show in-app notification</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50 rounded-xl">
                                <Send className="h-4 w-4 mr-2" />
                                Send Announcement
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowForm(false)}
                                className="rounded-xl"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Announcements</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Megaphone className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-100">{recentAnnouncements.length}</p>
                    <p className="text-xs text-muted-foreground font-medium">All time</p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Urgent Alerts</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertTriangle className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-red-900 dark:text-red-100">{recentAnnouncements.filter(a => a.type === "urgent").length}</p>
                    <p className="text-xs text-muted-foreground font-medium">This month</p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Policy Updates</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <FileText className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-purple-900 dark:text-purple-100">{recentAnnouncements.filter(a => a.type === "policy").length}</p>
                    <p className="text-xs text-muted-foreground font-medium">This month</p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300">General Notices</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <Users className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-green-900 dark:text-green-100">{recentAnnouncements.filter(a => a.type === "general").length}</p>
                    <p className="text-xs text-muted-foreground font-medium">This month</p>
                </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Recent Announcements</h3>
                <div className="space-y-3">
                    {recentAnnouncements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className={`p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border transition-all duration-300 hover:shadow-lg ${announcement.type === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50'
                                }`}
                        >
                            {announcement.type === 'urgent' && (
                                <div className="flex items-center gap-2 mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
                                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 animate-pulse" />
                                    <span className="text-sm font-bold text-red-800 dark:text-red-300">URGENT ALERT</span>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="font-mono text-xs font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{announcement.id}</span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs border flex items-center gap-1 font-semibold ${getTypeColor(announcement.type)} dark:bg-opacity-30`}>
                                            {getTypeIcon(announcement.type)}
                                            {announcement.type}
                                        </span>
                                    </div>

                                    <h4 className="font-bold text-lg mb-2 dark:text-white">{announcement.title}</h4>
                                    <p className="text-sm mb-4 text-muted-foreground font-medium">{announcement.message}</p>

                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                            <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">Target Hostels:</p>
                                            <p className="text-xs text-blue-900 dark:text-blue-200 font-medium">{announcement.targetHostels.join(", ")}</p>
                                        </div>
                                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                            <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">Target Audience:</p>
                                            <p className="text-xs text-green-900 dark:text-green-200 font-medium">{announcement.targetRoles.join(", ")}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                                        <span>Posted: {new Date(announcement.createdAt).toLocaleString()}</span>
                                        <span>By: {announcement.createdBy}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    Resend
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    View Recipients
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
