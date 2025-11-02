'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Search, Plus, Edit, Phone, Mail, MapPin, CheckCircle, Clock, User, Calendar, ArrowLeft, Eye, Loader2 } from "lucide-react"
import {
    useGetWardenCaretakersQuery,
    useCreateWardenCaretakerMutation,
    useUpdateWardenCaretakerMutation,
    useToggleWardenCaretakerStatusMutation
} from "@/store/api/wardenApi"
import type { Caretaker } from "@/types/warden"

export default function WardenCaretakers() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCaretaker, setSelectedCaretaker] = useState<Caretaker | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [assignDialogOpen, setAssignDialogOpen] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        assignedBlocks: "",
        assignedFloors: "",
    })
    const [newCaretakerData, setNewCaretakerData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        assignedBlocks: "",
        assignedFloors: "",
    })

    // RTK Query hooks
    const { data: caretakersData, isLoading, error } = useGetWardenCaretakersQuery({ search: searchTerm })
    const [createCaretaker, { isLoading: isCreating }] = useCreateWardenCaretakerMutation()
    const [updateCaretaker, { isLoading: isUpdating }] = useUpdateWardenCaretakerMutation()
    const [toggleStatus] = useToggleWardenCaretakerStatusMutation()

    const caretakers = caretakersData?.data || []

    const filteredCaretakers = caretakers.filter(caretaker =>
        caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caretaker.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleViewDetails = (caretaker: Caretaker) => {
        setSelectedCaretaker(caretaker)
        setViewDialogOpen(true)
    }

    const handleEditClick = (caretaker: Caretaker) => {
        setSelectedCaretaker(caretaker)
        setEditFormData({
            name: caretaker.name,
            email: caretaker.email,
            phoneNumber: caretaker.phoneNumber,
            assignedBlocks: caretaker.assignedBlocks.join(", "),
            assignedFloors: caretaker.assignedFloors.join(", "),
        })
        setEditDialogOpen(true)
    }

    const handleEditSubmit = async () => {
        if (!selectedCaretaker) return

        try {
            await updateCaretaker({
                id: selectedCaretaker.id,
                data: {
                    name: editFormData.name,
                    email: editFormData.email,
                    phoneNumber: editFormData.phoneNumber,
                    assignedBlocks: editFormData.assignedBlocks.split(",").map(b => b.trim()),
                    assignedFloors: editFormData.assignedFloors.split(",").map(f => parseInt(f.trim())).filter(f => !isNaN(f)),
                }
            }).unwrap()

            toast.success(`Caretaker ${editFormData.name} updated successfully!`)
            setEditDialogOpen(false)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update caretaker')
            console.error('Failed to update caretaker:', err)
        }
    }

    const handleAssignCaretaker = async () => {
        try {
            await createCaretaker({
                name: newCaretakerData.name,
                email: newCaretakerData.email,
                phoneNumber: newCaretakerData.phoneNumber,
                assignedBlocks: newCaretakerData.assignedBlocks.split(",").map(b => b.trim()),
                assignedFloors: newCaretakerData.assignedFloors.split(",").map(f => parseInt(f.trim())).filter(f => !isNaN(f)),
            }).unwrap()

            toast.success("New caretaker assigned successfully!")
            setAssignDialogOpen(false)
            setNewCaretakerData({
                name: "",
                email: "",
                phoneNumber: "",
                assignedBlocks: "",
                assignedFloors: "",
            })
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create caretaker')
            console.error('Failed to create caretaker:', err)
        }
    }

    const handleToggleStatus = async (caretakerId: string) => {
        try {
            await toggleStatus(caretakerId).unwrap()
            toast.success('Caretaker status updated successfully!')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update status')
            console.error('Failed to toggle status:', err)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-indigo-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-indigo-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                                    Caretaker Management
                                </h1>
                                <p className="text-muted-foreground text-lg">Manage and assign caretakers to hostel areas</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search caretakers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            <Button
                                onClick={() => setAssignDialogOpen(true)}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Assign Caretaker
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Caretakers Grid */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto text-cyan-500" />
                            <p className="text-muted-foreground">Loading caretakers...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="text-red-500 text-4xl mb-3">⚠️</div>
                        <p className="text-muted-foreground">Failed to load caretakers</p>
                    </div>
                ) : filteredCaretakers.length === 0 ? (
                    <div className="text-center py-12">
                        <User className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">No caretakers found</p>
                    </div>
                ) : (
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 hover:scale-105 transition-transform"
                                        onClick={() => handleEditClick(caretaker)}
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 hover:scale-105 transition-transform"
                                        onClick={() => handleViewDetails(caretaker)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Caretaker Details</DialogTitle>
                        <DialogDescription>Complete information about the caretaker</DialogDescription>
                    </DialogHeader>
                    {selectedCaretaker && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Caretaker ID</Label>
                                    <p className="font-semibold">{selectedCaretaker.id}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Name</Label>
                                    <p className="font-semibold">{selectedCaretaker.name}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Email</Label>
                                    <p className="font-semibold">{selectedCaretaker.email}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Phone</Label>
                                    <p className="font-semibold">{selectedCaretaker.phoneNumber}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Status</Label>
                                    <p className="font-semibold capitalize">{selectedCaretaker.status}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Joined Date</Label>
                                    <p className="font-semibold">{new Date(selectedCaretaker.joinedDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Assigned Blocks</Label>
                                    <p className="font-semibold">{selectedCaretaker.assignedBlocks.join(", ")}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Assigned Floors</Label>
                                    <p className="font-semibold">
                                        {selectedCaretaker.assignedFloors.length > 0
                                            ? selectedCaretaker.assignedFloors.join(", ")
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Tasks Completed</Label>
                                    <p className="font-semibold text-green-600">{selectedCaretaker.tasksCompleted}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Pending Tasks</Label>
                                    <p className="font-semibold text-orange-600">{selectedCaretaker.pendingTasks}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Caretaker</DialogTitle>
                        <DialogDescription>Update caretaker information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-phone">Phone Number</Label>
                                <Input
                                    id="edit-phone"
                                    value={editFormData.phoneNumber}
                                    onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-blocks">Assigned Blocks (comma-separated)</Label>
                                <Input
                                    id="edit-blocks"
                                    value={editFormData.assignedBlocks}
                                    onChange={(e) => setEditFormData({ ...editFormData, assignedBlocks: e.target.value })}
                                    placeholder="Block A, Block B"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="edit-floors">Assigned Floors (comma-separated numbers)</Label>
                                <Input
                                    id="edit-floors"
                                    value={editFormData.assignedFloors}
                                    onChange={(e) => setEditFormData({ ...editFormData, assignedFloors: e.target.value })}
                                    placeholder="1, 2, 3"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleEditSubmit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Assign New Caretaker Dialog */}
            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Assign New Caretaker</DialogTitle>
                        <DialogDescription>Add a new caretaker to the hostel</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-name">Name</Label>
                                <Input id="new-name" placeholder="Enter name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-email">Email</Label>
                                <Input id="new-email" type="email" placeholder="Enter email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-phone">Phone Number</Label>
                                <Input id="new-phone" placeholder="Enter phone number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-blocks">Assigned Blocks</Label>
                                <Input id="new-blocks" placeholder="Block A, Block B" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="new-floors">Assigned Floors</Label>
                                <Input id="new-floors" placeholder="1, 2, 3" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleAssignCaretaker}>Assign Caretaker</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
