'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ClipboardList, Clock, Building2, User, Calendar } from "lucide-react"

export default function AdminRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    const requisitions = [
        {
            id: "1",
            type: "leave",
            student: "John Doe",
            hostel: "Hostel A",
            description: "Home visit for 3 days",
            submittedAt: "2024-01-15",
            status: "pending"
        },
        {
            id: "2",
            type: "guest",
            student: "Jane Smith",
            hostel: "Hostel B",
            description: "Parent visit for 2 days",
            submittedAt: "2024-01-14",
            status: "pending"
        },
        {
            id: "3",
            type: "maintenance",
            student: "Mike Johnson",
            hostel: "Hostel A",
            description: "AC repair required",
            submittedAt: "2024-01-13",
            status: "approved"
        },
    ]

    const filteredRequisitions = requisitions.filter(req => {
        const matchesSearch = req.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || req.status === filterStatus
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                        Requisition Approvals 📋
                    </h1>
                    <p className="text-muted-foreground text-lg">Review and approve student requisitions</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search requisitions..."
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
                    {filteredRequisitions.map((req) => (
                        <div key={req.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700 capitalize">
                                            {req.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${req.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            req.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="h-4 w-4 text-purple-600" />
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{req.student}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Building2 className="h-4 w-4 text-pink-600" />
                                        <p className="text-sm text-muted-foreground font-medium">{req.hostel}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{req.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                        <Calendar className="h-3 w-3" />
                                        Submitted: {new Date(req.submittedAt).toLocaleDateString()}
                                    </div>
                                </div>
                                {req.status === 'pending' && (
                                    <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto">
                                        <Button size="sm" variant="outline" className="flex-1 lg:flex-none hover:scale-105 transition-transform">
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
