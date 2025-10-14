import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, Filter, Clock, CheckCircle2, AlertTriangle, Send } from "lucide-react"

export default function CaretakerComplaints() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/20">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Complaints Management</h1>
                        <p className="text-muted-foreground">View and manage student complaints</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">23</div>
                                <p className="text-xs text-muted-foreground mt-1">Total</p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-yellow-400">8</div>
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
                                <div className="text-2xl font-bold text-blue-400">5</div>
                                <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-400">10</div>
                                <p className="text-xs text-muted-foreground mt-1">Resolved</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-green-400" />
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
                            <Input placeholder="Search complaints..." className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm">All</Button>
                            <Button size="sm" variant="outline">Pending</Button>
                            <Button size="sm" variant="outline">In Progress</Button>
                            <Button size="sm" variant="outline">Resolved</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Complaints List */}
            <div className="space-y-4">
                <Card className="hover:shadow-2xl transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">Water leakage in Room 101</h3>
                                    <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                                        <Clock className="h-3 w-3" />
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span>Reported by: <strong>Student #12345</strong></span>
                                    <span>•</span>
                                    <span>Room 101, Floor 1</span>
                                    <span>•</span>
                                    <span>2 hours ago</span>
                                </div>
                                <p className="text-sm mb-4">There is water leakage from the ceiling in room 101. The issue started yesterday evening and is getting worse. Urgent attention required.</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">High Priority</span>
                                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Maintenance</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark In Progress
                            </Button>
                            <Button size="sm" variant="outline">
                                <Send className="h-4 w-4 mr-2" />
                                Forward to Warden
                            </Button>
                            <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">Broken window in Room 205</h3>
                                    <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                        <AlertTriangle className="h-3 w-3" />
                                        In Progress
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span>Reported by: <strong>Student #12346</strong></span>
                                    <span>•</span>
                                    <span>Room 205, Floor 2</span>
                                    <span>•</span>
                                    <span>1 day ago</span>
                                </div>
                                <p className="text-sm mb-4">Window glass is broken and needs replacement. Temporary covering has been placed.</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Medium Priority</span>
                                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Repair</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            <Button size="sm" variant="secondary">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark Resolved
                            </Button>
                            <Button size="sm" variant="outline">Add Update</Button>
                            <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">AC not working in Room 303</h3>
                                    <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Resolved
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span>Reported by: <strong>Student #12347</strong></span>
                                    <span>•</span>
                                    <span>Room 303, Floor 3</span>
                                    <span>•</span>
                                    <span>3 days ago</span>
                                </div>
                                <p className="text-sm mb-4">AC unit was not cooling properly. Technician has serviced and fixed the issue.</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Low Priority</span>
                                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Maintenance</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            <Button size="sm" variant="ghost">View Details</Button>
                            <Button size="sm" variant="ghost">Reopen</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
