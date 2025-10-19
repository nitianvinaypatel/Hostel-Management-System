'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function WardenReports() {
    const reportTypes = [
        {
            title: "Occupancy Report",
            description: "Current room and bed occupancy status",
            url: "/warden/reports/occupancy",
            lastGenerated: "2024-01-15"
        },
        {
            title: "Complaints Report",
            description: "Summary of complaints and resolution status",
            url: "/warden/reports/complaints",
            lastGenerated: "2024-01-15"
        },
        {
            title: "Requisitions Report",
            description: "Caretaker requisitions and approval status",
            url: "/warden/reports/requisitions",
            lastGenerated: "2024-01-14"
        },
        {
            title: "Payments Report",
            description: "Fee collection and outstanding payments",
            url: "/warden/reports/payments",
            lastGenerated: "2024-01-14"
        },
    ]

    const recentReports = [
        { id: "1", name: "Monthly Occupancy - December 2024", type: "Occupancy", date: "2024-12-31", size: "1.2 MB" },
        { id: "2", name: "Complaints Summary - December 2024", type: "Complaints", date: "2024-12-30", size: "0.8 MB" },
        { id: "3", name: "Requisitions - Q4 2024", type: "Requisitions", date: "2024-12-29", size: "0.6 MB" },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Reports</h1>
                <p className="text-muted-foreground">Generate and view hostel reports</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {reportTypes.map((report) => (
                    <Card key={report.title} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                                <p className="text-xs text-muted-foreground">
                                    Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={report.url} className="flex-1">
                                <Button variant="outline" className="w-full">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Report
                                </Button>
                            </Link>
                            <Button variant="default">
                                <Download className="h-4 w-4 mr-2" />
                                Generate
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
                <div className="space-y-3">
                    {recentReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{report.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {report.type} • {new Date(report.date).toLocaleDateString()} • {report.size}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
