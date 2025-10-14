"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/common/back-button"
import {
    FileText,
    Plus,
    X,
    Clock,
    CheckCircle,
    XCircle,
    Tag,
    Calendar,
} from "lucide-react"

type Request = {
    id: string
    type: string
    subject: string
    status: "pending" | "approved" | "rejected"
    date: string
    description: string
}

export default function StudentRequests() {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        type: "",
        subject: "",
        description: "",
    })

    const requests: Request[] = [
        {
            id: "R001",
            type: "Leave Request",
            subject: "Home Visit",
            status: "approved",
            date: "2024-10-08",
            description: "Request for 3 days leave to visit home",
        },
        {
            id: "R002",
            type: "Room Change",
            subject: "Room Transfer Request",
            status: "pending",
            date: "2024-10-12",
            description: "Request to change room from 204 to 305",
        },
        {
            id: "R003",
            type: "Guest Entry",
            subject: "Parent Visit",
            status: "approved",
            date: "2024-10-10",
            description: "Guest entry pass for parents visit",
        },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Request submitted:", formData)
        setShowForm(false)
        setFormData({ type: "", subject: "", description: "" })
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />
            case "approved":
                return <CheckCircle className="h-4 w-4" />
            case "rejected":
                return <XCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/10 text-yellow-500"
            case "approved":
                return "bg-green-500/10 text-green-500"
            case "rejected":
                return "bg-red-500/10 text-red-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="glass rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Requests</h1>
                        <p className="text-muted-foreground mt-1">Submit and track your requests</p>
                    </div>
                </div>
                <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
                    {showForm ? (
                        <>
                            <X className="h-4 w-4" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4" />
                            New Request
                        </>
                    )}
                </Button>
            </div>

            {showForm && (
                <div className="glass rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Submit New Request
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Request Type *
                            </Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="leave">Leave Request</option>
                                <option value="room-change">Room Change</option>
                                <option value="guest-entry">Guest Entry</option>
                                <option value="facility">Facility Request</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Subject *
                            </Label>
                            <Input
                                id="subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Brief subject of your request"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Description *
                            </Label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Provide detailed description of your request"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Submit Request
                        </Button>
                    </form>
                </div>
            )}

            <div className="glass rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Requests
                </h2>
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div key={request.id} className="glass rounded-lg p-4 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold">{request.subject}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(
                                                request.status
                                            )}`}
                                        >
                                            {getStatusIcon(request.status)}
                                            {request.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            ID: {request.id}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Tag className="h-3 w-3" />
                                            {request.type}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(request.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
