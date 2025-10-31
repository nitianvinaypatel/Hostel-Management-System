'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowUp, AlertTriangle, Clock, DollarSign, User } from "lucide-react"

export default function WardenRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("pending")

    const requisitions = [
        {
            id: "REQ001",
            caretakerId: "CT001",
            caretakerName: "Ram Kumar",
            type: "maintenance",
            title: "Plumbing Repair - Block A",
            description: "Multiple taps leaking on 2nd and 3rd floor. Need immediate plumber service.",
            estimatedCost: 15000,
            priority: "urgent",
            status: "pending",
            submittedAt: "2024-01-15 10:30"
        },
        {
            id: "REQ002",
            caretakerId: "CT002",
            caretakerName: "Shyam Singh",
            type: "supplies",
            title: "Cleaning Supplies Restock",
            description: "Need to restock cleaning supplies for the month - detergents, mops, brooms, etc.",
            estimatedCost: 8000,
            priority: "medium",
            status: "pending",
            submittedAt: "2024-01-15 09:15"
        },
        {
            id: "REQ003",
            caretakerId: "CT001",
            caretakerName: "Ram Kumar",
            type: "equipment",
            title: "Replace Broken Fans - Block C",
            description: "5 ceiling fans in Block C rooms need replacement. Not working since last week.",
            estimatedCost: 25000,
            priority: "high",
            status: "approved",
            submittedAt: "2024-01-14 16:45",
            reviewedAt: "2024-01-15 08:30"
        },
        {
            id: "REQ004",
            caretakerId: "CT003",
            caretakerName: "Mohan Lal",
            type: "maintenance",
            title: "Electrical Wiring Check - Mess Hall",
            description: "Frequent power fluctuations in mess hall. Need electrician for complete wiring check.",
            estimatedCost: 35000,
            priority: "urgent",
            status: "pending",
            submittedAt: "2024-01-14 14:20"
        },
    ]

    const filteredRequisitions = requisitions.filter(req => {
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.caretakerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || req.status === filterStatus
        return matchesSearch && matchesStatus
    })

    const getTypeColor = (type: string) => {
        switch (type) {
            case "maintenance": return "bg-orange-100 text-orange-800"
            case "supplies": return "bg-blue-100 text-blue-800"
            case "equipment": return "bg-purple-100 text-purple-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:via-teal-500/20 dark:to-cyan-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-cyan-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                        Caretaker Requisitions 📝
                    </h1>
                    <p className="text-muted-foreground text-lg">Review and approve requisitions from caretakers</p>
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
                        <option value="escalated">Escalated</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredRequisitions.map((req) => (
                        <div key={req.id} className={`group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${req.priority === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30'}`}>
                            <div className="flex items-start gap-4 mb-4">
                                {req.priority === 'urgent' && (
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse flex-shrink-0">
                                        <AlertTriangle className="h-6 w-6 text-white" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{req.id}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(req.type)}`}>
                                            {req.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${req.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                            req.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                            }`}>
                                            {req.priority}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${req.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                            req.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                req.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                    'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{req.title}</h3>
                                    <p className="text-sm mb-4 font-medium text-gray-700 dark:text-gray-300">{req.description}</p>

                                    <div className="grid md:grid-cols-3 gap-3 mb-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground font-semibold">Requested by</p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{req.caretakerName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground font-semibold">Estimated Cost</p>
                                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹{req.estimatedCost.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground font-semibold">Submitted</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{new Date(req.submittedAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {req.reviewedAt && (
                                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Reviewed: {new Date(req.reviewedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {req.status === 'pending' && (
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button variant="outline" className="flex-1 sm:flex-none">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    <Button className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                    </Button>
                                    <Button variant="outline" className="flex-1 sm:flex-none">
                                        <ArrowUp className="h-4 w-4 mr-2" />
                                        Escalate to Dean
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
