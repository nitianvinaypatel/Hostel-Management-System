'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowLeft, Clock, DoorOpen } from "lucide-react"
import Link from "next/link"

export default function RoomAllotments() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("pending")

    const allotments = [
        {
            id: "1",
            studentId: "S001",
            studentName: "John Doe",
            currentRoom: "105, Block A",
            requestedRoom: "201, Block A",
            reason: "Closer to classes, better study environment",
            submittedAt: "2024-01-15 10:30",
            status: "pending"
        },
        {
            id: "2",
            studentId: "S002",
            studentName: "Sarah Williams",
            currentRoom: "None",
            requestedRoom: "102, Block B",
            reason: "New admission, roommate request with Jane Smith",
            submittedAt: "2024-01-15 09:15",
            status: "pending"
        },
        {
            id: "3",
            studentId: "S003",
            studentName: "Mike Johnson",
            currentRoom: "305, Block C",
            requestedRoom: "210, Block A",
            reason: "Medical reasons - need ground floor access",
            submittedAt: "2024-01-14 16:45",
            status: "approved"
        },
    ]

    const filteredAllotments = allotments.filter(allotment => {
        const matchesSearch = allotment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            allotment.studentId.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || allotment.status === filterStatus
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/warden/approvals">
                        <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                            Room Allotment Requests 🚪
                        </h1>
                        <p className="text-muted-foreground text-lg">Review and approve room allotment requests</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by student name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-medium"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredAllotments.map((allotment) => (
                        <div key={allotment.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{allotment.studentName}</h3>
                                        <span className="text-sm text-muted-foreground font-medium">({allotment.studentId})</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${allotment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            allotment.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                            }`}>
                                            {allotment.status}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-xs text-muted-foreground font-semibold">Current Room</p>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-gray-100">{allotment.currentRoom}</p>
                                        </div>
                                        <div className="p-4 border-2 border-primary rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DoorOpen className="h-4 w-4 text-primary" />
                                                <p className="text-xs text-muted-foreground font-semibold">Requested Room</p>
                                            </div>
                                            <p className="font-bold text-primary">{allotment.requestedRoom}</p>
                                        </div>
                                    </div>

                                    <div className="mb-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground mb-1 font-semibold">Reason</p>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{allotment.reason}</p>
                                    </div>

                                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Submitted: {new Date(allotment.submittedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {allotment.status === 'pending' && (
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button variant="outline" className="flex-1 sm:flex-none">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    <Button className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                    </Button>
                                    <Button variant="destructive" className="flex-1 sm:flex-none shadow-md">
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
