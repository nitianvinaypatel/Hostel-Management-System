'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, ArrowLeft, XCircle } from "lucide-react"
import Link from "next/link"

export default function RejectedRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")

    const requisitions = [
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
            wardenApprovedAt: "2024-01-05",
            deanRejectedAt: "2024-01-08",
            deanComments: "Rejected. Not a priority expense. Focus on essential maintenance first."
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
            wardenApprovedAt: "2024-01-03",
            deanRejectedAt: "2024-01-06",
            deanComments: "Rejected. Current furniture is adequate. Budget should be allocated to more critical needs."
        },
    ]

    const filteredRequisitions = requisitions.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requisitionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dean/requisitions">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Rejected Requisitions</h1>
                    <p className="text-muted-foreground">Requisitions rejected by dean</p>
                </div>
            </div>

            <Card className="p-6">
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search requisitions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="space-y-4">
                    {filteredRequisitions.map((req) => (
                        <Card key={req.id} className="p-6 border-red-200 border-2">
                            <div className="flex items-center gap-2 mb-3 p-2 bg-red-50 border border-red-200 rounded">
                                <XCircle className="h-5 w-5 text-red-600" />
                                <span className="text-sm font-semibold text-red-800">REJECTED by Dean</span>
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-mono text-sm font-semibold">{req.requisitionNumber}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${req.type === 'equipment' ? 'bg-purple-100 text-purple-800' :
                                            req.type === 'upgrade' ? 'bg-green-100 text-green-800' :
                                                'bg-blue-100 text-blue-800'}`}>
                                            {req.type}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-2">{req.title}</h3>

                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <span className="text-sm text-muted-foreground">Hostel:</span>
                                            <span className="ml-2 font-medium">{req.hostel}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Cost:</span>
                                            <span className="ml-2 font-medium text-primary">₹{req.estimatedCost.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                                        <p className="text-xs font-semibold text-red-800 mb-1">Rejection Reason:</p>
                                        <p className="text-sm text-red-900">{req.deanComments}</p>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                                        <span>Warden Approved: {new Date(req.wardenApprovedAt).toLocaleDateString()}</span>
                                        <span>Dean Rejected: {new Date(req.deanRejectedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t">
                                <Button variant="outline" className="flex-1">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Full Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
