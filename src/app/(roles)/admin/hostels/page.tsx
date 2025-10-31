'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Plus, Edit, Trash2, Building2, Loader2, Users, Bed, Sparkles } from "lucide-react"
import { adminService } from "@/services/admin.service"
import { Hostel } from "@/types/admin"

export default function AdminHostels() {
    const [hostels, setHostels] = useState<Hostel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchHostels()
    }, [])

    const fetchHostels = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await adminService.getHostels()
            if (response.success) {
                setHostels(response.data)
            }
        } catch (err) {
            setError('Failed to fetch hostels')
            console.error('Error fetching hostels:', err)
        } finally {
            setLoading(false)
        }
    }



    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground animate-pulse">Loading hostels...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 p-1">
            {/* Header Section with Gradient */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white tracking-tight">Hostel Management</h1>
                                <p className="text-blue-100 mt-1">Manage all hostels and their details</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mt-4">
                            <div className="flex items-center gap-2 text-white/90">
                                <Building2 className="h-5 w-5" />
                                <span className="font-semibold">{hostels.length} Hostels</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <Bed className="h-5 w-5" />
                                <span className="font-semibold">{hostels.reduce((acc, h) => acc + h.totalRooms, 0)} Rooms</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <Users className="h-5 w-5" />
                                <span className="font-semibold">{hostels.reduce((acc, h) => acc + h.totalCapacity, 0)} Capacity</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Hostel
                    </Button>
                </div>
            </div>

            {error && (
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/50 dark:to-pink-950/50 border-2 border-red-200 dark:border-red-800 p-4 shadow-lg">
                    <div className="absolute inset-0 bg-red-100/50 dark:bg-red-900/20"></div>
                    <p className="relative text-red-700 dark:text-red-400 font-medium flex items-center gap-2">
                        <span className="h-2 w-2 bg-red-500 dark:bg-red-400 rounded-full animate-pulse"></span>
                        {error}
                    </p>
                </div>
            )}

            {/* Hostels Grid */}
            {hostels.length === 0 ? (
                <Card className="p-16 text-center shadow-xl border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <Building2 className="relative h-20 w-20 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No hostels found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Add a new hostel to get started</p>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {hostels.map((hostel) => {
                        const occupancyPercentage = hostel.totalCapacity > 0
                            ? Math.round((hostel.occupiedCapacity / hostel.totalCapacity) * 100)
                            : 0

                        const getOccupancyColor = (percentage: number) => {
                            if (percentage >= 90) return 'from-red-500 to-pink-500'
                            if (percentage >= 70) return 'from-orange-500 to-yellow-500'
                            return 'from-green-500 to-emerald-500'
                        }

                        return (
                            <Card
                                key={hostel._id}
                                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                            >
                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Sparkle effect on hover */}
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500"></div>

                                <div className="relative p-6 space-y-5">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                                <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                                    <Building2 className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                    {hostel.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                    Code: <span className="text-purple-600 dark:text-purple-400">{hostel.code}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <span className={`relative px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${hostel.isActive
                                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                                : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}>
                                                {hostel.isActive ? '● Active' : '○ Inactive'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 capitalize">{hostel.type}</span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-800">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Bed className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Rooms</span>
                                            </div>
                                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{hostel.totalRooms}</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-800">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Capacity</span>
                                            </div>
                                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{hostel.totalCapacity}</p>
                                        </div>
                                    </div>

                                    {/* Occupancy Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupancy</span>
                                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                                {hostel.occupiedCapacity}/{hostel.totalCapacity}
                                            </span>
                                        </div>
                                        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                            <div
                                                className={`h-full bg-gradient-to-r ${getOccupancyColor(occupancyPercentage)} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                                                style={{ width: `${occupancyPercentage}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-xs font-bold ${occupancyPercentage >= 90 ? 'text-red-600 dark:text-red-400' :
                                                occupancyPercentage >= 70 ? 'text-orange-600 dark:text-orange-400' :
                                                    'text-green-600 dark:text-green-400'
                                                }`}>
                                                {occupancyPercentage}% Occupied
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {hostel.totalCapacity - hostel.occupiedCapacity} available
                                            </span>
                                        </div>
                                    </div>

                                    {/* Facilities */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Facilities</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {hostel.facilities.slice(0, 3).map((facility, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-lg border border-purple-200 dark:border-purple-800 shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    {facility}
                                                </span>
                                            ))}
                                            {hostel.facilities.length > 3 && (
                                                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm">
                                                    +{hostel.facilities.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
