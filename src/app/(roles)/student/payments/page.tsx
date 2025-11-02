"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    CreditCard,
    Download,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    Smartphone,
    Building2,
    Wallet,
    ArrowLeft,
} from "lucide-react"

type Payment = {
    id: string
    type: string
    amount: number
    dueDate: string
    status: "paid" | "pending" | "overdue"
    paidDate?: string
}

type Transaction = {
    id: string
    date: string
    description: string
    amount: number
    method: string
}

export default function StudentPayments() {
    const [activeTab, setActiveTab] = useState<"pending" | "history">("pending")

    const pendingPayments: Payment[] = [
        {
            id: "P001",
            type: "Hostel Fee - Semester 1",
            amount: 25000,
            dueDate: "2024-10-20",
            status: "pending",
        },
        {
            id: "P002",
            type: "Mess Fee - October",
            amount: 5000,
            dueDate: "2024-10-15",
            status: "overdue",
        },
    ]

    const paymentHistory: Transaction[] = [
        {
            id: "T001",
            date: "2024-09-15",
            description: "Hostel Fee - Semester 1 (Advance)",
            amount: 10000,
            method: "UPI",
        },
        {
            id: "T002",
            date: "2024-09-01",
            description: "Mess Fee - September",
            amount: 5000,
            method: "Net Banking",
        },
        {
            id: "T003",
            date: "2024-08-15",
            description: "Caution Deposit",
            amount: 5000,
            method: "Card",
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid":
                return <CheckCircle className="h-4 w-4" />
            case "pending":
                return <Clock className="h-4 w-4" />
            case "overdue":
                return <AlertCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-500/10 text-green-500"
            case "pending":
                return "bg-yellow-500/10 text-yellow-500"
            case "overdue":
                return "bg-red-500/10 text-red-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:via-teal-500/20 dark:to-cyan-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                Payments
                            </h1>
                            <p className="text-muted-foreground text-lg">Manage your hostel and mess payments</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-100/50 dark:from-red-950/50 dark:to-rose-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-rose-600/0 group-hover:from-red-400/10 group-hover:to-rose-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Total Pending</h3>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-500/50">
                            <Wallet className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-red-900 dark:text-red-100">₹{totalPending.toLocaleString()}</p>
                    <p className="text-xs font-medium flex items-center gap-1.5 text-red-600 dark:text-red-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {pendingPayments.length} pending payments
                    </p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-950/50 dark:to-emerald-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-600/0 group-hover:from-green-400/10 group-hover:to-emerald-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300">Paid This Month</h3>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-500/50">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-green-900 dark:text-green-100">₹0</p>
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">No payments this month</p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100/50 dark:from-blue-950/50 dark:to-cyan-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-cyan-600/0 group-hover:from-blue-400/10 group-hover:to-cyan-600/5 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">Next Due Date</h3>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-100">Oct 15</p>
                    <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Mess Fee payment</p>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg">
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === "pending"
                            ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Pending Payments
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === "history"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Payment History
                    </button>
                </div>

                {activeTab === "pending" ? (
                    <div className="space-y-4">
                        {pendingPayments.map((payment) => (
                            <div key={payment.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{payment.type}</h3>
                                            <span
                                                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md ${getStatusColor(
                                                    payment.status
                                                )}`}
                                            >
                                                {getStatusIcon(payment.status)}
                                                {payment.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-medium mb-4 flex-wrap">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                <Wallet className="h-3.5 w-3.5" />
                                                Amount: ₹{payment.amount.toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                                                <Calendar className="h-3.5 w-3.5" />
                                                Due: {new Date(payment.dueDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <Button className="h-10 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Pay Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {paymentHistory.map((transaction) => (
                            <div key={transaction.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{transaction.description}</h3>
                                        <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                <CreditCard className="h-3.5 w-3.5" />
                                                {transaction.method}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold">
                                                <CheckCircle className="h-3.5 w-3.5" />
                                                ₹{transaction.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="h-10 px-6 rounded-xl bg-white/50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                        <Download className="h-4 w-4" />
                                        Receipt
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 backdrop-blur-xl border border-indigo-200/50 dark:border-indigo-800/50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Payment Methods
                    </span>
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/30 rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 cursor-pointer">
                        <div className="h-16 w-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                            <CreditCard className="h-8 w-8 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">Credit/Debit Card</div>
                    </div>
                    <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/30 rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 cursor-pointer">
                        <div className="h-16 w-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                            <Smartphone className="h-8 w-8 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">UPI</div>
                    </div>
                    <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/30 rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 cursor-pointer">
                        <div className="h-16 w-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:scale-110 transition-transform">
                            <Building2 className="h-8 w-8 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">Net Banking</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
