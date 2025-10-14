import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"

export default function RemoveRoom() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Remove Room</h1>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Delete Room</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Field>
                            <FieldLabel>Select Room to Remove</FieldLabel>
                            <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                <option>Room 101 - Floor 1</option>
                                <option>Room 102 - Floor 1</option>
                                <option>Room 103 - Floor 1</option>
                            </select>
                            <FieldDescription>
                                <strong>Warning:</strong> Removing a room is permanent. Make sure the room is empty before removal.
                            </FieldDescription>
                        </Field>
                        <Button type="submit" variant="destructive">Remove Room</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
