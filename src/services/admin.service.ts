import { apiClient } from '@/lib/api-client'
import type {
    UserManagement,
    Hostel,
    Room,
    FeeStructure,
    Report,
    Notification,
    AnalyticsData,
} from '@/types/admin'

interface PaginationParams {
    page?: number
    limit?: number
}

interface UserFilters extends PaginationParams {
    role?: string
    isActive?: boolean
    search?: string
}

interface HostelFilters {
    isActive?: boolean
    type?: 'boys' | 'girls' | 'mixed'
}

interface ReportParams {
    reportType: 'occupancy' | 'fees' | 'complaints' | 'maintenance'
    startDate?: string
    endDate?: string
}

interface CreateUserData {
    email: string
    password: string
    name: string
    role: 'student' | 'caretaker' | 'warden' | 'dean' | 'admin'
    phone: string
    hostelId?: string
}

interface UpdateUserData {
    name?: string
    phone?: string
    isActive?: boolean
    hostelId?: string
}

interface CreateHostelData {
    name: string
    code: string
    type: 'boys' | 'girls' | 'mixed'
    totalRooms: number
    totalCapacity: number
    wardenId?: string
    facilities: string[]
    address: string
    contactNumber: string
}

interface UpdateHostelData {
    name?: string
    facilities?: string[]
    wardenId?: string
    contactNumber?: string
    address?: string
    isActive?: boolean
}

interface CreateRoomData {
    roomNumber: string
    hostelId: string
    floor: number
    capacity: number
    roomType: 'single' | 'double' | 'triple' | 'quad'
    facilities: string[]
    monthlyRent: number
}

interface UpdateRoomData {
    capacity?: number
    facilities?: string[]
    monthlyRent?: number
    status?: 'available' | 'occupied' | 'maintenance' | 'reserved'
}

interface FeeStructureData {
    hostelFee: number
    messFee: number
    securityDeposit: number
    maintenanceFee?: number
    otherCharges?: number
    academicYear: string
    effectiveFrom: string
}

interface AssignWardenData {
    hostelId: string
    wardenId: string
}

interface AssignCaretakerData {
    hostelId: string
    caretakerId: string
}

interface CreateNotificationData {
    title: string
    message: string
    type: 'emergency' | 'policy' | 'announcement' | 'maintenance'
    targetRoles: string[]
    targetHostels?: string[]
    expiresAt?: string
}

interface SystemSettingsData {
    maintenanceMode?: boolean
    allowRegistrations?: boolean
    maxRoomCapacity?: number
    defaultMessFee?: number
    [key: string]: unknown
}

