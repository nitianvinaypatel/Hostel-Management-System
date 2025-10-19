'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Megaphone, AlertTriangle } from "lucide-react"

export default function WardenAnnouncements() {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "general",
        targetAudience: "students",
    })

    const recentAnnouncements = [
        {
            id: "1",
            title: "Mess Timing Change",
            message: "Dinner timing will be extended till 9:30 PM from tomorrow onwards.",
            type: "general",
            targetAudience: "students",
            sentAt: "2024-01-15 16:30",
            sentBy: "Warden - Jane Smith"
        },
        {
            id: "2",
            title: "Water Supply Interruption",
            message: "Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance work.",
            type: "urgent",
            targetAudience: "all",
            sentAt: "2024-01-15 14:20",
            sentBy: "Warden - Jane Smith"
        },
        {
            id: "3",
            title: "Cultural Event - Republic Day",
            message: "Republic Day celebration will be held on 26th January at 9 AM in the hostel ground. All students are requested to attend.",
            type: "event",
            targetAudience: "students",
            sentAt: "2024-01-14 11:15",
            sentBy: "Warden - Jane Smith"
        },
        {
            id: "4",
            title: "Room Inspection Schedule",
            message: "Monthly room inspection will be conducted on 20th January. Please ensure rooms are clean and tidy.",
            type: "general",
            targetAudience: "students",
            sentAt: "2024-01-13 10:00",
            sentBy: "Warden - Jane Smith"
        },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sending announcement:", formData)
        // Add announcement sending logic
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Announcements</h1>
                <p className="text-muted-foreground">Send announcements and circulars to students</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Send className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Send New Announcement</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Announcement title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Announcement message"
                                className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="general">General</option>
                                <option value="urgent">Urgent</option>
                                <option value="event">Event</option>
                                <option value="policy">Policy</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <select
                                id="targetAudience"
                                value={formData.targetAudience}
                                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="students">Students Only</option>
                                <option value="caretakers">Caretakers Only</option>
                                <option value="all">All (Students + Caretakers)</option>
                            </select>
                        </div>

                        <Button type="submit" className="w-full">
                            <Send className="h-4 w-4 mr-2" />
                            Send Announcement
                        </Button>
                    </form>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Megaphone className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Recent Announcements</h2>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                        {recentAnnouncements.map((announcement) => (
                            <Card key={announcement.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    {announcement.type === 'urgent' && (
                                        <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{announcement.title}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${announcement.type === 'urgent' ? 'bg-red-100 text-red-800' :
                                                announcement.type === 'event' ? 'bg-blue-100 text-blue-800' :
                                                    announcement.type === 'policy' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}>
                                                {announcement.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{announcement.message}</p>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>To: {announcement.targetAudience}</span>
                                            <span>{new Date(announcement.sentAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
