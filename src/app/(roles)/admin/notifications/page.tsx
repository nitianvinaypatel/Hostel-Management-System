'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Send, AlertTriangle } from "lucide-react"

export default function AdminNotifications() {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "announcement",
        targetRoles: [] as string[],
        targetHostels: [] as string[],
    })

    const recentNotifications = [
        {
            id: "1",
            title: "Emergency Maintenance",
            message: "Water supply will be interrupted tomorrow from 10 AM to 2 PM",
            type: "emergency",
            sentAt: "2024-01-15 09:30",
            sentBy: "Admin User"
        },
        {
            id: "2",
            title: "New Policy Update",
            message: "Updated hostel entry timings effective from next week",
            type: "policy",
            sentAt: "2024-01-14 14:20",
            sentBy: "Admin User"
        },
        {
            id: "3",
            title: "Mess Menu Change",
            message: "Special dinner menu for Republic Day celebration",
            type: "announcement",
            sentAt: "2024-01-13 11:15",
            sentBy: "Admin User"
        },
    ]

    const handleRoleToggle = (role: string) => {
        setFormData(prev => ({
            ...prev,
            targetRoles: prev.targetRoles.includes(role)
                ? prev.targetRoles.filter(r => r !== role)
                : [...prev.targetRoles, role]
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sending notification:", formData)
        // Add notification sending logic
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Broadcast Notifications</h1>
                <p className="text-muted-foreground">Send notifications to users across the system</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Send className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Send New Notification</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Notification title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Notification message"
                                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
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
                                <option value="announcement">Announcement</option>
                                <option value="emergency">Emergency</option>
                                <option value="policy">Policy Change</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Target Roles</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {['student', 'caretaker', 'warden', 'dean'].map((role) => (
                                    <label key={role} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-accent">
                                        <input
                                            type="checkbox"
                                            checked={formData.targetRoles.includes(role)}
                                            onChange={() => handleRoleToggle(role)}
                                        />
                                        <span className="text-sm capitalize">{role}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            <Send className="h-4 w-4 mr-2" />
                            Send Notification
                        </Button>
                    </form>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Recent Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        {recentNotifications.map((notif) => (
                            <Card key={notif.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    {notif.type === 'emergency' && (
                                        <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{notif.title}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${notif.type === 'emergency' ? 'bg-red-100 text-red-800' :
                                                notif.type === 'policy' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {notif.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>By {notif.sentBy}</span>
                                            <span>{notif.sentAt}</span>
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
