'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Send, MessageCircle } from "lucide-react"

export default function DeanFeedback() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
    const [feedback, setFeedback] = useState("")

    const issues = [
        {
            id: "ISS001",
            type: "requisition",
            issueId: "REQ-2024-045",
            title: "Electrical Wiring Upgrade - Block A",
            hostel: "Hostel A",
            submittedBy: "Warden - Jane Smith",
            submittedAt: "2024-01-15",
            status: "pending-review",
            priority: "high"
        },
        {
            id: "ISS002",
            type: "complaint",
            issueId: "COMP-2024-123",
            title: "Recurring Water Leakage Issue",
            hostel: "Hostel C",
            submittedBy: "Student - John Doe",
            submittedAt: "2024-01-14",
            status: "escalated",
            priority: "high"
        },
        {
            id: "ISS003",
            type: "report",
            issueId: "REP-2024-Q1",
            title: "Q1 Financial Report - Budget Overrun",
            hostel: "Hostel B",
            submittedBy: "Warden - Mary Johnson",
            submittedAt: "2024-01-12",
            status: "needs-feedback",
            priority: "medium"
        },
    ]

    const recentFeedback = [
        {
            id: "1",
            issueType: "requisition",
            issueId: "REQ-2024-044",
            title: "Cleaning Supplies Purchase",
            comment: "Approved. Please ensure proper documentation of expenses.",
            feedback: "Good planning. Consider bulk purchase for better rates next time.",
            priority: "low",
            createdAt: "2024-01-13 10:30"
        },
        {
            id: "2",
            issueType: "complaint",
            issueId: "COMP-2024-120",
            title: "Mess Food Quality",
            comment: "Immediate action required. Conduct quality audit.",
            feedback: "This is a recurring issue. Warden should implement stricter quality checks.",
            priority: "high",
            createdAt: "2024-01-12 14:20"
        },
    ]

    const filteredIssues = issues.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.issueId.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmitFeedback = (issueId: string) => {
        console.log("Submitting feedback for:", issueId, feedback)
        setFeedback("")
        setSelectedIssue(null)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Feedback & Comments</h1>
                <p className="text-muted-foreground">Provide feedback on major issues and requisitions</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Issues Requiring Feedback</h3>

                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search issues..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {filteredIssues.map((issue) => (
                            <Card
                                key={issue.id}
                                className={`p-4 cursor-pointer hover:bg-accent/50 ${selectedIssue === issue.id ? 'border-primary border-2' : ''}`}
                                onClick={() => setSelectedIssue(issue.id)}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-xs font-semibold">{issue.issueId}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${issue.type === 'requisition' ? 'bg-blue-100 text-blue-800' :
                                                issue.type === 'complaint' ? 'bg-red-100 text-red-800' :
                                                    'bg-green-100 text-green-800'}`}>
                                                {issue.type}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                                {issue.priority}
                                            </span>
                                        </div>
                                        <p className="font-medium text-sm mb-1">{issue.title}</p>
                                        <p className="text-xs text-muted-foreground">{issue.hostel}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {issue.submittedBy} • {new Date(issue.submittedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    {selectedIssue ? (
                        <>
                            <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm font-semibold mb-2">
                                        {issues.find(i => i.id === selectedIssue)?.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {issues.find(i => i.id === selectedIssue)?.issueId} • {issues.find(i => i.id === selectedIssue)?.hostel}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority Level</Label>
                                    <select id="priority" className="w-full px-3 py-2 border rounded-md">
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="feedback">Your Feedback / Comments</Label>
                                    <textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Provide detailed feedback or comments..."
                                        className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                                    />
                                </div>

                                <Button className="w-full" onClick={() => handleSubmitFeedback(selectedIssue)}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit Feedback
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                            <div className="text-center">
                                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Select an issue to provide feedback</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
                <div className="space-y-3">
                    {recentFeedback.map((item) => (
                        <Card key={item.id} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs font-semibold">{item.issueId}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${item.issueType === 'requisition' ? 'bg-blue-100 text-blue-800' :
                                            item.issueType === 'complaint' ? 'bg-red-100 text-red-800' :
                                                'bg-green-100 text-green-800'}`}>
                                            {item.issueType}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'}`}>
                                            {item.priority}
                                        </span>
                                    </div>
                                    <p className="font-medium text-sm mb-2">{item.title}</p>
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-2">
                                        <p className="text-xs font-semibold text-blue-800 mb-1">Comment:</p>
                                        <p className="text-sm text-blue-900">{item.comment}</p>
                                    </div>
                                    <div className="p-3 bg-green-50 border border-green-200 rounded mb-2">
                                        <p className="text-xs font-semibold text-green-800 mb-1">Feedback:</p>
                                        <p className="text-sm text-green-900">{item.feedback}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
