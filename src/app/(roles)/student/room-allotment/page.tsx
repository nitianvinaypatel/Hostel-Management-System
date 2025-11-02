"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    DoorOpen,
    Building2,
    Users,
    CheckCircle,
    FileText,
    Phone,
    Bed,
    Wifi,
    Fan,
    Droplet,
    ArrowLeft,
} from "lucide-react"

type RoomDetails = {
    roomNumber: string
    hostelName: string
    floor: string
    roomType: string
    capacity: number
    currentOccupancy: number
    facilities: { name: string; icon: React.ReactNode }[]
}

export default function RoomAllotment() {
    const roomDetails: RoomDetails = {
        roomNumber: "204",
        hostelName: "Hostel A",
        floor: "2nd Floor",
        roomType: "Double Occupancy",
        capacity: 2,
        currentOccupancy: 2,
        facilities: [
            { name: "Attached Bathroom", icon: <Droplet className="h-4 w-4" /> },
            { name: "Study Table", icon: <FileText className="h-4 w-4" /> },
            { name: "Wardrobe", icon: <DoorOpen className="h-4 w-4" /> },
            { name: "Fan", icon: <Fan className="h-4 w-4" /> },
            { name: "Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
            { name: "Bed with Mattress", icon: <Bed className="h-4 w-4" /> },
        ],
    }

    const roommates = [
        {
            name: "John Doe",
            studentId: "CS2021001",
            course: "B.Tech CSE",
            year: "3rd Year",
            phone: "+91 XXXXX XXXXX",
        },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/student/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                    Room Allotment
                                </h1>
                                <p className="text-muted-foreground text-lg">Your hostel room details and information</p>
                            </div>
                        </div>
                        <Link href="/student/requests">
                            <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                <DoorOpen className="h-5 w-5" />
                                Request Room Change
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6 dark:text-white">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <DoorOpen className="h-5 w-5 text-white" />
                            </div>
                            Room Details
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50">
                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                <DoorOpen className="h-4 w-4" />
                                Room Number
                            </span>
                            <span className="font-bold text-blue-900 dark:text-blue-100">{roomDetails.roomNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50">
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Hostel
                            </span>
                            <span className="font-bold text-purple-900 dark:text-purple-100">{roomDetails.hostelName}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50">
                            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Floor
                            </span>
                            <span className="font-bold text-orange-900 dark:text-orange-100">{roomDetails.floor}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
                            <span className="text-sm font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                                <Bed className="h-4 w-4" />
                                Room Type
                            </span>
                            <span className="font-bold text-green-900 dark:text-green-100">{roomDetails.roomType}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-br from-rose-50/80 to-red-50/80 dark:from-rose-950/30 dark:to-red-950/30 border border-rose-200/50 dark:border-rose-800/50">
                            <span className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Occupancy
                            </span>
                            <span className="font-bold text-rose-900 dark:text-rose-100">
                                {roomDetails.currentOccupancy}/{roomDetails.capacity}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            Room Facilities
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {roomDetails.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm p-3 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:scale-105 transition-transform duration-300 shadow-sm">
                                <div className="text-green-600 dark:text-green-400">{facility.icon}</div>
                                <span className="font-semibold text-green-900 dark:text-green-100">{facility.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <Users className="h-5 w-5 text-white" />
                    </div>
                    Roommates
                </h3>
                <div className="space-y-4">
                    {roommates.map((roommate, idx) => (
                        <div key={idx} className="group bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                                    <Users className="h-7 w-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg mb-3 text-purple-900 dark:text-purple-100">{roommate.name}</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/60 dark:bg-gray-900/40">
                                            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">ID: {roommate.studentId}</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/60 dark:bg-gray-900/40">
                                            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{roommate.course}</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/60 dark:bg-gray-900/40">
                                            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{roommate.year}</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/60 dark:bg-gray-900/40">
                                            <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{roommate.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
