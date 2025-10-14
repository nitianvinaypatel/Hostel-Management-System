import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Plus, DoorOpen, Info } from "lucide-react"

export default function AddRoom() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/20">
                    <Plus className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Add New Room</h1>
                    <p className="text-muted-foreground">Create a new room in the hostel</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Room Details</CardTitle>
                            <CardDescription>Enter the basic information for the new room</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Room Number</FieldLabel>
                                        <Input type="text" placeholder="e.g., 101" />
                                        <FieldDescription>Unique room identifier</FieldDescription>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Floor</FieldLabel>
                                        <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                            <option value="">Select floor</option>
                                            <option value="1">Floor 1</option>
                                            <option value="2">Floor 2</option>
                                            <option value="3">Floor 3</option>
                                            <option value="4">Floor 4</option>
                                        </select>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Room Type</FieldLabel>
                                        <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                            <option value="">Select type</option>
                                            <option value="single">Single Occupancy</option>
                                            <option value="double">Double Occupancy</option>
                                            <option value="triple">Triple Occupancy</option>
                                            <option value="quad">Quad Occupancy</option>
                                        </select>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Capacity</FieldLabel>
                                        <Input type="number" placeholder="e.g., 2" min="1" max="4" />
                                        <FieldDescription>Maximum students</FieldDescription>
                                    </Field>
                                </div>

                                <Field>
                                    <FieldLabel>Room Amenities</FieldLabel>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                            <input type="checkbox" className="rounded" />
                                            <span className="text-sm">AC</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                            <input type="checkbox" className="rounded" />
                                            <span className="text-sm">Attached Bathroom</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                            <input type="checkbox" className="rounded" />
                                            <span className="text-sm">Balcony</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                            <input type="checkbox" className="rounded" />
                                            <span className="text-sm">Study Table</span>
                                        </label>
                                    </div>
                                </Field>

                                <Field>
                                    <FieldLabel>Additional Notes</FieldLabel>
                                    <textarea
                                        className="flex min-h-20 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm resize-none"
                                        placeholder="Any special notes about this room..."
                                    ></textarea>
                                </Field>

                                <div className="flex gap-3">
                                    <Button type="submit" className="flex-1">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Room
                                    </Button>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                Guidelines
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <p>• Room numbers should be unique across the hostel</p>
                            <p>• Capacity should match the room type selected</p>
                            <p>• Ensure all amenities are accurately marked</p>
                            <p>• Double-check floor number before submission</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DoorOpen className="h-4 w-4" />
                                Current Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total Rooms</span>
                                <span className="font-semibold">150</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Available</span>
                                <span className="font-semibold text-green-400">30</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Occupied</span>
                                <span className="font-semibold text-blue-400">120</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
