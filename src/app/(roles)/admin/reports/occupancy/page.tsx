'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OccupancyReport() {
    const occupancyData = [
        { hostel: "Hostel A - Boys", totalRooms: 120, occupiedRooms: 105, capacity: 240, occupied: 210, rate: 87.5 },
        { hostel: "Hostel B - Girls", totalRooms: 100, occupiedRooms: 85, capacity: 200, occupied: 170, rate: 85.0 },
        { hostel: "Hostel C - Boys", totalRooms: 80, occupiedRooms: 60, capacity: 160, occupied: 120, rate: 75.0 },
    ]

    const totalCapacity = occupancyData.reduce((sum, h) => sum + h.capacity, 0)
    const totalOccupied = occupancyData.reduce((sum, h) => sum + h.occupied, 0)
    const overallRate = ((totalOccupied / totalCapacity) * 100).toFixed(1)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/reports">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Hostel Occupancy Report</h1>
                        <p className="text-muted-foreground">Current occupancy status across all hostels</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                </Button>
            </div>

            <Card className="p-6">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Capacity</p>
                        <p className="text-2xl font-bold">{totalCapacity}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Currently Occupied</p>
                        <p className="text-2xl font-bold">{totalOccupied}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1">Overall Occupancy Rate</p>
                        <p className="text-2xl font-bold text-primary">{overallRate}%</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Total Rooms</th>
                                <th className="text-left py-3 px-4">Occupied Rooms</th>
                                <th className="text-left py-3 px-4">Capacity</th>
                                <th className="text-left py-3 px-4">Current Occupancy</th>
                                <th className="text-left py-3 px-4">Occupancy Rate</th>
                                <th className="text-left py-3 px-4">Visual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {occupancyData.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b">
                                    <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                    <td className="py-3 px-4">{hostel.totalRooms}</td>
                                    <td className="py-3 px-4">{hostel.occupiedRooms}</td>
                                    <td className="py-3 px-4">{hostel.capacity}</td>
                                    <td className="py-3 px-4">{hostel.occupied}</td>
                                    <td className="py-3 px-4 font-semibold">{hostel.rate}%</td>
                                    <td className="py-3 px-4">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${hostel.rate}%` }}
                                            />
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
