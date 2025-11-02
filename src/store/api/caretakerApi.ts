import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';

// Request/Response Interfaces
interface UpdateComplaintStatusRequest {
    status: 'pending' | 'in_progress' | 'resolved';
    notes?: string;
}

interface ForwardComplaintRequest {
    notes: string;
    priority: 'low' | 'medium' | 'high';
}

interface ComplaintUpdateRequest {
    message: string;
}

interface ApproveRequestRequest {
    notes?: string;
    effectiveDate?: string;
}

interface RejectRequestRequest {
    reason: string;
    notes?: string;
}

interface CreateRequisitionRequest {
    title: string;
    description: string;
    category: 'maintenance' | 'repair' | 'inventory' | 'other';
    amount: number;
    urgency: 'low' | 'medium' | 'high';
}

interface UpdateDayMenuRequest {
    breakfast: string;
    lunch: string;
    dinner: string;
}

interface CreateRoomRequest {
    roomNumber: string;
    floor: number;
    type: 'single' | 'double' | 'triple' | 'quad';
    capacity: number;
    amenities: string[];
}

interface UpdateRoomRequest {
    roomNumber?: string;
    floor?: number;
    type?: 'single' | 'double' | 'triple' | 'quad';
    capacity?: number;
    amenities?: string[];
    maintenanceStatus?: string;
}

interface AllocateRoomRequest {
    studentId: string;
    roomId: string;
    bedPreference?: string;
    notes?: string;
    effectiveDate?: string;
}

interface AutoAllocateRequest {
    numberOfStudents: number;
    criteria: string;
    roomTypes: string[];
    floorPreference?: number;
}

interface DeallocateRoomRequest {
    reason: string;
    effectiveDate?: string;
}

interface SendNoticeRequest {
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
}

interface ComplaintsQueryParams {
    page?: number;
    limit?: number;
    status?: 'all' | 'pending' | 'in_progress' | 'resolved';
    priority?: 'low' | 'medium' | 'high';
    search?: string;
}

interface RequestsQueryParams {
    page?: number;
    limit?: number;
    status?: 'all' | 'pending' | 'approved' | 'rejected';
    type?: 'all' | 'room_change' | 'hostel_change';
    search?: string;
}

interface RequisitionsQueryParams {
    page?: number;
    limit?: number;
    status?: 'all' | 'pending' | 'approved' | 'rejected';
    category?: 'all' | 'maintenance' | 'repair' | 'inventory' | 'other';
}

interface RoomsQueryParams {
    page?: number;
    limit?: number;
    floor?: number;
    type?: 'single' | 'double' | 'triple' | 'quad';
    status?: 'all' | 'available' | 'occupied' | 'full';
    search?: string;
}

interface AvailableRoomsQueryParams {
    type?: string;
    floor?: number;
    hostelId?: string;
}

interface NotificationsQueryParams {
    page?: number;
    limit?: number;
    type?: 'all' | 'complaint' | 'request' | 'requisition' | 'system';
    status?: 'all' | 'unread' | 'read';
}

