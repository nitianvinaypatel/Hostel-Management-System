import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';
import { Hostel, Room } from '@/types/admin';

// ==================== Request/Response Types ====================

// User Management Types
interface UserManagement {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    phoneNumber?: string;
    role: 'student' | 'caretaker' | 'warden' | 'dean' | 'admin';
    isActive: boolean;
    lastLogin?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'student' | 'caretaker' | 'warden' | 'dean' | 'admin';
    hostelId?: string;
}

interface UpdateUserRequest {
    name?: string;
    phone?: string;
    hostelId?: string;
}

// Hostel Management Types
interface CreateHostelRequest {
    name: string;
    code: string;
    type: 'boys' | 'girls' | 'mixed';
    totalRooms: number;
    totalCapacity: number;
    facilities: string[];
    address: string;
    contactNumber: string;
}

interface UpdateHostelRequest {
    name?: string;
    totalRooms?: number;
    totalCapacity?: number;
    facilities?: string[];
    address?: string;
    contactNumber?: string;
}

// Room Management Types
interface CreateRoomRequest {
    roomNumber: string;
    hostelId: string;
    floor: number;
    capacity: number;
    roomType: 'single' | 'double' | 'triple' | 'quad';
    facilities: string[];
    monthlyRent: number;
}

interface UpdateRoomRequest {
    capacity?: number;
    facilities?: string[];
    monthlyRent?: number;
    status?: 'available' | 'occupied' | 'maintenance' | 'reserved';
}

// Fee Structure Types
interface FeeStructure {
    id: string;
    hostel: string;
    academicYear: string;
    hostelFee: number;
    messFee: number;
    securityDeposit: number;
    maintenanceFee: number;
    total: number;
    effectiveFrom: string;
    effectiveTo: string;
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
}

interface CreateFeeStructureRequest {
    hostel: string;
    academicYear: string;
    hostelFee: number;
    messFee: number;
    securityDeposit: number;
    maintenanceFee: number;
    effectiveFrom: string;
    effectiveTo: string;
}

interface UpdateFeeStructureRequest {
    hostel?: string;
    academicYear?: string;
    hostelFee?: number;
    messFee?: number;
    securityDeposit?: number;
    maintenanceFee?: number;
    effectiveFrom?: string;
    effectiveTo?: string;
}

// Requisition Types
interface Requisition {
    id: string;
    type: 'leave' | 'guest' | 'maintenance' | string;
    student: string;
    studentId?: string;
    hostel: string;
    description: string;
    submittedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    comments?: string;
    processedBy?: string;
    processedAt?: string;
}

interface ApproveRequisitionRequest {
    comments?: string;
}

interface RejectRequisitionRequest {
    comments: string;
}

// Notification Types
interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'announcement' | 'emergency' | 'policy' | 'maintenance';
    targetRoles: string[];
    targetHostels?: string[];
    sentAt: string;
    sentBy: string;
    createdAt?: string;
}

interface CreateNotificationRequest {
    title: string;
    message: string;
    type: 'announcement' | 'emergency' | 'policy' | 'maintenance';
    targetRoles: string[];
    targetHostels?: string[];
}

// Report Types
interface OccupancyReport {
    summary: {
        totalCapacity: number;
        totalOccupied: number;
        overallRate: number;
    };
    hostels: Array<{
        hostel: string;
        totalRooms: number;
        occupiedRooms: number;
        capacity: number;
        occupied: number;
        rate: number;
    }>;
}

interface ComplaintsReport {
    summary: {
        totalComplaints: number;
        totalResolved: number;
        totalPending: number;
        resolutionRate: number;
    };
    hostels: Array<{
        hostel: string;
        total: number;
        resolved: number;
        pending: number;
        inProgress: number;
        avgResolutionTime: string;
    }>;
    categories: Array<{
        category: string;
        count: number;
        percentage: number;
    }>;
}

interface FeeCollectionReport {
    summary: {
        totalDue: number;
        totalCollected: number;
        totalPending: number;
        collectionRate: number;
    };
    hostels: Array<{
        hostel: string;
        totalStudents: number;
        paidStudents: number;
        totalDue: number;
        collected: number;
        pending: number;
        rate: number;
    }>;
}

interface MaintenanceReport {
    summary: {
        totalCost: number;
        avgCostPerHostel: number;
        totalHostels: number;
    };
    hostels: Array<{
        hostel: string;
        electrical: number;
        plumbing: number;
        carpentry: number;
        painting: number;
        others: number;
        total: number;
    }>;
    monthlyTrend: Array<{
        month: string;
        amount: number;
    }>;
}

