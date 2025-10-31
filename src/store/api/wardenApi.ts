import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';

interface UpdateComplaintRequest {
    status?: string;
    comments?: string;
    assignedTo?: string;
}

interface UpdateRequisitionRequest {
    action: 'approve' | 'reject' | 'return';
    comments?: string;
}

interface UpdateRequestRequest {
    action: 'approve' | 'reject';
    comments?: string;
}

interface AnnouncementRequest {
    title: string;
    content: string;
    priority: string;
    targetHostels: string[];
}

interface AssignCaretakerRequest {
    hostelId: string;
    caretakerId: string;
}

export const wardenApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard
        getWardenDashboard: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/dashboard',
            providesTags: ['Student', 'Complaint', 'Requisition'],
        }),

        getWardenStatistics: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/statistics',
            providesTags: ['Student', 'Hostel'],
        }),

        getWardenHostelInfo: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/hostel-info',
            providesTags: ['Hostel'],
        }),

        // Complaints
        getWardenComplaints: builder.query<
            PaginatedResponse<any>,
            { status?: string; category?: string; priority?: string; page?: number; limit?: number }
        >({
            query: ({ status, category, priority, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                if (category) params.append('category', category);
                if (priority) params.append('priority', priority);
                return `/warden/complaints?${params}`;
            },
            providesTags: ['Complaint'],
        }),

        getWardenComplaintById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/warden/complaints/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Complaint', id }],
        }),

        updateWardenComplaint: builder.mutation<ApiResponse<any>, { complaintId: string; data: UpdateComplaintRequest }>({
            query: ({ complaintId, data }) => ({
                url: `/warden/complaints/${complaintId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { complaintId }) => [{ type: 'Complaint', id: complaintId }, 'Complaint'],
        }),

        forwardComplaint: builder.mutation<ApiResponse<any>, { id: string; forwardTo: string; comments?: string }>({
            query: ({ id, forwardTo, comments }) => ({
                url: `/warden/complaints/${id}/forward`,
                method: 'PUT',
                body: { forwardTo, comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        addWardenComplaintComment: builder.mutation<ApiResponse<any>, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/warden/complaints/${id}/comment`,
                method: 'POST',
                body: { comment },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }],
        }),

        // Requisitions
        getWardenRequisitions: builder.query<PaginatedResponse<any>, { status?: string; page?: number; limit?: number }>({
            query: ({ status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                return `/warden/requisitions?${params}`;
            },
            providesTags: ['Requisition'],
        }),

        getWardenRequisitionById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/warden/requisitions/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Requisition', id }],
        }),

        updateWardenRequisition: builder.mutation<ApiResponse<any>, { requisitionId: string; data: UpdateRequisitionRequest }>({
            query: ({ requisitionId, data }) => ({
                url: `/warden/requisitions/${requisitionId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { requisitionId }) => [{ type: 'Requisition', id: requisitionId }, 'Requisition'],
        }),

        approveRequisition: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requisitions/${id}/approve`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        rejectRequisition: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requisitions/${id}/reject`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        returnRequisition: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requisitions/${id}/return`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        forwardRequisitionToDean: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requisitions/${id}/forward`,
                method: 'POST',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        // Student Requests
        getWardenRequests: builder.query<
            PaginatedResponse<any>,
            { type?: string; status?: string; page?: number; limit?: number }
        >({
            query: ({ type, status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (type) params.append('type', type);
                if (status) params.append('status', status);
                return `/warden/requests?${params}`;
            },
            providesTags: ['Request'],
        }),

        getWardenRequestById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/warden/requests/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Request', id }],
        }),

        updateWardenRequest: builder.mutation<ApiResponse<any>, { requestId: string; data: UpdateRequestRequest }>({
            query: ({ requestId, data }) => ({
                url: `/warden/requests/${requestId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { requestId }) => [{ type: 'Request', id: requestId }, 'Request'],
        }),

        approveRequest: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requests/${id}/approve`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        rejectRequest: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requests/${id}/reject`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        addRequestComment: builder.mutation<ApiResponse<any>, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/warden/requests/${id}/comment`,
                method: 'POST',
                body: { comment },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }],
        }),

        // Room Management
        getWardenRooms: builder.query<ApiResponse<any[]>, void>({
            query: () => '/warden/rooms',
            providesTags: ['Room'],
        }),

        getWardenStudents: builder.query<ApiResponse<any[]>, void>({
            query: () => '/warden/students',
            providesTags: ['Student'],
        }),

        getRoomAllotments: builder.query<ApiResponse<any[]>, void>({
            query: () => '/warden/room-allotments',
            providesTags: ['Room', 'Student'],
        }),

        allocateRoom: builder.mutation<ApiResponse<any>, { studentId: string; roomId: string }>({
            query: (data) => ({
                url: '/warden/rooms/allocate',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        deallocateWardenRoom: builder.mutation<ApiResponse<any>, { id: string }>({
            query: ({ id }) => ({
                url: `/warden/rooms/${id}/deallocate`,
                method: 'PUT',
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        transferStudent: builder.mutation<ApiResponse<any>, { id: string; newRoomId: string }>({
            query: ({ id, newRoomId }) => ({
                url: `/warden/rooms/${id}/transfer`,
                method: 'PUT',
                body: { newRoomId },
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        // Announcements
        sendAnnouncement: builder.mutation<ApiResponse<any>, AnnouncementRequest>({
            query: (data) => ({
                url: '/warden/announcements',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),

        // Reports
        getWardenReports: builder.query<ApiResponse<any>, { reportType: string; startDate?: string; endDate?: string }>({
            query: ({ reportType, startDate, endDate }) => {
                const params = new URLSearchParams({ reportType });
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                return `/warden/reports?${params}`;
            },
            providesTags: ['Report'],
        }),

        getComplaintsReport: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/reports/complaints',
            providesTags: ['Report'],
        }),

        getOccupancyReport: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/reports/occupancy',
            providesTags: ['Report'],
        }),

        getPaymentsReport: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/reports/payments',
            providesTags: ['Report'],
        }),

        // Caretaker Management
        assignCaretaker: builder.mutation<ApiResponse<any>, AssignCaretakerRequest>({
            query: (data) => ({
                url: '/warden/assign-caretaker',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Hostel'],
        }),

        // Mess Menu
        getWardenMessMenu: builder.query<ApiResponse<any>, void>({
            query: () => '/warden/mess-menu',
            providesTags: ['MessMenu'],
        }),
    }),
});

export const {
    useGetWardenDashboardQuery,
    useGetWardenStatisticsQuery,
    useGetWardenHostelInfoQuery,
    useGetWardenComplaintsQuery,
    useGetWardenComplaintByIdQuery,
    useUpdateWardenComplaintMutation,
    useForwardComplaintMutation,
    useAddWardenComplaintCommentMutation,
    useGetWardenRequisitionsQuery,
    useGetWardenRequisitionByIdQuery,
    useUpdateWardenRequisitionMutation,
    useApproveRequisitionMutation,
    useRejectRequisitionMutation,
    useReturnRequisitionMutation,
    useForwardRequisitionToDeanMutation,
    useGetWardenRequestsQuery,
    useGetWardenRequestByIdQuery,
    useUpdateWardenRequestMutation,
    useApproveRequestMutation,
    useRejectRequestMutation,
    useAddRequestCommentMutation,
    useGetWardenRoomsQuery,
    useGetWardenStudentsQuery,
    useGetRoomAllotmentsQuery,
    useAllocateRoomMutation,
    useDeallocateWardenRoomMutation,
    useTransferStudentMutation,
    useSendAnnouncementMutation,
    useGetWardenReportsQuery,
    useGetComplaintsReportQuery,
    useGetOccupancyReportQuery,
    useGetPaymentsReportQuery,
    useAssignCaretakerMutation,
    useGetWardenMessMenuQuery,
} = wardenApi;
