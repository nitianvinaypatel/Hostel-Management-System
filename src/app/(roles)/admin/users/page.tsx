'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { adminService } from "@/services/admin.service"
import type { UserManagement } from "@/types/admin"
import { formatDate } from "@/utils/formatDate"

export default function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")
    const [users, setUsers] = useState<UserManagement[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 })

    useEffect(() => {
        loadUsers()
    }, [filterRole, pagination.page])

    const loadUsers = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await adminService.getUsers({
                role: filterRole === "all" ? undefined : filterRole,
                page: pagination.page,
                limit: 20,
                search: searchTerm
            })
            setUsers(response.data)
            if (response.pagination) {
                setPagination(response.pagination)
            }
        } catch (err) {
            setError('Failed to load users')
            console.error('Users error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        setPagination({ ...pagination, page: 1 })
        loadUsers()
    }

    const filteredUsers = users.filter(user => {
        if (!searchTerm) return true
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">{error}</p>
                <Button onClick={loadUsers}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage all system users ({pagination.total} total)</p>
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-10"
                        />
                    </div>
                    <Button onClick={handleSearch} variant="outline">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
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
                                <th className="text-left py-3 px-4">Phone</th>
                                <th className="text-left py-3 px-4">Role</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-left py-3 px-4">Last Login</th>
                                <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-accent/50">
                                        <td className="py-3 px-4 font-medium">{user.name}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{user.phone || user.phoneNumber || '-'}</td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-muted-foreground">
                                            {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 hover:bg-accent rounded" title="Edit user">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 hover:bg-accent rounded" title={user.isActive ? 'Deactivate' : 'Activate'}>
                                                    {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                                </button>
                                                <button className="p-2 hover:bg-accent rounded text-red-600" title="Delete user">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination.pages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                            disabled={pagination.page === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {pagination.page} of {pagination.pages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                            disabled={pagination.page === pagination.pages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    )
}
