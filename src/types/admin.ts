// Admin Module Types

export interface Hostel {
    id: string
    name: string
    type: 'boys' | 'girls' | 'mixed'
    totalRooms: number
    occupiedRooms: number
    capacity: number
    currentOccupancy: number
    wardenId?: string
    wardenName?: string
    address: string
    facilities: string[]
    status: 'active' | 'inactive' | 'maintenance'
    createdAt: string
    updatedAt: string
}

export interface Room {
    id: string
    hostelId: string
    roomNumber: string
    blockName: string
    floor: number
    capacity: number
    currentOccupancy: number
    type: 'single' | 'double' | 'triple' | 'quad'
    status: 'available' | 'occupied' | 'maintenance' | 'reserved'
    facilities: string[]
    monthlyRent: number
}

export interface FeeStructure {
    id: string
    hostelId: string
    hostelFee: number
    messFee: number
    securityDeposit: number
    maintenanceFee: number
    otherCharges: number
    academicYear: string
    effectiveFrom: string
    effectiveTo: string
}

export interface RequisitionApproval {
    id: string
    requisitionId: string
    studentId: string
    studentName: string
    hostelId: string
    hostelName: string
    type: 'leave' | 'guest' | 'maintenance' | 'other'
    description: string
    status: 'pending' | 'approved' | 'rejected'
    submittedAt: string
    reviewedAt?: string
    reviewedBy?: string
    comments?: string
}

export interface Report {
    id: string
    type: 'occupancy' | 'fees' | 'complaints' | 'maintenance'
    title: string
    generatedAt: string
    generatedBy: string
    data: Record<string, unknown>
}

export interface Notification {
    id: string
    title: string
    message: string
    type: 'emergency' | 'policy' | 'announcement' | 'maintenance'
    targetRoles: string[]
    targetHostels?: string[]
    createdBy: string
    createdAt: string
    expiresAt?: string
}

export interface AnalyticsData {
    occupancyRate: number
    totalRevenue: number
    pendingComplaints: number
    resolvedComplaints: number
    maintenanceCosts: number
    newAdmissions: number
    occupancyTrend: { month: string; rate: number }[]
    complaintsTrend: { month: string; count: number }[]
    revenueTrend: { month: string; amount: number }[]
}

export interface UserManagement {
    id: string
    email: string
    name: string
    role: 'student' | 'caretaker' | 'warden' | 'dean' | 'admin'
    hostelId?: string
    roomNumber?: string
    phoneNumber?: string
    status: 'active' | 'inactive' | 'suspended'
    permissions?: string[]
    createdAt: string
    updatedAt: string
}

export interface BackupRecord {
    id: string
    filename: string
    size: number
    createdAt: string
    createdBy: string
    type: 'manual' | 'automatic'
    status: 'completed' | 'failed' | 'in-progress'
}
