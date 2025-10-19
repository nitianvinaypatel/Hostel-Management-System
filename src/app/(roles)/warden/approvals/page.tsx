'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye } from "lucide-react"
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">All Approvals</h1>
                    <p className="text-muted-foreground">Review and approve student requests</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/warden/approvals/room-allotments">
                        <Button variant="outline">Room Allotments</Button>
                    </Link>
                    <Link href="/warden/approvals/hostel-changes">
                        <Button variant="outline">Hostel Changes</Button>
                    </Link>
                    <Link href="/warden/approvals/complaints">
                        <Button variant="outline">Complaints</Button>
                    </Link>
                </div>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search approvals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="all">All Types</option>
                        <option value="room-allotment">Room Allotment</option>
                        <option value="hostel-change">Hostel Change</option>
                        <option value="complaint">Complaint</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredApprovals.map((approval) => (
                        <Card key={approval.id} className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(approval.type)}`}>
                                            {getTypeLabel(approval.type)}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${approval.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            approval.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {approval.status}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-1">{approval.student}</h3>
                                    <p className="text-sm mb-1">{approval.details}</p>
                                    <p className="text-sm text-muted-foreground mb-1">Reason: {approval.reason}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Submitted: {new Date(approval.submittedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {approval.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                        <Button size="sm" variant="default">
                                            <Check className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button size="sm" variant="destructive">
                                            <X className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
