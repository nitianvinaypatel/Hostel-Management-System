'use client'

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Users, Building2, DoorOpen } from "lucide-react"
import Link from "next/link"

export default function WardenOccupancyReport() {
    const occupancyData = {
        totalRooms: 120,
        occupiedRooms: 105,
        availableRooms: 15,
        totalCapacity: 240,
        currentOccupancy: 210,
        occupancyRate: 87.5
    }

    const blockData = [
        { block: "Block A", totalRooms: 40, occupiedRooms: 35, capacity: 80, occupied: 70, rate: 87.5 },
        { block: "Block B", totalRooms: 40, occupiedRooms: 38, capacity: 80, occupied: 76, rate: 95.0 },
        { block: "Block C", totalRooms: 40, occupiedRooms: 32, capacity: 80, occupied: 64, rate: 80.0 },
    ]

    const floorData = [
        { floor: "Ground Floor", rooms: 30, occupied: 28, capacity: 60, students: 56 },
        { floor: "First Floor", rooms: 30, occupied: 27, capacity: 60, students: 54 },
        { floor: "Second Floor", rooms: 30, occupied: 26, capacity: 60, students: 52 },
        { floor: "Third Floor", rooms: 30, occupied: 24, capacity: 60, students: 48 },
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/warden/reports">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                                Occupancy Report 🏠
                            </h1>
                            <p className="text-muted-foreground text-lg">Hostel A - Current occupancy status</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-3">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <DoorOpen className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Rooms</p>
                    </div>
                    <p className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">{occupancyData.totalRooms}</p>
                    <p className="text-sm text-muted-foreground font-medium">
                        {occupancyData.occupiedRooms} occupied, {occupancyData.availableRooms} available
                    </p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Total Capacity</p>
                    </div>
                    <p className="text-4xl font-bold text-green-900 dark:text-green-100 mb-2">{occupancyData.totalCapacity}</p>
                    <p className="text-sm text-muted-foreground font-medium">
                        {occupancyData.currentOccupancy} students
                    </p>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Occupancy Rate</p>
                    </div>
                    <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2">{occupancyData.occupancyRate}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${occupancyData.occupancyRate}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Block-wise Occupancy */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Block-wise Occupancy</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Block</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Rooms</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Occupied Rooms</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Capacity</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Current Students</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Occupancy Rate</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Visual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blockData.map((block) => (
                                <tr key={block.block} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{block.block}</td>
                                    <td className="py-4 px-4 font-medium">{block.totalRooms}</td>
                                    <td className="py-4 px-4 font-medium">{block.occupiedRooms}</td>
                                    <td className="py-4 px-4 font-medium">{block.capacity}</td>
                                    <td className="py-4 px-4 font-medium">{block.occupied}</td>
                                    <td className="py-4 px-4 font-bold text-primary">{block.rate}%</td>
                                    <td className="py-4 px-4">
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${block.rate}%` }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floor-wise Distribution */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-5 dark:text-white">Floor-wise Distribution</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Floor</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Total Rooms</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Occupied</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Capacity</th>
                                <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-gray-100">Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {floorData.map((floor) => (
                                <tr key={floor.floor} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100">{floor.floor}</td>
                                    <td className="py-4 px-4 font-medium">{floor.rooms}</td>
                                    <td className="py-4 px-4 font-medium">{floor.occupied}</td>
                                    <td className="py-4 px-4 font-medium">{floor.capacity}</td>
                                    <td className="py-4 px-4 font-medium">{floor.students}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
