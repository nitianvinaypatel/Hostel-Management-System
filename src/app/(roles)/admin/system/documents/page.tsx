'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Upload, Download, Eye, Trash2, FileText, File } from "lucide-react"

export default function DocumentArchives() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")

    const documents = [
        {
            id: "1",
            name: "Hostel Agreement Template 2024",
            category: "agreements",
            type: "PDF",
            size: "2.4 MB",
            uploadedAt: "2024-01-10",
            uploadedBy: "Admin User"
        },
        {
            id: "2",
            name: "Fee Structure Circular - Academic Year 2024-25",
            category: "circulars",
            type: "PDF",
            size: "1.2 MB",
            uploadedAt: "2024-01-08",
            uploadedBy: "Admin User"
        },
        {
            id: "3",
            name: "Hostel Rules and Regulations",
            category: "policies",
            type: "PDF",
            size: "3.1 MB",
            uploadedAt: "2024-01-05",
            uploadedBy: "Dean Office"
        },
        {
            id: "4",
            name: "Maintenance Contract - Electrical",
            category: "contracts",
            type: "PDF",
            size: "1.8 MB",
            uploadedAt: "2024-01-03",
            uploadedBy: "Admin User"
        },
        {
            id: "5",
            name: "Student Admission Form Template",
            category: "forms",
            type: "DOCX",
            size: "0.5 MB",
            uploadedAt: "2023-12-28",
            uploadedBy: "Admin User"
        },
    ]

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === "all" || doc.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const categories = [
        { value: "all", label: "All Documents" },
        { value: "agreements", label: "Agreements" },
        { value: "circulars", label: "Circulars" },
        { value: "policies", label: "Policies" },
        { value: "contracts", label: "Contracts" },
        { value: "forms", label: "Forms" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Document Archives</h1>
                    <p className="text-muted-foreground">Manage agreements, circulars, and other documents</p>
                </div>
                <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                </Button>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDocuments.map((doc) => (
                        <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    {doc.type === 'PDF' ? (
                                        <FileText className="h-5 w-5 text-primary" />
                                    ) : (
                                        <File className="h-5 w-5 text-primary" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm mb-1 truncate">{doc.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                            {doc.category}
                                        </span>
                                        <span>{doc.type}</span>
                                        <span>•</span>
                                        <span>{doc.size}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground mb-3">
                                <p>Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                                <p>By: {doc.uploadedBy}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="h-3 w-3 text-red-600" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Document Statistics</h3>
                <div className="grid gap-4 md:grid-cols-5">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
                        <p className="text-2xl font-bold">{documents.length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Agreements</p>
                        <p className="text-2xl font-bold">{documents.filter(d => d.category === 'agreements').length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Circulars</p>
                        <p className="text-2xl font-bold">{documents.filter(d => d.category === 'circulars').length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Policies</p>
                        <p className="text-2xl font-bold">{documents.filter(d => d.category === 'policies').length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Size</p>
                        <p className="text-2xl font-bold">9.0 MB</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
