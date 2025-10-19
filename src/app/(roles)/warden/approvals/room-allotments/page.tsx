'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowLeft } from "lucide-react"
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
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/warden/approvals">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Room Allotment Requests</h1>
                    <p className="text-muted-foreground">Review and approve room allotment requests</p>
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
                    {filteredAllotments.map((allotment) => (
                        <Card key={allotment.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-lg font-semibold">{allotment.studentName}</h3>
                                        <span className="text-sm text-muted-foreground">({allotment.studentId})</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${allotment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            allotment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {allotment.status}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Current Room</p>
                                            <p className="font-medium">{allotment.currentRoom}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Requested Room</p>
                                            <p className="font-medium text-primary">{allotment.requestedRoom}</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-muted-foreground mb-1">Reason</p>
                                        <p className="text-sm">{allotment.reason}</p>
                                    </div>

                                    <p className="text-xs text-muted-foreground">
                                        Submitted: {new Date(allotment.submittedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {allotment.status === 'pending' && (
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
