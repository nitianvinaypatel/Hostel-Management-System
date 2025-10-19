'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, DoorOpen } from "lucide-react"

export default function RoomsBlocks() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedHostel, setSelectedHostel] = useState("all")

    const rooms = [
        { id: "1", hostel: "Hostel A", block: "A", roomNumber: "101", floor: 1, type: "double", capacity: 2, occupied: 2, status: "occupied", rent: 5000 },
        { id: "2", hostel: "Hostel A", block: "A", roomNumber: "102", floor: 1, type: "triple", capacity: 3, occupied: 2, status: "available", rent: 4500 },
        { id: "3", hostel: "Hostel B", block: "B", roomNumber: "201", floor: 2, type: "single", capacity: 1, occupied: 1, status: "occupied", rent: 7000 },
        { id: "4", hostel: "Hostel B", block: "B", roomNumber: "202", floor: 2, type: "double", capacity: 2, occupied: 0, status: "maintenance", rent: 5000 },
    ]

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = room.roomNumber.includes(searchTerm) || room.block.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesHostel = selectedHostel === "all" || room.hostel === selectedHostel
        return matchesSearch && matchesHostel
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Rooms & Blocks</h1>
                    <p className="text-muted-foreground">Manage room allocations and blocks</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Room
                </Button>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search rooms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={selectedHostel}
                        onChange={(e) => setSelectedHostel(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="all">All Hostels</option>
                        <option value="Hostel A">Hostel A</option>
                        <option value="Hostel B">Hostel B</option>
                        <option value="Hostel C">Hostel C</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Block</th>
                                <th className="text-left py-3 px-4">Room</th>
                                <th className="text-left py-3 px-4">Floor</th>
                                <th className="text-left py-3 px-4">Type</th>
                                <th className="text-left py-3 px-4">Occupancy</th>
                                <th className="text-left py-3 px-4">Rent</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRooms.map((room) => (
                                <tr key={room.id} className="border-b hover:bg-accent/50">
                                    <td className="py-3 px-4">{room.hostel}</td>
                                    <td className="py-3 px-4 font-medium">{room.block}</td>
                                    <td className="py-3 px-4 font-medium">{room.roomNumber}</td>
                                    <td className="py-3 px-4">{room.floor}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                            {room.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{room.occupied}/{room.capacity}</td>
                                    <td className="py-3 px-4">₹{room.rent}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                                            room.status === 'available' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {room.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-accent rounded">
                                                <DoorOpen className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-accent rounded">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
