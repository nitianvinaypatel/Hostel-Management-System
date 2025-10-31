'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DoorOpen, Plus, Edit, Bed, Users, Building2 } from "lucide-react"

export default function RoomsBlocks() {
    const [selectedHostel, setSelectedHostel] = useState("all")

    const rooms = [
        { id: "1", hostel: "Hostel A", block: "A", roomNumber: "101", floor: 1, type: "double", capacity: 2, occupied: 2, status: "occupied", rent: 5000 },
        { id: "2", hostel: "Hostel A", block: "A", roomNumber: "102", floor: 1, type: "triple", capacity: 3, occupied: 2, status: "available", rent: 4500 },
        { id: "3", hostel: "Hostel B", block: "B", roomNumber: "201", floor: 2, type: "single", capacity: 1, occupied: 1, status: "occupied", rent: 7000 },
        { id: "4", hostel: "Hostel B", block: "B", roomNumber: "202", floor: 2, type: "double", capacity: 2, occupied: 0, status: "maintenance", rent: 5000 },
        { id: "5", hostel: "Hostel A", block: "A", roomNumber: "103", floor: 1, type: "single", capacity: 1, occupied: 0, status: "available", rent: 6000 },
        { id: "6", hostel: "Hostel C", block: "C", roomNumber: "301", floor: 3, type: "triple", capacity: 3, occupied: 3, status: "occupied", rent: 4200 },
    ]

    const filteredRooms = rooms.filter(room => {
        const matchesHostel = selectedHostel === "all" || room.hostel === selectedHostel
        return matchesHostel
    })

    const totalRooms = filteredRooms.length
    const occupiedRooms = filteredRooms.filter(r => r.status === "occupied").length
    const availableRooms = filteredRooms.filter(r => r.status === "available").length

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Rooms & Blocks 🏠
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Manage room allocations and blocks
                        </p>
                    </div>
                    <Button size="lg" className="gap-2">
                        <Plus className="h-5 w-5" />
                        Add Room
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-3">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Rooms</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-500/50">
                            <DoorOpen className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-100">{totalRooms}</p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Occupied</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transition-all duration-300 shadow-lg shadow-red-500/50">
                            <Bed className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-red-900 dark:text-red-100">{occupiedRooms}</p>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 transition-all duration-300" />
                    <div className="relative flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300">Available</h3>
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center transition-all duration-300 shadow-lg shadow-green-500/50">
                            <Users className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-2 text-green-900 dark:text-green-100">{availableRooms}</p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by Hostel:</label>
                    <select
                        value={selectedHostel}
                        onChange={(e) => setSelectedHostel(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    >
                        <option value="all">All Hostels</option>
                        <option value="Hostel A">Hostel A</option>
                        <option value="Hostel B">Hostel B</option>
                        <option value="Hostel C">Hostel C</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                                <TableHead className="font-semibold">Hostel</TableHead>
                                <TableHead className="font-semibold">Block</TableHead>
                                <TableHead className="font-semibold">Room</TableHead>
                                <TableHead className="font-semibold">Floor</TableHead>
                                <TableHead className="font-semibold">Type</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRooms.map((room) => {
                                return (
                                    <TableRow
                                        key={room.id}
                                        className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-300"
                                    >
                                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">{room.hostel}</TableCell>
                                        <TableCell>
                                            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm shadow-sm">
                                                {room.block}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-bold text-lg text-gray-900 dark:text-gray-100">{room.roomNumber}</TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400">{room.floor}</TableCell>
                                        <TableCell>
                                            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 font-semibold text-sm capitalize shadow-sm">
                                                {room.type}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${room.status === 'occupied'
                                                ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-800/50'
                                                : room.status === 'available'
                                                    ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50'
                                                    : 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200/50 dark:border-yellow-800/50'
                                                }`}>
                                                {room.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    <DoorOpen className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-600 dark:hover:text-purple-400"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
