export enum ComplaintStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
}

export interface Complaint {
    id: string
    title: string
    description: string
    status: ComplaintStatus
    studentId: string
    hostelId: string
    roomNumber: string
    createdAt: string
    updatedAt: string
}
