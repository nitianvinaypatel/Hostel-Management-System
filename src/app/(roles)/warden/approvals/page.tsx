'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ClipboardList, AlertCircle, Building2, DoorOpen } from "lucide-react"
import Link from "next/link"

export default function WardenApprovals() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterStatus, setFilterStatus] = useState("pending")

    const approvals = [
        {
            id: "1",
            type: "room-allotment",
            student: "John Doe",
            details: "Room 201, Block A",
            reason: "Closer to classes",
            submittedAt: "2024-01-15",
            status: "pending"
        },
        {
            id: "2",
            type: "hostel-change",
            student: "Jane Smith",
            details: "From Hostel A to Hostel B",
            reason: "Medical reasons",
            submittedAt: "2024-01-15",
            status: "pending"
        },
        {
            id: "3",
            type: "complaint",
            student: "Mike Johnson",
            details: "AC not working in Room 305",
            reason: "Maintenance issue",
            submittedAt: "2024-01-14",
            status: "pending"
        },
        {
            id: "4",
            type: "room-allotment",
            student: "Sarah Williams",
            details: "Room 102, Block B",
            reason: "Roommate request",
            submittedAt: "2024-01-13",
            status: "approved"
        },
    ]

    const filteredApprovals = approvals.filter(approval => {
        const matchesSearch = approval.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.details.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterType === "all" || approval.type === filterType
        const matchesStatus = filterStatus === "all" || approval.status === filterStatus
        return matchesSearch && matchesType && matchesStatus
    })

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "room-allotment": return "Room Allotment"
            case "hostel-change": return "Hostel Change"
            case "complaint": return "Complaint"
            default: return type
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "room-allotment": return "bg-blue-100 text-blue-800"
            case "hostel-change": return "bg-purple-100 text-purple-800"
            case "complaint": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
                        All Approvals 📋
                    </h1>
                    <p className="text-muted-foreground text-lg">Review and approve student requests</p>
                </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/warden/approvals/room-allotments">
                    <div className="group flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                            <DoorOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 dark:text-blue-100">Room Allotments</h3>
                            <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Manage room requests</p>
                        </div>
                    </div>
                </Link>

                <Link href="/warden/approvals/hostel-changes">
                    <div className="group flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-purple-900 dark:text-purple-100">Hostel Changes</h3>
                            <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">Review transfer requests</p>
                        </div>
                    </div>
                </Link>

                <Link href="/warden/approvals/complaints">
                    <div className="group flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200/50 dark:border-red-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:scale-110 transition-transform">
                            <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-red-900 dark:text-red-100">Complaints</h3>
                            <p className="text-xs text-red-700 dark:text-red-400 font-medium">Handle complaints</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Main Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search approvals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-medium"
                    >
                        <option value="all">All Types</option>
                        <option value="room-allotment">Room Allotment</option>
                        <option value="hostel-change">Hostel Change</option>
                        <option value="complaint">Complaint</option>
                    </select>
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
                    {filteredApprovals.map((approval) => (
                        <div key={approval.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(approval.type)}`}>
                                            {getTypeLabel(approval.type)}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${approval.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            approval.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                            }`}>
                                            {approval.status}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{approval.student}</h3>
                                    <p className="text-sm mb-2 font-medium text-gray-700 dark:text-gray-300">{approval.details}</p>
                                    <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold">Reason:</span> {approval.reason}</p>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        Submitted: {new Date(approval.submittedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {approval.status === 'pending' && (
                                    <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto">
                                        <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                        <Button size="sm" className="flex-1 lg:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
                                            <Check className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" className="flex-1 lg:flex-none shadow-md">
                                            <X className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