export const adminService = {
    // Dashboard
    getDashboard: () => apiClient('/admin/dashboard'),

    // User Management
    getUsers: (filters?: UserFilters) => {
        const params = new URLSearchParams()
        if (filters?.role) params.append('role', filters.role)
        if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive))
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))
        if (filters?.search) params.append('search', filters.search)

        const query = params.toString()
        return apiClient(`/admin/users${query ? `?${query}` : ''}`)
    },

    getUserById: (userId: string) => apiClient(`/admin/users/${userId}`),

    createUser: (data: CreateUserData) =>
        apiClient('/admin/users', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateUser: (userId: string, data: UpdateUserData) =>
        apiClient(`/admin/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteUser: (userId: string) =>
        apiClient(`/admin/users/${userId}`, {
            method: 'DELETE',
        }),

    toggleUserStatus: (userId: string) =>
        apiClient(`/admin/users/${userId}/toggle-status`, {
            method: 'PUT',
        }),

    resetUserPassword: (userId: string, newPassword: string) =>
        apiClient(`/admin/users/${userId}/reset-password`, {
            method: 'PUT',
            body: JSON.stringify({ newPassword }),
        }),

    // Hostel Management
    getHostels: (filters?: HostelFilters) => {
        const params = new URLSearchParams()
        if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive))
        if (filters?.type) params.append('type', filters.type)

        const query = params.toString()
        return apiClient(`/admin/hostels${query ? `?${query}` : ''}`)
    },

    getHostelById: (hostelId: string) => apiClient(`/admin/hostels/${hostelId}`),

    createHostel: (data: CreateHostelData) =>
        apiClient('/admin/hostels', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateHostel: (hostelId: string, data: UpdateHostelData) =>
        apiClient(`/admin/hostels/${hostelId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteHostel: (hostelId: string) =>
        apiClient(`/admin/hostels/${hostelId}`, {
            method: 'DELETE',
        }),

    getHostelStats: (hostelId: string) =>
        apiClient(`/admin/hostels/${hostelId}/stats`),

    // Room Management
    getRooms: (hostelId?: string, filters?: PaginationParams) => {
        const params = new URLSearchParams()
        if (hostelId) params.append('hostelId', hostelId)
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))

        const query = params.toString()
        return apiClient(`/admin/rooms${query ? `?${query}` : ''}`)
    },

    getRoomById: (roomId: string) => apiClient(`/admin/rooms/${roomId}`),

    createRoom: (data: CreateRoomData) =>
        apiClient('/admin/rooms', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateRoom: (roomId: string, data: UpdateRoomData) =>
        apiClient(`/admin/rooms/${roomId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteRoom: (roomId: string) =>
        apiClient(`/admin/rooms/${roomId}`, {
            method: 'DELETE',
        }),

    bulkCreateRooms: (rooms: CreateRoomData[]) =>
        apiClient('/admin/rooms/bulk', {
            method: 'POST',
            body: JSON.stringify({ rooms }),
        }),

    // Fee Management
    getFeeStructures: (hostelId?: string) => {
        const query = hostelId ? `?hostelId=${hostelId}` : ''
        return apiClient(`/admin/fee-structures${query}`)
    },

    getFeeStructureById: (feeId: string) =>
        apiClient(`/admin/fee-structures/${feeId}`),

    createFeeStructure: (data: FeeStructureData) =>
        apiClient('/admin/fee-structures', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateFeeStructure: (feeId: string, data: Partial<FeeStructureData>) =>
        apiClient(`/admin/fee-structures/${feeId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteFeeStructure: (feeId: string) =>
        apiClient(`/admin/fee-structures/${feeId}`, {
            method: 'DELETE',
        }),

    // Assignments
    assignWarden: (data: AssignWardenData) =>
        apiClient('/admin/assign-warden', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    assignCaretaker: (data: AssignCaretakerData) =>
        apiClient('/admin/assign-caretaker', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    unassignWarden: (hostelId: string) =>
        apiClient(`/admin/hostels/${hostelId}/unassign-warden`, {
            method: 'PUT',
        }),

    unassignCaretaker: (hostelId: string) =>
        apiClient(`/admin/hostels/${hostelId}/unassign-caretaker`, {
            method: 'PUT',
        }),

    // Complaints Management
    getAllComplaints: (filters?: {
        status?: string
        priority?: string
        category?: string
        hostelId?: string
        page?: number
        limit?: number
    }) => {
        const params = new URLSearchParams()
        if (filters?.status) params.append('status', filters.status)
        if (filters?.priority) params.append('priority', filters.priority)
        if (filters?.category) params.append('category', filters.category)
        if (filters?.hostelId) params.append('hostelId', filters.hostelId)
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))

        const query = params.toString()
        return apiClient(`/admin/complaints${query ? `?${query}` : ''}`)
    },

    getComplaintById: (complaintId: string) =>
        apiClient(`/admin/complaints/${complaintId}`),

    updateComplaintStatus: (complaintId: string, status: string, comments?: string) =>
        apiClient(`/admin/complaints/${complaintId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status, comments }),
        }),

    deleteComplaint: (complaintId: string) =>
        apiClient(`/admin/complaints/${complaintId}`, {
            method: 'DELETE',
        }),

    // Requisitions Management
    getRequisitions: (filters?: {
        status?: string
        category?: string
        hostelId?: string
        page?: number
        limit?: number
    }) => {
        const params = new URLSearchParams()
        if (filters?.status) params.append('status', filters.status)
        if (filters?.category) params.append('category', filters.category)
        if (filters?.hostelId) params.append('hostelId', filters.hostelId)
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))

        const query = params.toString()
        return apiClient(`/admin/requisitions${query ? `?${query}` : ''}`)
    },

    getRequisitionById: (requisitionId: string) =>
        apiClient(`/admin/requisitions/${requisitionId}`),

    updateRequisition: (requisitionId: string, data: { action: 'approve' | 'reject', comments?: string }) =>
        apiClient(`/admin/requisitions/${requisitionId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Payments Management
    getAllPayments: (filters?: {
        status?: string
        paymentType?: string
        studentId?: string
        hostelId?: string
        startDate?: string
        endDate?: string
        page?: number
        limit?: number
    }) => {
        const params = new URLSearchParams()
        if (filters?.status) params.append('status', filters.status)
        if (filters?.paymentType) params.append('paymentType', filters.paymentType)
        if (filters?.studentId) params.append('studentId', filters.studentId)
        if (filters?.hostelId) params.append('hostelId', filters.hostelId)
        if (filters?.startDate) params.append('startDate', filters.startDate)
        if (filters?.endDate) params.append('endDate', filters.endDate)
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))

        const query = params.toString()
        return apiClient(`/admin/payments${query ? `?${query}` : ''}`)
    },

    getPaymentById: (paymentId: string) =>
        apiClient(`/admin/payments/${paymentId}`),

    verifyPayment: (paymentId: string) =>
        apiClient(`/admin/payments/${paymentId}/verify`, {
            method: 'PUT',
        }),

    refundPayment: (paymentId: string, reason: string) =>
        apiClient(`/admin/payments/${paymentId}/refund`, {
            method: 'POST',
            body: JSON.stringify({ reason }),
        }),

    // Reports & Analytics
    getReports: (params?: ReportParams) => {
        const searchParams = new URLSearchParams()
        if (params?.reportType) searchParams.append('reportType', params.reportType)
        if (params?.startDate) searchParams.append('startDate', params.startDate)
        if (params?.endDate) searchParams.append('endDate', params.endDate)

        const query = searchParams.toString()
        return apiClient(`/admin/reports${query ? `?${query}` : ''}`)
    },

    getAnalytics: (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams()
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)

        const query = params.toString()
        return apiClient(`/admin/analytics${query ? `?${query}` : ''}`)
    },

    exportReport: (reportType: string, format: 'pdf' | 'excel' | 'csv') =>
        apiClient(`/admin/reports/export?type=${reportType}&format=${format}`),

    // Notifications & Announcements
    getNotifications: (filters?: PaginationParams) => {
        const params = new URLSearchParams()
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))

        const query = params.toString()
        return apiClient(`/admin/notifications${query ? `?${query}` : ''}`)
    },

    createNotification: (data: CreateNotificationData) =>
        apiClient('/admin/notifications', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateNotification: (notificationId: string, data: Partial<CreateNotificationData>) =>
        apiClient(`/admin/notifications/${notificationId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteNotification: (notificationId: string) =>
        apiClient(`/admin/notifications/${notificationId}`, {
            method: 'DELETE',
        }),

    sendBulkNotification: (data: CreateNotificationData) =>
        apiClient('/admin/notifications/bulk', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // System Settings
    getSystemSettings: () => apiClient('/admin/settings'),

    updateSystemSettings: (data: SystemSettingsData) =>
        apiClient('/admin/settings', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Backup & Restore
    createBackup: () =>
        apiClient('/admin/backup', {
            method: 'POST',
        }),

    getBackups: () => apiClient('/admin/backups'),

    restoreBackup: (backupId: string) =>
        apiClient(`/admin/backups/${backupId}/restore`, {
            method: 'POST',
        }),

    deleteBackup: (backupId: string) =>
        apiClient(`/admin/backups/${backupId}`, {
            method: 'DELETE',
        }),

    // Audit Logs
    getAuditLogs: (filters?: {
        userId?: string
        action?: string
        startDate?: string
        endDate?: string
        page?: number
        limit?: number
    }) => {
        const params = new URLSearchParams()
        if (filters?.userId) params.append('userId', filters.userId)
        if (filters?.action) params.append('action', filters.action)
        if (filters?.startDate) params.append('startDate', filters.startDate)
        if (filters?.endDate) params.append('endDate', filters.endDate)
        if (filters?.page) params.append('page', String(filters.page))
        if (filters?.limit) params.append('limit', String(filters.limit))

        const query = params.toString()
        return apiClient(`/admin/audit-logs${query ? `?${query}` : ''}`)
    },

    // Statistics
    getStatistics: () => apiClient('/admin/statistics'),

    getHostelStatistics: (hostelId: string) =>
        apiClient(`/admin/statistics/hostel/${hostelId}`),

    getOccupancyReport: (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams()
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)

        const query = params.toString()
        return apiClient(`/admin/statistics/occupancy${query ? `?${query}` : ''}`)
    },

    getRevenueReport: (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams()
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)

        const query = params.toString()
        return apiClient(`/admin/statistics/revenue${query ? `?${query}` : ''}`)
    },
}
