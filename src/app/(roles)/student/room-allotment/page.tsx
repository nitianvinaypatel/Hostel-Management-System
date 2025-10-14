"use client"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/common/back-button"
import {
    DoorOpen,
    Building2,
    Users,
    CheckCircle,
    FileText,
    AlertTriangle,
    Phone,
    Mail,
    Bed,
    Wifi,
    Fan,
    Droplet,
    Download,
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
        <div className="space-y-6">
            <BackButton />
            <div className="glass rounded-lg p-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <DoorOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Room Allotment</h1>
                        <p className="text-muted-foreground mt-1">Your hostel room details and information</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="glass rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <DoorOpen className="h-5 w-5" />
                            Room Details
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <DoorOpen className="h-4 w-4" />
                                Room Number
                            </span>
                            <span className="font-semibold">{roomDetails.roomNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Hostel
                            </span>
                            <span className="font-semibold">{roomDetails.hostelName}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Floor
                            </span>
                            <span className="font-semibold">{roomDetails.floor}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <Bed className="h-4 w-4" />
                                Room Type
                            </span>
                            <span className="font-semibold">{roomDetails.roomType}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Occupancy
                            </span>
                            <span className="font-semibold">
                                {roomDetails.currentOccupancy}/{roomDetails.capacity}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Room Facilities
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {roomDetails.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm p-2 rounded-lg glass">
                                <div className="text-green-500">{facility.icon}</div>
                                <span>{facility.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Roommates
                </h3>
                <div className="space-y-4">
                    {roommates.map((roommate, idx) => (
                        <div key={idx} className="glass rounded-lg p-4 hover:shadow-md transition-all">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2">{roommate.name}</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            Student ID: {roommate.studentId}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            Course: {roommate.course}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            Year: {roommate.year}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            Phone: {roommate.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Quick Actions
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                        <DoorOpen className="h-4 w-4" />
                        Request Room Change
                    </Button>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Report Issue
                    </Button>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Allotment Letter
                    </Button>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Hostel Rules & Guidelines
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            Maintain cleanliness in your room and common areas
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Respect quiet hours: 10 PM - 6 AM</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            Visitors allowed only during designated hours
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            No smoking or alcohol consumption in hostel premises
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            Report any maintenance issues immediately
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Keep your room locked when away</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
