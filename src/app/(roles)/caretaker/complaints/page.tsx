'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, Clock, CheckCircle2, AlertTriangle, Send, Eye } from "lucide-react"

export default function CaretakerComplaints() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 dark:from-orange-500/20 dark:via-red-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                        <MessageSquare className="h-7 w-7 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                            Complaints Management 📋
                        </h1>
                        <p className="text-muted-foreground text-lg">View and manage student complaints</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">23</div>
                            <p className="text-xs text-muted-foreground mt-1">Total</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg shadow-gray-500/50">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">8</div>
                            <p className="text-xs text-muted-foreground mt-1">Pending</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</div>
                            <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">10</div>
                            <p className="text-xs text-muted-foreground mt-1">Resolved</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-4 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search complaints..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant={filterStatus === "all" ? "default" : "outline"}
                            onClick={() => setFilterStatus("all")}
                        >
                            All
                        </Button>
                        <Button
                            size="sm"
                            variant={filterStatus === "pending" ? "default" : "outline"}
                            onClick={() => setFilterStatus("pending")}
                        >
                            Pending
                        </Button>
                        <Button
                            size="sm"
                            variant={filterStatus === "progress" ? "default" : "outline"}
                            onClick={() => setFilterStatus("progress")}
                        >
                            In Progress
                        </Button>
                        <Button
                            size="sm"
                            variant={filterStatus === "resolved" ? "default" : "outline"}
                            onClick={() => setFilterStatus("resolved")}
                        >
                            Resolved
                        </Button>
                    </div>
                </div>
            </div>

            {/* Complaints List */}
            <div className="space-y-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Water leakage in Room 101</h3>
                                    <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                        <Clock className="h-3 w-3" />
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span className="text-gray-600 dark:text-gray-400">Reported by: <strong className="text-gray-900 dark:text-white">Student #12345</strong></span>
                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                    <span className="text-gray-600 dark:text-gray-400">Room 101, Floor 1</span>
                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                    <span className="text-gray-600 dark:text-gray-400">2 hours ago</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">There is water leakage from the ceiling in room 101. The issue started yesterday evening and is getting worse. Urgent attention required.</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-full font-semibold">High Priority</span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold">Maintenance</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark In Progress
                            </Button>
                            <Button size="sm" variant="outline">
                                <Send className="h-4 w-4 mr-2" />
                                Forward to Warden
                            </Button>
                            <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Broken window in Room 205</h3>
                                    <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                        <AlertTriangle className="h-3 w-3" />
                                        In Progress
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span className="text-gray-600 dark:text-gray-400">Reported by: <strong className="text-gray-900 dark:text-white">Student #12346</strong></span>
                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                    <span className="text-gray-600 dark:text-gray-400">Room 205, Floor 2</span>
                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                    <span className="text-gray-600 dark:text-gray-400">1 day ago</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Window glass is broken and needs replacement. Temporary covering has been placed.</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2.5 py-1 rounded-full font-semibold">Medium Priority</span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold">Repair</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark Resolved
                            </Button>
                            <Button size="sm" variant="outline">Add Update</Button>
                            <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">AC not working in Room 303</h3>
                                    <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Resolved
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span className="text-gray-600 dark:text-gray-400">Reported by: <strong className="text-gray-900 dark:text-white">Student #12347</strong></span>
                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                    <span className="text-gray-600 dark:text-gray-400">Room 303, Floor 3</span>
                                    <span className="text-gray-600 dark:text-gray-400">•</span>
                                    <span className="text-gray-600 dark:text-gray-400">3 days ago</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">AC unit was not cooling properly. Technician has serviced and fixed the issue.</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full font-semibold">Low Priority</span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold">Maintenance</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </Button>
                            <Button size="sm" variant="ghost">Reopen</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
