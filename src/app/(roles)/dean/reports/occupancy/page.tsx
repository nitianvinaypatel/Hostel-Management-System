'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Users, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function OccupancyReport() {
    const overallStats = {
        totalCapacity: 2000,
        totalOccupied: 1847,
        totalVacant: 153,
        occupancyRate: 92.4,
        maleStudents: 1124,
        femaleStudents: 723
    }

    const hostelData = [
        {
            hostel: "Hostel A",
            type: "Boys",
            capacity: 500,
            occupied: 478,
            vacant: 22,
            occupancyRate: 95.6,
            blocks: 4,
            floors: 4
        },
        {
            hostel: "Hostel B",
            type: "Girls",
            capacity: 400,
            occupied: 362,
            vacant: 38,
            occupancyRate: 90.5,
            blocks: 3,
            floors: 4
        },
        {
            hostel: "Hostel C",
            type: "Boys",
            capacity: 600,
            occupied: 546,
            vacant: 54,
            occupancyRate: 91.0,
            blocks: 5,
            floors: 4
        },
        {
            hostel: "Hostel D",
            type: "Girls",
            capacity: 500,
            occupied: 461,
            vacant: 39,
            occupancyRate: 92.2,
            blocks: 4,
            floors: 4
        }
    ]

    const blockWiseData = [
        { hostel: "Hostel A", block: "Block A", capacity: 125, occupied: 120, occupancyRate: 96.0 },
        { hostel: "Hostel A", block: "Block B", capacity: 125, occupied: 119, occupancyRate: 95.2 },
        { hostel: "Hostel A", block: "Block C", capacity: 125, occupied: 121, occupancyRate: 96.8 },
        { hostel: "Hostel A", block: "Block D", capacity: 125, occupied: 118, occupancyRate: 94.4 },
        { hostel: "Hostel B", block: "Block A", capacity: 133, occupied: 120, occupancyRate: 90.2 },
        { hostel: "Hostel B", block: "Block B", capacity: 133, occupied: 121, occupancyRate: 91.0 },
        { hostel: "Hostel B", block: "Block C", capacity: 134, occupied: 121, occupancyRate: 90.3 },
    ]

    const floorWiseData = [
        { floor: "Ground Floor", capacity: 500, occupied: 468, occupancyRate: 93.6 },
        { floor: "First Floor", capacity: 500, occupied: 462, occupancyRate: 92.4 },
        { floor: "Second Floor", capacity: 500, occupied: 458, occupancyRate: 91.6 },
        { floor: "Third Floor", capacity: 500, occupied: 459, occupancyRate: 91.8 }
    ]

    const monthlyTrend = [
        { month: "Aug", occupancy: 88.5 },
        { month: "Sep", occupancy: 89.2 },
        { month: "Oct", occupancy: 90.1 },
        { month: "Nov", occupancy: 91.3 },
        { month: "Dec", occupancy: 91.8 },
        { month: "Jan", occupancy: 92.4 }
    ]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dean/reports">
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                Occupancy Report 🏢
                            </h1>
                            <p className="text-muted-foreground text-lg mt-2">Detailed hostel occupancy statistics</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Overall Occupancy Status</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Total Capacity</p>
                        <p className="text-3xl font-bold dark:text-white">{overallStats.totalCapacity}</p>
                    </div>
                    <div className="p-5 border border-green-200 dark:border-green-800 rounded-xl bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Occupied</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{overallStats.totalOccupied}</p>
                    </div>
                    <div className="p-5 border border-orange-200 dark:border-orange-800 rounded-xl bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Vacant</p>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{overallStats.totalVacant}</p>
                    </div>
                    <div className="p-5 border border-primary/30 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Occupancy Rate</p>
                        <p className="text-3xl font-bold text-primary">{overallStats.occupancyRate}%</p>
                    </div>
                    <div className="p-5 border border-blue-200 dark:border-blue-800 rounded-xl bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Male Students</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{overallStats.maleStudents}</p>
                    </div>
                    <div className="p-5 border border-pink-200 dark:border-pink-800 rounded-xl bg-gradient-to-br from-pink-50/80 to-pink-100/50 dark:from-pink-900/20 dark:to-pink-800/20">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">Female Students</p>
                        <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{overallStats.femaleStudents}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold dark:text-white">Overall Occupancy</span>
                        <span className="text-sm font-bold text-primary">{overallStats.occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                            style={{ width: `${overallStats.occupancyRate}%` }}
                        >
                            <span className="text-xs text-white font-medium">{overallStats.occupancyRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Hostel-wise Occupancy</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Hostel</th>
                                <th className="text-left py-3 px-4">Type</th>
                                <th className="text-left py-3 px-4">Capacity</th>
                                <th className="text-left py-3 px-4">Occupied</th>
                                <th className="text-left py-3 px-4">Vacant</th>
                                <th className="text-left py-3 px-4">Occupancy Rate</th>
                                <th className="text-left py-3 px-4">Blocks</th>
                                <th className="text-left py-3 px-4">Floors</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostelData.map((hostel) => (
                                <tr key={hostel.hostel} className="border-b hover:bg-accent/50">
                                    <td className="py-3 px-4 font-medium">{hostel.hostel}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${hostel.type === 'Boys' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                            {hostel.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{hostel.capacity}</td>
                                    <td className="py-3 px-4 text-green-600 font-medium">{hostel.occupied}</td>
                                    <td className="py-3 px-4 text-orange-600 font-medium">{hostel.vacant}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{hostel.occupancyRate}%</span>
                                            {hostel.occupancyRate > 92 ? (
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-orange-600" />
                                            )}
                                        </div>
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className={`h-2 rounded-full ${hostel.occupancyRate > 95 ? 'bg-green-500' :
                                                    hostel.occupancyRate > 90 ? 'bg-blue-500' :
                                                        'bg-orange-500'}`}
                                                style={{ width: `${hostel.occupancyRate}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{hostel.blocks}</td>
                                    <td className="py-3 px-4">{hostel.floors}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Block-wise Distribution</h3>
                    <div className="space-y-3">
                        {blockWiseData.map((block, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <span className="font-medium text-sm">{block.hostel}</span>
                                        <span className="text-muted-foreground text-sm"> - {block.block}</span>
                                    </div>
                                    <span className="text-sm font-semibold">{block.occupancyRate}%</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>{block.occupied} occupied</span>
                                    <span>{block.capacity} capacity</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${block.occupancyRate > 95 ? 'bg-green-500' :
                                            block.occupancyRate > 90 ? 'bg-blue-500' :
                                                'bg-orange-500'}`}
                                        style={{ width: `${block.occupancyRate}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Floor-wise Distribution</h3>
                    <div className="space-y-3">
                        {floorWiseData.map((floor, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-sm">{floor.floor}</span>
                                    <span className="text-sm font-semibold">{floor.occupancyRate}%</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>{floor.occupied} occupied</span>
                                    <span>{floor.capacity} capacity</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${floor.occupancyRate > 95 ? 'bg-green-500' :
                                            floor.occupancyRate > 90 ? 'bg-blue-500' :
                                                'bg-orange-500'}`}
                                        style={{ width: `${floor.occupancyRate}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Monthly Occupancy Trend (Last 6 Months)</h3>
                <div className="space-y-3">
                    {monthlyTrend.map((month) => (
                        <div key={month.month} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">{month.month}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1 text-sm">
                                    <span className="text-muted-foreground">Occupancy Rate</span>
                                    <span className="font-semibold">{month.occupancy}%</span>
                                </div>
                                <div className="relative w-full bg-gray-200 rounded-full h-6">
                                    <div
                                        className="absolute bg-primary h-6 rounded-full"
                                        style={{ width: `${month.occupancy}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white">
                                            {month.occupancy}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-green-900 dark:text-green-100">Positive Trend</p>
                            <p className="text-xs text-green-700 dark:text-green-300 font-medium">Occupancy has increased by 3.9% over the last 6 months</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Key Insights</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50 flex-shrink-0">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">High Occupancy</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Hostel A has the highest occupancy rate at 95.6%, indicating strong demand
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 flex-shrink-0">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">Growing Trend</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Overall occupancy has steadily increased from 88.5% to 92.4% in 6 months
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50 flex-shrink-0">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">Available Capacity</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    153 beds are currently vacant across all hostels, providing room for new admissions
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 flex-shrink-0">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold mb-1 dark:text-white">Balanced Distribution</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Floor-wise occupancy is well-balanced, ranging from 91.6% to 93.6%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
