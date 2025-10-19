'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye } from "lucide-react"

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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Requisition Approvals</h1>
                <p className="text-muted-foreground">Review and approve student requisitions</p>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search requisitions..."
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
                    {filteredRequisitions.map((req) => (
                        <Card key={req.id} className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                            {req.type}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            req.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-1">{req.student}</h3>
                                    <p className="text-sm text-muted-foreground mb-1">{req.hostel}</p>
                                    <p className="text-sm">{req.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Submitted: {new Date(req.submittedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {req.status === 'pending' && (
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
