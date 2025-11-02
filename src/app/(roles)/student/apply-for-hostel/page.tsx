"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import {
    Building2,
    Bed,
    CheckCircle,
    ArrowLeft,
    Loader2,
    AlertCircle,
} from "lucide-react"
import {
    useGetAvailableHostelsQuery,
    useGetAvailableRoomsQuery,
    useSubmitHostelApplicationMutation,
    useGetApplicationStatusQuery,
} from "@/store/api/studentApi"

export default function ApplyForHostel() {
    const [formData, setFormData] = useState({
        hostelName: "",
        roomNumber: "",
    })
    const [selectedHostelId, setSelectedHostelId] = useState("")

    // Fetch available hostels
    const { data: hostelsResponse, isLoading: loadingHostels } = useGetAvailableHostelsQuery()
    const hostels = hostelsResponse?.data || []

    // Fetch available rooms for selected hostel using hostel ID
    const { data: roomsResponse, isLoading: loadingRooms, error: roomsError } = useGetAvailableRoomsQuery(
        selectedHostelId,
        { skip: !selectedHostelId }
    )
    const rooms = roomsResponse?.data || []

    // Debug logging
    useEffect(() => {
        console.log('All Hostels:', hostels)
        if (selectedHostelId) {
            console.log('Selected Hostel ID:', selectedHostelId)
            console.log('Rooms Response:', roomsResponse)
            console.log('Rooms Data:', rooms)
            console.log('Loading Rooms:', loadingRooms)
            console.log('Rooms Error:', roomsError)
        }
    }, [hostels, selectedHostelId, roomsResponse, rooms, loadingRooms, roomsError])

    // Check application status
    const { data: statusResponse } = useGetApplicationStatusQuery()
    const applicationStatus = statusResponse?.data

    // Submit application mutation
    const [submitApplication, { isLoading: isSubmitting }] = useSubmitHostelApplicationMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedHostelId || !formData.roomNumber) {
            toast.error('Please select both hostel and room')
            return
        }

        const payload = {
            hostelId: selectedHostelId,
            roomNumber: formData.roomNumber
        }

        console.log('Submitting application payload:', payload)

        try {
            const result = await submitApplication(payload).unwrap()
            console.log('Application submitted successfully:', result)
            toast.success('Application submitted successfully!')
            setFormData({ hostelName: "", roomNumber: "" })
            setSelectedHostelId("")
        } catch (error: any) {
            console.log('Application error:', error)
            console.log('Error details:', error.data)
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to submit application'
            toast.error(errorMessage)
        }
    }

    if (loadingHostels) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Check if application is already approved or pending
    const hasActiveApplication = applicationStatus &&
        (applicationStatus.status === 'pending' || applicationStatus.status === 'approved')

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Apply for Hostel
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Fill out the form below to apply for hostel accommodation
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {applicationStatus && (
                <div className={`bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border rounded-2xl p-6 shadow-lg ${applicationStatus.status === 'approved'
                    ? 'border-green-200/50 dark:border-green-800/50'
                    : applicationStatus.status === 'pending'
                        ? 'border-yellow-200/50 dark:border-yellow-800/50'
                        : applicationStatus.status === 'rejected'
                            ? 'border-red-200/50 dark:border-red-800/50'
                            : 'border-gray-200/50 dark:border-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-3 mb-4">
                        {applicationStatus.status === 'approved' ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : applicationStatus.status === 'pending' ? (
                            <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />
                        ) : (
                            <AlertCircle className="h-6 w-6 text-blue-500" />
                        )}
                        <h3 className="text-lg font-semibold">Application Status</h3>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">
                            Status: <span className={`font-semibold ${applicationStatus.status === 'approved'
                                ? 'text-green-600 dark:text-green-400'
                                : applicationStatus.status === 'pending'
                                    ? 'text-yellow-600 dark:text-yellow-400'
                                    : applicationStatus.status === 'rejected'
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-blue-600 dark:text-blue-400'
                                }`}>
                                {applicationStatus.status?.toUpperCase()}
                            </span>
                        </p>
                        {applicationStatus.hostelName && (
                            <p className="text-gray-600 dark:text-gray-400">
                                Hostel: <span className="font-semibold">{applicationStatus.hostelName}</span> - Room: <span className="font-semibold">{applicationStatus.roomNumber}</span>
                            </p>
                        )}
                        {applicationStatus.appliedDate && (
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Applied on: {new Date(applicationStatus.appliedDate).toLocaleDateString()}
                            </p>
                        )}
                        {applicationStatus.status === 'rejected' && applicationStatus.reason && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                                Reason: {applicationStatus.reason}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {hasActiveApplication ? (
                    <div className="text-center py-8">
                        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Application Already Submitted</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            You have an active application. Please wait for the approval or contact the hostel administration.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-3 items-end">
                            <div className="space-y-3 group">
                                <Label htmlFor="hostelName" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                        <Building2 className="h-4 w-4 text-white" />
                                    </div>
                                    Hostel Name *
                                </Label>
                                <select
                                    id="hostelName"
                                    value={selectedHostelId}
                                    onChange={(e) => {
                                        const hostelId = e.target.value
                                        console.log('Hostel ID selected:', hostelId)
                                        const selectedHostel = hostels.find((h: any) =>
                                            (h._id || h.id) === hostelId
                                        )
                                        console.log('Found hostel:', selectedHostel)
                                        setSelectedHostelId(hostelId)
                                        setFormData({
                                            ...formData,
                                            hostelName: selectedHostel?.name || '',
                                            roomNumber: ""
                                        })
                                    }}
                                    className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                    required
                                    disabled={isSubmitting || loadingHostels}
                                >
                                    <option value="">{loadingHostels ? 'Loading hostels...' : 'Select Hostel'}</option>
                                    {hostels.map((hostel: any) => {
                                        const hostelId = hostel._id || hostel.id
                                        return (
                                            <option key={hostelId} value={hostelId}>
                                                {hostel.name}{hostel.code ? ` (${hostel.code})` : ''} - {hostel.availableRooms || 0} rooms available
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="space-y-3 group">
                                <Label htmlFor="roomNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                        <Bed className="h-4 w-4 text-white" />
                                    </div>
                                    Room Number * {selectedHostelId && <span className="text-xs text-gray-500">({rooms.length} rooms)</span>}
                                </Label>
                                <select
                                    id="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                                    className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                    required
                                    disabled={!selectedHostelId || loadingRooms || isSubmitting}
                                >
                                    <option value="">
                                        {!selectedHostelId
                                            ? "Select hostel first"
                                            : loadingRooms
                                                ? "Loading rooms..."
                                                : rooms.length === 0
                                                    ? "No rooms available"
                                                    : "Select Room Number"}
                                    </option>
                                    {rooms.map((room: any) => (
                                        <option
                                            key={room._id || room.roomNumber}
                                            value={room.roomNumber}
                                            disabled={!room.isAvailable}
                                        >
                                            Room {room.roomNumber} - {room.type || 'Standard'} ({(room.capacity - room.currentOccupancy) || room.availableBeds || room.capacity} beds available)
                                        </option>
                                    ))}
                                </select>
                                {roomsError && (
                                    <p className="text-xs text-red-500">Error loading rooms. Check console for details.</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="h-5 w-5" />
                                        Submit Application
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </div>

            {/* Available Hostels Information */}
            {hostels.length > 0 && !hasActiveApplication && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 dark:text-white">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Building2 className="h-5 w-5 text-white" />
                        </div>
                        Available Hostels
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {hostels.map((hostel: any) => (
                            <div
                                key={hostel._id || hostel.id}
                                className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                                            {hostel.name}
                                        </h4>
                                        {hostel.code && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Code: {hostel.code}</p>
                                        )}
                                    </div>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold">
                                        {hostel.gender || 'N/A'}
                                    </span>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Total Rooms: <span className="font-semibold">{hostel.totalRooms || 0}</span>
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Available: <span className="font-semibold text-green-600 dark:text-green-400">{hostel.availableRooms || 0}</span>
                                    </p>
                                    {hostel.warden && (
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Warden: <span className="font-semibold">{hostel.warden}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    )
}
