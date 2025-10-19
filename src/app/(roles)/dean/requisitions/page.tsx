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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">All Requisitions</h1>
                <p className="text-muted-foreground">View and manage all hostel requisitions</p>
            </div>

            {stats.urgent > 0 && (
                <Card className="p-4 border-red-300 border-2 bg-red-50">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <div className="flex-1">
                            <p className="font-semibold text-red-900">
                                {stats.urgent} Urgent Requisition{stats.urgent > 1 ? 's' : ''} Awaiting Approval
                            </p>
                            <p className="text-sm text-red-700">Immediate attention required</p>
                        </div>
                        <Link href="/dean/requisitions/pending">
                            <Button variant="destructive">
                                Review Now
                            </Button>
                        </Link>
                    </div>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-4">
                <Link href="/dean/requisitions">
                    <Card className={`p-4 cursor-pointer transition-colors ${statusFilter === "all" ? 'border-primary border-2' : 'hover:bg-accent/50'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold">{stats.total}</span>
                        </div>
                        <p className="text-sm font-medium">All Requisitions</p>
                    </Card>
                </Link>

                <Link href="/dean/requisitions/pending">
                    <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <Clock className="h-6 w-6 text-orange-600" />
                            <span className="text-2xl font-bold">{stats.pending}</span>
                        </div>
                        <p className="text-sm font-medium">Pending Approval</p>
                    </Card>
                </Link>

                <Link href="/dean/requisitions/approved">
                    <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                            <span className="text-2xl font-bold">{stats.approved}</span>
                        </div>
                        <p className="text-sm font-medium">Approved</p>
                    </Card>
                </Link>

                <Link href="/dean/requisitions/rejected">
                    <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <XCircle className="h-6 w-6 text-red-600" />
                            <span className="text-2xl font-bold">{stats.rejected}</span>
                        </div>
                        <p className="text-sm font-medium">Rejected</p>
                    </Card>
                </Link>
            </div>

            <Card className="p-6">
                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, requisition number, or hostel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filters:</span>
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-1.5 border rounded-md text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="pending-dean">Pending</option>
                            <option value="approved-by-dean">Approved</option>
                            <option value="rejected-by-dean">Rejected</option>
                        </select>

                        <select
                            value={urgencyFilter}
                            onChange={(e) => setUrgencyFilter(e.target.value)}
                            className="px-3 py-1.5 border rounded-md text-sm"
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
                            className="px-3 py-1.5 border rounded-md text-sm"
                        >
                            <option value="all">All Hostels</option>
                            <option value="Hostel A">Hostel A</option>
                            <option value="Hostel B">Hostel B</option>
                            <option value="Hostel C">Hostel C</option>
                            <option value="Hostel D">Hostel D</option>
                        </select>

                        {(statusFilter !== "all" || urgencyFilter !== "all" || hostelFilter !== "all") && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setStatusFilter("all")
                                    setUrgencyFilter("all")
                                    setHostelFilter("all")
                                }}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredRequisitions.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No requisitions found matching your filters</p>
                        </div>
                    ) : (
                        filteredRequisitions.map((req) => (
                            <Card key={req.id} className={`p-4 ${req.urgency === 'urgent' && req.status === 'pending-dean' ? 'border-red-300 border-2' : ''}`}>
                                {req.urgency === 'urgent' && req.status === 'pending-dean' && (
                                    <div className="flex items-center gap-2 mb-3 p-2 bg-red-50 border border-red-200 rounded">
                                        <AlertTriangle className="h-4 w-4 text-red-600" />
                                        <span className="text-xs font-semibold text-red-800">URGENT</span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-mono text-sm font-semibold">{req.requisitionNumber}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(req.status)}`}>
                                                {getStatusIcon(req.status)}
                                                {getStatusLabel(req.status)}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${req.type === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                                                req.type === 'equipment' ? 'bg-purple-100 text-purple-800' :
                                                    req.type === 'upgrade' ? 'bg-green-100 text-green-800' :
                                                        'bg-blue-100 text-blue-800'}`}>
                                                {req.type}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${req.urgency === 'urgent' ? 'bg-red-100 text-red-800' :
                                                req.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                                                    req.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-blue-100 text-blue-800'}`}>
                                                {req.urgency}
                                            </span>
                                        </div>

                                        <h3 className="font-semibold mb-1">{req.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{req.description}</p>

                                        <div className="grid md:grid-cols-4 gap-3 mb-2">
                                            <div>
                                                <span className="text-xs text-muted-foreground">Hostel:</span>
                                                <span className="ml-2 text-sm font-medium">{req.hostel}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground">Cost:</span>
                                                <span className="ml-2 text-sm font-medium text-primary">₹{req.estimatedCost.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground">Caretaker:</span>
                                                <span className="ml-2 text-sm font-medium">{req.caretaker}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground">Warden:</span>
                                                <span className="ml-2 text-sm font-medium">{req.warden}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 text-xs text-muted-foreground">
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

                                    <div className="flex gap-2 ml-4">
                                        {req.status === "pending-dean" ? (
                                            <Link href="/dean/requisitions/pending">
                                                <Button size="sm">
                                                    Review
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {filteredRequisitions.length > 0 && (
                    <div className="mt-4 text-sm text-muted-foreground text-center">
                        Showing {filteredRequisitions.length} of {requisitions.length} requisitions
                    </div>
                )}
            </Card>
        </div>
    )
}
