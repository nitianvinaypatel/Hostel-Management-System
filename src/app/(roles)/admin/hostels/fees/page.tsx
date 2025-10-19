'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, DollarSign } from "lucide-react"

export default function FeeStructure() {
    const feeStructures = [
        {
            id: "1",
            hostel: "Hostel A - Boys",
            academicYear: "2024-25",
            hostelFee: 25000,
            messFee: 18000,
            securityDeposit: 10000,
            maintenanceFee: 5000,
            total: 58000,
            effectiveFrom: "2024-07-01",
            effectiveTo: "2025-06-30"
        },
        {
            id: "2",
            hostel: "Hostel B - Girls",
            academicYear: "2024-25",
            hostelFee: 28000,
            messFee: 18000,
            securityDeposit: 10000,
            maintenanceFee: 5000,
            total: 61000,
            effectiveFrom: "2024-07-01",
            effectiveTo: "2025-06-30"
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Fee Structure</h1>
                    <p className="text-muted-foreground">Manage hostel, mess, and other fees</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Fee Structure
                </Button>
            </div>

            <div className="grid gap-6">
                {feeStructures.map((fee) => (
                    <Card key={fee.id} className="p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{fee.hostel}</h3>
                                    <p className="text-sm text-muted-foreground">Academic Year: {fee.academicYear}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Effective: {new Date(fee.effectiveFrom).toLocaleDateString()} - {new Date(fee.effectiveTo).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Hostel Fee</p>
                                <p className="text-xl font-bold">₹{fee.hostelFee.toLocaleString()}</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Mess Fee</p>
                                <p className="text-xl font-bold">₹{fee.messFee.toLocaleString()}</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Security Deposit</p>
                                <p className="text-xl font-bold">₹{fee.securityDeposit.toLocaleString()}</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Maintenance Fee</p>
                                <p className="text-xl font-bold">₹{fee.maintenanceFee.toLocaleString()}</p>
                            </div>
                            <div className="p-4 border rounded-lg bg-primary/5">
                                <p className="text-sm text-muted-foreground mb-1">Total Annual</p>
                                <p className="text-xl font-bold text-primary">₹{fee.total.toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
