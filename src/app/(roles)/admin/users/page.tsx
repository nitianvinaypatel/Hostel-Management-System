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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            User Management 👥
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Manage all system users ({pagination.total} total)
                        </p>
                    </div>
                    <Link href="/admin/users/add">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                            <Plus className="h-4 w-4 mr-2" />
                            Add User
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <Input
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        />
                    </div>
                    <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-md">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">All Roles</option>
                        <option value="student">Students</option>
                        <option value="caretaker">Caretakers</option>
                        <option value="warden">Wardens</option>
                        <option value="dean">Deans</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Last Login</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertCircle className="h-12 w-12 text-muted-foreground opacity-20" />
                                            <p className="text-muted-foreground">No users found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 transition-all duration-200">
                                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">{user.name}</td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">{user.email}</td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">{user.phone || user.phoneNumber || '-'}</td>
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 capitalize">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.isActive ? (
                                                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/50 flex items-center gap-1 w-fit">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/50">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">
                                            {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors group" title="Edit user">
                                                    <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                                </button>
                                                <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group" title={user.isActive ? 'Deactivate' : 'Activate'}>
                                                    {user.isActive ? (
                                                        <UserX className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                                                    ) : (
                                                        <UserCheck className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                                                    )}
                                                </button>
                                                <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group" title="Delete user">
                                                    <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
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
                    <div className="flex justify-center items-center gap-3 p-6 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button
                            variant="outline"
                            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                            disabled={pagination.page === 1}
                            className="bg-white/80 dark:bg-gray-800/80"
                        >
                            Previous
                        </Button>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                            Page {pagination.page} of {pagination.pages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                            disabled={pagination.page === pagination.pages}
                            className="bg-white/80 dark:bg-gray-800/80"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
