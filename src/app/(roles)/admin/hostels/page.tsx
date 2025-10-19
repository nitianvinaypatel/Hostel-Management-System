'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, Building2 } from "lucide-react"

export default function AdminHostels() {
    const [searchTerm, setSearchTerm] = useState("")

    const hostels = [
        {
            id: "1",
            name: "Hostel A - Boys",
            type: "boys",
            totalRooms: 120,
            occupiedRooms: 105,
            capacity: 240,
            currentOccupancy: 210,
            warden: "Jane Smith",
            status: "active"
        },
        {
            id: "2",
            name: "Hostel B - Girls",
            type: "girls",
            totalRooms: 100,
            occupiedRooms: 85,
            capacity: 200,
            currentOccupancy: 170,
            warden: "Mary Johnson",
            status: "active"
        },
        {
            id: "3",
            name: "Hostel C - Boys",
            type: "boys",
            totalRooms: 80,
            occupiedRooms: 60,
            capacity: 160,
            currentOccupancy: 120,
            warden: "Robert Brown",
            status: "maintenance"
        },
    ]

    const filteredHostels = hostels.filter(hostel =>
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Hostel Management</h1>
                    <p className="text-muted-foreground">Manage all hostels and their details</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Hostel
                </Button>
            </div>

            <Card className="p-6">
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search hostels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredHostels.map((hostel) => (
                        <Card key={hostel.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Building2 className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{hostel.name}</h3>
                                        <p className="text-sm text-muted-foreground">Warden: {hostel.warden}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${hostel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {hostel.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Rooms</span>
                                    <span className="font-medium">{hostel.occupiedRooms}/{hostel.totalRooms}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Occupancy</span>
                                    <span className="font-medium">{hostel.currentOccupancy}/{hostel.capacity}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: `${(hostel.currentOccupancy / hostel.capacity) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-right">
                                    {Math.round((hostel.currentOccupancy / hostel.capacity) * 100)}% occupied
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
