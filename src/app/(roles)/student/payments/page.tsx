"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/common/back-button"
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
        <div className="space-y-6">
            <BackButton />
            <div className="glass rounded-lg p-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Payments</h1>
                        <p className="text-muted-foreground mt-1">Manage your hostel and mess payments</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="glass rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Pending</h3>
                        <Wallet className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold">₹{totalPending.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {pendingPayments.length} pending payments
                    </p>
                </div>

                <div className="glass rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Paid This Month</h3>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold">₹0</p>
                    <p className="text-xs text-muted-foreground mt-2">No payments this month</p>
                </div>

                <div className="glass rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Next Due Date</h3>
                        <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold">Oct 15</p>
                    <p className="text-xs text-muted-foreground mt-2">Mess Fee payment</p>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === "pending" ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                            }`}
                    >
                        Pending Payments
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === "history" ? "bg-primary text-primary-foreground" : "glass hover:shadow-md"
                            }`}
                    >
                        Payment History
                    </button>
                </div>

                {activeTab === "pending" ? (
                    <div className="space-y-4">
                        {pendingPayments.map((payment) => (
                            <div key={payment.id} className="glass rounded-lg p-4 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold">{payment.type}</h3>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(
                                                    payment.status
                                                )}`}
                                            >
                                                {getStatusIcon(payment.status)}
                                                {payment.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                <Wallet className="h-3 w-3" />
                                                Amount: ₹{payment.amount.toLocaleString()}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Due: {new Date(payment.dueDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <Button size="sm" className="flex items-center gap-2">
                                            <CreditCard className="h-3 w-3" />
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
                            <div key={transaction.id} className="glass rounded-lg p-4 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">{transaction.description}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <CreditCard className="h-3 w-3" />
                                                {transaction.method}
                                            </span>
                                            <span>•</span>
                                            <span className="text-green-500 font-medium flex items-center gap-1">
                                                <CheckCircle className="h-3 w-3" />
                                                ₹{transaction.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Download className="h-3 w-3" />
                                        Receipt
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="glass rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="font-medium">Credit/Debit Card</div>
                    </div>
                    <div className="glass rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
                        <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="font-medium">UPI</div>
                    </div>
                    <div className="glass rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
                        <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="font-medium">Net Banking</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
