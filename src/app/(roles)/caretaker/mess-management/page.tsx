import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"

export default function CaretakerMessManagement() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Mess Menu Management</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Week Menu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="border-l-4 border-primary pl-3">
                            <h3 className="font-semibold">Monday</h3>
                            <p className="text-sm text-muted-foreground">Breakfast: Idli, Sambar, Chutney</p>
                            <p className="text-sm text-muted-foreground">Lunch: Rice, Dal, Sabzi, Roti</p>
                            <p className="text-sm text-muted-foreground">Dinner: Chapati, Paneer Curry, Rice</p>
                        </div>
                        <div className="border-l-4 border-primary pl-3">
                            <h3 className="font-semibold">Tuesday</h3>
                            <p className="text-sm text-muted-foreground">Breakfast: Poha, Tea</p>
                            <p className="text-sm text-muted-foreground">Lunch: Rice, Rajma, Salad</p>
                            <p className="text-sm text-muted-foreground">Dinner: Roti, Mix Veg, Dal</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Update Menu</CardTitle>
                        <CardDescription>Update the mess menu for any day of the week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel>Day</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel>Breakfast</FieldLabel>
                                <Input type="text" placeholder="Enter breakfast menu" />
                            </Field>
                            <Field>
                                <FieldLabel>Lunch</FieldLabel>
                                <Input type="text" placeholder="Enter lunch menu" />
                            </Field>
                            <Field>
                                <FieldLabel>Dinner</FieldLabel>
                                <Input type="text" placeholder="Enter dinner menu" />
                            </Field>
                            <Button type="submit" className="w-full">Update Menu</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
