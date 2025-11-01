'use client'

import { useState } from "react"
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
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, DollarSign, Search, Calendar, Building2, Trash2, Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
    useGetAllFeeStructuresQuery,
    useGetAllHostelsQuery,
    useCreateFeeStructureMutation,
    useUpdateFeeStructureMutation,
    useDeleteFeeStructureMutation
} from '@/store/api/adminApi'
import { toast } from "sonner"

type FeeStructure = {
    id: string
    hostel: string
    academicYear: string
    hostelFee: number
    messFee: number
    securityDeposit: number
    maintenanceFee: number
    total: number
    effectiveFrom: string
    effectiveTo: string
    status: string
}

export default function FeeStructure() {
    const [searchQuery, setSearchQuery] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null)
    const [formData, setFormData] = useState({
        hostel: "",
        academicYear: "",
        hostelFee: 0,
        messFee: 0,
        securityDeposit: 0,
        maintenanceFee: 0,
        effectiveFrom: "",
        effectiveTo: ""
    })

    // Redux API hooks
    const { data: response, isLoading, error, refetch } = useGetAllFeeStructuresQuery({})
    const { data: hostelsResponse } = useGetAllHostelsQuery({})
    const [createFeeStructure, { isLoading: isCreating }] = useCreateFeeStructureMutation()
    const [updateFeeStructure, { isLoading: isUpdating }] = useUpdateFeeStructureMutation()
    const [deleteFeeStructure, { isLoading: isDeleting }] = useDeleteFeeStructureMutation()

    const feeStructures = (response?.data || []).map(fee => ({
        ...fee,
        total: (fee.hostelFee || 0) + (fee.messFee || 0) + (fee.securityDeposit || 0) + (fee.maintenanceFee || 0)
    }))

    const hostels = hostelsResponse?.data || []

    // Academic years for dropdown
    const academicYears = [
        "2024-25",
        "2025-26",
        "2026-27",
        "2027-28"
    ]

    const filteredFees = feeStructures.filter(fee =>
        fee.hostel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fee.academicYear.includes(searchQuery)
    )

    const handleAddFee = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createFeeStructure(formData).unwrap()
            toast.success('Fee structure created successfully!')
            setDialogOpen(false)
            setFormData({
                hostel: "",
                academicYear: "",
                hostelFee: 0,
                messFee: 0,
                securityDeposit: 0,
                maintenanceFee: 0,
                effectiveFrom: "",
                effectiveTo: ""
            })
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create fee structure')
        }
    }

    const handleEditClick = (fee: FeeStructure) => {
        setSelectedFee(fee)
        setFormData({
            hostel: fee.hostel,
            academicYear: fee.academicYear,
            hostelFee: fee.hostelFee,
            messFee: fee.messFee,
            securityDeposit: fee.securityDeposit,
            maintenanceFee: fee.maintenanceFee,
            effectiveFrom: fee.effectiveFrom,
            effectiveTo: fee.effectiveTo
        })
        setEditDialogOpen(true)
    }

    const handleEditFee = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFee) return

        try {
            await updateFeeStructure({
                feeId: selectedFee.id,
                data: formData
            }).unwrap()
            toast.success('Fee structure updated successfully!')
            setEditDialogOpen(false)
            setSelectedFee(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update fee structure')
        }
    }

    const handleDeleteClick = (fee: FeeStructure) => {
        setSelectedFee(fee)
        setDeleteDialogOpen(true)
    }

    const handleDeleteFee = async () => {
        if (!selectedFee) return

        try {
            await deleteFeeStructure(selectedFee.id).unwrap()
            toast.success('Fee structure deleted successfully!')
            setDeleteDialogOpen(false)
            setSelectedFee(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to delete fee structure')
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground animate-pulse">Loading fee structures...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">Failed to load fee structures</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/hostels">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                                    Fee Structure
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Manage hostel, mess, and other fees
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
                                <Input
                                    placeholder="Search fees..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Fee Structure
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Add Fee Structure</DialogTitle>
                                        <DialogDescription>
                                            Create a new fee structure for a hostel. All amounts are in INR.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddFee}>
                                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                            <div className="grid gap-2">
                                                <Label htmlFor="hostel">Hostel Name *</Label>
                                                <select
                                                    id="hostel"
                                                    value={formData.hostel}
                                                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                >
                                                    <option value="">Select Hostel</option>
                                                    {hostels.map((hostel) => (
                                                        <option key={hostel._id} value={hostel.name}>
                                                            {hostel.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="academicYear">Academic Year *</Label>
                                                <select
                                                    id="academicYear"
                                                    value={formData.academicYear}
                                                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                >
                                                    <option value="">Select Academic Year</option>
                                                    {academicYears.map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="hostelFee">Hostel Fee *</Label>
                                                    <Input
                                                        id="hostelFee"
                                                        type="number"
                                                        value={formData.hostelFee}
                                                        onChange={(e) => setFormData({ ...formData, hostelFee: parseInt(e.target.value) || 0 })}
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="messFee">Mess Fee *</Label>
                                                    <Input
                                                        id="messFee"
                                                        type="number"
                                                        value={formData.messFee}
                                                        onChange={(e) => setFormData({ ...formData, messFee: parseInt(e.target.value) || 0 })}
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="securityDeposit">Security Deposit *</Label>
                                                    <Input
                                                        id="securityDeposit"
                                                        type="number"
                                                        value={formData.securityDeposit}
                                                        onChange={(e) => setFormData({ ...formData, securityDeposit: parseInt(e.target.value) || 0 })}
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="maintenanceFee">Maintenance Fee *</Label>
                                                    <Input
                                                        id="maintenanceFee"
                                                        type="number"
                                                        value={formData.maintenanceFee}
                                                        onChange={(e) => setFormData({ ...formData, maintenanceFee: parseInt(e.target.value) || 0 })}
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="effectiveFrom">Effective From *</Label>
                                                    <Input
                                                        id="effectiveFrom"
                                                        type="date"
                                                        value={formData.effectiveFrom}
                                                        onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="effectiveTo">Effective To *</Label>
                                                    <Input
                                                        id="effectiveTo"
                                                        type="date"
                                                        value={formData.effectiveTo}
                                                        onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                                                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Total Annual Fee</p>
                                                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                                                    ₹{(formData.hostelFee + formData.messFee + formData.securityDeposit + formData.maintenanceFee).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setDialogOpen(false)}
                                                disabled={isCreating}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isCreating}
                                                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                                            >
                                                {isCreating ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Create Fee Structure
                                                    </>
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Hostels</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{feeStructures.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg. Annual Fee</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                ₹{feeStructures.length > 0 ? Math.round(feeStructures.reduce((acc, f) => acc + (f.total || 0), 0) / feeStructures.length).toLocaleString('en-IN') : '0'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Academic Year</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">2024-25</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fee Structure Cards */}
            <div className="grid gap-6">
                {filteredFees.map((fee) => (
                    <div key={fee.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                                        <DollarSign className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{fee.hostel}</h3>
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
                                                {fee.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Academic Year: {fee.academicYear}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Effective: {new Date(fee.effectiveFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(fee.effectiveTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditClick(fee)}
                                        className="hover:bg-blue-50 dark:hover:bg-blue-950/30"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteClick(fee)}
                                        className="text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/30"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">Hostel Fee</p>
                                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">₹{(fee.hostelFee || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">Mess Fee</p>
                                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">₹{(fee.messFee || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-2">Security Deposit</p>
                                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">₹{(fee.securityDeposit || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow">
                                    <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2">Maintenance Fee</p>
                                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₹{(fee.maintenanceFee || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-xl transition-shadow shadow-emerald-500/20">
                                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Total Annual</p>
                                    <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">₹{(fee.total || 0).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFees.length === 0 && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 shadow-lg">
                    <div className="text-center">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">No fee structures found</h3>
                        <p className="text-muted-foreground mb-4">Try adjusting your search or add a new fee structure</p>
                        <Button onClick={() => setDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Fee Structure
                        </Button>
                    </div>
                </div>
            )}

            {/* Edit Fee Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Fee Structure</DialogTitle>
                        <DialogDescription>
                            Update the fee structure. All amounts are in INR.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditFee}>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-hostel">Hostel Name *</Label>
                                <select
                                    id="edit-hostel"
                                    value={formData.hostel}
                                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select Hostel</option>
                                    {hostels.map((hostel) => (
                                        <option key={hostel._id} value={hostel.name}>
                                            {hostel.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-academicYear">Academic Year *</Label>
                                <select
                                    id="edit-academicYear"
                                    value={formData.academicYear}
                                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select Academic Year</option>
                                    {academicYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-hostelFee">Hostel Fee *</Label>
                                    <Input
                                        id="edit-hostelFee"
                                        type="number"
                                        value={formData.hostelFee}
                                        onChange={(e) => setFormData({ ...formData, hostelFee: parseInt(e.target.value) || 0 })}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-messFee">Mess Fee *</Label>
                                    <Input
                                        id="edit-messFee"
                                        type="number"
                                        value={formData.messFee}
                                        onChange={(e) => setFormData({ ...formData, messFee: parseInt(e.target.value) || 0 })}
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-securityDeposit">Security Deposit *</Label>
                                    <Input
                                        id="edit-securityDeposit"
                                        type="number"
                                        value={formData.securityDeposit}
                                        onChange={(e) => setFormData({ ...formData, securityDeposit: parseInt(e.target.value) || 0 })}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-maintenanceFee">Maintenance Fee *</Label>
                                    <Input
                                        id="edit-maintenanceFee"
                                        type="number"
                                        value={formData.maintenanceFee}
                                        onChange={(e) => setFormData({ ...formData, maintenanceFee: parseInt(e.target.value) || 0 })}
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-effectiveFrom">Effective From *</Label>
                                    <Input
                                        id="edit-effectiveFrom"
                                        type="date"
                                        value={formData.effectiveFrom}
                                        onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-effectiveTo">Effective To *</Label>
                                    <Input
                                        id="edit-effectiveTo"
                                        type="date"
                                        value={formData.effectiveTo}
                                        onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Total Annual Fee</p>
                                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                                    ₹{(formData.hostelFee + formData.messFee + formData.securityDeposit + formData.maintenanceFee).toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditDialogOpen(false)}
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Update Fee Structure
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Fee Structure</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the fee structure for {selectedFee?.hostel}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteFee}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Fee Structure
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
