import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';

interface UpdateComplaintStatusRequest {
    status: string;
    comments?: string;
}

interface CreateRequisitionRequest {
    title: string;
    description: string;
    category: string;
    estimatedAmount: number;
    urgency: string;
}

interface CreateRoomRequest {
    roomNumber: string;
    floor: number;
    capacity: number;
    roomType: string;
    facilities: string[];
    monthlyRent: number;
}

interface AllotRoomRequest {
    studentId: string;
    roomId: string;
}

interface MessMenuRequest {
    weekMenu: Record<string, any>;
    effectiveFrom: string;
}

interface NoticeRequest {
    title: string;
    content: string;
    priority: string;
}

export const caretakerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard
        getCaretakerDashboard: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/dashboard',
            providesTags: ['Student'],
        }),

        // Hostel Info
        getHostelInfo: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/hostel-info',
            providesTags: ['Hostel'],
        }),

        // Complaints
        getCaretakerComplaints: builder.query<PaginatedResponse<any>, { status?: string; page?: number; limit?: number }>({
            query: ({ status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                return `/caretaker/complaints?${params}`;
            },
            providesTags: ['Complaint'],
        }),

        getCaretakerComplaintById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/caretaker/complaints/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Complaint', id }],
        }),

        updateComplaintStatus: builder.mutation<ApiResponse<any>, { id: string; data: UpdateComplaintStatusRequest }>({
            query: ({ id, data }) => ({
                url: `/caretaker/complaints/${id}/status`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        assignComplaint: builder.mutation<ApiResponse<any>, { id: string; assignedTo: string }>({
            query: ({ id, assignedTo }) => ({
                url: `/caretaker/complaints/${id}/assign`,
                method: 'PUT',
                body: { assignedTo },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }],
        }),

        addCaretakerComplaintComment: builder.mutation<ApiResponse<any>, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/caretaker/complaints/${id}/comment`,
                method: 'POST',
                body: { comment },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }],
        }),

        resolveComplaint: builder.mutation<ApiResponse<any>, { id: string; resolution: string }>({
            query: ({ id, resolution }) => ({
                url: `/caretaker/complaints/${id}/resolve`,
                method: 'PUT',
                body: { resolution },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        // Requisitions
        getCaretakerRequisitions: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/caretaker/requisitions?page=${page}&limit=${limit}`,
            providesTags: ['Requisition'],
        }),

        getCaretakerRequisitionById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/caretaker/requisitions/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Requisition', id }],
        }),

        createRequisition: builder.mutation<ApiResponse<any>, CreateRequisitionRequest>({
            query: (data) => ({
                url: '/caretaker/requisitions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Requisition'],
        }),

        updateRequisition: builder.mutation<ApiResponse<any>, { id: string; data: Partial<CreateRequisitionRequest> }>({
            query: ({ id, data }) => ({
                url: `/caretaker/requisitions/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        submitRequisitionToWarden: builder.mutation<ApiResponse<any>, string>({
            query: (id) => ({
                url: `/caretaker/requisitions/${id}/submit`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        deleteRequisition: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/caretaker/requisitions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Requisition'],
        }),

        // Rooms
        getCaretakerRooms: builder.query<ApiResponse<any[]>, void>({
            query: () => '/caretaker/rooms',
            providesTags: ['Room'],
        }),

        addRoom: builder.mutation<ApiResponse<any>, CreateRoomRequest>({
            query: (data) => ({
                url: '/caretaker/rooms',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room'],
        }),

        updateRoom: builder.mutation<ApiResponse<any>, { roomId: string; data: Partial<CreateRoomRequest> }>({
            query: ({ roomId, data }) => ({
                url: `/caretaker/rooms/${roomId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Room'],
        }),

        deleteRoom: builder.mutation<ApiResponse<void>, string>({
            query: (roomId) => ({
                url: `/caretaker/rooms/${roomId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Room'],
        }),

        allotRoom: builder.mutation<ApiResponse<any>, AllotRoomRequest>({
            query: (data) => ({
                url: '/caretaker/rooms/allot',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        deallocateRoom: builder.mutation<ApiResponse<any>, { studentId: string }>({
            query: (data) => ({
                url: '/caretaker/rooms/deallocate',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        // Mess Menu
        getCaretakerMessMenu: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/mess-menu',
            providesTags: ['MessMenu'],
        }),

        createMessMenu: builder.mutation<ApiResponse<any>, MessMenuRequest>({
            query: (data) => ({
                url: '/caretaker/mess-menu',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['MessMenu'],
        }),

        updateMessMenu: builder.mutation<ApiResponse<any>, { menuId: string; data: Partial<MessMenuRequest> }>({
            query: ({ menuId, data }) => ({
                url: `/caretaker/mess-menu/${menuId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['MessMenu'],
        }),

        deleteMessMenu: builder.mutation<ApiResponse<void>, string>({
            query: (menuId) => ({
                url: `/caretaker/mess-menu/${menuId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MessMenu'],
        }),

        // Requests
        getCaretakerRequests: builder.query<PaginatedResponse<any>, { status?: string; page?: number; limit?: number }>({
            query: ({ status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                return `/caretaker/requests?${params}`;
            },
            providesTags: ['Request'],
        }),

        // Students
        getCaretakerStudents: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/caretaker/students?page=${page}&limit=${limit}`,
            providesTags: ['Student'],
        }),

        // Notices
        getCaretakerNotices: builder.query<ApiResponse<any[]>, void>({
            query: () => '/caretaker/notices',
            providesTags: ['Notice'],
        }),

        sendNotice: builder.mutation<ApiResponse<any>, NoticeRequest>({
            query: (data) => ({
                url: '/caretaker/notices',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),

        updateNotice: builder.mutation<ApiResponse<any>, { id: string; data: Partial<NoticeRequest> }>({
            query: ({ id, data }) => ({
                url: `/caretaker/notices/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),

        deleteNotice: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/caretaker/notices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notice'],
        }),
    }),
});

export const {
    useGetCaretakerDashboardQuery,
    useGetHostelInfoQuery,
    useGetCaretakerComplaintsQuery,
    useGetCaretakerComplaintByIdQuery,
    useUpdateComplaintStatusMutation,
    useAssignComplaintMutation,
    useAddCaretakerComplaintCommentMutation,
    useResolveComplaintMutation,
    useGetCaretakerRequisitionsQuery,
    useGetCaretakerRequisitionByIdQuery,
    useCreateRequisitionMutation,
    useUpdateRequisitionMutation,
    useSubmitRequisitionToWardenMutation,
    useDeleteRequisitionMutation,
    useGetCaretakerRoomsQuery,
    useAddRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useAllotRoomMutation,
    useDeallocateRoomMutation,
    useGetCaretakerMessMenuQuery,
    useCreateMessMenuMutation,
    useUpdateMessMenuMutation,
    useDeleteMessMenuMutation,
    useGetCaretakerRequestsQuery,
    useGetCaretakerStudentsQuery,
    useGetCaretakerNoticesQuery,
    useSendNoticeMutation,
    useUpdateNoticeMutation,
    useDeleteNoticeMutation,
} = caretakerApi;
