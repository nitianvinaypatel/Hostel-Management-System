'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Filter, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function DeanRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [urgencyFilter, setUrgencyFilter] = useState("all")
    const [hostelFilter, setHostelFilter] = useState("all")

    const requisitions = [
        {
            id: "REQ047",
            requisitionNumber: "REQ-2024-047",
            hostel: "Hostel C",
            caretaker: "Mohan Lal",
            warden: "Robert Brown",
            type: "maintenance",
            title: "Emergency Plumbing Repair",
            description: "Major pipe burst in Block C basement causing water leakage.",
            estimatedCost: 35000,
            urgency: "urgent",
            status: "pending-dean",
            submittedAt: "2024-01-13",
            wardenApprovedAt: "2024-01-14"
        },
        {
            id: "REQ045",
            requisitionNumber: "REQ-2024-045",
            hostel: "Hostel A",
            caretaker: "Ram Kumar",
            warden: "Jane Smith",
            type: "upgrade",
            title: "Electrical Wiring Upgrade - Block A",
            description: "Complete rewiring of Block A due to frequent power issues.",
            estimatedCost: 85000,
            urgency: "high",
            status: "pending-dean",
            submittedAt: "2024-01-10",
            wardenApprovedAt: "2024-01-15"
        },
        {
            id: "REQ046",
            requisitionNumber: "REQ-2024-046",
            hostel: "Hostel B",
            caretaker: "Shyam Singh",
            warden: "Mary Johnson",
            type: "equipment",
            title: "Water Purifier Installation",
            description: "Install RO water purifiers on all floors.",
            estimatedCost: 45000,
            urgency: "medium",
            status: "pending-dean",
            submittedAt: "2024-01-12",
            wardenApprovedAt: "2024-01-14"
        },
        {
            id: "REQ044",
            requisitionNumber: "REQ-2024-044",
            hostel: "Hostel A",
            caretaker: "Ram Kumar",
            warden: "Jane Smith",
            type: "supplies",
            title: "Cleaning Supplies Bulk Purchase",
            estimatedCost: 25000,
            urgency: "low",
            status: "approved-by-dean",
            submittedAt: "2024-01-08",
            deanApprovedAt: "2024-01-12"
        },
        {
            id: "REQ043",
            requisitionNumber: "REQ-2024-043",
            hostel: "Hostel B",
            caretaker: "Shyam Singh",
            warden: "Mary Johnson",
            type: "maintenance",
            title: "Roof Waterproofing",
            estimatedCost: 65000,
            urgency: "high",
            status: "approved-by-dean",
            submittedAt: "2024-01-05",
            deanApprovedAt: "2024-01-10"
        },
        {
            id: "REQ042",
            requisitionNumber: "REQ-2024-042",
            hostel: "Hostel C",
            caretaker: "Mohan Lal",
            warden: "Robert Brown",
            type: "equipment",
            title: "Gaming Console for Common Room",
            estimatedCost: 55000,
            urgency: "low",
            status: "rejected-by-dean",
            submittedAt: "2024-01-03",
            deanRejectedAt: "2024-01-08"
        },
        {
            id: "REQ041",
            requisitionNumber: "REQ-2024-041",
            hostel: "Hostel A",
            caretaker: "Ram Kumar",
            warden: "Jane Smith",
            type: "upgrade",
            title: "Premium Furniture Upgrade",
            estimatedCost: 125000,
            urgency: "low",
            status: "rejected-by-dean",
            submittedAt: "2024-01-01",
            deanRejectedAt: "2024-01-06"
        },
    ]

    const filteredRequisitions = requisitions.filter(req => {
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.requisitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.hostel.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || req.status === statusFilter
        const matchesUrgency = urgencyFilter === "all" || req.urgency === urgencyFilter
        const matchesHostel = hostelFilter === "all" || req.hostel === hostelFilter

        return matchesSearch && matchesStatus && matchesUrgency && matchesHostel
    })

    const stats = {
        total: requisitions.length,
        pending: requisitions.filter(r => r.status === "pending-dean").length,
        approved: requisitions.filter(r => r.status === "approved-by-dean").length,
        rejected: requisitions.filter(r => r.status === "rejected-by-dean").length,
        urgent: requisitions.filter(r => r.urgency === "urgent" && r.status === "pending-dean").length
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending-dean": return "bg-orange-100 text-orange-800"
            case "approved-by-dean": return "bg-green-100 text-green-800"
            case "rejected-by-dean": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending-dean": return <Clock className="h-4 w-4" />
            case "approved-by-dean": return <CheckCircle className="h-4 w-4" />
            case "rejected-by-dean": return <XCircle className="h-4 w-4" />
            default: return null
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending-dean": return "Pending Approval"
            case "approved-by-dean": return "Approved"
            case "rejected-by-dean": return "Rejected"
            default: return status
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        All Requisitions 📋
                    </h1>
                    <p className="text-muted-foreground text-lg mt-2">View and manage all hostel requisitions</p>
                </div>
            </div>

            {/* Urgent Alert */}
            {stats.urgent > 0 && (
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border-2 border-red-300 dark:border-red-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
                            <AlertTriangle className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-red-900 dark:text-red-100 text-lg">
                                {stats.urgent} Urgent Requisition{stats.urgent > 1 ? 's' : ''} Awaiting Approval
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300 font-medium">Immediate attention required</p>
                        </div>
                        <Link href="/dean/requisitions/pending">
                            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/50">
                                Review Now
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-4">
                <Link href="/dean/requisitions" className={`relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border ${statusFilter === "all" ? 'border-blue-500 border-2' : 'border-blue-200/50 dark:border-blue-800/50'} rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}>
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">All Requisitions</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/50">
                            <Filter className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
                </Link>

                <Link href="/dean/requisitions/pending" className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30 backdrop-blur-xl border border-orange-200/50 dark:border-orange-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-orange-700 dark:text-orange-300">Pending Approval</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-orange-500/50">
                            <Clock className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-orange-900 dark:text-orange-100">{stats.pending}</p>
                </Link>

                <Link href="/dean/requisitions/approved" className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300">Approved</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-green-500/50">
                            <CheckCircle className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-green-900 dark:text-green-100">{stats.approved}</p>
                </Link>

                <Link href="/dean/requisitions/rejected" className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Rejected</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-500/50">
                            <XCircle className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-red-900 dark:text-red-100">{stats.rejected}</p>
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, requisition number, or hostel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-12 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                        />
                    </div>

                    <div className="flex gap-3 flex-wrap items-center">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-500/50">
                                <Filter className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-semibold dark:text-white">Filters:</span>
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        >
                            <option value="all">All Status</option>
                            <option value="pending-dean">Pending</option>
                            <option value="approved-by-dean">Approved</option>
                            <option value="rejected-by-dean">Rejected</option>
                        </select>

                        <select
                            value={urgencyFilter}
                            onChange={(e) => setUrgencyFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        >
                            <option value="all">All Urgency</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <select
                            value={hostelFilter}
                            onChange={(e) => setHostelFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        >
                            <option value="all">All Hostels</option>
                            <option value="Hostel A">Hostel A</option>
                            <option value="Hostel B">Hostel B</option>
                            <option value="Hostel C">Hostel C</option>
                            <option value="Hostel D">Hostel D</option>
                        </select>

                        {(statusFilter !== "all" || urgencyFilter !== "all" || hostelFilter !== "all") && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setStatusFilter("all")
                                    setUrgencyFilter("all")
                                    setHostelFilter("all")
                                }}
                                className="rounded-xl"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Requisitions List */}
                <div className="space-y-3">
                    {filteredRequisitions.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Filter className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">No requisitions found matching your filters</p>
                        </div>
                    ) : (
                        filteredRequisitions.map((req) => (
                            <div key={req.id} className={`group p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${req.urgency === 'urgent' && req.status === 'pending-dean'
                                    ? 'border-red-300 dark:border-red-700 border-2'
                                    : 'border-transparent hover:border-primary/30'
                                }`}>
                                {req.urgency === 'urgent' && req.status === 'pending-dean' && (
                                    <div className="flex items-center gap-2 mb-3 p-2 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 animate-pulse" />
                                        <span className="text-xs font-bold text-red-800 dark:text-red-300">URGENT</span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{req.requisitionNumber}</span>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor(req.status)} dark:bg-opacity-30`}>
                                                {getStatusIcon(req.status)}
                                                {getStatusLabel(req.status)}
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${req.type === 'maintenance' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                req.type === 'equipment' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700' :
                                                    req.type === 'upgrade' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'}`}>
                                                {req.type}
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${req.urgency === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700' :
                                                req.urgency === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                                    req.urgency === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' :
                                                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'}`}>
                                                {req.urgency}
                                            </span>
                                        </div>

                                        <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">{req.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3 font-medium">{req.description}</p>

                                        <div className="grid md:grid-cols-4 gap-3 mb-3">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-muted-foreground font-medium">Hostel</span>
                                                <span className="text-sm font-semibold dark:text-white">{req.hostel}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-muted-foreground font-medium">Cost</span>
                                                <span className="text-sm font-bold text-primary">₹{req.estimatedCost.toLocaleString()}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-muted-foreground font-medium">Caretaker</span>
                                                <span className="text-sm font-semibold dark:text-white">{req.caretaker}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-muted-foreground font-medium">Warden</span>
                                                <span className="text-sm font-semibold dark:text-white">{req.warden}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 text-xs text-muted-foreground font-medium flex-wrap">
                                            <span>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                                            {req.wardenApprovedAt && (
                                                <span>Warden Approved: {new Date(req.wardenApprovedAt).toLocaleDateString()}</span>
                                            )}
                                            {req.deanApprovedAt && (
                                                <span>Dean Approved: {new Date(req.deanApprovedAt).toLocaleDateString()}</span>
                                            )}
                                            {req.deanRejectedAt && (
                                                <span>Dean Rejected: {new Date(req.deanRejectedAt).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {req.status === "pending-dean" ? (
                                            <Link href="/dean/requisitions/pending">
                                                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all">
                                                    Review
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button variant="outline" size="sm" className="rounded-xl">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {filteredRequisitions.length > 0 && (
                    <div className="mt-6 text-sm text-muted-foreground text-center font-medium">
                        Showing {filteredRequisitions.length} of {requisitions.length} requisitions
                    </div>
                )}
            </div>
        </div>
    )
}
