'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    TrendingUp,
    AlertTriangle,
    Users,
    Building,
    ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function DeanDashboard() {
    const stats = {
        pendingRequisitions: 3,
        approvedThisMonth: 12,
        rejectedThisMonth: 2,
        totalBudget: 4500000,
        budgetSpent: 3200000,
        budgetUtilization: 71.1,
        urgentRequisitions: 1,
        totalHostels: 4
    }

    const recentRequisitions = [
        {
            id: "REQ047",
            requisitionNumber: "REQ-2024-047",
            hostel: "Hostel C",
            title: "Emergency Plumbing Repair",
            estimatedCost: 35000,
            urgency: "urgent",
            submittedAt: "2024-01-13"
        },
        {
            id: "REQ045",
            requisitionNumber: "REQ-2024-045",
            hostel: "Hostel A",
            title: "Electrical Wiring Upgrade - Block A",
            estimatedCost: 85000,
            urgency: "high",
            submittedAt: "2024-01-10"
        },
        {
            id: "REQ046",
            requisitionNumber: "REQ-2024-046",
            hostel: "Hostel B",
            title: "Water Purifier Installation",
            estimatedCost: 45000,
            urgency: "medium",
            submittedAt: "2024-01-12"
        }
    ]

    const hostelOverview = [
        { hostel: "Hostel A", budget: 500000, spent: 385000, pending: 2 },
        { hostel: "Hostel B", budget: 450000, spent: 320000, pending: 1 },
        { hostel: "Hostel C", budget: 400000, spent: 280000, pending: 1 },
        { hostel: "Hostel D", budget: 550000, spent: 425000, pending: 0 }
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dean Dashboard</h1>
                <p className="text-muted-foreground">High-level oversight and management</p>
            </div>

            {stats.urgentRequisitions > 0 && (
                <Card className="p-4 border-red-300 border-2 bg-red-50">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <div className="flex-1">
                            <p className="font-semibold text-red-900">
                                {stats.urgentRequisitions} Urgent Requisition{stats.urgentRequisitions > 1 ? 's' : ''} Awaiting Approval
                            </p>
                            <p className="text-sm text-red-700">Immediate attention required</p>
                        </div>
                        <Link href="/dean/requisitions/pending">
                            <Button variant="destructive">
                                Review Now
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Clock className="h-8 w-8 text-orange-600" />
                        <span className="text-3xl font-bold">{stats.pendingRequisitions}</span>
                    </div>
                    <p className="text-sm font-medium">Pending Approval</p>
                    <p className="text-xs text-muted-foreground">Awaiting your decision</p>
                    <Link href="/dean/requisitions/pending">
                        <Button variant="link" className="px-0 mt-2">
                            View All <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <span className="text-3xl font-bold">{stats.approvedThisMonth}</span>
                    </div>
                    <p className="text-sm font-medium">Approved This Month</p>
                    <p className="text-xs text-muted-foreground">Successfully processed</p>
                    <Link href="/dean/requisitions/approved">
                        <Button variant="link" className="px-0 mt-2">
                            View All <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <XCircle className="h-8 w-8 text-red-600" />
                        <span className="text-3xl font-bold">{stats.rejectedThisMonth}</span>
                    </div>
                    <p className="text-sm font-medium">Rejected This Month</p>
                    <p className="text-xs text-muted-foreground">Not approved</p>
                    <Link href="/dean/requisitions/rejected">
                        <Button variant="link" className="px-0 mt-2">
                            View All <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Building className="h-8 w-8 text-blue-600" />
                        <span className="text-3xl font-bold">{stats.totalHostels}</span>
                    </div>
                    <p className="text-sm font-medium">Total Hostels</p>
                    <p className="text-xs text-muted-foreground">Under management</p>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Budget Overview</h3>
                        <Link href="/dean/funds/usage">
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
                                <p className="text-2xl font-bold">₹{(stats.totalBudget / 100000).toFixed(1)}L</p>
                            </div>
                            <div className="p-4 border rounded-lg bg-orange-50">
                                <p className="text-xs text-muted-foreground mb-1">Spent</p>
                                <p className="text-2xl font-bold text-orange-600">₹{(stats.budgetSpent / 100000).toFixed(1)}L</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Budget Utilization</span>
                                <span className="text-sm font-bold text-primary">{stats.budgetUtilization}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full ${stats.budgetUtilization > 90 ? 'bg-red-500' :
                                        stats.budgetUtilization > 75 ? 'bg-orange-500' :
                                            'bg-green-500'}`}
                                    style={{ width: `${stats.budgetUtilization}%` }}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-muted-foreground">
                                    Available: <span className="font-bold text-green-600">₹{((stats.totalBudget - stats.budgetSpent) / 100000).toFixed(1)}L</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Hostel Budget Status</h3>
                        <Link href="/dean/funds/budget">
                            <Button variant="outline" size="sm">
                                Manage Budget
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {hostelOverview.map((hostel) => {
                            const utilization = ((hostel.spent / hostel.budget) * 100).toFixed(1)
                            return (
                                <div key={hostel.hostel} className="p-3 border rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">{hostel.hostel}</span>
                                        <div className="flex items-center gap-2">
                                            {hostel.pending > 0 && (
                                                <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs">
                                                    {hostel.pending} pending
                                                </span>
                                            )}
                                            <span className="text-sm font-semibold">{utilization}%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                        <span>₹{(hostel.spent / 1000).toFixed(0)}K spent</span>
                                        <span>₹{(hostel.budget / 1000).toFixed(0)}K total</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${parseFloat(utilization) > 90 ? 'bg-red-500' :
                                                parseFloat(utilization) > 75 ? 'bg-orange-500' :
                                                    'bg-green-500'}`}
                                            style={{ width: `${utilization}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Requisitions Awaiting Approval</h3>
                    <Link href="/dean/requisitions/pending">
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentRequisitions.map((req) => (
                        <Card key={req.id} className={`p-4 ${req.urgency === 'urgent' ? 'border-red-300 border-2' : ''}`}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-mono text-xs font-semibold">{req.requisitionNumber}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${req.urgency === 'urgent' ? 'bg-red-100 text-red-800' :
                                            req.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                            {req.urgency}
                                        </span>
                                        {req.urgency === 'urgent' && (
                                            <AlertTriangle className="h-4 w-4 text-red-600" />
                                        )}
                                    </div>
                                    <p className="font-medium mb-1">{req.title}</p>
                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span>{req.hostel}</span>
                                        <span>₹{req.estimatedCost.toLocaleString()}</span>
                                        <span>{new Date(req.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href="/dean/requisitions/pending">
                                    <Button size="sm">
                                        Review
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/dean/reports/financial">
                    <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
                        <FileText className="h-8 w-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-1">Financial Reports</h3>
                        <p className="text-sm text-muted-foreground">View comprehensive financial summaries</p>
                    </Card>
                </Link>

                <Link href="/dean/announcements">
                    <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
                        <Users className="h-8 w-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-1">Announcements</h3>
                        <p className="text-sm text-muted-foreground">Send notices to hostels and staff</p>
                    </Card>
                </Link>

                <Link href="/dean/feedback">
                    <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
                        <DollarSign className="h-8 w-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-1">Feedback & Comments</h3>
                        <p className="text-sm text-muted-foreground">Provide feedback on major issues</p>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