interface DashboardStats {
    totalUsers: number;
    totalStudents: number;
    totalHostels: number;
    totalComplaints: number;
    totalRequisitions: number;
    totalRevenue: number;
    totalPayments: number;
    totalDeans: number;
    totalWardens: number;
    totalCaretakers: number;
    totalRooms?: number;
    occupiedRooms?: number;
    availableRooms?: number;
    occupancyRate?: number;
    pendingPayments?: number;
    pendingComplaints?: number;
    resolvedComplaints?: number;
    pendingRequisitions?: number;
    recentActivities?: Activity[];
}

interface Activity {
    id: string;
    type: 'user' | 'complaint' | 'payment' | 'requisition' | 'hostel' | 'room';
    action: string;
    description: string;
    userName?: string;
    timestamp: string;
}

// ==================== Admin API Endpoints ====================

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ==================== 0. Dashboard ====================
        getAdminDashboard: builder.query<ApiResponse<DashboardStats>, void>({
            query: () => '/admin/dashboard',
            providesTags: ['User', 'Student', 'Hostel', 'Room', 'Requisition'],
        }),

        // ==================== 1. User Management ====================

        // Get All Users with filters
        getAllUsers: builder.query<
            PaginatedResponse<UserManagement>,
            { role?: string; isActive?: boolean; page?: number; limit?: number; search?: string }
        >({
            query: ({ role, isActive, page = 1, limit = 20, search }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (role) params.append('role', role);
                if (isActive !== undefined) params.append('isActive', String(isActive));
                if (search) params.append('search', search);
                return `/admin/users?${params}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'User' as const, id: _id })),
                        { type: 'User', id: 'LIST' },
                    ]
                    : [{ type: 'User', id: 'LIST' }],
        }),

        // Get Users by Role (convenience method)
        getUsersByRole: builder.query<
            PaginatedResponse<UserManagement>,
            { role: string; page?: number; limit?: number }
        >({
            query: ({ role, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({
                    role,
                    page: String(page),
                    limit: String(limit)
                });
                return `/admin/users?${params}`;
            },
            providesTags: [{ type: 'User', id: 'LIST' }],
        }),

        // Search Users
        searchUsers: builder.query<
            PaginatedResponse<UserManagement>,
            { search: string; page?: number; limit?: number }
        >({
            query: ({ search, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({
                    search,
                    page: String(page),
                    limit: String(limit)
                });
                return `/admin/users?${params}`;
            },
            providesTags: [{ type: 'User', id: 'LIST' }],
        }),

        // Create User
        createUser: builder.mutation<ApiResponse<UserManagement>, CreateUserRequest>({
            query: (data) => ({
                url: '/admin/users',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        // Update User
        updateUser: builder.mutation<
            ApiResponse<UserManagement>,
            { userId: string; data: UpdateUserRequest }
        >({
            query: ({ userId, data }) => ({
                url: `/admin/users/${userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { userId }) => [
                { type: 'User', id: userId },
                { type: 'User', id: 'LIST' },
            ],
        }),

        // Toggle User Status (activate/deactivate)
        toggleUserStatus: builder.mutation<ApiResponse<UserManagement>, string>({
            query: (userId) => ({
                url: `/admin/users/${userId}/toggle-status`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, userId) => [
                { type: 'User', id: userId },
                { type: 'User', id: 'LIST' },
            ],
        }),

        // Delete User
        deleteUser: builder.mutation<ApiResponse<void>, string>({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        // ==================== 2. Room Management ====================

        // Get All Rooms
        getAllRooms: builder.query<
            PaginatedResponse<Room>,
            { hostelId?: string; page?: number; limit?: number }
        >({
            query: ({ hostelId, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (hostelId) params.append('hostelId', hostelId);
                return `/admin/rooms?${params}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Room' as const, id: _id })),
                        { type: 'Room', id: 'LIST' },
                    ]
                    : [{ type: 'Room', id: 'LIST' }],
        }),

        // Get Rooms by Hostel
        getRoomsByHostel: builder.query<ApiResponse<Room[]>, string>({
            query: (hostelId) => `/admin/rooms?hostelId=${hostelId}`,
            providesTags: [{ type: 'Room', id: 'LIST' }],
        }),

        // Create Room
        createRoom: builder.mutation<ApiResponse<Room>, CreateRoomRequest>({
            query: (data) => ({
                url: '/admin/rooms',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Room', id: 'LIST' }, 'Hostel'],
        }),

        // Update Room
        updateRoom: builder.mutation<
            ApiResponse<Room>,
            { roomId: string; data: UpdateRoomRequest }
        >({
            query: ({ roomId, data }) => ({
                url: `/admin/rooms/${roomId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { roomId }) => [
                { type: 'Room', id: roomId },
                { type: 'Room', id: 'LIST' },
            ],
        }),

        // Delete Room
        deleteRoom: builder.mutation<ApiResponse<void>, string>({
            query: (roomId) => ({
                url: `/admin/rooms/${roomId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Room', id: 'LIST' }, 'Hostel'],
        }),

        // ==================== 3. Fee Structure Management ====================

        // Get All Fee Structures
        getAllFeeStructures: builder.query<
            ApiResponse<FeeStructure[]>,
            { hostelId?: string; academicYear?: string }
        >({
            query: ({ hostelId, academicYear }) => {
                const params = new URLSearchParams();
                if (hostelId) params.append('hostelId', hostelId);
                if (academicYear) params.append('academicYear', academicYear);
                return `/admin/fee-structures?${params}`;
            },
            providesTags: ['Payment'],
        }),

        // Get Fee Structures by Hostel
        getFeeStructuresByHostel: builder.query<ApiResponse<FeeStructure[]>, string>({
            query: (hostelId) => `/admin/fee-structures?hostelId=${hostelId}`,
            providesTags: ['Payment'],
        }),

        // Get Fee Structures by Academic Year
        getFeeStructuresByYear: builder.query<ApiResponse<FeeStructure[]>, string>({
            query: (academicYear) => `/admin/fee-structures?academicYear=${academicYear}`,
            providesTags: ['Payment'],
        }),

        // Create Fee Structure
        createFeeStructure: builder.mutation<ApiResponse<FeeStructure>, CreateFeeStructureRequest>({
            query: (data) => ({
                url: '/admin/fee-structures',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Payment'],
        }),

        // Update Fee Structure
        updateFeeStructure: builder.mutation<
            ApiResponse<FeeStructure>,
            { feeId: string; data: UpdateFeeStructureRequest }
        >({
            query: ({ feeId, data }) => ({
                url: `/admin/fee-structures/${feeId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Payment'],
        }),

        // Delete Fee Structure
        deleteFeeStructure: builder.mutation<ApiResponse<void>, string>({
            query: (feeId) => ({
                url: `/admin/fee-structures/${feeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payment'],
        }),

        // ==================== 4. Requisition Management ====================

        // Get All Requisitions
        getAdminRequisitions: builder.query<
            PaginatedResponse<Requisition>,
            { status?: string; type?: string; search?: string; page?: number; limit?: number }
        >({
            query: ({ status, type, search, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                if (type) params.append('type', type);
                if (search) params.append('search', search);
                return `/admin/requisitions?${params}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Requisition' as const, id })),
                        { type: 'Requisition', id: 'LIST' },
                    ]
                    : [{ type: 'Requisition', id: 'LIST' }],
        }),

        // Get Requisitions by Status
        getRequisitionsByStatus: builder.query<
            PaginatedResponse<Requisition>,
            { status: string; page?: number; limit?: number }
        >({
            query: ({ status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({
                    status,
                    page: String(page),
                    limit: String(limit)
                });
                return `/admin/requisitions?${params}`;
            },
            providesTags: [{ type: 'Requisition', id: 'LIST' }],
        }),

        // Get Requisitions by Type
        getRequisitionsByType: builder.query<
            PaginatedResponse<Requisition>,
            { type: string; page?: number; limit?: number }
        >({
            query: ({ type, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({
                    type,
                    page: String(page),
                    limit: String(limit)
                });
                return `/admin/requisitions?${params}`;
            },
            providesTags: [{ type: 'Requisition', id: 'LIST' }],
        }),

        // Search Requisitions
        searchRequisitions: builder.query<
            PaginatedResponse<Requisition>,
            { search: string; page?: number; limit?: number }
        >({
            query: ({ search, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({
                    search,
                    page: String(page),
                    limit: String(limit)
                });
                return `/admin/requisitions?${params}`;
            },
            providesTags: [{ type: 'Requisition', id: 'LIST' }],
        }),

        // Approve Requisition
        approveRequisition: builder.mutation<
            ApiResponse<Requisition>,
            { requisitionId: string; data?: ApproveRequisitionRequest }
        >({
            query: ({ requisitionId, data }) => ({
                url: `/admin/requisitions/${requisitionId}/approve`,
                method: 'PUT',
                body: data || {},
            }),
            invalidatesTags: (_result, _error, { requisitionId }) => [
                { type: 'Requisition', id: requisitionId },
                { type: 'Requisition', id: 'LIST' },
            ],
        }),

        // Reject Requisition
        rejectRequisition: builder.mutation<
            ApiResponse<Requisition>,
            { requisitionId: string; data: RejectRequisitionRequest }
        >({
            query: ({ requisitionId, data }) => ({
                url: `/admin/requisitions/${requisitionId}/reject`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { requisitionId }) => [
                { type: 'Requisition', id: requisitionId },
                { type: 'Requisition', id: 'LIST' },
            ],
        }),

        // ==================== 5. Notifications ====================

        // Get All Notifications
        getAdminNotifications: builder.query<
            PaginatedResponse<Notification>,
            { page?: number; limit?: number }
        >({
            query: ({ page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                return `/admin/notifications?${params}`;
            },
            providesTags: ['Notification'],
        }),

        // Create Notification
        createNotification: builder.mutation<ApiResponse<Notification>, CreateNotificationRequest>({
            query: (data) => ({
                url: '/admin/notifications',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notification'],
        }),

        // ==================== 6. Reports ====================

        // Occupancy Report
        getOccupancyReport: builder.query<ApiResponse<OccupancyReport>, void>({
            query: () => '/admin/reports/occupancy',
            providesTags: ['Report'],
        }),

        // Complaints Report
        getComplaintsReport: builder.query<ApiResponse<ComplaintsReport>, void>({
            query: () => '/admin/reports/complaints',
            providesTags: ['Report'],
        }),

        // Fee Collection Report
        getFeeCollectionReport: builder.query<ApiResponse<FeeCollectionReport>, void>({
            query: () => '/admin/reports/fees',
            providesTags: ['Report'],
        }),

        // Maintenance Report
        getMaintenanceReport: builder.query<ApiResponse<MaintenanceReport>, void>({
            query: () => '/admin/reports/maintenance',
            providesTags: ['Report'],
        }),

        // Export Report
        exportReport: builder.query<
            Blob,
            { reportType: string; format: string }
        >({
            query: ({ reportType, format }) => ({
                url: `/admin/reports/export?reportType=${reportType}&format=${format}`,
                responseHandler: (response) => response.blob(),
            }),
        }),

        // ==================== 7. Hostel Management ====================

        // Get All Hostels
        getAllHostels: builder.query<
            ApiResponse<Hostel[]>,
            { isActive?: boolean; type?: string }
        >({
            query: ({ isActive, type }) => {
                const params = new URLSearchParams();
                if (isActive !== undefined) params.append('isActive', String(isActive));
                if (type) params.append('type', type);
                return `/admin/hostels?${params}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Hostel' as const, id: _id })),
                        { type: 'Hostel', id: 'LIST' },
                    ]
                    : [{ type: 'Hostel', id: 'LIST' }],
        }),

        // Get Active Hostels
        getActiveHostels: builder.query<ApiResponse<Hostel[]>, void>({
            query: () => '/admin/hostels?isActive=true',
            providesTags: [{ type: 'Hostel', id: 'LIST' }],
        }),

        // Create Hostel
        createHostel: builder.mutation<ApiResponse<Hostel>, CreateHostelRequest>({
            query: (data) => ({
                url: '/admin/hostels',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Hostel', id: 'LIST' }],
        }),

        // Update Hostel
        updateHostel: builder.mutation<
            ApiResponse<Hostel>,
            { hostelId: string; data: UpdateHostelRequest }
        >({
            query: ({ hostelId, data }) => ({
                url: `/admin/hostels/${hostelId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { hostelId }) => [
                { type: 'Hostel', id: hostelId },
                { type: 'Hostel', id: 'LIST' },
            ],
        }),

        // Delete Hostel
        deleteHostel: builder.mutation<ApiResponse<void>, string>({
            query: (hostelId) => ({
                url: `/admin/hostels/${hostelId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Hostel', id: 'LIST' }],
        }),


    }),
});

// ==================== Export Hooks ====================

export const {
    // Dashboard
    useGetAdminDashboardQuery,

    // User Management
    useGetAllUsersQuery,
    useGetUsersByRoleQuery,
    useSearchUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useToggleUserStatusMutation,
    useDeleteUserMutation,

    // Room Management
    useGetAllRoomsQuery,
    useGetRoomsByHostelQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,

    // Fee Structure Management
    useGetAllFeeStructuresQuery,
    useGetFeeStructuresByHostelQuery,
    useGetFeeStructuresByYearQuery,
    useCreateFeeStructureMutation,
    useUpdateFeeStructureMutation,
    useDeleteFeeStructureMutation,

    // Requisition Management
    useGetAdminRequisitionsQuery,
    useGetRequisitionsByStatusQuery,
    useGetRequisitionsByTypeQuery,
    useSearchRequisitionsQuery,
    useApproveRequisitionMutation,
    useRejectRequisitionMutation,

    // Notifications
    useGetAdminNotificationsQuery,
    useCreateNotificationMutation,

    // Reports
    useGetOccupancyReportQuery,
    useGetComplaintsReportQuery,
    useGetFeeCollectionReportQuery,
    useGetMaintenanceReportQuery,
    useExportReportQuery,

    // Hostel Management
    useGetAllHostelsQuery,
    useGetActiveHostelsQuery,
    useCreateHostelMutation,
    useUpdateHostelMutation,
    useDeleteHostelMutation,
} = adminApi;
