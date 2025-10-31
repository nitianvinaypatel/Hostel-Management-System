'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClipboardList, Search, CheckCircle2, XCircle, Clock, ArrowRightLeft, Building2, Eye } from "lucide-react"

export default function Requests() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <ClipboardList className="h-7 w-7 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Change Requests 🔄
                        </h1>
                        <p className="text-muted-foreground text-lg">Manage student room and hostel change requests</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">15</div>
                            <p className="text-xs text-muted-foreground mt-1">Total Requests</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg shadow-gray-500/50">
                            <ClipboardList className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</div>
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
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                            <p className="text-xs text-muted-foreground mt-1">Approved</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">2</div>
                            <p className="text-xs text-muted-foreground mt-1">Rejected</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <XCircle className="h-6 w-6 text-white" />
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
                            placeholder="Search by student ID or name..."
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
                            variant={filterStatus === "approved" ? "default" : "outline"}
                            onClick={() => setFilterStatus("approved")}
                        >
                            Approved
                        </Button>
                        <Button
                            size="sm"
                            variant={filterStatus === "rejected" ? "default" : "outline"}
                            onClick={() => setFilterStatus("rejected")}
                        >
                            Rejected
                        </Button>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                    <ArrowRightLeft className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Room Change Request</h3>
                                        <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                            <Clock className="h-3 w-3" />
                                            Pending
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Student #12345 - John Doe</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Current Room</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">Room 101, Floor 1</p>
                                </div>
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Requested Room</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">Room 205, Floor 2</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <p className="text-xs text-muted-foreground mb-1">Reason</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Need to be closer to classrooms for early morning classes. Current room is too far from the academic block.</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Submitted: 2 days ago</span>
                                <span className="text-gray-600 dark:text-gray-400">•</span>
                                <span className="text-gray-600 dark:text-gray-400">Priority: Medium</span>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Request
                            </Button>
                            <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Request
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
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Hostel Change Request</h3>
                                        <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                            <Clock className="h-3 w-3" />
                                            Pending
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Student #12346 - Jane Smith</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Current Hostel</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">Hostel A - Room 301</p>
                                </div>
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Requested Hostel</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">Hostel B - Ground Floor</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <p className="text-xs text-muted-foreground mb-1">Reason</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Medical reasons - need ground floor accommodation due to mobility issues. Doctor&apos;s certificate attached.</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Submitted: 1 day ago</span>
                                <span className="text-gray-600 dark:text-gray-400">•</span>
                                <span className="text-gray-600 dark:text-gray-400">Priority: High</span>
                                <span className="text-gray-600 dark:text-gray-400">•</span>
                                <span className="text-red-600 dark:text-red-400 font-semibold">Medical Certificate Attached</span>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Request
                            </Button>
                            <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Request
                            </Button>
                            <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4 mr-2" />
                                View Certificate
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg opacity-70">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                                    <ArrowRightLeft className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Room Change Request</h3>
                                        <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Approved
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Student #12347 - Mike Johnson</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">From</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">Room 405</p>
                                </div>
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">To</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">Room 410</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Approved: 3 days ago</span>
                                <span className="text-gray-600 dark:text-gray-400">•</span>
                                <span className="text-gray-600 dark:text-gray-400">Moved: 2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
