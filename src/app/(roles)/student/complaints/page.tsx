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
        <div className="space-y-6 animate-in fade-in duration-500">
            <BackButton />
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                            <MessageSquare className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Complaints
                            </h1>
                            <p className="text-muted-foreground mt-1 text-lg">Track and manage your complaints</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className={`h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${showForm
                            ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-red-500/30'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/30'
                            }`}
                    >
                        {showForm ? (
                            <>
                                <X className="h-5 w-5" />
                                Cancel
                            </>
                        ) : (
                            <>
                                <Plus className="h-5 w-5" />
                                New Complaint
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        Submit New Complaint
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                Complaint Title *
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Brief title of your complaint"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                                    <Tag className="h-4 w-4 text-white" />
                                </div>
                                Category *
                            </Label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-pink-500 dark:focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
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

                        <div className="space-y-3">
                            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                    <MessageSquare className="h-4 w-4 text-white" />
                                </div>
                                Description *
                            </Label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Provide detailed description of your complaint"
                                className="flex min-h-[140px] w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3 text-sm font-medium focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-base shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Submit Complaint
                        </Button>
                    </form>
                </div>
            )}

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    My Complaints
                </h2>
                <div className="space-y-4">
                    {complaints.map((complaint) => (
                        <div key={complaint.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 transition-all duration-300">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{complaint.title}</h3>
                                        <span
                                            className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-md ${getStatusColor(
                                                complaint.status
                                            )}`}
                                        >
                                            {getStatusIcon(complaint.status)}
                                            {complaint.status.replace("-", " ").toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{complaint.description}</p>
                                    <div className="flex items-center gap-4 text-xs font-medium">
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                            <FileText className="h-3.5 w-3.5" />
                                            ID: {complaint.id}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                            <Tag className="h-3.5 w-3.5" />
                                            {complaint.category}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                                            <Clock className="h-3.5 w-3.5" />
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
