'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { UserPlus, Zap, Search, Users, CheckCircle2, AlertCircle, Loader2, ArrowLeft, UserMinus, Calendar } from "lucide-react"
import Link from "next/link"
import {
    useSearchStudentsQuery,
    useGetAvailableRoomsQuery,
    useAllocateRoomMutation,
    useAutoAllocateRoomsMutation,
    useGetRecentAllocationsQuery,
    useDeallocateRoomMutation
} from '@/store/api/caretakerApi'
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createColumns, Allocation } from "./columns"
import { DataTable } from "./data-table"

export default function RoomAllotment() {
    // Manual allocation state
    const [studentSearch, setStudentSearch] = useState("")
    const [selectedStudent, setSelectedStudent] = useState<any>(null)
    const [selectedRoom, setSelectedRoom] = useState("")
    const [bedPreference, setBedPreference] = useState("")
    const [allocationNotes, setAllocationNotes] = useState("")

    // Auto allocation state
    const [numberOfStudents, setNumberOfStudents] = useState("")
    const [allocationCriteria, setAllocationCriteria] = useState("fcfs")
    const [roomTypes, setRoomTypes] = useState<string[]>(["single", "double", "triple"])

    // Deallocation state
    const [deallocateDialogOpen, setDeallocateDialogOpen] = useState(false)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [selectedAllocation, setSelectedAllocation] = useState<Allocation | null>(null)
    const [deallocateReason, setDeallocateReason] = useState("")
    const [deallocateDate, setDeallocateDate] = useState("")
    const [globalFilter, setGlobalFilter] = useState("")

    // API hooks
    const { data: studentsResponse, isLoading: isSearching } = useSearchStudentsQuery(studentSearch, {
        skip: studentSearch.length < 2
    })

    const { data: roomsResponse, isLoading: isLoadingRooms } = useGetAvailableRoomsQuery({})

    const { data: recentAllocationsResponse, isLoading: isLoadingRecent } = useGetRecentAllocationsQuery(10)

    const [allocateRoom, { isLoading: isAllocating }] = useAllocateRoomMutation()
    const [autoAllocate, { isLoading: isAutoAllocating }] = useAutoAllocateRoomsMutation()
    const [deallocateRoom, { isLoading: isDeallocating }] = useDeallocateRoomMutation()

    const students = studentsResponse?.data || []
    const availableRooms = Array.isArray(roomsResponse?.data) ? roomsResponse.data : []
    // Handle nested allocations array in response
    const recentAllocations = (recentAllocationsResponse?.data as any)?.allocations && Array.isArray((recentAllocationsResponse?.data as any).allocations)
        ? (recentAllocationsResponse?.data as any).allocations
        : Array.isArray(recentAllocationsResponse?.data)
            ? recentAllocationsResponse.data
            : []

    // Group rooms by floor
    const roomsByFloor = availableRooms.reduce((acc: any, room: any) => {
        const floor = room.floor || 1
        if (!acc[floor]) acc[floor] = []
        acc[floor].push(room)
        return acc
    }, {})

    const handleManualAllocation = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedStudent) {
            toast.error('Please select a student')
            return
        }

        if (!selectedRoom) {
            toast.error('Please select a room')
            return
        }

        try {
            await allocateRoom({
                studentId: selectedStudent._id || selectedStudent.id,
                roomId: selectedRoom,
                bedPreference: bedPreference || undefined,
                notes: allocationNotes || undefined
            }).unwrap()

            toast.success('Room allocated successfully!')

            // Reset form
            setSelectedStudent(null)
            setStudentSearch("")
            setSelectedRoom("")
            setBedPreference("")
            setAllocationNotes("")
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to allocate room')
        }
    }

    const handleAutoAllocation = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!numberOfStudents || parseInt(numberOfStudents) < 1) {
            toast.error('Please enter a valid number of students')
            return
        }

        try {
            const result = await autoAllocate({
                numberOfStudents: parseInt(numberOfStudents),
                criteria: allocationCriteria,
                roomTypes
            }).unwrap()

            toast.success(`Successfully allocated ${result.data?.allocatedCount || 0} rooms`)
            setNumberOfStudents("")
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to auto-allocate rooms')
        }
    }

    const handleViewClick = (allocation: Allocation) => {
        setSelectedAllocation(allocation)
        setViewDialogOpen(true)
    }

    const handleDeallocateClick = (allocation: Allocation) => {
        setSelectedAllocation(allocation)
        setDeallocateDialogOpen(true)
    }

    const handleDeallocation = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedAllocation) return

        if (!deallocateReason.trim()) {
            toast.error('Please provide a reason for deallocation')
            return
        }

        try {
            await deallocateRoom({
                studentId: selectedAllocation.studentId,
                data: {
                    reason: deallocateReason,
                    effectiveDate: deallocateDate || undefined
                }
            }).unwrap()

            toast.success('Room deallocated successfully!')
            setDeallocateDialogOpen(false)
            setSelectedAllocation(null)
            setDeallocateReason("")
            setDeallocateDate("")
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to deallocate room')
        }
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
                                    Room Allotment
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Allocate rooms to students manually or automatically
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Manual Allocation */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <UserPlus className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Manual Allocation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Assign a specific room to a student
                        </p>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleManualAllocation} className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Search Student</FieldLabel>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search by name or ID..."
                                        value={studentSearch}
                                        onChange={(e) => setStudentSearch(e.target.value)}
                                        className="pl-10 bg-white dark:bg-gray-800"
                                    />
                                </div>
                                {isSearching && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Searching...
                                    </div>
                                )}
                                {students.length > 0 && (
                                    <div className="mt-2 border border-gray-300 dark:border-gray-700 rounded-md max-h-40 overflow-y-auto">
                                        {students.map((student: any) => (
                                            <button
                                                key={student._id || student.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedStudent(student)
                                                    setStudentSearch(student.name)
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                                            >
                                                {student.name} ({student.rollNumber || student.studentId})
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Select Room</FieldLabel>
                                <select
                                    value={selectedRoom}
                                    onChange={(e) => setSelectedRoom(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm"
                                    disabled={isLoadingRooms}
                                >
                                    <option value="">Select a room</option>
                                    {Object.keys(roomsByFloor).map((floor) => (
                                        <optgroup key={floor} label={`Floor ${floor}`}>
                                            {roomsByFloor[floor].map((room: any) => (
                                                <option key={room._id || room.id} value={room._id || room.id}>
                                                    Room {room.roomNumber} - {room.type} ({room.availableBeds || room.capacity} beds available)
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                <FieldDescription>Available rooms with vacant beds</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Bed Preference (Optional)</FieldLabel>
                                <select
                                    value={bedPreference}
                                    onChange={(e) => setBedPreference(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm"
                                >
                                    <option value="">No preference</option>
                                    <option value="lower">Lower Bed</option>
                                    <option value="upper">Upper Bed</option>
                                    <option value="window">Near Window</option>
                                    <option value="door">Near Door</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Allocation Notes</FieldLabel>
                                <textarea
                                    value={allocationNotes}
                                    onChange={(e) => setAllocationNotes(e.target.value)}
                                    className="flex min-h-20 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none"
                                    placeholder="Any special notes or requirements..."
                                />
                            </Field>

                            <Button type="submit" className="w-full" disabled={isAllocating}>
                                {isAllocating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Allocating...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Allocate Room
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Automatic Allocation */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Automatic Allocation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Automatically allocate rooms based on availability and preferences
                        </p>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleAutoAllocation} className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Number of Students</FieldLabel>
                                <Input
                                    type="number"
                                    placeholder="Enter number of students"
                                    min="1"
                                    value={numberOfStudents}
                                    onChange={(e) => setNumberOfStudents(e.target.value)}
                                    className="bg-white dark:bg-gray-800"
                                />
                                <FieldDescription>Students pending room allocation</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Allocation Criteria</FieldLabel>
                                <select
                                    value={allocationCriteria}
                                    onChange={(e) => setAllocationCriteria(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm"
                                >
                                    <option value="fcfs">First Come First Serve</option>
                                    <option value="merit">By Merit/CGPA</option>
                                    <option value="preference">By Student Preference</option>
                                    <option value="year">By Academic Year</option>
                                    <option value="department">By Department</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Room Type Preference</FieldLabel>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={roomTypes.includes("single")}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setRoomTypes([...roomTypes, "single"])
                                                } else {
                                                    setRoomTypes(roomTypes.filter(t => t !== "single"))
                                                }
                                            }}
                                        />
                                        <span className="text-sm text-gray-900 dark:text-white">Single Occupancy</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={roomTypes.includes("double")}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setRoomTypes([...roomTypes, "double"])
                                                } else {
                                                    setRoomTypes(roomTypes.filter(t => t !== "double"))
                                                }
                                            }}
                                        />
                                        <span className="text-sm text-gray-900 dark:text-white">Double Occupancy</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={roomTypes.includes("triple")}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setRoomTypes([...roomTypes, "triple"])
                                                } else {
                                                    setRoomTypes(roomTypes.filter(t => t !== "triple"))
                                                }
                                            }}
                                        />
                                        <span className="text-sm text-gray-900 dark:text-white">Triple Occupancy</span>
                                    </label>
                                </div>
                            </Field>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">Auto-Allocation Preview</p>
                                        <p className="text-blue-700 dark:text-blue-400">The system will allocate rooms based on your criteria. You can review and modify allocations before finalizing.</p>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" variant="secondary" className="w-full" disabled={isAutoAllocating}>
                                {isAutoAllocating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Allocating...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-4 w-4 mr-2" />
                                        Start Auto Allocation
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div >

            {/* Recent Allocations Table */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Allocations</h3>
                        <p className="text-sm text-muted-foreground mt-1">View and manage room assignments</p>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                        <Input
                            placeholder="Search allocations..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        />
                    </div>
                </div>
                {isLoadingRecent ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <DataTable
                        columns={createColumns({
                            onView: handleViewClick,
                            onDeallocate: handleDeallocateClick
                        })}
                        data={recentAllocations}
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                    />
                )}
            </div>

            {/* View Allocation Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Allocation Details</DialogTitle>
                        <DialogDescription>
                            View complete information about this room allocation
                        </DialogDescription>
                    </DialogHeader>
                    {selectedAllocation && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Student Name</Label>
                                    <p className="font-medium">{selectedAllocation.studentName}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Enrollment Number</Label>
                                    <p className="font-medium">{selectedAllocation.enrollmentNumber}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Hostel</Label>
                                    <p className="font-medium">{selectedAllocation.hostelName}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Room Number</Label>
                                    <p className="font-medium">Room {selectedAllocation.roomNumber}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Floor</Label>
                                    <p className="font-medium">Floor {selectedAllocation.floor}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Status</Label>
                                    <p className="font-medium capitalize">{selectedAllocation.status}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Allocated By</Label>
                                    <p className="font-medium">{selectedAllocation.allocatedBy}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Allocated On</Label>
                                    <p className="font-medium">
                                        {new Date(selectedAllocation.allocatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Deallocation Dialog */}
            <Dialog open={deallocateDialogOpen} onOpenChange={setDeallocateDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Deallocate Room</DialogTitle>
                        <DialogDescription>
                            Remove student from their current room allocation. This action requires a reason.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDeallocation}>
                        <div className="grid gap-4 py-4">
                            {selectedAllocation && (
                                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Student: {selectedAllocation.studentName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Room: {selectedAllocation.roomNumber} • Floor {selectedAllocation.floor}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Hostel: {selectedAllocation.hostelName}
                                    </p>
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="reason">Reason for Deallocation *</Label>
                                <textarea
                                    id="reason"
                                    value={deallocateReason}
                                    onChange={(e) => setDeallocateReason(e.target.value)}
                                    className="flex min-h-20 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none"
                                    placeholder="Enter reason for deallocation..."
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="effectiveDate">Effective Date (Optional)</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="effectiveDate"
                                        type="date"
                                        value={deallocateDate}
                                        onChange={(e) => setDeallocateDate(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setDeallocateDialogOpen(false)
                                    setSelectedAllocation(null)
                                    setDeallocateReason("")
                                    setDeallocateDate("")
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={isDeallocating}
                            >
                                {isDeallocating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Deallocating...
                                    </>
                                ) : (
                                    <>
                                        <UserMinus className="h-4 w-4 mr-2" />
                                        Deallocate Room
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </div >
    )
}
