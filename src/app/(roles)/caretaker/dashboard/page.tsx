import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, AlertCircle, ClipboardList, TrendingUp, TrendingDown, DoorOpen, Wrench } from "lucide-react"

export default function CaretakerDashboard() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Caretaker Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your hostel overview</p>
                </div>
                <Button>Generate Report</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-2xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">150</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all floors</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">120</div>
                        <div className="flex items-center text-xs text-green-400 mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            80% occupancy rate
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Complaints</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">8</div>
                        <div className="flex items-center text-xs text-red-400 mt-1">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            2 urgent
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground mt-1">Room change requests</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates and actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-2 rounded-full bg-blue-500/20">
                                <DoorOpen className="h-4 w-4 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Room 205 allocated</p>
                                <p className="text-xs text-muted-foreground">Student #12345 assigned to Room 205</p>
                                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-2 rounded-full bg-yellow-500/20">
                                <Wrench className="h-4 w-4 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Complaint resolved</p>
                                <p className="text-xs text-muted-foreground">Water leakage in Room 101 fixed</p>
                                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-2 rounded-full bg-green-500/20">
                                <ClipboardList className="h-4 w-4 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Requisition approved</p>
                                <p className="text-xs text-muted-foreground">AC repair requisition approved by warden</p>
                                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Frequently used operations</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <DoorOpen className="h-5 w-5" />
                            <span className="text-xs">Allocate Room</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <span className="text-xs">View Complaints</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <ClipboardList className="h-5 w-5" />
                            <span className="text-xs">File Requisition</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <Building2 className="h-5 w-5" />
                            <span className="text-xs">Manage Rooms</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Room Status Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Room Status Overview</CardTitle>
                    <CardDescription>Current status of rooms by floor</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Floor 1</span>
                                <span className="text-sm text-muted-foreground">30/40 occupied</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Floor 2</span>
                                <span className="text-sm text-muted-foreground">35/40 occupied</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '87.5%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Floor 3</span>
                                <span className="text-sm text-muted-foreground">28/35 occupied</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Floor 4</span>
                                <span className="text-sm text-muted-foreground">27/35 occupied</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: '77%' }}></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
