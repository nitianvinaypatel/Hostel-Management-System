import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Search, Filter, Download, Edit, Trash2, Users } from "lucide-react"

export default function ViewRooms() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/20">
                        <Eye className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">View Rooms</h1>
                        <p className="text-muted-foreground">Browse and manage all hostel rooms</p>
                    </div>
                </div>
                <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by room number..." className="pl-10" />
                        </div>
                        <select className="flex h-9 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm md:w-40">
                            <option value="">All Floors</option>
                            <option value="1">Floor 1</option>
                            <option value="2">Floor 2</option>
                            <option value="3">Floor 3</option>
                            <option value="4">Floor 4</option>
                        </select>
                        <select className="flex h-9 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm md:w-40">
                            <option value="">All Status</option>
                            <option value="empty">Empty</option>
                            <option value="available">Available</option>
                            <option value="full">Full</option>
                        </select>
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            More Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">150</div>
                        <p className="text-xs text-muted-foreground mt-1">Total Rooms</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-400">30</div>
                        <p className="text-xs text-muted-foreground mt-1">Empty Rooms</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-400">45</div>
                        <p className="text-xs text-muted-foreground mt-1">Partially Filled</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-400">75</div>
                        <p className="text-xs text-muted-foreground mt-1">Fully Occupied</p>
                    </CardContent>
                </Card>
            </div>

            {/* Rooms Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Rooms</CardTitle>
                    <CardDescription>Complete list of hostel rooms with current status</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-white/20 bg-white/5">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Floor</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Capacity</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Occupancy</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">101</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">1st Floor</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm">Double</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-sm">2</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                                                <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                                            </div>
                                            <span className="text-sm">2/2</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                                            Full
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">102</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">1st Floor</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm">Triple</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-sm">3</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                                                <div className="h-full bg-yellow-500" style={{ width: '33%' }}></div>
                                            </div>
                                            <span className="text-sm">1/3</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
                                            Available
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">103</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">1st Floor</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm">Single</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-sm">1</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                                                <div className="h-full bg-blue-500" style={{ width: '0%' }}></div>
                                            </div>
                                            <span className="text-sm">0/1</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                                            Empty
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                        <p className="text-sm text-muted-foreground">Showing 1-3 of 150 rooms</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline">Previous</Button>
                            <Button size="sm" variant="outline">Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
