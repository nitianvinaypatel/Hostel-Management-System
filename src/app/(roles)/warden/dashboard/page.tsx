'use client'

import { Card } from "@/components/ui/card"
import { Users, DoorOpen, AlertCircle, ClipboardList, TrendingUp, DollarSign, Utensils, MessageSquare } from "lucide-react"

export default function WardenDashboard() {
    const stats = [
        { title: "Total Students", value: "210", icon: Users, change: "+5", trend: "up" },
        { title: "Occupancy Rate", value: "87.5%", icon: DoorOpen, change: "+2%", trend: "up" },
        { title: "Pending Approvals", value: "12", icon: ClipboardList, change: "-3", trend: "down" },
        { title: "Active Complaints", value: "8", icon: AlertCircle, change: "-5", trend: "down" },
        { title: "Pending Requisitions", value: "5", icon: ClipboardList, change: "+2", trend: "up" },
        { title: "Outstanding Payments", value: "₹2.4L", icon: DollarSign, change: "-₹50K", trend: "down" },
    ]

    const recentActivities = [
        { action: "Room allotment approved", student: "John Doe", time: "10 mins ago", type: "approval" },
        { action: "Complaint forwarded", student: "Jane Smith", time: "25 mins ago", type: "complaint" },
        { action: "Requisition approved", caretaker: "Mike Johnson", time: "1 hour ago", type: "requisition" },
        { action: "Announcement sent", message: "Mess timing change", time: "2 hours ago", type: "announcement" },
    ]

    const pendingApprovals = [
        { type: "Room Allotment", student: "Sarah Williams", submitted: "2024-01-15" },
        { type: "Hostel Change", student: "Robert Brown", submitted: "2024-01-15" },
        { type: "Complaint", student: "Emily Davis", submitted: "2024-01-14" },
    ]

    const messRatings = {
        overall: 4.2,
        breakfast: 4.5,
        lunch: 4.0,
        dinner: 4.1,
        totalFeedback: 156
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Warden Dashboard</h1>
                <p className="text-muted-foreground">Hostel A - Boys Hostel</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} from last week
                                </p>
                            </div>
                            <stat.icon className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex justify-between items-start border-b pb-3 last:border-0">
                                <div>
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {activity.student || activity.caretaker || activity.message}
                                    </p>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Pending Approvals</h3>
                    <div className="space-y-3">
                        {pendingApprovals.map((approval, index) => (
                            <div key={index} className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                            {approval.type}
                                        </span>
                                        <p className="font-medium mt-2">{approval.student}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Submitted: {new Date(approval.submitted).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Utensils className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Mess Ratings</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Overall Rating</span>
                            <span className="text-2xl font-bold text-primary">★ {messRatings.overall}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground">Breakfast</p>
                                <p className="text-lg font-semibold">★ {messRatings.breakfast}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground">Lunch</p>
                                <p className="text-lg font-semibold">★ {messRatings.lunch}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground">Dinner</p>
                                <p className="text-lg font-semibold">★ {messRatings.dinner}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center pt-2">
                            Based on {messRatings.totalFeedback} feedback responses
                        </p>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Quick Actions</h3>
                    </div>
                    <div className="grid gap-3">
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            Review Pending Approvals
                        </button>
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            Send Announcement
                        </button>
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            View Complaints
                        </button>
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            Generate Report
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
