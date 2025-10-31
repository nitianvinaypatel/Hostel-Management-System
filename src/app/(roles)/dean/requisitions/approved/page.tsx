'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ApprovedRequisitions() {
    const [searchTerm, setSearchTerm] = useState("")

    const requisitions = [
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
            wardenApprovedAt: "2024-01-10",
            deanApprovedAt: "2024-01-12",
            deanComments: "Approved. Standard quarterly requirement."
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
            wardenApprovedAt: "2024-01-08",
            deanApprovedAt: "2024-01-10",
            deanComments: "Approved. Essential before monsoon season."
        },
    ]

    const filteredRequisitions = requisitions.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requisitionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/dean/requisitions">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Approved Requisitions ✅
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">Requisitions approved by dean</p>
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
                        <div key={req.id} className="group p-6 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center gap-2 mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-bold text-green-800 dark:text-green-300">APPROVED by Dean</span>
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-mono text-sm font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{req.requisitionNumber}</span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${req.type === 'maintenance' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700' :
                                            req.type === 'supplies' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                                'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700'}`}>
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

                                    <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl mb-3">
                                        <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">Dean&apos;s Comments:</p>
                                        <p className="text-sm text-green-900 dark:text-green-200 font-medium">{req.deanComments}</p>
                                    </div>

                                    <div className="flex gap-4 text-xs text-muted-foreground font-medium flex-wrap">
                                        <span>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                                        <span>Warden Approved: {new Date(req.wardenApprovedAt).toLocaleDateString()}</span>
                                        <span>Dean Approved: {new Date(req.deanApprovedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-green-200 dark:border-green-800">
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
