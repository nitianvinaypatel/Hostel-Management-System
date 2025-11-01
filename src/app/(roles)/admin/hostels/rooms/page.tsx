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
import { DoorOpen, Plus, Bed, Users, Loader2, AlertCircle, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
    useGetAllRoomsQuery,
    useGetAllHostelsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation
} from '@/store/api/adminApi'
import { createColumns, Room } from "./columns"
import { DataTable } from "./data-table"
import { toast } from "sonner"

export default function RoomsBlocks() {
    const [selectedHostel, setSelectedHostel] = useState("all")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [globalFilter, setGlobalFilter] = useState("")

    const [formData, setFormData] = useState({
        roomNumber: "",
        hostelId: "",
        floor: 1,
        capacity: 2,
        roomType: "double" as "single" | "double" | "triple" | "quad",
        facilities: [] as string[],
        monthlyRent: 5000
    })

    const [editFormData, setEditFormData] = useState({
        capacity: 2,
        facilities: [] as string[],
        monthlyRent: 5000,
        status: "available" as "available" | "occupied" | "maintenance" | "reserved"
    })

    const [facilitiesInput, setFacilitiesInput] = useState("")
    const [editFacilitiesInput, setEditFacilitiesInput] = useState("")

    // Redux API hooks
    const { data: roomsResponse, isLoading: roomsLoading, error: roomsError, refetch } = useGetAllRoomsQuery({
        hostelId: selectedHostel === "all" ? undefined : selectedHostel,
        page: 1,
        limit: 1000 // Get all for client-side pagination
    })

    const { data: hostelsResponse, isLoading: hostelsLoading } = useGetAllHostelsQuery({})

    const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation()
    const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation()
    const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation()

    const rooms = roomsResponse?.data || []
    const hostels = hostelsResponse?.data || []

    // Add hostel names to rooms
    const roomsWithHostelNames = rooms.map(room => {
        // Check if hostel is already populated (object) or just an ID (string)
        let hostelName = 'N/A'

        if (typeof room.hostelId === 'object' && room.hostelId !== null) {
            // Hostel is populated as an object
            hostelName = (room.hostelId as any).name || 'N/A'
        } else {
            // Hostel is just an ID, find it in the hostels array
            const foundHostel = hostels.find(h => h._id === room.hostelId)
            hostelName = foundHostel?.name || 'N/A'
        }

        return {
            ...room,
            hostelName
        }
    })

    const totalRooms = rooms.length
    const occupiedRooms = rooms.filter(r => r.status === "occupied").length
    const availableRooms = rooms.filter(r => r.status === "available").length

    const handleAddRoom = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const facilities = facilitiesInput.split(',').map(f => f.trim()).filter(f => f)
            await createRoom({
                ...formData,
                facilities
            }).unwrap()

            toast.success('Room created successfully!')
            setDialogOpen(false)
            setFormData({
                roomNumber: "",
                hostelId: "",
                floor: 1,
                capacity: 2,
                roomType: "double",
                facilities: [],
                monthlyRent: 5000
            })
            setFacilitiesInput("")
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create room')
        }
    }

    const handleEditClick = (room: Room) => {
        setSelectedRoom(room)
        setEditFormData({
            capacity: room.capacity,
            facilities: room.facilities || [],
            monthlyRent: room.monthlyRent,
            status: room.status
        })
        setEditFacilitiesInput((room.facilities || []).join(', '))
        setEditDialogOpen(true)
    }

    const handleEditRoom = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedRoom) return

        try {
            const facilities = editFacilitiesInput.split(',').map(f => f.trim()).filter(f => f)
            await updateRoom({
                roomId: selectedRoom._id,
                data: {
                    ...editFormData,
                    facilities
                }
            }).unwrap()

            toast.success('Room updated successfully!')
            setEditDialogOpen(false)
            setSelectedRoom(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update room')
        }
    }

    const handleDeleteClick = (room: Room) => {
        setSelectedRoom(room)
        setDeleteDialogOpen(true)
    }

    const handleDeleteRoom = async () => {
        if (!selectedRoom) return

        try {
            await deleteRoom(selectedRoom._id).unwrap()
            toast.success('Room deleted successfully!')
            setDeleteDialogOpen(false)
            setSelectedRoom(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to delete room')
        }
    }

    const columns = createColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick
    })

    if (roomsLoading || hostelsLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (roomsError) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">Failed to load rooms</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/hostels">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    Rooms
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Manage room allocations
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search rooms..."
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            {/* Hostel Filter */}
                            <select
                                value={selectedHostel}
                                onChange={(e) => setSelectedHostel(e.target.value)}
                                className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="all">All Hostels</option>
                                {hostels.map((hostel) => (
                                    <option key={hostel._id} value={hostel._id}>
                                        {hostel.name}
                                    </option>
                                ))}
                            </select>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Room
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Add New Room</DialogTitle>
                                        <DialogDescription>
                                            Create a new room. Fill in all required fields.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddRoom}>
                                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                            <div className="grid gap-2">
                                                <Label htmlFor="roomNumber">Room Number *</Label>
                                                <Input
                                                    id="roomNumber"
                                                    value={formData.roomNumber}
                                                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                                                    placeholder="101"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="hostelId">Hostel *</Label>
                                                <select
                                                    id="hostelId"
                                                    value={formData.hostelId}
                                                    onChange={(e) => setFormData({ ...formData, hostelId: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                >
                                                    <option value="">Select Hostel</option>
                                                    {hostels.map((hostel) => (
                                                        <option key={hostel._id} value={hostel._id}>
                                                            {hostel.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="floor">Floor *</Label>
                                                <Input
                                                    id="floor"
                                                    type="number"
                                                    value={formData.floor}
                                                    onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="roomType">Room Type *</Label>
                                                <select
                                                    id="roomType"
                                                    value={formData.roomType}
                                                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value as any })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                >
                                                    <option value="single">Single</option>
                                                    <option value="double">Double</option>
                                                    <option value="triple">Triple</option>
                                                    <option value="quad">Quad</option>
                                                </select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="capacity">Capacity *</Label>
                                                <Input
                                                    id="capacity"
                                                    type="number"
                                                    value={formData.capacity}
                                                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                                                <Input
                                                    id="monthlyRent"
                                                    type="number"
                                                    value={formData.monthlyRent}
                                                    onChange={(e) => setFormData({ ...formData, monthlyRent: parseInt(e.target.value) })}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="facilities">Facilities (comma-separated)</Label>
                                                <Input
                                                    id="facilities"
                                                    value={facilitiesInput}
                                                    onChange={(e) => setFacilitiesInput(e.target.value)}
                                                    placeholder="AC, WiFi, Attached Bathroom"
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
                                                        Create Room
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
                            <DoorOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{totalRooms}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <Bed className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{occupiedRooms}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Available</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{availableRooms}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={roomsWithHostelNames}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />

            {/* Edit Room Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Room</DialogTitle>
                        <DialogDescription>
                            Update room information. Room number and hostel cannot be changed.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditRoom}>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-capacity">Capacity *</Label>
                                <Input
                                    id="edit-capacity"
                                    type="number"
                                    value={editFormData.capacity}
                                    onChange={(e) => setEditFormData({ ...editFormData, capacity: parseInt(e.target.value) })}
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-monthlyRent">Monthly Rent *</Label>
                                <Input
                                    id="edit-monthlyRent"
                                    type="number"
                                    value={editFormData.monthlyRent}
                                    onChange={(e) => setEditFormData({ ...editFormData, monthlyRent: parseInt(e.target.value) })}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-status">Status *</Label>
                                <select
                                    id="edit-status"
                                    value={editFormData.status}
                                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="available">Available</option>
                                    <option value="occupied">Occupied</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="reserved">Reserved</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-facilities">Facilities (comma-separated)</Label>
                                <Input
                                    id="edit-facilities"
                                    value={editFacilitiesInput}
                                    onChange={(e) => setEditFacilitiesInput(e.target.value)}
                                    placeholder="AC, WiFi, Attached Bathroom"
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
                                    'Update Room'
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
                        <DialogTitle>Delete Room</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete room {selectedRoom?.roomNumber}? This action cannot be undone.
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
                            onClick={handleDeleteRoom}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete Room'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
