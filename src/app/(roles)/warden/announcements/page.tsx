'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Send, Megaphone, AlertTriangle, Users, Clock, ArrowLeft, Loader2 } from "lucide-react"
import { useGetWardenAnnouncementsQuery, useCreateWardenAnnouncementMutation } from "@/store/api/wardenApi"
import { useGetCurrentUserQuery } from "@/store/api/authApi"

export default function WardenAnnouncements() {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "general" as 'general' | 'urgent' | 'event' | 'policy',
        targetAudience: "students" as 'students' | 'caretakers' | 'all',
    })

    // RTK Query hooks
    const { data: userData } = useGetCurrentUserQuery()
    const { data: announcementsData, isLoading, error } = useGetWardenAnnouncementsQuery(undefined)
    const [createAnnouncement, { isLoading: isCreating }] = useCreateWardenAnnouncementMutation()

    const currentUser = userData?.data
    const recentAnnouncements = announcementsData?.data || []

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log('Current user:', currentUser)
        console.log('Hostel ID:', currentUser?.hostelId)

        if (!currentUser?.hostelId) {
            toast.error('Unable to send announcement. Hostel information not found.')
            console.error('User data:', userData)
            return
        }

        try {
            await createAnnouncement({
                title: formData.title,
                message: formData.message,
                type: formData.type,
                targetAudience: formData.targetAudience,
                hostelId: currentUser.hostelId,
            }).unwrap()

            toast.success(`Announcement "${formData.title}" sent to ${formData.targetAudience}!`)

            // Reset form
            setFormData({
                title: "",
                message: "",
                type: "general",
                targetAudience: "students",
            })
        } catch (err: any) {
            const errorMessage = err?.data?.message || 'Failed to send announcement. Please try again.'
            toast.error(errorMessage)
            console.error('Failed to send announcement:', err)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/warden/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                                Announcements
                            </h1>
                            <p className="text-muted-foreground text-lg">Send announcements and circulars to students</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Send New Announcement */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Send className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white">Send New Announcement</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Announcement title"
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
                                placeholder="Announcement message"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg min-h-[120px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Type</Label>
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'general' | 'urgent' | 'event' | 'policy' })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="general">General</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="event">Event</option>
                                    <option value="policy">Policy</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="targetAudience" className="text-sm font-semibold text-gray-900 dark:text-gray-100">Target Audience</Label>
                                <select
                                    id="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as 'students' | 'caretakers' | 'all' })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="students">Students Only</option>
                                    <option value="caretakers">Caretakers Only</option>
                                    <option value="all">All (Students + Caretakers)</option>
                                </select>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                            disabled={isCreating}
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Announcement
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Recent Announcements */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                            <Megaphone className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white">Recent Announcements</h2>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center space-y-4">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
                                <p className="text-muted-foreground text-sm">Loading announcements...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 text-4xl mb-3">⚠️</div>
                            <p className="text-muted-foreground">Failed to load announcements</p>
                        </div>
                    ) : recentAnnouncements.length === 0 ? (
                        <div className="text-center py-12">
                            <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                            <p className="text-muted-foreground">No announcements yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {recentAnnouncements.map((announcement) => (
                                <div key={announcement.id} className={`group p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${announcement.type === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30'}`}>
                                    <div className="flex items-start gap-4">
                                        {announcement.type === 'urgent' && (
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse flex-shrink-0">
                                                <AlertTriangle className="h-5 w-5 text-white" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{announcement.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${announcement.type === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                    announcement.type === 'event' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                                        announcement.type === 'policy' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700' :
                                                            'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                                                    }`}>
                                                    {announcement.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">{announcement.message}</p>
                                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Users className="h-3 w-3" />
                                                    To: <span className="capitalize">{announcement.targetAudience}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(announcement.sentAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
