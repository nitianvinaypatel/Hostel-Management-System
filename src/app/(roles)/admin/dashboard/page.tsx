'use client'

import { Card } from "@/components/ui/card"
import { Users, Building2, ClipboardList, AlertCircle, TrendingUp, DollarSign } from "lucide-react"

export default function AdminDashboard() {
    const stats = [
        { title: "Total Users", value: "1,234", icon: Users, change: "+12%", trend: "up" },
        { title: "Active Hostels", value: "12", icon: Building2, change: "+2", trend: "up" },
        { title: "Pending Requisitions", value: "45", icon: ClipboardList, change: "-8%", trend: "down" },
        { title: "Active Complaints", value: "23", icon: AlertCircle, change: "-15%", trend: "down" },
        { title: "Occupancy Rate", value: "87%", icon: TrendingUp, change: "+5%", trend: "up" },
        { title: "Monthly Revenue", value: "₹12.5L", icon: DollarSign, change: "+18%", trend: "up" },
    ]

    const recentActivities = [
        { action: "New student registered", user: "John Doe", time: "5 mins ago" },
        { action: "Requisition approved", user: "Jane Smith", time: "15 mins ago" },
        { action: "Complaint resolved", user: "Mike Johnson", time: "1 hour ago" },
        { action: "Fee payment received", user: "Sarah Williams", time: "2 hours ago" },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">System-wide overview and management</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} from last month
                                </p>
                            </div>
                            <stat.icon className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex justify-between items-start border-b pb-3 last:border-0">
                                <div>
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid gap-3">
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            Add New User
                        </button>
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            Create Hostel
                        </button>
                        <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                            Send Notification
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
