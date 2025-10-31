'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Send, AlertTriangle, Users, Clock } from "lucide-react"

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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
                        Broadcast Notifications 📢
                    </h1>
                    <p className="text-muted-foreground text-lg">Send notifications to users across the system</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Send New Notification */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Send className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white">Send New Notification</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Notification title"
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Message</Label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Notification message"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg min-h-[100px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Type</Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="announcement">Announcement</option>
                                <option value="emergency">Emergency</option>
                                <option value="policy">Policy Change</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">Target Roles</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {['student', 'caretaker', 'warden', 'dean'].map((role) => (
                                    <label key={role} className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors bg-white dark:bg-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={formData.targetRoles.includes(role)}
                                            onChange={() => handleRoleToggle(role)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm capitalize font-medium text-gray-900 dark:text-gray-100">{role}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/50">
                            <Send className="h-4 w-4 mr-2" />
                            Send Notification
                        </Button>
                    </form>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                            <Bell className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white">Recent Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        {recentNotifications.map((notif) => (
                            <div key={notif.id} className={`group p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${notif.type === 'emergency' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30'}`}>
                                <div className="flex items-start gap-4">
                                    {notif.type === 'emergency' && (
                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse flex-shrink-0">
                                            <AlertTriangle className="h-5 w-5 text-white" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{notif.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${notif.type === 'emergency' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                notif.type === 'policy' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                                    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                                                }`}>
                                                {notif.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">{notif.message}</p>
                                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-medium">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                By {notif.sentBy}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {notif.sentAt}
                                            </span>
                                        </div>
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
