'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Phone, Mail, MapPin } from "lucide-react"

export default function WardenCaretakers() {
    const [searchTerm, setSearchTerm] = useState("")

    const caretakers = [
        {
            id: "CT001",
            name: "Ram Kumar",
            email: "ram.kumar@hostel.com",
            phoneNumber: "+91 98765 43210",
            assignedBlocks: ["Block A", "Block B"],
            assignedFloors: [1, 2],
            status: "active",
            joinedDate: "2023-06-15",
            tasksCompleted: 145,
            pendingTasks: 3
        },
        {
            id: "CT002",
            name: "Shyam Singh",
            email: "shyam.singh@hostel.com",
            phoneNumber: "+91 98765 43211",
            assignedBlocks: ["Block C"],
            assignedFloors: [1, 2, 3],
            status: "active",
            joinedDate: "2023-08-20",
            tasksCompleted: 98,
            pendingTasks: 5
        },
        {
            id: "CT003",
            name: "Mohan Lal",
            email: "mohan.lal@hostel.com",
            phoneNumber: "+91 98765 43212",
            assignedBlocks: ["Mess Hall", "Common Areas"],
            assignedFloors: [],
            status: "active",
            joinedDate: "2023-05-10",
            tasksCompleted: 167,
            pendingTasks: 2
        },
    ]

    const filteredCaretakers = caretakers.filter(caretaker =>
        caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caretaker.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Caretaker Management</h1>
                    <p className="text-muted-foreground">Manage and assign caretakers to hostel areas</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Assign Caretaker
                </Button>
            </div>

            <Card className="p-6">
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search caretakers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCaretakers.map((caretaker) => (
                        <Card key={caretaker.id} className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">{caretaker.name}</h3>
                                    <p className="text-sm text-muted-foreground">{caretaker.id}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${caretaker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {caretaker.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{caretaker.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{caretaker.phoneNumber}</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-muted-foreground">
                                            {caretaker.assignedBlocks.join(", ")}
                                        </p>
                                        {caretaker.assignedFloors.length > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                Floors: {caretaker.assignedFloors.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                <div className="p-2 border rounded">
                                    <p className="text-xs text-muted-foreground">Completed</p>
                                    <p className="font-semibold">{caretaker.tasksCompleted}</p>
                                </div>
                                <div className="p-2 border rounded">
                                    <p className="text-xs text-muted-foreground">Pending</p>
                                    <p className="font-semibold">{caretaker.pendingTasks}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}
