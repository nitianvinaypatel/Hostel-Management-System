'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, DollarSign, Search, Filter, Calendar, Building2, Trash2 } from "lucide-react"

export default function FeeStructure() {
    const [searchQuery, setSearchQuery] = useState("")

    const feeStructures = [
        {
            id: "1",
            hostel: "Hostel A - Boys",
            academicYear: "2024-25",
            hostelFee: 25000,
            messFee: 18000,
            securityDeposit: 10000,
            maintenanceFee: 5000,
            total: 58000,
            effectiveFrom: "2024-07-01",
            effectiveTo: "2025-06-30",
            status: "active"
        },
        {
            id: "2",
            hostel: "Hostel B - Girls",
            academicYear: "2024-25",
            hostelFee: 28000,
            messFee: 18000,
            securityDeposit: 10000,
            maintenanceFee: 5000,
            total: 61000,
            effectiveFrom: "2024-07-01",
            effectiveTo: "2025-06-30",
            status: "active"
        },
        {
            id: "3",
            hostel: "Hostel C - International",
            academicYear: "2024-25",
            hostelFee: 35000,
            messFee: 20000,
            securityDeposit: 15000,
            maintenanceFee: 7000,
            total: 77000,
            effectiveFrom: "2024-07-01",
            effectiveTo: "2025-06-30",
            status: "active"
        },
    ]

    const filteredFees = feeStructures.filter(fee =>
        fee.hostel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fee.academicYear.includes(searchQuery)
    )

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                            Fee Structure 💰
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Manage hostel, mess, and other fees
                        </p>
                    </div>
                    <Button className="w-full md:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fee Structure
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Hostels</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{feeStructures.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg. Annual Fee</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                ₹{Math.round(feeStructures.reduce((acc, f) => acc + f.total, 0) / feeStructures.length).toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Academic Year</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">2024-25</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-4 shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by hostel name or academic year..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline" className="w-full md:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Fee Structure Cards */}
            <div className="grid gap-6">
                {filteredFees.map((fee) => (
                    <div key={fee.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                                        <DollarSign className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{fee.hostel}</h3>
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
                                                {fee.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Academic Year: {fee.academicYear}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Effective: {new Date(fee.effectiveFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(fee.effectiveTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-950/30">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/30">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">Hostel Fee</p>
                                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">₹{fee.hostelFee.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">Mess Fee</p>
                                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">₹{fee.messFee.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-2">Security Deposit</p>
                                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">₹{fee.securityDeposit.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2">Maintenance Fee</p>
                                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₹{fee.maintenanceFee.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-xl transition-shadow shadow-emerald-500/20">
                                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Total Annual</p>
                                    <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">₹{fee.total.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFees.length === 0 && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 shadow-lg">
                    <div className="text-center">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">No fee structures found</h3>
                        <p className="text-muted-foreground mb-4">Try adjusting your search or add a new fee structure</p>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Fee Structure
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
