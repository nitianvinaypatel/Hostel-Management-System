import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"

export default function RoomCapacity() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Room Capacity Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">200</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Occupied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">150</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">50</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Update Room Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Field>
                            <FieldLabel>Select Room</FieldLabel>
                            <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                <option>Room 101</option>
                                <option>Room 102</option>
                                <option>Room 103</option>
                            </select>
                        </Field>
                        <Field>
                            <FieldLabel>New Capacity</FieldLabel>
                            <Input type="number" placeholder="Enter new capacity" />
                        </Field>
                        <Button type="submit">Update Capacity</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
