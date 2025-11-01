'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Plus, Edit, Trash2, Building2, Loader2, Users, Bed, AlertCircle, Search, ArrowLeft } from "lucide-react"
import {
    useGetAllHostelsQuery,
    useCreateHostelMutation,
    useUpdateHostelMutation,
    useDeleteHostelMutation
} from '@/store/api/adminApi'
import { createColumns, Hostel } from "./columns"
import { DataTable } from "./data-table"
import { toast } from "sonner"

export default function AdminHostels() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null)
    const [globalFilter, setGlobalFilter] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "boys" as "boys" | "girls" | "mixed",
        totalRooms: 0,
        totalCapacity: 0,
        facilities: [] as string[],
        address: "",
        contactNumber: ""
    })

    const [editFormData, setEditFormData] = useState({
        name: "",
        totalRooms: 0,
        totalCapacity: 0,
        facilities: [] as string[],
        address: "",
        contactNumber: ""
    })

    const [facilitiesInput, setFacilitiesInput] = useState("")
    const [editFacilitiesInput, setEditFacilitiesInput] = useState("")

    const { data: response, isLoading, error, refetch } = useGetAllHostelsQuery({})
    const [createHostel, { isLoading: isCreating }] = useCreateHostelMutation()
    const [updateHostel, { isLoading: isUpdating }] = useUpdateHostelMutation()
    const [deleteHostel, { isLoading: isDeleting }] = useDeleteHostelMutation()

    const hostels = response?.data || []

    const handleAddHostel = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const facilities = facilitiesInput.split(',').map(f => f.trim()).filter(f => f)
            await createHostel({
                ...formData,
                facilities
            }).unwrap()

            toast.success('Hostel created successfully!')
            setDialogOpen(false)
            setFormData({
                name: "",
                code: "",
                type: "boys",
                totalRooms: 0,
                totalCapacity: 0,
                facilities: [],
                address: "",
                contactNumber: ""
            })
            setFacilitiesInput("")
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create hostel')
        }
    }

    const handleEditClick = (hostel: Hostel) => {
        setSelectedHostel(hostel)
        setEditFormData({
            name: hostel.name,
            totalRooms: hostel.totalRooms,
            totalCapacity: hostel.totalCapacity,
            facilities: hostel.facilities || [],
            address: (hostel as any).address || "",
            contactNumber: (hostel as any).contactNumber || ""
        })
        setEditFacilitiesInput((hostel.facilities || []).join(', '))
        setEditDialogOpen(true)
    }

    const handleEditHostel = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedHostel) return

        try {
            const facilities = editFacilitiesInput.split(',').map(f => f.trim()).filter(f => f)
            await updateHostel({
                hostelId: selectedHostel._id,
                data: {
                    ...editFormData,
                    facilities
                }
            }).unwrap()

            toast.success('Hostel updated successfully!')
            setEditDialogOpen(false)
            setSelectedHostel(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update hostel')
        }
    }

    const handleDeleteClick = (hostel: Hostel) => {
        setSelectedHostel(hostel)
        setDeleteDialogOpen(true)
    }

    const handleDeleteHostel = async () => {
        if (!selectedHostel) return

        try {
            console.log('Deleting hostel:', selectedHostel._id)
            const result = await deleteHostel(selectedHostel._id).unwrap()
            console.log('Delete result:', result)
            toast.success('Hostel deleted successfully!')
            setDeleteDialogOpen(false)
            setSelectedHostel(null)
        } catch (err: any) {
            console.error('Delete error:', err)
            const errorMessage = err?.data?.message || err?.message || 'Failed to delete hostel'
            toast.error(errorMessage)
        }
    }

    const columns = createColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick
    })

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground animate-pulse">Loading hostels...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">Failed to load hostels</p>
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
                                    Hostel Management
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Manage all hostels ({hostels.length} total)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search hostels..."
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Hostel
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Add New Hostel</DialogTitle>
                                        <DialogDescription>
                                            Create a new hostel. Fill in all required fields.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddHostel}>
                                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Hostel Name *</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="North Wing Hostel"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="code">Hostel Code *</Label>
                                                <Input
                                                    id="code"
                                                    value={formData.code}
                                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                    placeholder="NWH"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="type">Type *</Label>
                                                <select
                                                    id="type"
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                >
                                                    <option value="boys">Boys</option>
                                                    <option value="girls">Girls</option>
                                                    <option value="mixed">Mixed</option>
                                                </select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="totalRooms">Total Rooms *</Label>
                                                <Input
                                                    id="totalRooms"
                                                    type="number"
                                                    value={formData.totalRooms}
                                                    onChange={(e) => setFormData({ ...formData, totalRooms: parseInt(e.target.value) })}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="totalCapacity">Total Capacity *</Label>
                                                <Input
                                                    id="totalCapacity"
                                                    type="number"
                                                    value={formData.totalCapacity}
                                                    onChange={(e) => setFormData({ ...formData, totalCapacity: parseInt(e.target.value) })}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="address">Address *</Label>
                                                <Input
                                                    id="address"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    placeholder="123 Campus Road"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="contactNumber">Contact Number *</Label>
                                                <Input
                                                    id="contactNumber"
                                                    type="tel"
                                                    value={formData.contactNumber}
                                                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                                    placeholder="+1234567890"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="facilities">Facilities (comma-separated)</Label>
                                                <Input
                                                    id="facilities"
                                                    value={facilitiesInput}
                                                    onChange={(e) => setFacilitiesInput(e.target.value)}
                                                    placeholder="WiFi, Gym, Laundry, Cafeteria"
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
                                                        Create Hostel
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

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Hostels</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{hostels.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Bed className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{hostels.reduce((acc, h) => acc + h.totalRooms, 0)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{hostels.reduce((acc, h) => acc + h.totalCapacity, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={hostels}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />

            {/* Edit Hostel Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Hostel</DialogTitle>
                        <DialogDescription>
                            Update hostel information. Code and type cannot be changed.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditHostel}>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Hostel Name *</Label>
                                <Input
                                    id="edit-name"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    placeholder="North Wing Hostel"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-totalRooms">Total Rooms *</Label>
                                <Input
                                    id="edit-totalRooms"
                                    type="number"
                                    value={editFormData.totalRooms}
                                    onChange={(e) => setEditFormData({ ...editFormData, totalRooms: parseInt(e.target.value) })}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-totalCapacity">Total Capacity *</Label>
                                <Input
                                    id="edit-totalCapacity"
                                    type="number"
                                    value={editFormData.totalCapacity}
                                    onChange={(e) => setEditFormData({ ...editFormData, totalCapacity: parseInt(e.target.value) })}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-address">Address</Label>
                                <Input
                                    id="edit-address"
                                    value={editFormData.address}
                                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                    placeholder="123 Campus Road"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-contactNumber">Contact Number</Label>
                                <Input
                                    id="edit-contactNumber"
                                    type="tel"
                                    value={editFormData.contactNumber}
                                    onChange={(e) => setEditFormData({ ...editFormData, contactNumber: e.target.value })}
                                    placeholder="+1234567890"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-facilities">Facilities (comma-separated)</Label>
                                <Input
                                    id="edit-facilities"
                                    value={editFacilitiesInput}
                                    onChange={(e) => setEditFacilitiesInput(e.target.value)}
                                    placeholder="WiFi, Gym, Laundry, Cafeteria"
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
                                        Update Hostel
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
                        <DialogTitle>Delete Hostel</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {selectedHostel?.name}? This action cannot be undone.
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
                            onClick={handleDeleteHostel}
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
                                    Delete Hostel
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
