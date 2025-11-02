'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Loader2, AlertCircle, Search, ArrowLeft, Building2, DoorOpen, Bed, Users } from "lucide-react"
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
    useGetCaretakerRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomStatsQuery
} from '@/store/api/caretakerApi'
import { createColumns, Room } from "./columns"
import { DataTable } from "./data-table"
import { toast } from "sonner"

export default function RoomManagement() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [globalFilter, setGlobalFilter] = useState("")

    const [formData, setFormData] = useState({
        roomNumber: "",
        floor: 1,
        type: "double" as "single" | "double" | "triple" | "quad",
        capacity: 2,
        amenities: [] as string[],
    })

    const [editFormData, setEditFormData] = useState({
        roomNumber: "",
        floor: 1,
        type: "double" as "single" | "double" | "triple" | "quad",
        capacity: 2,
        amenities: [] as string[],
        maintenanceStatus: ""
    })

    const [amenityInput, setAmenityInput] = useState("")
    const [editAmenityInput, setEditAmenityInput] = useState("")

    // Redux API hooks
    const { data: response, isLoading, error, refetch } = useGetCaretakerRoomsQuery({
        page: 1,
        limit: 100 // Fetch all 100 rooms
    })

    const { data: statsResponse } = useGetRoomStatsQuery()

    const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation()
    const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation()
    const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation()

    // Extract rooms from the nested response structure
    // API returns: { success: true, data: { rooms: [...], pagination: {...} } }
    const rooms: Room[] = (response?.data as any)?.rooms || []
    const pagination = (response?.data as any)?.pagination

    // Calculate stats from rooms data if stats API is not available
    const calculatedStats = {
        totalRooms: pagination?.total || rooms.length,
        availableRooms: rooms.filter(r => r.status === 'available').length,
        occupiedRooms: rooms.filter(r => r.status === 'occupied' || r.status === 'full').length,
        occupancyRate: rooms.length > 0
            ? Math.round((rooms.filter(r => r.status === 'occupied' || r.status === 'full').length / rooms.length) * 100)
            : 0
    }

    const stats = statsResponse?.data || calculatedStats
    console.log('API Response:', response)
    console.log('Rooms data:', rooms)
    console.log('Rooms count:', rooms.length)

    const handleAddAmenity = () => {
        if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
            setFormData({
                ...formData,
                amenities: [...formData.amenities, amenityInput.trim()]
            })
            setAmenityInput("")
        }
    }

    const handleRemoveAmenity = (amenity: string) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.filter(a => a !== amenity)
        })
    }

    const handleAddEditAmenity = () => {
        if (editAmenityInput.trim() && !editFormData.amenities.includes(editAmenityInput.trim())) {
            setEditFormData({
                ...editFormData,
                amenities: [...editFormData.amenities, editAmenityInput.trim()]
            })
            setEditAmenityInput("")
        }
    }

    const handleRemoveEditAmenity = (amenity: string) => {
        setEditFormData({
            ...editFormData,
            amenities: editFormData.amenities.filter(a => a !== amenity)
        })
    }

    const handleAddRoom = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createRoom(formData).unwrap()
            toast.success('Room created successfully!')
            setDialogOpen(false)
            setFormData({
                roomNumber: "",
                floor: 1,
                type: "double",
                capacity: 2,
                amenities: [],
            })
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create room')
        }
    }

    const handleViewClick = (room: Room) => {
        setSelectedRoom(room)
        setViewDialogOpen(true)
    }

    const handleEditClick = (room: Room) => {
        setSelectedRoom(room)
        setEditFormData({
            roomNumber: room.roomNumber,
            floor: room.floor,
            type: room.type,
            capacity: room.capacity,
            amenities: [...room.amenities],
            maintenanceStatus: room.maintenanceStatus || ""
        })
        setEditDialogOpen(true)
    }

    const handleEditRoom = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedRoom) return

        try {
            await updateRoom({
                id: selectedRoom._id || selectedRoom.id || '',
                data: editFormData
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
            await deleteRoom(selectedRoom._id || selectedRoom.id || '').unwrap()
            toast.success('Room deleted successfully!')
            setDeleteDialogOpen(false)
            setSelectedRoom(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to delete room')
        }
    }

    const columns = createColumns({
        onView: handleViewClick,
        onEdit: handleEditClick,
        onDelete: handleDeleteClick
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
                <p className="text-lg text-muted-foreground">Failed to load rooms</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/caretaker/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                    Room Management
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Manage hostel rooms ({rooms.length} total)
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
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
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
                                                <Label htmlFor="floor">Floor *</Label>
                                                <Input
                                                    id="floor"
                                                    type="number"
                                                    min="1"
                                                    value={formData.floor}
                                                    onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="type">Room Type *</Label>
                                                <select
                                                    id="type"
                                                    value={formData.type}
                                                    onChange={(e) => {
                                                        const type = e.target.value as "single" | "double" | "triple" | "quad"
                                                        const capacityMap = { single: 1, double: 2, triple: 3, quad: 4 }
                                                        setFormData({ ...formData, type, capacity: capacityMap[type] })
                                                    }}
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
                                                    min="1"
                                                    value={formData.capacity}
                                                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Amenities</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={amenityInput}
                                                        onChange={(e) => setAmenityInput(e.target.value)}
                                                        placeholder="Add amenity"
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault()
                                                                handleAddAmenity()
                                                            }
                                                        }}
                                                    />
                                                    <Button type="button" onClick={handleAddAmenity} variant="outline">
                                                        Add
                                                    </Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {formData.amenities.map((amenity, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                                        >
                                                            {amenity}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveAmenity(amenity)}
                                                                className="hover:text-red-600"
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
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
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
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
            <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.totalRooms}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <DoorOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Available</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.availableRooms}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50">
                            <Bed className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.occupiedRooms}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stats.occupancyRate}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={rooms}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />

            {/* View Room Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Room Details</DialogTitle>
                        <DialogDescription>
                            View complete room information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRoom && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Room Number</Label>
                                    <p className="text-lg font-semibold">{selectedRoom.roomNumber}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Floor</Label>
                                    <p className="text-lg font-semibold">Floor {selectedRoom.floor}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Type</Label>
                                    <p className="text-lg font-semibold capitalize">{selectedRoom.type}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Capacity</Label>
                                    <p className="text-lg font-semibold">{selectedRoom.capacity} persons</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Current Occupancy</Label>
                                    <p className="text-lg font-semibold">{selectedRoom.currentOccupancy ?? selectedRoom.occupied ?? 0} / {selectedRoom.capacity}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Status</Label>
                                    <p className="text-lg font-semibold capitalize">{selectedRoom.status}</p>
                                </div>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Amenities</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedRoom.amenities.map((amenity, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {selectedRoom.maintenanceStatus && (
                                <div>
                                    <Label className="text-muted-foreground">Maintenance Status</Label>
                                    <p className="text-sm mt-1">{selectedRoom.maintenanceStatus}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Room Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Room</DialogTitle>
                        <DialogDescription>
                            Update room information
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditRoom}>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-roomNumber">Room Number *</Label>
                                <Input
                                    id="edit-roomNumber"
                                    value={editFormData.roomNumber}
                                    onChange={(e) => setEditFormData({ ...editFormData, roomNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-floor">Floor *</Label>
                                <Input
                                    id="edit-floor"
                                    type="number"
                                    min="1"
                                    value={editFormData.floor}
                                    onChange={(e) => setEditFormData({ ...editFormData, floor: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-type">Room Type *</Label>
                                <select
                                    id="edit-type"
                                    value={editFormData.type}
                                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value as any })}
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
                                <Label htmlFor="edit-capacity">Capacity *</Label>
                                <Input
                                    id="edit-capacity"
                                    type="number"
                                    min="1"
                                    value={editFormData.capacity}
                                    onChange={(e) => setEditFormData({ ...editFormData, capacity: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-maintenanceStatus">Maintenance Status</Label>
                                <Input
                                    id="edit-maintenanceStatus"
                                    value={editFormData.maintenanceStatus}
                                    onChange={(e) => setEditFormData({ ...editFormData, maintenanceStatus: e.target.value })}
                                    placeholder="Optional maintenance notes"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Amenities</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={editAmenityInput}
                                        onChange={(e) => setEditAmenityInput(e.target.value)}
                                        placeholder="Add amenity"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                handleAddEditAmenity()
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddEditAmenity} variant="outline">
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {editFormData.amenities.map((amenity, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                        >
                                            {amenity}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveEditAmenity(amenity)}
                                                className="hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
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
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
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
                            Are you sure you want to delete Room {selectedRoom?.roomNumber}? This action cannot be undone.
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
