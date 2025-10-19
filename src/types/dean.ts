// Dean Module Types

export interface DeanRequisition {
    id: string
    requisitionNumber: string
    caretakerId: string
    caretakerName: string
    wardenId: string
    wardenName: string
    hostelId: string
    hostelName: string
    type: 'maintenance' | 'supplies' | 'equipment' | 'upgrade' | 'other'
    title: string
    description: string
    estimatedCost: number
    urgency: 'low' | 'medium' | 'high' | 'urgent'
    status: 'pending-warden' | 'approved-by-warden' | 'pending-dean' | 'approved-by-dean' | 'rejected-by-dean' | 'rejected-by-warden' | 'completed'
    submittedAt: string
    wardenApprovedAt?: string
    wardenComments?: string
    deanReviewedAt?: string
    deanComments?: string
    completedAt?: string
    attachments?: string[]
    proofOfDisbursement?: string[]
}

export interface HostelReport {
    id: string
    hostelId: string
    hostelName: string
    type: 'occupancy' | 'complaints' | 'financial' | 'maintenance'
    title: string
    generatedAt: string
    generatedBy: string
    data: Record<string, unknown>
}

export interface FundUsage {
    hostelId: string
    hostelName: string
    totalAllocated: number
    totalSpent: number
    pending: number
    available: number
    requisitionsCount: number
    approvedCount: number
    completedCount: number
}

export interface BudgetAllocation {
    id: string
    hostelId: string
    hostelName: string
    category: 'maintenance' | 'upgrades' | 'supplies' | 'equipment' | 'emergency'
    amount: number
    allocatedFor: string
    fiscalYear: string
    allocatedAt: string
    allocatedBy: string
    status: 'active' | 'exhausted' | 'expired'
    spent: number
    remaining: number
}

export interface DeanAnnouncement {
    id: string
    title: string
    message: string
    type: 'notice' | 'policy' | 'urgent' | 'general'
    targetHostels: string[]
    targetRoles: string[]
    createdBy: string
    createdAt: string
    expiresAt?: string
    attachments?: string[]
}

export interface DeanComment {
    id: string
    requisitionId?: string
    issueType: 'requisition' | 'complaint' | 'report' | 'general'
    issueId: string
    comment: string
    feedback: string
    priority: 'low' | 'medium' | 'high'
    createdBy: string
    createdAt: string
}

export interface FinancialSummary {
    totalBudget: number
    totalSpent: number
    totalPending: number
    totalAvailable: number
    hostelWiseBreakdown: {
        hostelId: string
        hostelName: string
        allocated: number
        spent: number
        pending: number
    }[]
    categoryWiseBreakdown: {
        category: string
        allocated: number
        spent: number
    }[]
}

// Requisition Workflow Status
export type RequisitionStatus =
    | 'pending-caretaker'      // Initial state - Caretaker is filling
    | 'pending-warden'         // Submitted by caretaker, waiting for warden
    | 'returned-to-caretaker'  // Warden requested more info
    | 'approved-by-warden'     // Warden approved, waiting for dean
    | 'rejected-by-warden'     // Warden rejected
    | 'pending-dean'           // Same as approved-by-warden
    | 'approved-by-dean'       // Dean approved, waiting for admin
    | 'rejected-by-dean'       // Dean rejected
    | 'pending-admin'          // Admin processing fund release
    | 'completed'              // Admin marked as completed
    | 'cancelled'              // Cancelled at any stage

export interface RequisitionWorkflow {
    requisitionId: string
    currentStatus: RequisitionStatus
    history: {
        status: RequisitionStatus
        actor: string
        actorRole: 'caretaker' | 'warden' | 'dean' | 'admin'
        timestamp: string
        comments?: string
        attachments?: string[]
    }[]
}
