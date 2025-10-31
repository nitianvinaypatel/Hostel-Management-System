'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Phone, Mail, MapPin, CheckCircle, Clock, User, Calendar } from "lucide-react"

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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-indigo-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-indigo-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
                            Caretaker Management 👷
                        </h1>
                        <p className="text-muted-foreground text-lg">Manage and assign caretakers to hostel areas</p>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        Assign Caretaker
                    </Button>
                </div>
            </div>

            {/* Search and Content */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search caretakers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-gray-800"
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCaretakers.map((caretaker) => (
                        <div key={caretaker.id} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-primary/10 hover:to-primary/5 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{caretaker.name}</h3>
                                        <p className="text-sm text-muted-foreground font-medium">{caretaker.id}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${caretaker.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700' : 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                                    }`}>
                                    {caretaker.status}
                                </span>
                            </div>

                            <div className="space-y-3 mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-cyan-600" />
                                    <span className="text-muted-foreground font-medium truncate">{caretaker.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-blue-600" />
                                    <span className="text-muted-foreground font-medium">{caretaker.phoneNumber}</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-muted-foreground font-medium">
                                            {caretaker.assignedBlocks.join(", ")}
                                        </p>
                                        {caretaker.assignedFloors.length > 0 && (
                                            <p className="text-xs text-muted-foreground font-medium">
                                                Floors: {caretaker.assignedFloors.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                    <span className="text-muted-foreground font-medium">
                                        Joined: {new Date(caretaker.joinedDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <p className="text-xs text-muted-foreground font-semibold">Completed</p>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">{caretaker.tasksCompleted}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="h-4 w-4 text-orange-600" />
                                        <p className="text-xs text-muted-foreground font-semibold">Pending</p>
                                    </div>
                                    <p className="text-2xl font-bold text-orange-600">{caretaker.pendingTasks}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 hover:scale-105 transition-transform">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 hover:scale-105 transition-transform">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
