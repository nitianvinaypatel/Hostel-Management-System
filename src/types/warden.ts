// Warden Module Types

// ==================== Dashboard Types ====================
export interface DashboardStats {
    totalStudents: number
    occupancyRate: number
    pendingApprovals: number
    activeComplaints: number
    pendingRequisitions: number
    outstandingPayments: number
    messRatings: {
        overall: number
        breakfast: number
        lunch: number
        dinner: number
        totalFeedback: number
    }
}

export interface RecentActivity {
    id: string
    action: string
    type: 'approval' | 'complaint' | 'requisition' | 'announcement'
    student?: string
    caretaker?: string
    message?: string
    time: string
    createdAt: string
}

export interface PendingApprovalSummary {
    id: string
    type: 'Room Allotment' | 'Hostel Change' | 'Complaint'
    student: string
    submitted: string
}

// ==================== Approval Types ====================
export interface Approval {
    id: string
    type: 'room-allotment' | 'hostel-change' | 'complaint'
    student: string
    studentId: string
    email: string
    phone: string
    details: string
    reason: string
    submittedAt: string
    status: 'pending' | 'approved' | 'rejected'
    reviewedAt?: string
    reviewedBy?: string
}

export interface ApprovalsResponse {
    success: boolean
    data: Approval[]
    pagination: {
        total: number
        page: number
        pages: number
        limit: number
    }
    stats: {
        totalApprovals: number
        pending: number
        approved: number
        rejected: number
    }
}

// ==================== Complaint Types ====================
export interface Complaint {
    id: string
    studentId: string
    studentName: string
    email: string
    phone: string
    category: 'maintenance' | 'cleanliness' | 'food' | 'security' | 'other'
    description: string
    priority: 'urgent' | 'high' | 'medium' | 'low'
    status: 'pending' | 'in-progress' | 'resolved' | 'escalated'
    forwardedBy: string
    forwardedAt: string
    roomNumber: string
    resolvedAt?: string
    assignedTo?: string
}

export interface ComplaintsResponse {
    success: boolean
    data: Complaint[]
    pagination: {
        total: number
        page: number
        pages: number
    }
    stats: {
        total: number
        pending: number
        inProgress: number
        resolved: number
    }
}

// ==================== Caretaker Types ====================
export interface Caretaker {
    id: string
    name: string
    email: string
    phoneNumber: string
    assignedBlocks: string[]
    assignedFloors: number[]
    status: 'active' | 'inactive'
    joinedDate: string
    tasksCompleted: number
    pendingTasks: number
    hostelId: string
}

// ==================== Requisition Types ====================
export interface Requisition {
    id: string
    caretakerId: string
    caretakerName: string
    caretakerEmail: string
    caretakerPhone: string
    type: 'maintenance' | 'supplies' | 'equipment' | 'other'
    title: string
    description: string
    estimatedCost: number
    priority: 'urgent' | 'high' | 'medium' | 'low'
    status: 'pending' | 'approved' | 'rejected' | 'escalated'
    submittedAt: string
    reviewedAt?: string
    reviewedBy?: string
}

export interface RequisitionsResponse {
    success: boolean
    data: Requisition[]
    pagination: {
        total: number
        page: number
        pages: number
    }
    stats: {
        total: number
        pending: number
        approved: number
        rejected: number
    }
}

// ==================== Announcement Types ====================
export interface Announcement {
    id: string
    title: string
    message: string
    type: 'general' | 'urgent' | 'event' | 'policy'
    targetAudience: 'students' | 'caretakers' | 'all'
    sentAt: string
    sentBy: string
    hostelId: string
}

// ==================== Inventory Types ====================
export interface InventoryItem {
    id: string
    name: string
    category: 'furniture' | 'electronics' | 'equipment' | 'supplies'
    quantity: number
    condition: 'good' | 'fair' | 'poor' | 'damaged'
    location: string
    lastInspected: string
    nextInspection: string
    notes?: string
    hostelId: string
}

export interface InventoryResponse {
    success: boolean
    data: InventoryItem[]
    stats: {
        total: number
        good: number
        fair: number
        needsAttention: number
    }
}

// ==================== Mess Menu Types ====================
export interface MealDetails {
    items: string[]
    time: string
}

export interface DayMenu {
    id: string
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
    breakfast: MealDetails
    lunch: MealDetails
    snacks: MealDetails
    dinner: MealDetails
    hostelId: string
}

export interface MessFeedback {
    id: string
    studentId: string
    studentName: string
    mealType: 'breakfast' | 'lunch' | 'dinner'
    rating: number
    comment?: string
    date: string
}

export interface MessFeedbackResponse {
    success: boolean
    data: {
        summary: {
            overall: number
            breakfast: number
            lunch: number
            dinner: number
            totalFeedback: number
        }
        feedbacks: MessFeedback[]
    }
}

// ==================== Report Types ====================
export interface OccupancyReport {
    summary: {
        totalRooms: number
        occupiedRooms: number
        totalCapacity: number
        currentOccupancy: number
        occupancyRate: number
    }
    blockWise: Array<{
        block: string
        totalRooms: number
        occupiedRooms: number
        capacity: number
        occupied: number
        rate: number
    }>
}

export interface ComplaintsReport {
    summary: {
        total: number
        resolved: number
        pending: number
        inProgress: number
        resolutionRate: number
        avgResolutionTime: string
    }
    byCategory: Array<{
        category: string
        count: number
        percentage: number
    }>
    byPriority: Array<{
        priority: string
        count: number
        percentage: number
    }>
}

export interface RequisitionsReport {
    summary: {
        total: number
        approved: number
        rejected: number
        pending: number
        totalCost: number
        approvedCost: number
    }
    byType: Array<{
        type: string
        count: number
        totalCost: number
    }>
    byCaretaker: Array<{
        caretakerName: string
        totalRequests: number
        approvedRequests: number
        totalCost: number
    }>
}

export interface PaymentsReport {
    summary: {
        totalStudents: number
        paidStudents: number
        totalDue: number
        totalCollected: number
        totalPending: number
        collectionRate: number
    }
    blockWise: Array<{
        block: string
        totalStudents: number
        paidStudents: number
        totalDue: number
        collected: number
        pending: number
    }>
}

// ==================== Common Response Types ====================
export interface ApiResponse<T> {
    success: boolean
    message?: string
    data: T
    pagination?: {
        total: number
        page: number
        pages: number
        limit: number
    }
}

export interface ApiError {
    success: false
    message: string
    error?: string
    errors?: Array<{
        field: string
        message: string
    }>
}
