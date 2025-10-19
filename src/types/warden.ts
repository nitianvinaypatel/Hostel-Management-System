// Warden Module Types

export interface RoomAllotmentRequest {
    id: string
    studentId: string
    studentName: string
    currentRoom?: string
    requestedRoom: string
    requestedBlock: string
    reason: string
    status: 'pending' | 'approved' | 'rejected'
    submittedAt: string
    reviewedAt?: string
    reviewedBy?: string
    comments?: string
}

export interface HostelChangeRequest {
    id: string
    studentId: string
    studentName: string
    currentHostel: string
    requestedHostel: string
    reason: string
    status: 'pending' | 'approved' | 'rejected'
    submittedAt: string
    reviewedAt?: string
    reviewedBy?: string
    comments?: string
}

export interface ComplaintForwarded {
    id: string
    complaintId: string
    studentId: string
    studentName: string
    category: 'maintenance' | 'cleanliness' | 'food' | 'security' | 'other'
    description: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'pending' | 'in-progress' | 'resolved' | 'escalated'
    forwardedBy: string
    forwardedAt: string
    resolvedAt?: string
    resolution?: string
}

export interface MessFeedback {
    id: string
    studentId: string
    studentName: string
    date: string
    mealType: 'breakfast' | 'lunch' | 'dinner'
    rating: number
    qualityRating: number
    quantityRating: number
    tasteRating: number
    comments: string
    submittedAt: string
}

export interface CaretakerRequisition {
    id: string
    caretakerId: string
    caretakerName: string
    type: 'maintenance' | 'supplies' | 'equipment' | 'other'
    title: string
    description: string
    estimatedCost: number
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'pending' | 'approved' | 'rejected' | 'escalated'
    submittedAt: string
    reviewedAt?: string
    comments?: string
}

export interface WardenReport {
    id: string
    type: 'occupancy' | 'complaints' | 'requisitions' | 'payments' | 'mess'
    title: string
    generatedAt: string
    generatedBy: string
    hostelId: string
    data: Record<string, unknown>
}

export interface Announcement {
    id: string
    title: string
    message: string
    type: 'general' | 'urgent' | 'event' | 'policy'
    targetAudience: 'students' | 'caretakers' | 'all'
    createdBy: string
    createdAt: string
    expiresAt?: string
    attachments?: string[]
}

export interface HostelStatistics {
    totalRooms: number
    occupiedRooms: number
    availableRooms: number
    totalCapacity: number
    currentOccupancy: number
    occupancyRate: number
    pendingComplaints: number
    resolvedComplaints: number
    pendingRequisitions: number
    monthlyRevenue: number
    outstandingPayments: number
}

export interface CaretakerAssignment {
    id: string
    caretakerId: string
    caretakerName: string
    email: string
    phoneNumber: string
    assignedBlocks: string[]
    assignedFloors: number[]
    status: 'active' | 'inactive'
    assignedAt: string
}

export interface InventoryItem {
    id: string
    name: string
    category: 'furniture' | 'electronics' | 'supplies' | 'equipment' | 'other'
    quantity: number
    condition: 'good' | 'fair' | 'poor' | 'damaged'
    location: string
    lastInspected: string
    nextInspection: string
    notes?: string
}

export interface InternalMessage {
    id: string
    fromId: string
    fromName: string
    fromRole: 'warden' | 'caretaker' | 'student'
    toId: string
    toName: string
    toRole: 'warden' | 'caretaker' | 'student'
    subject: string
    message: string
    sentAt: string
    readAt?: string
    status: 'unread' | 'read' | 'archived'
}
