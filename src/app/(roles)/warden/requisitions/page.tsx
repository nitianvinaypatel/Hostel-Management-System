'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, X, Eye, ArrowUp } from "lucide-react"

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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Caretaker Requisitions</h1>
                <p className="text-muted-foreground">Review and approve requisitions from caretakers</p>
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
                        <option value="escalated">Escalated</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredRequisitions.map((req) => (
                        <Card key={req.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-mono text-sm font-semibold">{req.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(req.type)}`}>
                                            {req.type}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${req.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                            req.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {req.priority}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            req.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-2">{req.title}</h3>
                                    <p className="text-sm mb-3">{req.description}</p>

                                    <div className="grid md:grid-cols-3 gap-3 mb-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Requested by</p>
                                            <p className="text-sm font-medium">{req.caretakerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Estimated Cost</p>
                                            <p className="text-sm font-medium">₹{req.estimatedCost.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Submitted</p>
                                            <p className="text-sm font-medium">{new Date(req.submittedAt).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {req.reviewedAt && (
                                        <p className="text-xs text-muted-foreground">
                                            Reviewed: {new Date(req.reviewedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {req.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t">
                                    <Button variant="outline" className="flex-1">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    <Button variant="default" className="flex-1">
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <ArrowUp className="h-4 w-4 mr-2" />
                                        Escalate to Dean
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
