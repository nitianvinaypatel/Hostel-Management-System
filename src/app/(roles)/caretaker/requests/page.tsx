import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClipboardList, Search, CheckCircle2, XCircle, Clock, ArrowRightLeft, Building2 } from "lucide-react"

export default function Requests() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/20">
                        <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Room/Hostel Change Requests</h1>
                        <p className="text-muted-foreground">Manage student room and hostel change requests</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">15</div>
                                <p className="text-xs text-muted-foreground mt-1">Total Requests</p>
                            </div>
                            <ClipboardList className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-yellow-400">5</div>
                                <p className="text-xs text-muted-foreground mt-1">Pending</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-400">8</div>
                                <p className="text-xs text-muted-foreground mt-1">Approved</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-green-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-red-400">2</div>
                                <p className="text-xs text-muted-foreground mt-1">Rejected</p>
                            </div>
                            <XCircle className="h-8 w-8 text-red-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by student ID or name..." className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm">All</Button>
                            <Button size="sm" variant="outline">Pending</Button>
                            <Button size="sm" variant="outline">Approved</Button>
                            <Button size="sm" variant="outline">Rejected</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Requests List */}
            <div className="space-y-4">
                <Card className="hover:shadow-2xl transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-blue-500/20">
                                    <ArrowRightLeft className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg">Room Change Request</h3>
                                        <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                                            <Clock className="h-3 w-3" />
                                            Pending
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Student #12345 - John Doe</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Current Room</p>
                                    <p className="font-semibold">Room 101, Floor 1</p>
                                </div>
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Requested Room</p>
                                    <p className="font-semibold">Room 205, Floor 2</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5">
                                <p className="text-xs text-muted-foreground mb-1">Reason</p>
                                <p className="text-sm">Need to be closer to classrooms for early morning classes. Current room is too far from the academic block.</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Submitted: 2 days ago</span>
                                <span>•</span>
                                <span>Priority: Medium</span>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Request
                            </Button>
                            <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Request
                            </Button>
                            <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-purple-500/20">
                                    <Building2 className="h-5 w-5 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg">Hostel Change Request</h3>
                                        <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                                            <Clock className="h-3 w-3" />
                                            Pending
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Student #12346 - Jane Smith</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Current Hostel</p>
                                    <p className="font-semibold">Hostel A - Room 301</p>
                                </div>
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Requested Hostel</p>
                                    <p className="font-semibold">Hostel B - Ground Floor</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5">
                                <p className="text-xs text-muted-foreground mb-1">Reason</p>
                                <p className="text-sm">Medical reasons - need ground floor accommodation due to mobility issues. Doctor&apos;s certificate attached.</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Submitted: 1 day ago</span>
                                <span>•</span>
                                <span>Priority: High</span>
                                <span>•</span>
                                <span className="text-red-400">Medical Certificate Attached</span>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Request
                            </Button>
                            <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Request
                            </Button>
                            <Button size="sm" variant="ghost">View Certificate</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all opacity-60">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-green-500/20">
                                    <ArrowRightLeft className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg">Room Change Request</h3>
                                        <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Approved
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Student #12347 - Mike Johnson</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">From</p>
                                    <p className="font-semibold">Room 405</p>
                                </div>
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">To</p>
                                    <p className="font-semibold">Room 410</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Approved: 3 days ago</span>
                                <span>•</span>
                                <span>Moved: 2 days ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
