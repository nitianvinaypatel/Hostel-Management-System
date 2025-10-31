'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, ArrowLeft, AlertTriangle, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function ComplaintsApproval() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterPriority, setFilterPriority] = useState("all")
    const [filterStatus, setFilterStatus] = useState("pending")

    const complaints = [
        {
            id: "C001",
            studentId: "S007",
            studentName: "Mike Johnson",
            category: "maintenance",
            description: "AC not working in Room 305, Block C. Temperature is unbearable.",
            priority: "urgent",
            status: "pending",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-15 14:20",
            roomNumber: "305, Block C"
        },
        {
            id: "C002",
            studentId: "S008",
            studentName: "Emily Davis",
            category: "cleanliness",
            description: "Common washroom on 2nd floor needs immediate cleaning",
            priority: "high",
            status: "in-progress",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-15 11:45",
            roomNumber: "Common Area"
        },
        {
            id: "C003",
            studentId: "S009",
            studentName: "Robert Brown",
            category: "food",
            description: "Food quality has deteriorated in the past week. Multiple students complaining.",
            priority: "high",
            status: "pending",
            forwardedBy: "Caretaker - Shyam Singh",
            forwardedAt: "2024-01-15 09:30",
            roomNumber: "Mess Hall"
        },
        {
            id: "C004",
            studentId: "S010",
            studentName: "Sarah Williams",
            category: "security",
            description: "Main gate lock not working properly since yesterday",
            priority: "urgent",
            status: "pending",
            forwardedBy: "Caretaker - Ram Kumar",
            forwardedAt: "2024-01-14 18:00",
            roomNumber: "Main Gate"
        },
    ]

    const filteredComplaints = complaints.filter(complaint => {
        const matchesSearch = complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesPriority = filterPriority === "all" || complaint.priority === filterPriority
        const matchesStatus = filterStatus === "all" || complaint.status === filterStatus
        return matchesSearch && matchesPriority && matchesStatus
    })

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "maintenance": return "bg-orange-100 text-orange-800"
            case "cleanliness": return "bg-blue-100 text-blue-800"
            case "food": return "bg-green-100 text-green-800"
            case "security": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-rose-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-red-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/warden/approvals">
                        <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent mb-2">
                            Forwarded Complaints ⚠️
                        </h1>
                        <p className="text-muted-foreground text-lg">Review and resolve complaints from caretakers</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search complaints..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-medium"
                    >
                        <option value="all">All Priorities</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-medium"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="escalated">Escalated</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredComplaints.map((complaint) => (
                        <div key={complaint.id} className={`group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${complaint.priority === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30'}`}>
                            <div className="flex items-start gap-4">
                                {complaint.priority === 'urgent' && (
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse flex-shrink-0">
                                        <AlertTriangle className="h-6 w-6 text-white" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{complaint.id}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(complaint.category)}`}>
                                            {complaint.category}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${complaint.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                            complaint.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                complaint.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                    'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                            }`}>
                                            {complaint.priority}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${complaint.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            complaint.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                                complaint.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                    'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                                            }`}>
                                            {complaint.status}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{complaint.studentName} <span className="text-sm text-muted-foreground font-normal">({complaint.studentId})</span></h3>
                                    <p className="text-sm mb-3 font-medium text-gray-700 dark:text-gray-300">{complaint.description}</p>

                                    <div className="grid md:grid-cols-3 gap-3 text-sm mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-semibold text-muted-foreground">Location:</span>
                                            <span className="font-medium">{complaint.roomNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-muted-foreground">Forwarded by:</span>
                                            <span className="font-medium">{complaint.forwardedBy}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{new Date(complaint.forwardedAt).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
                                        {complaint.status === 'pending' && (
                                            <>
                                                <Button size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md">
                                                    Assign to Caretaker
                                                </Button>
                                                <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                                                    Escalate to Admin
                                                </Button>
                                            </>
                                        )}
                                        {complaint.status === 'in-progress' && (
                                            <Button size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
                                                Mark as Resolved
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
