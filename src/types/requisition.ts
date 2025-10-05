export enum RequisitionStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export interface Requisition {
    id: string
    title: string
    description: string
    amount: number
    status: RequisitionStatus
    requestedBy: string
    hostelId: string
    createdAt: string
    updatedAt: string
}
