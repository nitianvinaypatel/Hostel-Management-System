"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/common/back-button"
import {
    MessageSquare,
    Plus,
    X,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader,
    FileText,
    Tag,
} from "lucide-react"

type Complaint = {
    id: string
    title: string
    category: string
    status: "pending" | "in-progress" | "resolved"
    date: string
    description: string
}

export default function StudentComplaints() {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    })

    const complaints: Complaint[] = [
        {
            id: "C001",
            title: "Water Supply Issue",
            category: "Maintenance",
            status: "in-progress",
            date: "2024-10-10",
            description: "No water supply in room 204 since morning",
        },
        {
            id: "C002",
            title: "AC Not Working",
            category: "Electrical",
            status: "pending",
            date: "2024-10-12",
            description: "Air conditioner stopped working",
        },
        {
            id: "C003",
            title: "Broken Window",
            category: "Maintenance",
            status: "resolved",
            date: "2024-10-05",
            description: "Window glass cracked in common room",
        },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Complaint submitted:", formData)
        setShowForm(false)
        setFormData({ title: "", category: "", description: "" })
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />
            case "in-progress":
                return <Loader className="h-4 w-4" />
            case "resolved":
                return <CheckCircle className="h-4 w-4" />
            default:
                return <AlertCircle className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/10 text-yellow-500"
            case "in-progress":
                return "bg-blue-500/10 text-blue-500"
            case "resolved":
                return "bg-green-500/10 text-green-500"
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
                        <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Complaints</h1>
                        <p className="text-muted-foreground mt-1">Track and manage your complaints</p>
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
                            New Complaint
                        </>
                    )}
                </Button>
            </div>

            {showForm && (
                <div className="glass rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Submit New Complaint
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Complaint Title *
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Brief title of your complaint"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Category *
                            </Label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="electrical">Electrical</option>
                                <option value="plumbing">Plumbing</option>
                                <option value="cleanliness">Cleanliness</option>
                                <option value="security">Security</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Description *
                            </Label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Provide detailed description of your complaint"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Submit Complaint
                        </Button>
                    </form>
                </div>
            )}

            <div className="glass rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Complaints
                </h2>
                <div className="space-y-4">
                    {complaints.map((complaint) => (
                        <div key={complaint.id} className="glass rounded-lg p-4 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold">{complaint.title}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(
                                                complaint.status
                                            )}`}
                                        >
                                            {getStatusIcon(complaint.status)}
                                            {complaint.status.replace("-", " ")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{complaint.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            ID: {complaint.id}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Tag className="h-3 w-3" />
                                            {complaint.category}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(complaint.date).toLocaleDateString()}
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
