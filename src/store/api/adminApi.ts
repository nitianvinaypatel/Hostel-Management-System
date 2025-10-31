import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';
import { Hostel, Room } from '@/types/admin';

interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
    role: string;
    phone?: string;
}

interface CreateHostelRequest {
    name: string;
    code: string;
    type: 'boys' | 'girls' | 'mixed';
    totalRooms: number;
    totalCapacity: number;
    wardenId?: string;
    facilities: string[];
    address: string;
    contactNumber: string;
}

interface CreateRoomRequest {
    roomNumber: string;
    hostelId: string;
    floor: number;
    capacity: number;
    roomType: string;
    facilities: string[];
    monthlyRent: number;
}

interface FeeStructureRequest {
    hostelFee: number;
    messFee: number;
    securityDeposit: number;
}

interface ProcessRequisitionRequest {
    action: 'complete' | 'cancel';
    actualAmount?: number;
    proofUrl?: string;
    comments?: string;
}

interface BroadcastRequest {
    title: string;
    content: string;
    targetRole: string;
    priority: string;
}

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard
        getAdminDashboard: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/dashboard',
            providesTags: ['Student', 'Hostel', 'Payment'],
        }),

        getAdminStatistics: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/statistics',
            providesTags: ['Student', 'Hostel', 'Payment'],
        }),

        // User Management
        getAllUsers: builder.query<
            PaginatedResponse<any>,
            { role?: string; isActive?: boolean; page?: number; limit?: number; search?: string }
        >({
            query: ({ role, isActive, page = 1, limit = 20, search }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (role) params.append('role', role);
                if (isActive !== undefined) params.append('isActive', String(isActive));
                if (search) params.append('search', search);
                return `/admin/users?${params}`;
            },
            providesTags: ['User'],
        }),

        getUserById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/admin/users/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),

        createUser: builder.mutation<ApiResponse<any>, CreateUserRequest>({
            query: (data) => ({
                url: '/admin/users',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        updateUser: builder.mutation<ApiResponse<any>, { userId: string; data: Partial<CreateUserRequest> }>({
            query: ({ userId, data }) => ({
                url: `/admin/users/${userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'User', id: userId }, 'User'],
        }),

        deleteUser: builder.mutation<ApiResponse<void>, string>({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        activateUser: builder.mutation<ApiResponse<any>, string>({
            query: (userId) => ({
                url: `/admin/users/${userId}/activate`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
        }),

        deactivateUser: builder.mutation<ApiResponse<any>, string>({
            query: (userId) => ({
                url: `/admin/users/${userId}/deactivate`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
        }),

        resetUserPassword: builder.mutation<ApiResponse<any>, { userId: string; newPassword: string }>({
            query: ({ userId, newPassword }) => ({
                url: `/admin/users/${userId}/reset-password`,
                method: 'PUT',
                body: { newPassword },
            }),
        }),

        // Hostel Management
        getAllHostels: builder.query<ApiResponse<Hostel[]>, { isActive?: boolean; type?: string }>({
            query: ({ isActive, type }) => {
                const params = new URLSearchParams();
                if (isActive !== undefined) params.append('isActive', String(isActive));
                if (type) params.append('type', type);
                return `/admin/hostels?${params}`;
            },
            providesTags: ['Hostel'],
        }),

        getHostelById: builder.query<ApiResponse<Hostel>, string>({
            query: (id) => `/admin/hostels/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Hostel', id }],
        }),

        createHostel: builder.mutation<ApiResponse<Hostel>, CreateHostelRequest>({
            query: (data) => ({
                url: '/admin/hostels',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Hostel'],
        }),

        updateHostel: builder.mutation<ApiResponse<Hostel>, { hostelId: string; data: Partial<CreateHostelRequest> }>({
            query: ({ hostelId, data }) => ({
                url: `/admin/hostels/${hostelId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { hostelId }) => [{ type: 'Hostel', id: hostelId }, 'Hostel'],
        }),

        deleteHostel: builder.mutation<ApiResponse<void>, string>({
            query: (hostelId) => ({
                url: `/admin/hostels/${hostelId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Hostel'],
        }),

        assignWarden: builder.mutation<ApiResponse<any>, { hostelId: string; wardenId: string }>({
            query: ({ hostelId, wardenId }) => ({
                url: `/admin/hostels/${hostelId}/assign-warden`,
                method: 'PUT',
                body: { wardenId },
            }),
            invalidatesTags: (_result, _error, { hostelId }) => [{ type: 'Hostel', id: hostelId }],
        }),

        assignCaretakerToHostel: builder.mutation<ApiResponse<any>, { hostelId: string; caretakerId: string }>({
            query: ({ hostelId, caretakerId }) => ({
                url: `/admin/hostels/${hostelId}/assign-caretaker`,
                method: 'PUT',
                body: { caretakerId },
            }),
            invalidatesTags: (_result, _error, { hostelId }) => [{ type: 'Hostel', id: hostelId }],
        }),

        updateFeeStructure: builder.mutation<ApiResponse<any>, { hostelId: string; data: FeeStructureRequest }>({
            query: ({ hostelId, data }) => ({
                url: `/admin/hostels/${hostelId}/fee-structure`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { hostelId }) => [{ type: 'Hostel', id: hostelId }],
        }),

        // Room Management
        getAllRooms: builder.query<ApiResponse<Room[]>, void>({
            query: () => '/admin/rooms',
            providesTags: ['Room'],
        }),

        getRoomById: builder.query<ApiResponse<Room>, string>({
            query: (id) => `/admin/rooms/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Room', id }],
        }),

        createRoom: builder.mutation<ApiResponse<Room>, CreateRoomRequest>({
            query: (data) => ({
                url: '/admin/rooms',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room'],
        }),

        updateAdminRoom: builder.mutation<ApiResponse<Room>, { id: string; data: Partial<CreateRoomRequest> }>({
            query: ({ id, data }) => ({
                url: `/admin/rooms/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Room', id }, 'Room'],
        }),

        deleteAdminRoom: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/admin/rooms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Room'],
        }),

        bulkCreateRooms: builder.mutation<ApiResponse<any>, { rooms: CreateRoomRequest[] }>({
            query: (data) => ({
                url: '/admin/rooms/bulk-create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room'],
        }),

        // Student Management
        getAllStudents: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/admin/students?page=${page}&limit=${limit}`,
            providesTags: ['Student'],
        }),

        getStudentById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/admin/students/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Student', id }],
        }),

        createStudent: builder.mutation<ApiResponse<any>, any>({
            query: (data) => ({
                url: '/admin/students',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Student'],
        }),

        updateStudent: builder.mutation<ApiResponse<any>, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/students/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Student', id }, 'Student'],
        }),

        deleteStudent: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/admin/students/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Student'],
        }),

        bulkImportStudents: builder.mutation<ApiResponse<any>, FormData>({
            query: (data) => ({
                url: '/admin/students/bulk-import',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Student'],
        }),

        // Payment Management
        getAllPayments: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/admin/payments?page=${page}&limit=${limit}`,
            providesTags: ['Payment'],
        }),

        getPaymentByIdAdmin: builder.query<ApiResponse<any>, string>({
            query: (id) => `/admin/payments/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Payment', id }],
        }),

        generateFees: builder.mutation<ApiResponse<any>, { semester: string; academicYear: string }>({
            query: (data) => ({
                url: '/admin/payments/generate-fees',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Payment'],
        }),

        processRefund: builder.mutation<ApiResponse<any>, { id: string; refundAmount: number; reason: string }>({
            query: ({ id, refundAmount, reason }) => ({
                url: `/admin/payments/${id}/refund`,
                method: 'PUT',
                body: { refundAmount, reason },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Payment', id }, 'Payment'],
        }),

        getFeeDefaulters: builder.query<ApiResponse<any[]>, void>({
            query: () => '/admin/payments/defaulters',
            providesTags: ['Payment'],
        }),

        // Requisitions
        getAdminRequisitions: builder.query<PaginatedResponse<any>, { status?: string; page?: number; limit?: number }>({
            query: ({ status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                return `/admin/requisitions?${params}`;
            },
            providesTags: ['Requisition'],
        }),

        getAdminRequisitionById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/admin/requisitions/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Requisition', id }],
        }),

        processRequisition: builder.mutation<ApiResponse<any>, { requisitionId: string; data: ProcessRequisitionRequest }>({
            query: ({ requisitionId, data }) => ({
                url: `/admin/requisitions/${requisitionId}/process`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { requisitionId }) => [{ type: 'Requisition', id: requisitionId }, 'Requisition'],
        }),

        completeRequisition: builder.mutation<ApiResponse<any>, { id: string; actualAmount: number; proofUrl: string }>({
            query: ({ id, actualAmount, proofUrl }) => ({
                url: `/admin/requisitions/${id}/complete`,
                method: 'PUT',
                body: { actualAmount, proofUrl },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        cancelRequisition: builder.mutation<ApiResponse<any>, { id: string; reason: string }>({
            query: ({ id, reason }) => ({
                url: `/admin/requisitions/${id}/cancel`,
                method: 'PUT',
                body: { reason },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        // System Configuration
        getSystemConfig: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/config',
        }),

        updateSystemConfig: builder.mutation<ApiResponse<any>, any>({
            query: (data) => ({
                url: '/admin/config',
                method: 'PUT',
                body: data,
            }),
        }),

        getSystemLogs: builder.query<ApiResponse<any[]>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 50 }) => `/admin/logs?page=${page}&limit=${limit}`,
        }),

        // Reports
        getAdminReports: builder.query<ApiResponse<any>, { reportType: string; startDate?: string; endDate?: string }>({
            query: ({ reportType, startDate, endDate }) => {
                const params = new URLSearchParams({ reportType });
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                return `/admin/reports?${params}`;
            },
            providesTags: ['Report'],
        }),

        getSystemOverview: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/reports/overview',
            providesTags: ['Report'],
        }),

        getHostelsReport: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/reports/hostels',
            providesTags: ['Report'],
        }),

        getStudentsReport: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/reports/students',
            providesTags: ['Report'],
        }),

        getPaymentsReportAdmin: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/reports/payments',
            providesTags: ['Report'],
        }),

        getComplaintsReportAdmin: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/reports/complaints',
            providesTags: ['Report'],
        }),

        getRequisitionsReportAdmin: builder.query<ApiResponse<any>, void>({
            query: () => '/admin/reports/requisitions',
            providesTags: ['Report'],
        }),

        exportReport: builder.mutation<Blob, { reportType: string; format: string }>({
            query: (data) => ({
                url: '/admin/reports/export',
                method: 'POST',
                body: data,
                responseHandler: (response) => response.blob(),
            }),
        }),

        // Broadcast
        broadcastNotification: builder.mutation<ApiResponse<any>, BroadcastRequest>({
            query: (data) => ({
                url: '/admin/broadcast',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const {
    useGetAdminDashboardQuery,
    useGetAdminStatisticsQuery,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useActivateUserMutation,
    useDeactivateUserMutation,
    useResetUserPasswordMutation,
    useGetAllHostelsQuery,
    useGetHostelByIdQuery,
    useCreateHostelMutation,
    useUpdateHostelMutation,
    useDeleteHostelMutation,
    useAssignWardenMutation,
    useAssignCaretakerToHostelMutation,
    useUpdateFeeStructureMutation,
    useGetAllRoomsQuery,
    useGetRoomByIdQuery,
    useCreateRoomMutation,
    useUpdateAdminRoomMutation,
    useDeleteAdminRoomMutation,
    useBulkCreateRoomsMutation,
    useGetAllStudentsQuery,
    useGetStudentByIdQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    useBulkImportStudentsMutation,
    useGetAllPaymentsQuery,
    useGetPaymentByIdAdminQuery,
    useGenerateFeesMutation,
    useProcessRefundMutation,
    useGetFeeDefaultersQuery,
    useGetAdminRequisitionsQuery,
    useGetAdminRequisitionByIdQuery,
    useProcessRequisitionMutation,
    useCompleteRequisitionMutation,
    useCancelRequisitionMutation,
    useGetSystemConfigQuery,
    useUpdateSystemConfigMutation,
    useGetSystemLogsQuery,
    useGetAdminReportsQuery,
    useGetSystemOverviewQuery,
    useGetHostelsReportQuery,
    useGetStudentsReportQuery,
    useGetPaymentsReportAdminQuery,
    useGetComplaintsReportAdminQuery,
    useGetRequisitionsReportAdminQuery,
    useExportReportMutation,
    useBroadcastNotificationMutation,
} = adminApi;
