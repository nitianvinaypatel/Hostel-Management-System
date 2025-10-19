'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Announcements</h1>
                    <p className="text-muted-foreground">Send notices and announcements to hostels</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Announcement
                </Button>
            </div>

            {showForm && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Create New Announcement</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Announcement Type</Label>
                            <select
                                id="type"
                                value={announcementType}
                                onChange={(e) => setAnnouncementType(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="general">General</option>
                                <option value="notice">Notice</option>
                                <option value="policy">Policy Update</option>
                                <option value="urgent">Urgent Alert</option>
                            </select>
                            <p className="text-xs text-muted-foreground">
                                {announcementType === "urgent" && "⚠️ Urgent alerts will be highlighted and sent immediately"}
                                {announcementType === "policy" && "📋 Policy updates will be marked as important"}
                                {announcementType === "notice" && "📢 Regular notices for general information"}
                                {announcementType === "general" && "ℹ️ General announcements for all users"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter announcement title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                id="message"
                                placeholder="Enter announcement message"
                                className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Target Hostels</Label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-accent">
                                    <input
                                        type="checkbox"
                                        checked={selectedHostels.includes("all")}
                                        onChange={() => handleHostelToggle("all")}
                                    />
                                    <Building className="h-4 w-4" />
                                    <span className="text-sm">All Hostels</span>
                                </label>
                                {["Hostel A", "Hostel B", "Hostel C", "Hostel D"].map((hostel) => (
                                    <label
                                        key={hostel}
                                        className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-accent"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedHostels.includes(hostel)}
                                            onChange={() => handleHostelToggle(hostel)}
                                            disabled={selectedHostels.includes("all")}
                                        />
                                        <Building className="h-4 w-4" />
                                        <span className="text-sm">{hostel}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {["All", "Students", "Wardens", "Caretakers"].map((role) => (
                                    <label
                                        key={role}
                                        className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-accent"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role)}
                                            onChange={() => handleRoleToggle(role)}
                                        />
                                        <Users className="h-4 w-4" />
                                        <span className="text-sm">{role}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Notification Options</Label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked />
                                    <span className="text-sm">Send email notification</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked />
                                    <span className="text-sm">Send SMS notification</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked />
                                    <span className="text-sm">Show in-app notification</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button type="submit" className="flex-1">
                                <Send className="h-4 w-4 mr-2" />
                                Send Announcement
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Megaphone className="h-6 w-6 text-blue-600" />
                        <span className="text-2xl font-bold">{recentAnnouncements.length}</span>
                    </div>
                    <p className="text-sm font-medium">Total Announcements</p>
                    <p className="text-xs text-muted-foreground">All time</p>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <span className="text-2xl font-bold">
                            {recentAnnouncements.filter(a => a.type === "urgent").length}
                        </span>
                    </div>
                    <p className="text-sm font-medium">Urgent Alerts</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <FileText className="h-6 w-6 text-purple-600" />
                        <span className="text-2xl font-bold">
                            {recentAnnouncements.filter(a => a.type === "policy").length}
                        </span>
                    </div>
                    <p className="text-sm font-medium">Policy Updates</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold">
                            {recentAnnouncements.filter(a => a.type === "general").length}
                        </span>
                    </div>
                    <p className="text-sm font-medium">General Notices</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
                <div className="space-y-3">
                    {recentAnnouncements.map((announcement) => (
                        <Card
                            key={announcement.id}
                            className={`p-4 ${announcement.type === 'urgent' ? 'border-2 border-red-300 bg-red-50' : ''}`}
                        >
                            {announcement.type === 'urgent' && (
                                <div className="flex items-center gap-2 mb-3 p-2 bg-red-100 border border-red-300 rounded">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                    <span className="text-sm font-semibold text-red-800">URGENT ALERT</span>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-mono text-xs font-semibold">{announcement.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getTypeColor(announcement.type)}`}>
                                            {getTypeIcon(announcement.type)}
                                            {announcement.type}
                                        </span>
                                    </div>

                                    <h4 className="font-semibold text-lg mb-2">{announcement.title}</h4>
                                    <p className="text-sm mb-3">{announcement.message}</p>

                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                                            <p className="text-xs font-semibold text-blue-800 mb-1">Target Hostels:</p>
                                            <p className="text-xs text-blue-900">{announcement.targetHostels.join(", ")}</p>
                                        </div>
                                        <div className="p-2 bg-green-50 border border-green-200 rounded">
                                            <p className="text-xs font-semibold text-green-800 mb-1">Target Audience:</p>
                                            <p className="text-xs text-green-900">{announcement.targetRoles.join(", ")}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span>Posted: {new Date(announcement.createdAt).toLocaleString()}</span>
                                        <span>By: {announcement.createdBy}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-3 border-t">
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    Resend
                                </Button>
                                <Button variant="outline" size="sm">
                                    View Recipients
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
