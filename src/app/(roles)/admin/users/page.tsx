'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Loader2, AlertCircle, Edit, Trash2, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    useGetAllUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useToggleUserStatusMutation,
    useDeleteUserMutation
} from '@/store/api/adminApi'
import { createColumns, User } from "./columns"
import { DataTable } from "./data-table"
import { toast } from "sonner"

export default function AdminUsers() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [globalFilter, setGlobalFilter] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "student" as "student" | "caretaker" | "warden" | "dean" | "admin",
        hostelId: ""
    })

    const [editFormData, setEditFormData] = useState({
        name: "",
        phone: "",
        hostelId: ""
    })

    // Redux API hooks
    const { data: response, isLoading, error, refetch } = useGetAllUsersQuery({
        page: 1,
        limit: 1000 // Get all for client-side pagination
    })

    const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const [toggleStatus] = useToggleUserStatusMutation()
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

    const users = response?.data || []

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createUser(formData).unwrap()
            toast.success('User created successfully!')
            setDialogOpen(false)
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                role: "student",
                hostelId: ""
            })
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create user')
        }
    }

    const handleEditClick = (user: User) => {
        setSelectedUser(user)
        setEditFormData({
            name: user.name,
            phone: user.phone || user.phoneNumber || "",
            hostelId: ""
        })
        setEditDialogOpen(true)
    }

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedUser) return

        try {
            await updateUser({
                userId: selectedUser._id,
                data: editFormData
            }).unwrap()
            toast.success('User updated successfully!')
            setEditDialogOpen(false)
            setSelectedUser(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update user')
        }
    }

    const handleToggleStatus = async (user: User) => {
        try {
            await toggleStatus(user._id).unwrap()
            toast.success(`User ${user.isActive ? 'deactivated' : 'activated'} successfully!`)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to toggle user status')
        }
    }

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user)
        setDeleteDialogOpen(true)
    }

    const handleDeleteUser = async () => {
        if (!selectedUser) return

        try {
            await deleteUser(selectedUser._id).unwrap()
            toast.success('User deleted successfully!')
            setDeleteDialogOpen(false)
            setSelectedUser(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to delete user')
        }
    }

    const columns = createColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
        onToggleStatus: handleToggleStatus
    })

    if (isLoading) {
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
                <p className="text-lg text-muted-foreground">Failed to load users</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    User Management
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Manage all system users ({users.length} total)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search users..."
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add User
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Add New User</DialogTitle>
                                        <DialogDescription>
                                            Create a new user account. Fill in all required fields.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddUser}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="password">Password *</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    placeholder="••••••••"
                                                    required
                                                    minLength={6}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">Phone Number *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+1234567890"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="role">Role *</Label>
                                                <select
                                                    id="role"
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="caretaker">Caretaker</option>
                                                    <option value="warden">Warden</option>
                                                    <option value="dean">Dean</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="hostelId">Hostel ID (Optional)</Label>
                                                <Input
                                                    id="hostelId"
                                                    value={formData.hostelId}
                                                    onChange={(e) => setFormData({ ...formData, hostelId: e.target.value })}
                                                    placeholder="Leave empty if not applicable"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setDialogOpen(false)}
                                                disabled={isCreating}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isCreating}
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                            >
                                                {isCreating ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Create User
                                                    </>
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={users}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />

            {/* Edit User Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user information. Email and role cannot be changed.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditUser}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Full Name *</Label>
                                <Input
                                    id="edit-name"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-phone">Phone Number *</Label>
                                <Input
                                    id="edit-phone"
                                    type="tel"
                                    value={editFormData.phone}
                                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                    placeholder="+1234567890"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-hostelId">Hostel ID (Optional)</Label>
                                <Input
                                    id="edit-hostelId"
                                    value={editFormData.hostelId}
                                    onChange={(e) => setEditFormData({ ...editFormData, hostelId: e.target.value })}
                                    placeholder="Leave empty if not applicable"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditDialogOpen(false)}
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Update User
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteUser}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
