'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

export default function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")

    const users = [
        { id: "1", name: "John Doe", email: "john@example.com", role: "student", hostel: "Hostel A", status: "active" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", role: "warden", hostel: "Hostel B", status: "active" },
        { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "caretaker", hostel: "Hostel A", status: "active" },
        { id: "4", name: "Dr. Robert Brown", email: "robert@example.com", role: "dean", hostel: "-", status: "active" },
        { id: "5", name: "Sarah Williams", email: "sarah@example.com", role: "student", hostel: "Hostel C", status: "inactive" },
    ]

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = filterRole === "all" || user.role === filterRole
        return matchesSearch && matchesRole
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage all system users</p>
                </div>
                <Link href="/admin/users/add">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                </Link>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="all">All Roles</option>
                        <option value="student">Students</option>
                        <option value="caretaker">Caretakers</option>
                        <option value="warden">Wardens</option>
                        <option value="dean">Deans</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Name</th>
                                <th className="text-left py-3 px-4">Email</th>
                                <th className="text-left py-3 px-4">Role</th>
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-accent/50">
                                    <td className="py-3 px-4 font-medium">{user.name}</td>
                                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{user.hostel}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-accent rounded">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-accent rounded">
                                                {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                            </button>
                                            <button className="p-2 hover:bg-accent rounded text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
