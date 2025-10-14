import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { UserPlus, Zap, Search, Users, CheckCircle2, AlertCircle } from "lucide-react"

export default function RoomAllotment() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/20">
                    <UserPlus className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Room Allotment</h1>
                    <p className="text-muted-foreground">Allocate rooms to students manually or automatically</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Manual Allocation */}
                <Card className="hover:shadow-2xl transition-all">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Search className="h-5 w-5 text-primary" />
                            <CardTitle>Manual Allocation</CardTitle>
                        </div>
                        <CardDescription>Assign a specific room to a student</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel>Student ID</FieldLabel>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input type="text" placeholder="Enter student ID or name" className="pl-10" />
                                </div>
                                <FieldDescription>Search by ID, name, or email</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel>Select Room</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                    <option value="">Choose available room</option>
                                    <optgroup label="Floor 1">
                                        <option value="101">Room 101 - Available (1/2) - Double</option>
                                        <option value="103">Room 103 - Empty (0/1) - Single</option>
                                    </optgroup>
                                    <optgroup label="Floor 2">
                                        <option value="201">Room 201 - Available (1/3) - Triple</option>
                                        <option value="205">Room 205 - Empty (0/2) - Double</option>
                                    </optgroup>
                                </select>
                                <FieldDescription>Only showing rooms with available space</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel>Bed Preference (Optional)</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                    <option value="">No preference</option>
                                    <option value="lower">Lower Bunk</option>
                                    <option value="upper">Upper Bunk</option>
                                    <option value="window">Near Window</option>
                                    <option value="door">Near Door</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel>Allocation Notes</FieldLabel>
                                <textarea
                                    className="flex min-h-20 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm resize-none"
                                    placeholder="Any special notes or requirements..."
                                ></textarea>
                            </Field>

                            <Button type="submit" className="w-full">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Allocate Room
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Automatic Allocation */}
                <Card className="hover:shadow-2xl transition-all">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            <CardTitle>Automatic Allocation</CardTitle>
                        </div>
                        <CardDescription>
                            Automatically allocate rooms based on availability and preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel>Number of Students</FieldLabel>
                                <Input type="number" placeholder="Enter number of students" min="1" />
                                <FieldDescription>Students pending room allocation</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel>Allocation Criteria</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                    <option value="fcfs">First Come First Serve</option>
                                    <option value="merit">By Merit/CGPA</option>
                                    <option value="preference">By Student Preference</option>
                                    <option value="year">By Academic Year</option>
                                    <option value="department">By Department</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel>Room Type Preference</FieldLabel>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm">Single Occupancy</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm">Double Occupancy</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm">Triple Occupancy</span>
                                    </label>
                                </div>
                            </Field>

                            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-blue-400 mb-1">Auto-Allocation Preview</p>
                                        <p className="text-muted-foreground">The system will allocate rooms based on your criteria. You can review and modify allocations before finalizing.</p>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" variant="secondary" className="w-full">
                                <Zap className="h-4 w-4 mr-2" />
                                Start Auto Allocation
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Allocations */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Allocations</CardTitle>
                    <CardDescription>Latest room assignments</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/10">
                        <div className="p-4 hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-blue-500/20">
                                        <Users className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">John Doe (#12345)</p>
                                        <p className="text-sm text-muted-foreground">Allocated to Room 205</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Completed
                                    </span>
                                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-blue-500/20">
                                        <Users className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Jane Smith (#12346)</p>
                                        <p className="text-sm text-muted-foreground">Allocated to Room 103</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Completed
                                    </span>
                                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
