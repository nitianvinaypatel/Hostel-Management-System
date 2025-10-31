// Admin Module Types

export interface Hostel {
    _id: string
    id?: string
    name: string
    code: string
    type: 'boys' | 'girls' | 'mixed'
    totalRooms: number
    occupiedRooms?: number
    totalCapacity: number
    occupiedCapacity: number
    capacity?: number
    currentOccupancy?: number
    wardenId?: string
    wardenName?: string
    assistantWardenIds?: string[]
    caretakerId?: string
    caretakerName?: string
    caretakerIds?: string[]
    address: string
    contactNumber: string
    facilities: string[]
    status?: 'active' | 'inactive' | 'maintenance'
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v?: number
}

export interface Room {
    _id: string
    id: string
    hostelId: string
    hostelName?: string
    roomNumber: string
    blockName?: string
    floor: number
    capacity: number
    currentOccupancy: number
    occupants?: string[]
    type: 'single' | 'double' | 'triple' | 'quad'
    roomType: 'single' | 'double' | 'triple' | 'quad'
    status: 'available' | 'occupied' | 'maintenance' | 'reserved'
    facilities: string[]
    monthlyRent: number
    createdAt: string
    updatedAt: string
}

export interface FeeStructure {
    _id: string
    id: string
    hostelId: string
    hostelName?: string
    hostelFee: number
    messFee: number
    securityDeposit: number
    maintenanceFee: number
    otherCharges: number
    totalAmount: number
    academicYear: string
    effectiveFrom: string
    effectiveTo?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface RequisitionApproval {
    _id: string
    id: string
    requisitionId: string
    studentId: string
    studentName: string
    hostelId: string
    hostelName: string
    type: 'leave' | 'guest' | 'maintenance' | 'other'
    title: string
    description: string
    category: string
    estimatedAmount?: number
    urgency: 'low' | 'medium' | 'high'
    status: 'pending' | 'pending-warden' | 'pending-admin' | 'approved' | 'rejected'
    submittedAt: string
    reviewedAt?: string
    reviewedBy?: string
    comments?: string
    createdAt: string
    updatedAt: string
}

export interface Report {
    id: string
    type: 'occupancy' | 'fees' | 'complaints' | 'maintenance' | 'revenue' | 'students'
    title: string
    generatedAt: string
    generatedBy: string
    generatedByName?: string
    startDate?: string
    endDate?: string
    data: Record<string, unknown>
    format?: 'pdf' | 'excel' | 'csv'
}

export interface Notification {
    _id: string
    id: string
    title: string
    message: string
    content?: string
    type: 'emergency' | 'policy' | 'announcement' | 'maintenance' | 'info'
    priority: 'low' | 'medium' | 'high'
    targetRoles: string[]
    targetHostels?: string[]
    createdBy: string
    createdByName?: string
    createdAt: string
    expiresAt?: string
    isActive: boolean
    readBy?: string[]
}

export interface AnalyticsData {
    occupancyRate: number
    totalRevenue: number
    pendingComplaints: number
    resolvedComplaints: number
    maintenanceCosts: number
    newAdmissions: number
    totalStudents: number
    totalHostels: number
    totalRooms: number
    availableRooms: number
    occupancyTrend: { month: string; rate: number }[]
    complaintsTrend: { month: string; count: number }[]
    revenueTrend: { month: string; amount: number }[]
    admissionsTrend?: { month: string; count: number }[]
}

export interface UserManagement {
    _id: string
    id: string
    email: string
    name: string
    role: 'student' | 'caretaker' | 'warden' | 'dean' | 'admin'
    hostelId?: string
    hostelName?: string
    roomId?: string
    roomNumber?: string
    phone?: string
    phoneNumber?: string
    studentId?: string
    course?: string
    branch?: string
    year?: number
    semester?: number
    gender?: 'male' | 'female' | 'other'
    status: 'active' | 'inactive' | 'suspended'
    isActive: boolean
    permissions?: string[]
    profileImage?: string
    createdAt: string
    updatedAt: string
    lastLogin?: string
}

export interface BackupRecord {
    _id: string
    id: string
    filename: string
    size: number
    sizeFormatted?: string
    createdAt: string
    createdBy: string
    createdByName?: string
    type: 'manual' | 'automatic'
    status: 'completed' | 'failed' | 'in-progress'
    downloadUrl?: string
}

export interface Payment {
    _id: string
    id: string
    studentId: string
    studentName?: string
    hostelId: string
    hostelName?: string
    amount: number
    paymentType: 'hostel_fee' | 'mess_fee' | 'security_deposit' | 'maintenance' | 'other'
    status: 'pending' | 'completed' | 'failed' | 'refunded'
    paymentMethod?: 'online' | 'cash' | 'cheque' | 'bank_transfer'
    transactionId?: string
    razorpayOrderId?: string
    razorpayPaymentId?: string
    description?: string
    dueDate?: string
    paidAt?: string
    refundedAt?: string
    refundReason?: string
    createdAt: string
    updatedAt: string
}

export interface Complaint {
    _id: string
    id: string
    studentId: string
    studentName?: string
    hostelId: string
    hostelName?: string
    roomId?: string
    roomNumber?: string
    title: string
    description: string
    category: 'water' | 'electricity' | 'maintenance' | 'cleanliness' | 'food' | 'security' | 'other'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'pending' | 'in_progress' | 'resolved' | 'rejected' | 'closed'
    assignedTo?: string
    assignedToName?: string
    comments?: string
    attachments?: string[]
    resolvedAt?: string
    createdAt: string
    updatedAt: string
}

export interface DashboardStats {
    totalUsers: number
    totalStudents: number
    totalHostels: number
    totalComplaints: number
    totalRequisitions: number
    totalRevenue: number
    totalPayments: number
    totalRooms?: number
    occupiedRooms?: number
    availableRooms?: number
    occupancyRate?: number
    pendingPayments?: number
    pendingComplaints?: number
    resolvedComplaints?: number
    pendingRequisitions?: number
    recentActivities?: Activity[]
}

export interface Activity {
    id: string
    type: 'user' | 'complaint' | 'payment' | 'requisition' | 'hostel' | 'room'
    action: string
    description: string
    userId?: string
    userName?: string
    timestamp: string
    metadata?: Record<string, unknown>
}

export interface AuditLog {
    _id: string
    id: string
    userId: string
    userName?: string
    userRole: string
    action: string
    resource: string
    resourceId?: string
    description: string
    ipAddress?: string
    userAgent?: string
    changes?: Record<string, unknown>
    timestamp: string
    createdAt: string
}

export interface SystemSettings {
    _id: string
    maintenanceMode: boolean
    allowRegistrations: boolean
    maxRoomCapacity: number
    defaultMessFee: number
    defaultHostelFee: number
    defaultSecurityDeposit: number
    academicYear: string
    semesterStartDate?: string
    semesterEndDate?: string
    allowOnlinePayments: boolean
    razorpayEnabled: boolean
    emailNotifications: boolean
    smsNotifications: boolean
    autoBackupEnabled: boolean
    backupFrequency: 'daily' | 'weekly' | 'monthly'
    updatedAt: string
    updatedBy?: string
}

export interface HostelStats {
    hostelId: string
    hostelName: string
    totalRooms: number
    occupiedRooms: number
    availableRooms: number
    occupancyRate: number
    totalStudents: number
    maleStudents: number
    femaleStudents: number
    totalRevenue: number
    pendingPayments: number
    totalComplaints: number
    pendingComplaints: number
    resolvedComplaints: number
}
