'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HostelChanges() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("pending")

    const changes = [
        {
            id: "1",
            studentId: "S004",
            studentName: "Jane Smith",
            currentHostel: "Hostel A - Boys",
            currentRoom: "205, Block A",
            requestedHostel: "Hostel B - Girls",
            reason: "Administrative error in initial allotment",
            submittedAt: "2024-01-15 11:20",
            status: "pending",
            priority: "high"
        },
        {
            id: "2",
            studentId: "S005",
            studentName: "Robert Brown",
            currentHostel: "Hostel C - Boys",
            currentRoom: "310, Block C",
            requestedHostel: "Hostel A - Boys",
            reason: "Medical reasons - need to be closer to medical center",
            submittedAt: "2024-01-15 09:45",
            status: "pending",
            priority: "urgent"
        },
        {
            id: "3",
            studentId: "S006",
            studentName: "Emily Davis",
            currentHostel: "Hostel B - Girls",
            currentRoom: "102, Block B",
            requestedHostel: "Hostel D - Girls",
            reason: "Closer to department, better facilities",
            submittedAt: "2024-01-14 14:30",
            status: "approved",
            priority: "medium"
        },
    ]

    const filteredChanges = changes.filter(change => {
        const matchesSearch = change.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            change.studentId.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || change.status === filterStatus
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/warden/approvals">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Hostel Change Requests</h1>
                    <p className="text-muted-foreground">Review and approve hostel transfer requests</p>
                </div>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by student name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
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
                    {filteredChanges.map((change) => (
                        <Card key={change.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-lg font-semibold">{change.studentName}</h3>
                                        <span className="text-sm text-muted-foreground">({change.studentId})</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${change.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                            change.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {change.priority}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${change.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            change.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {change.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex-1 p-3 border rounded-lg">
                                            <p className="text-xs text-muted-foreground mb-1">Current Hostel</p>
                                            <p className="font-medium">{change.currentHostel}</p>
                                            <p className="text-sm text-muted-foreground">{change.currentRoom}</p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                        <div className="flex-1 p-3 border rounded-lg bg-primary/5">
                                            <p className="text-xs text-muted-foreground mb-1">Requested Hostel</p>
                                            <p className="font-medium text-primary">{change.requestedHostel}</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-muted-foreground mb-1">Reason</p>
                                        <p className="text-sm">{change.reason}</p>
                                    </div>

                                    <p className="text-xs text-muted-foreground">
                                        Submitted: {new Date(change.submittedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {change.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t">
                                    <Button variant="outline" className="flex-1">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    <Button variant="default" className="flex-1">
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
