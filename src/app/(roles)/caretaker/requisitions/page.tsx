'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { ClipboardList, Plus, CheckCircle2, Clock, XCircle, Upload, DollarSign, FileText, AlertTriangle } from "lucide-react"

export default function CaretakerRequisitions() {
    const [selectedCategory, setSelectedCategory] = useState("Maintenance")

    const requisitions = [
        {
            id: "1",
            title: "AC Repair - Room 101",
            category: "Repair",
            amount: 5000,
            status: "approved",
            statusText: "Sent to Dean",
            date: "2 days ago",
            urgency: "high"
        },
        {
            id: "2",
            title: "Furniture Purchase",
            category: "Inventory",
            amount: 15000,
            status: "pending",
            statusText: "Awaiting Warden Approval",
            date: "1 day ago",
            urgency: "medium"
        },
        {
            id: "3",
            title: "Plumbing Maintenance",
            category: "Maintenance",
            amount: 3000,
            status: "rejected",
            statusText: "Rejected by Warden",
            date: "5 days ago",
            urgency: "low"
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            case 'pending':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
            case 'rejected':
                return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle2 className="h-3 w-3" />
            case 'pending':
                return <Clock className="h-3 w-3" />
            case 'rejected':
                return <XCircle className="h-3 w-3" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-fuchsia-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/50">
                        <ClipboardList className="h-7 w-7 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Requisitions 📝
                        </h1>
                        <p className="text-muted-foreground text-lg">Submit and track maintenance, repair, and inventory requests</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg shadow-gray-500/50">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">12</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">5</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Approved</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">6</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <XCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File New Requisition */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <Plus className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">File New Requisition</h3>
                                <p className="text-sm text-muted-foreground">Submit a requisition for maintenance, repair, or inventory</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Category</FieldLabel>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm [&>option]:text-gray-900 [&>option]:dark:text-white"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option>Maintenance</option>
                                    <option>Repair</option>
                                    <option>Inventory</option>
                                    <option>Other</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Description</FieldLabel>
                                <textarea
                                    className="flex min-h-20 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none"
                                    placeholder="Describe the requisition in detail..."
                                ></textarea>
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Estimated Amount
                                </FieldLabel>
                                <Input
                                    type="number"
                                    placeholder="Enter estimated amount"
                                    className="bg-white dark:bg-gray-800"
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Urgency
                                </FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm [&>option]:text-gray-900 [&>option]:dark:text-white">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Upload Documents
                                </FieldLabel>
                                <Input
                                    type="file"
                                    className="bg-white dark:bg-gray-800"
                                />
                                <FieldDescription>Upload invoices, estimates, or related documents</FieldDescription>
                            </Field>
                            <Button type="submit" className="w-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Submit Requisition
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Requisition History */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Requisition History</h3>
                                <p className="text-sm text-muted-foreground">Track your submitted requisitions</p>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        {requisitions.map((req) => (
                            <div key={req.id} className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{req.title}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">{req.category}</p>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                                        {getStatusIcon(req.status)}
                                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <DollarSign className="h-3 w-3" />
                                        Amount: ₹{req.amount.toLocaleString('en-IN')}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Status: {req.statusText}</p>
                                    <p className="text-xs text-muted-foreground">{req.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
