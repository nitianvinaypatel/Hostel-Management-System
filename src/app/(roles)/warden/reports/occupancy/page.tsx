'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/warden/reports">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Occupancy Report</h1>
                        <p className="text-muted-foreground">Hostel A - Current occupancy status</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Rooms</p>
                        <p className="text-2xl font-bold">{occupancyData.totalRooms}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {occupancyData.occupiedRooms} occupied, {occupancyData.availableRooms} available
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Capacity</p>
                        <p className="text-2xl font-bold">{occupancyData.totalCapacity}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {occupancyData.currentOccupancy} students
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Occupancy Rate</p>
                        <p className="text-2xl font-bold text-primary">{occupancyData.occupancyRate}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${occupancyData.occupancyRate}%` }}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Block-wise Occupancy</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Block</th>
                                <th className="text-left py-3 px-4">Total Rooms</th>
                                <th className="text-left py-3 px-4">Occupied Rooms</th>
                                <th className="text-left py-3 px-4">Capacity</th>
                                <th className="text-left py-3 px-4">Current Students</th>
                                <th className="text-left py-3 px-4">Occupancy Rate</th>
                                <th className="text-left py-3 px-4">Visual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blockData.map((block) => (
                                <tr key={block.block} className="border-b">
                                    <td className="py-3 px-4 font-medium">{block.block}</td>
                                    <td className="py-3 px-4">{block.totalRooms}</td>
                                    <td className="py-3 px-4">{block.occupiedRooms}</td>
                                    <td className="py-3 px-4">{block.capacity}</td>
                                    <td className="py-3 px-4">{block.occupied}</td>
                                    <td className="py-3 px-4 font-semibold">{block.rate}%</td>
                                    <td className="py-3 px-4">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${block.rate}%` }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Floor-wise Distribution</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Floor</th>
                                <th className="text-left py-3 px-4">Total Rooms</th>
                                <th className="text-left py-3 px-4">Occupied</th>
                                <th className="text-left py-3 px-4">Capacity</th>
                                <th className="text-left py-3 px-4">Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {floorData.map((floor) => (
                                <tr key={floor.floor} className="border-b">
                                    <td className="py-3 px-4 font-medium">{floor.floor}</td>
                                    <td className="py-3 px-4">{floor.rooms}</td>
                                    <td className="py-3 px-4">{floor.occupied}</td>
                                    <td className="py-3 px-4">{floor.capacity}</td>
                                    <td className="py-3 px-4">{floor.students}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
