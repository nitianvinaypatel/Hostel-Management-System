import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"

export default function CaretakerRequisitions() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Requisitions</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>File New Requisition</CardTitle>
                        <CardDescription>Submit a requisition for maintenance, repair, or inventory</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel>Category</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                    <option>Maintenance</option>
                                    <option>Repair</option>
                                    <option>Inventory</option>
                                    <option>Other</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <textarea className="flex min-h-20 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm" placeholder="Describe the requisition"></textarea>
                            </Field>
                            <Field>
                                <FieldLabel>Amount</FieldLabel>
                                <Input type="number" placeholder="Enter estimated amount" />
                            </Field>
                            <Field>
                                <FieldLabel>Urgency</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </Field>
                            <Field>
                                <FieldLabel>Upload Documents</FieldLabel>
                                <Input type="file" />
                                <FieldDescription>Upload invoices, estimates, or related documents</FieldDescription>
                            </Field>
                            <Button type="submit" className="w-full">Submit Requisition</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Requisition History</CardTitle>
                        <CardDescription>Track your submitted requisitions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/10">
                            <div className="p-4 hover:bg-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">AC Repair - Room 101</h3>
                                    <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">Approved</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">Amount: ₹5,000</p>
                                <p className="text-sm text-muted-foreground">Status: Sent to Dean</p>
                            </div>
                            <div className="p-4 hover:bg-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">Furniture Purchase</h3>
                                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-sm">Pending</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">Amount: ₹15,000</p>
                                <p className="text-sm text-muted-foreground">Status: Awaiting Warden Approval</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
