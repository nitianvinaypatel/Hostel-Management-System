'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Check, X, Eye, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function PendingRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedReq, setSelectedReq] = useState<string | null>(null)
    const [deanComments, setDeanComments] = useState("")

    const requisitions = [
        {
            id: "REQ047",
            requisitionNumber: "REQ-2024-047",
            hostel: "Hostel C",
            caretaker: "Mohan Lal",
            warden: "Robert Brown",
            type: "maintenance",
            title: "Emergency Plumbing Repair",
            description: "Major pipe burst in Block C basement causing water leakage. Immediate repair required to prevent structural damage.",
            estimatedCost: 35000,
            urgency: "urgent",
            status: "pending-dean",
            submittedAt: "2024-01-13",
            wardenApprovedAt: "2024-01-14",
            wardenComments: "Emergency situation. Temporary fix done. Permanent solution needed urgently to prevent further damage.",
            attachments: ["pipe_burst_photo.jpg", "damage_assessment.pdf"]
        },
        {
            id: "REQ045",
            requisitionNumber: "REQ-2024-045",
            hostel: "Hostel A",
            caretaker: "Ram Kumar",
            warden: "Jane Smith",
            type: "upgrade",
            title: "Electrical Wiring Upgrade - Block A",
            description: "Complete rewiring of Block A due to frequent power issues and safety concerns. Current wiring is 15 years old.",
            estimatedCost: 85000,
            urgency: "high",
            status: "pending-dean",
            submittedAt: "2024-01-10",
            wardenApprovedAt: "2024-01-15",
            wardenComments: "Urgent requirement. Multiple complaints received. Safety inspection report attached. Recommend approval.",
            attachments: ["safety_inspection.pdf", "quotation.pdf"]
        },
        {
            id: "REQ046",
            requisitionNumber: "REQ-2024-046",
            hostel: "Hostel B",
            caretaker: "Shyam Singh",
            warden: "Mary Johnson",
            type: "equipment",
            title: "Water Purifier Installation",
            description: "Install RO water purifiers on all floors (4 floors) for better water quality. Current water quality tests show high TDS.",
            estimatedCost: 45000,
            urgency: "medium",
            status: "pending-dean",
            submittedAt: "2024-01-12",
            wardenApprovedAt: "2024-01-14",
            wardenComments: "Good for student health. Budget available. Water quality report attached.",
            attachments: ["water_quality_report.pdf", "purifier_quotation.pdf"]
        },
    ]

    const filteredRequisitions = requisitions.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requisitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.hostel.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleApprove = (reqId: string) => {
        console.log("Approving requisition:", reqId, "Comments:", deanComments)
    }

    const handleReject = (reqId: string) => {
        console.log("Rejecting requisition:", reqId, "Comments:", deanComments)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/dean/requisitions">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                            Pending Requisitions ⏳
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">Requisitions awaiting dean approval</p>
                    </div>
                </div>
            </div>

            {/* Search and Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search requisitions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                    />
                </div>

                <div className="space-y-4">
                    {filteredRequisitions.map((req) => (
                        <div key={req.id} className={`group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border transition-all duration-300 hover:shadow-xl ${req.urgency === 'urgent' ? 'border-red-300 dark:border-red-700 border-2' : 'border-gray-200/50 dark:border-gray-700/50'
                            }`}>
                            {req.urgency === 'urgent' && (
                                <div className="flex items-center gap-2 mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
                                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 animate-pulse" />
                                    <span className="text-sm font-bold text-red-800 dark:text-red-300">URGENT: Requires immediate attention</span>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-mono text-sm font-semibold">{req.requisitionNumber}</span>
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

                                    <h3 className="text-lg font-semibold mb-2">{req.title}</h3>
                                    <p className="text-sm mb-3">{req.description}</p>

                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div className="p-3 border rounded-lg">
                                            <p className="text-xs text-muted-foreground mb-1">Hostel</p>
                                            <p className="font-medium">{req.hostel}</p>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-primary/5">
                                            <p className="text-xs text-muted-foreground mb-1">Estimated Cost</p>
                                            <p className="text-xl font-bold text-primary">₹{req.estimatedCost.toLocaleString()}</p>
                                        </div>
                                        <div className="p-3 border rounded-lg">
                                            <p className="text-xs text-muted-foreground mb-1">Requested by</p>
                                            <p className="font-medium">{req.caretaker} (Caretaker)</p>
                                        </div>
                                        <div className="p-3 border rounded-lg">
                                            <p className="text-xs text-muted-foreground mb-1">Approved by</p>
                                            <p className="font-medium">{req.warden} (Warden)</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl mb-3">
                                        <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-2">Warden&apos;s Recommendation:</p>
                                        <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">{req.wardenComments}</p>
                                    </div>

                                    {req.attachments && req.attachments.length > 0 && (
                                        <div className="mb-3">
                                            <p className="text-xs font-semibold mb-2">Attachments:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {req.attachments.map((file, index) => (
                                                    <button
                                                        key={index}
                                                        className="px-3 py-1 text-xs border rounded-lg hover:bg-accent flex items-center gap-2"
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                        {file}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                                        <span>Warden Approved: {new Date(req.wardenApprovedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <div className="mb-4">
                                    <Label htmlFor={`comments-${req.id}`} className="font-semibold dark:text-white">Dean&apos;s Comments / Feedback</Label>
                                    <textarea
                                        id={`comments-${req.id}`}
                                        value={selectedReq === req.id ? deanComments : ""}
                                        onChange={(e) => {
                                            setSelectedReq(req.id)
                                            setDeanComments(e.target.value)
                                        }}
                                        placeholder="Add your comments or feedback..."
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl min-h-[80px] mt-2 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 rounded-xl">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Full Details
                                    </Button>
                                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/50 rounded-xl" onClick={() => handleApprove(req.id)}>
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve & Release Funds
                                    </Button>
                                    <Button className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/50 rounded-xl" onClick={() => handleReject(req.id)}>
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
