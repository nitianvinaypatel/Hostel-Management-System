'use client'

import { useState } from "react"
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-rose-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-red-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/dean/requisitions">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
                            Rejected Requisitions ❌
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">Requisitions rejected by dean</p>
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
                        <div key={req.id} className="group p-6 rounded-xl bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-300 dark:border-red-700 transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center gap-2 mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                <span className="text-sm font-bold text-red-800 dark:text-red-300">REJECTED by Dean</span>
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{req.requisitionNumber}</span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${req.type === 'equipment' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700' :
                                            req.type === 'upgrade' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' :
                                                'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700'}`}>
                                            {req.type}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">{req.title}</h3>

                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground font-medium">Hostel</span>
                                            <span className="font-semibold dark:text-white">{req.hostel}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground font-medium">Cost</span>
                                            <span className="font-bold text-primary">₹{req.estimatedCost.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl mb-3">
                                        <p className="text-xs font-bold text-red-800 dark:text-red-300 mb-1">Rejection Reason:</p>
                                        <p className="text-sm text-red-900 dark:text-red-200 font-medium">{req.deanComments}</p>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground font-medium flex-wrap">
                                        <span>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                                        <span>Warden Approved: {new Date(req.wardenApprovedAt).toLocaleDateString()}</span>
                                        <span>Dean Rejected: {new Date(req.deanRejectedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-red-200 dark:border-red-800">
                                <Button variant="outline" className="flex-1 rounded-xl">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Full Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
