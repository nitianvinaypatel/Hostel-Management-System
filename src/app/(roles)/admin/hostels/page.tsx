'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, Building2, Loader2 } from "lucide-react"
import { adminService } from "@/services/admin.service"
import { Hostel } from "@/types/admin"

export default function AdminHostels() {
    const [searchTerm, setSearchTerm] = useState("")
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

    const filteredHostels = hostels.filter(hostel =>
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

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

            {error && (
                <Card className="p-4 bg-destructive/10 border-destructive">
                    <p className="text-destructive">{error}</p>
                </Card>
            )}

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

                {filteredHostels.length === 0 ? (
                    <div className="text-center py-12">
                        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No hostels found</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredHostels.map((hostel) => (
                            <Card key={hostel._id} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Building2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{hostel.name}</h3>
                                            <p className="text-sm text-muted-foreground">Code: {hostel.code}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${hostel.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {hostel.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Type</span>
                                        <span className="font-medium capitalize">{hostel.type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Total Rooms</span>
                                        <span className="font-medium">{hostel.totalRooms}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Capacity</span>
                                        <span className="font-medium">{hostel.occupiedCapacity}/{hostel.totalCapacity}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{
                                                width: `${hostel.totalCapacity > 0 ? (hostel.occupiedCapacity / hostel.totalCapacity) * 100 : 0}%`
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground text-right">
                                        {hostel.totalCapacity > 0
                                            ? Math.round((hostel.occupiedCapacity / hostel.totalCapacity) * 100)
                                            : 0}% occupied
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-xs text-muted-foreground mb-2">Facilities:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {hostel.facilities.slice(0, 3).map((facility, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-secondary text-xs rounded"
                                            >
                                                {facility}
                                            </span>
                                        ))}
                                        {hostel.facilities.length > 3 && (
                                            <span className="px-2 py-1 bg-secondary text-xs rounded">
                                                +{hostel.facilities.length - 3} more
                                            </span>
                                        )}
                                    </div>
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
                )}
            </Card>
        </div>
    )
}
