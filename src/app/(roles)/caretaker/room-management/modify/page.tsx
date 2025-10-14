import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"

export default function ModifyRoom() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Modify Room</h1>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Edit Room Details</CardTitle>
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
                            <FieldLabel>Room Number</FieldLabel>
                            <Input type="text" placeholder="Enter room number" />
                        </Field>
                        <Field>
                            <FieldLabel>Floor</FieldLabel>
                            <Input type="number" placeholder="Enter floor number" />
                        </Field>
                        <Field>
                            <FieldLabel>Room Type</FieldLabel>
                            <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                <option>Single</option>
                                <option>Double</option>
                                <option>Triple</option>
                            </select>
                        </Field>
                        <Field>
                            <FieldLabel>Capacity</FieldLabel>
                            <Input type="number" placeholder="Enter capacity" />
                        </Field>
                        <Button type="submit">Update Room</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
