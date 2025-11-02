export enum ComplaintStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
}

export interface Complaint {
    _id?: string
    id: string
    title: string
    description: string
    category: string
    status: ComplaintStatus | string
    studentId?: string
    hostelId?: string
    roomNumber?: string
    date?: string
    createdAt: string
    updatedAt: string
}
