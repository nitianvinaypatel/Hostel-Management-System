'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, ArrowLeft, AlertTriangle } from "lucide-react"
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
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/warden/approvals">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Forwarded Complaints</h1>
                    <p className="text-muted-foreground">Review and resolve complaints from caretakers</p>
                </div>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search complaints..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-4 py-2 border rounded-md"
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
                        className="px-4 py-2 border rounded-md"
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
                        <Card key={complaint.id} className="p-6">
                            <div className="flex items-start gap-4">
                                {complaint.priority === 'urgent' && (
                                    <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-mono text-sm font-semibold">{complaint.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(complaint.category)}`}>
                                            {complaint.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${complaint.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                            complaint.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {complaint.priority}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {complaint.status}
                                        </span>
                                    </div>

                                    <h3 className="font-semibold mb-2">{complaint.studentName} ({complaint.studentId})</h3>
                                    <p className="text-sm mb-2">{complaint.description}</p>

                                    <div className="grid md:grid-cols-3 gap-3 text-sm text-muted-foreground mb-3">
                                        <div>
                                            <span className="font-medium">Location:</span> {complaint.roomNumber}
                                        </div>
                                        <div>
                                            <span className="font-medium">Forwarded by:</span> {complaint.forwardedBy}
                                        </div>
                                        <div>
                                            <span className="font-medium">Time:</span> {new Date(complaint.forwardedAt).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-3 border-t">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
                                        {complaint.status === 'pending' && (
                                            <>
                                                <Button size="sm" variant="default">
                                                    Assign to Caretaker
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    Escalate to Admin
                                                </Button>
                                            </>
                                        )}
                                        {complaint.status === 'in-progress' && (
                                            <Button size="sm" variant="default">
                                                Mark as Resolved
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