export const caretakerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Dashboard
        getCaretakerDashboard: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/dashboard',
            providesTags: ['Student', 'Room', 'Complaint'],
        }),

        // 2. Complaints Management (5 endpoints)
        getCaretakerComplaints: builder.query<PaginatedResponse<any>, ComplaintsQueryParams>({
            query: ({ page = 1, limit = 10, status = 'all', priority, search }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    status,
                });
                if (priority) params.append('priority', priority);
                if (search) params.append('search', search);
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
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        forwardComplaintToWarden: builder.mutation<ApiResponse<any>, { id: string; data: ForwardComplaintRequest }>({
            query: ({ id, data }) => ({
                url: `/caretaker/complaints/${id}/forward`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        addComplaintUpdate: builder.mutation<ApiResponse<any>, { id: string; data: ComplaintUpdateRequest }>({
            query: ({ id, data }) => ({
                url: `/caretaker/complaints/${id}/update`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }],
        }),

        // 3. Change Requests (4 endpoints)
        getCaretakerRequests: builder.query<PaginatedResponse<any>, RequestsQueryParams>({
            query: ({ page = 1, limit = 10, status = 'all', type = 'all', search }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    status,
                    type,
                });
                if (search) params.append('search', search);
                return `/caretaker/requests?${params}`;
            },
            providesTags: ['Request'],
        }),

        getCaretakerRequestById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/caretaker/requests/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Request', id }],
        }),

        approveRequest: builder.mutation<ApiResponse<any>, { id: string; data: ApproveRequestRequest }>({
            query: ({ id, data }) => ({
                url: `/caretaker/requests/${id}/approve`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        rejectRequest: builder.mutation<ApiResponse<any>, { id: string; data: RejectRequestRequest }>({
            query: ({ id, data }) => ({
                url: `/caretaker/requests/${id}/reject`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        // 4. Requisitions (4 endpoints)
        getCaretakerRequisitions: builder.query<PaginatedResponse<any>, RequisitionsQueryParams>({
            query: ({ page = 1, limit = 10, status = 'all', category = 'all' }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    status,
                    category,
                });
                return `/caretaker/requisitions?${params}`;
            },
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

        uploadRequisitionDocuments: builder.mutation<ApiResponse<any>, { id: string; documents: FormData }>({
            query: ({ id, documents }) => ({
                url: `/caretaker/requisitions/${id}/documents`,
                method: 'POST',
                body: documents,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }],
        }),

        // 5. Mess Menu Management (4 endpoints)
        getWeeklyMessMenu: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/mess-menu',
            providesTags: ['MessMenu'],
        }),

        getDayMenu: builder.query<ApiResponse<any>, string>({
            query: (day) => `/caretaker/mess-menu/${day}`,
            providesTags: (_result, _error, day) => [{ type: 'MessMenu', id: day }],
        }),

        updateDayMenu: builder.mutation<ApiResponse<any>, { day: string; data: UpdateDayMenuRequest }>({
            query: ({ day, data }) => ({
                url: `/caretaker/mess-menu/${day}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { day }) => [{ type: 'MessMenu', id: day }, 'MessMenu'],
        }),

        getMessStats: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/mess-stats',
            providesTags: ['MessMenu'],
        }),

        // 6. Room Management (6 endpoints)
        getCaretakerRooms: builder.query<PaginatedResponse<any>, RoomsQueryParams>({
            query: ({ page = 1, limit = 10, floor, type, status = 'all', search }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    status,
                });
                if (floor) params.append('floor', String(floor));
                if (type) params.append('type', type);
                if (search) params.append('search', search);
                return `/caretaker/rooms?${params}`;
            },
            providesTags: ['Room'],
        }),

        getCaretakerRoomById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/caretaker/rooms/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Room', id }],
        }),

        createRoom: builder.mutation<ApiResponse<any>, CreateRoomRequest>({
            query: (data) => ({
                url: '/caretaker/rooms',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room'],
        }),

        updateRoom: builder.mutation<ApiResponse<any>, { id: string; data: UpdateRoomRequest }>({
            query: ({ id, data }) => ({
                url: `/caretaker/rooms/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Room', id }, 'Room'],
        }),

        deleteRoom: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/caretaker/rooms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Room'],
        }),

        getRoomStats: builder.query<ApiResponse<any>, void>({
            query: () => '/caretaker/rooms/stats',
            providesTags: ['Room'],
        }),

        // 7. Room Allotment (6 endpoints)
        searchStudents: builder.query<ApiResponse<any[]>, string>({
            query: (query) => `/caretaker/students/search?query=${query}`,
            providesTags: ['Student'],
        }),

        getAvailableRooms: builder.query<ApiResponse<any[]>, AvailableRoomsQueryParams>({
            query: ({ type, floor, hostelId }) => {
                const params = new URLSearchParams();
                if (type) params.append('type', type);
                if (floor) params.append('floor', String(floor));
                if (hostelId) params.append('hostelId', hostelId);
                return `/caretaker/rooms/available?${params}`;
            },
            providesTags: ['Room'],
        }),

        allocateRoom: builder.mutation<ApiResponse<any>, AllocateRoomRequest>({
            query: (data) => ({
                url: '/caretaker/allocations',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        autoAllocateRooms: builder.mutation<ApiResponse<any>, AutoAllocateRequest>({
            query: (data) => ({
                url: '/caretaker/allocations/auto',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        getRecentAllocations: builder.query<ApiResponse<any[]>, number>({
            query: (limit = 10) => `/caretaker/allocations/recent?limit=${limit}`,
            providesTags: ['Room', 'Student'],
        }),

        deallocateRoom: builder.mutation<ApiResponse<any>, { studentId: string; data: DeallocateRoomRequest }>({
            query: ({ studentId, data }) => ({
                url: `/caretaker/allocations/${studentId}`,
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ['Room', 'Student'],
        }),

        // 8. Notifications (3 endpoints)
        getCaretakerNotifications: builder.query<PaginatedResponse<any>, NotificationsQueryParams>({
            query: ({ page = 1, limit = 20, type = 'all', status = 'all' }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    type,
                    status,
                });
                return `/caretaker/notifications?${params}`;
            },
            providesTags: ['Notification'],
        }),

        markNotificationAsRead: builder.mutation<ApiResponse<any>, string>({
            query: (id) => ({
                url: `/caretaker/notifications/${id}/read`,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Notification', id }, 'Notification'],
        }),

        markAllNotificationsAsRead: builder.mutation<ApiResponse<any>, void>({
            query: () => ({
                url: '/caretaker/notifications/read-all',
                method: 'PATCH',
            }),
            invalidatesTags: ['Notification'],
        }),

        // 9. Additional Endpoints (2 endpoints)
        getAllStudents: builder.query<ApiResponse<any[]>, void>({
            query: () => '/caretaker/students',
            providesTags: ['Student'],
        }),

        sendNoticeToStudents: builder.mutation<ApiResponse<any>, SendNoticeRequest>({
            query: (data) => ({
                url: '/caretaker/notices',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),
    }),
});

export const {
    // Dashboard
    useGetCaretakerDashboardQuery,

    // Complaints
    useGetCaretakerComplaintsQuery,
    useGetCaretakerComplaintByIdQuery,
    useUpdateComplaintStatusMutation,
    useForwardComplaintToWardenMutation,
    useAddComplaintUpdateMutation,

    // Requests
    useGetCaretakerRequestsQuery,
    useGetCaretakerRequestByIdQuery,
    useApproveRequestMutation,
    useRejectRequestMutation,

    // Requisitions
    useGetCaretakerRequisitionsQuery,
    useGetCaretakerRequisitionByIdQuery,
    useCreateRequisitionMutation,
    useUploadRequisitionDocumentsMutation,

    // Mess Menu
    useGetWeeklyMessMenuQuery,
    useGetDayMenuQuery,
    useUpdateDayMenuMutation,
    useGetMessStatsQuery,

    // Rooms
    useGetCaretakerRoomsQuery,
    useGetCaretakerRoomByIdQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomStatsQuery,

    // Room Allotment
    useSearchStudentsQuery,
    useGetAvailableRoomsQuery,
    useAllocateRoomMutation,
    useAutoAllocateRoomsMutation,
    useGetRecentAllocationsQuery,
    useDeallocateRoomMutation,

    // Notifications
    useGetCaretakerNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,

    // Additional
    useGetAllStudentsQuery,
    useSendNoticeToStudentsMutation,
} = caretakerApi;
