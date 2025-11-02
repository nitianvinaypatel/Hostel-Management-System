import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';
import type {
    DashboardStats,
    RecentActivity,
    PendingApprovalSummary,
    Approval,
    ApprovalsResponse,
    Complaint,
    ComplaintsResponse,
    Caretaker,
    Requisition,
    RequisitionsResponse,
    Announcement,
    InventoryItem,
    InventoryResponse,
    DayMenu,
    MessFeedbackResponse,
    OccupancyReport,
    ComplaintsReport,
    RequisitionsReport,
    PaymentsReport,
} from '@/types/warden';

// Request Types
interface UpdateComplaintRequest {
    status?: string;
    comments?: string;
    assignedTo?: string;
}

interface AssignComplaintRequest {
    caretakerId: string;
    comments?: string;
}

interface ResolveComplaintRequest {
    resolutionNotes?: string;
}

interface EscalateComplaintRequest {
    escalationReason: string;
    escalateTo: 'admin' | 'dean';
}

interface UpdateRequisitionRequest {
    action: 'approve' | 'reject' | 'return';
    comments?: string;
}

interface EscalateRequisitionRequest {
    escalationReason: string;
}

interface UpdateRequestRequest {
    action: 'approve' | 'reject';
    comments?: string;
}

interface CreateAnnouncementRequest {
    title: string;
    message: string;
    type: 'general' | 'urgent' | 'event' | 'policy';
    targetAudience: 'students' | 'caretakers' | 'all';
    hostelId?: string;
}

interface CreateCaretakerRequest {
    name: string;
    email: string;
    phoneNumber: string;
    assignedBlocks: string[];
    assignedFloors: number[];
    hostelId?: string;
}

interface UpdateCaretakerRequest {
    name?: string;
    email?: string;
    phoneNumber?: string;
    assignedBlocks?: string[];
    assignedFloors?: number[];
}

interface CreateInventoryRequest {
    name: string;
    category: 'furniture' | 'electronics' | 'equipment' | 'supplies';
    quantity: number;
    condition: 'good' | 'fair' | 'poor' | 'damaged';
    location: string;
    notes?: string;
    hostelId?: string;
}

interface UpdateInventoryRequest {
    name?: string;
    category?: 'furniture' | 'electronics' | 'equipment' | 'supplies';
    quantity?: number;
    condition?: 'good' | 'fair' | 'poor' | 'damaged';
    location?: string;
    notes?: string;
}

interface UpdateMenuRequest {
    breakfast?: { items: string[]; time: string };
    lunch?: { items: string[]; time: string };
    snacks?: { items: string[]; time: string };
    dinner?: { items: string[]; time: string };
}

interface AssignCaretakerRequest {
    hostelId: string;
    caretakerId: string;
}

export const wardenApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ==================== Dashboard APIs ====================
        getWardenDashboardStats: builder.query<ApiResponse<DashboardStats>, string | void>({
            query: (hostelId) => `/warden/dashboard/stats${hostelId ? `?hostelId=${hostelId}` : ''}`,
            providesTags: ['Student', 'Complaint', 'Requisition', 'Hostel'],
        }),

        getWardenRecentActivities: builder.query<ApiResponse<RecentActivity[]>, number | void>({
            query: (limit = 10) => `/warden/dashboard/activities?limit=${limit}`,
            providesTags: ['Student', 'Complaint', 'Requisition'],
        }),

        getWardenPendingApprovals: builder.query<ApiResponse<PendingApprovalSummary[]>, number | void>({
            query: (limit = 5) => `/warden/dashboard/pending-approvals?limit=${limit}`,
            providesTags: ['Request'],
        }),

        // ==================== Approvals Management ====================
        getWardenApprovals: builder.query<
            ApprovalsResponse,
            {
                type?: 'all' | 'room-allotment' | 'hostel-change' | 'complaint';
                status?: 'all' | 'pending' | 'approved' | 'rejected';
                search?: string;
                page?: number;
                limit?: number;
            } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.type) queryParams.append('type', params.type);
                if (params?.status) queryParams.append('status', params.status);
                if (params?.search) queryParams.append('search', params.search);
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/approvals?${queryParams.toString()}`;
            },
            providesTags: ['Request'],
        }),

        getWardenApprovalDetails: builder.query<ApiResponse<Approval>, string>({
            query: (id) => `/warden/approvals/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Request', id }],
        }),

        approveWardenRequest: builder.mutation<ApiResponse<Approval>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/approvals/${id}/approve`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        rejectWardenRequest: builder.mutation<ApiResponse<Approval>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/approvals/${id}/reject`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        // ==================== Complaints Management ====================
        getWardenComplaints: builder.query<
            ComplaintsResponse,
            {
                priority?: 'all' | 'urgent' | 'high' | 'medium' | 'low';
                status?: 'all' | 'pending' | 'in-progress' | 'resolved' | 'escalated';
                search?: string;
                page?: number;
                limit?: number;
            } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.priority) queryParams.append('priority', params.priority);
                if (params?.status) queryParams.append('status', params.status);
                if (params?.search) queryParams.append('search', params.search);
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/complaints?${queryParams.toString()}`;
            },
            providesTags: ['Complaint'],
        }),

        assignWardenComplaint: builder.mutation<ApiResponse<Complaint>, { id: string; data: AssignComplaintRequest }>({
            query: ({ id, data }) => ({
                url: `/warden/complaints/${id}/assign`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        resolveWardenComplaint: builder.mutation<ApiResponse<Complaint>, { id: string; data: ResolveComplaintRequest }>({
            query: ({ id, data }) => ({
                url: `/warden/complaints/${id}/resolve`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        escalateWardenComplaint: builder.mutation<ApiResponse<Complaint>, { id: string; data: EscalateComplaintRequest }>({
            query: ({ id, data }) => ({
                url: `/warden/complaints/${id}/escalate`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        // ==================== Caretaker Management ====================
        getWardenCaretakers: builder.query<
            ApiResponse<Caretaker[]>,
            { search?: string; status?: 'active' | 'inactive'; page?: number; limit?: number } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.search) queryParams.append('search', params.search);
                if (params?.status) queryParams.append('status', params.status);
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/caretakers?${queryParams.toString()}`;
            },
            providesTags: ['User'],
        }),

        getWardenCaretakerDetails: builder.query<ApiResponse<Caretaker>, string>({
            query: (id) => `/warden/caretakers/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),

        createWardenCaretaker: builder.mutation<ApiResponse<Caretaker>, CreateCaretakerRequest>({
            query: (data) => ({
                url: '/warden/caretakers',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        updateWardenCaretaker: builder.mutation<ApiResponse<Caretaker>, { id: string; data: UpdateCaretakerRequest }>({
            query: ({ id, data }) => ({
                url: `/warden/caretakers/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }, 'User'],
        }),

        toggleWardenCaretakerStatus: builder.mutation<ApiResponse<Caretaker>, string>({
            query: (id) => ({
                url: `/warden/caretakers/${id}/toggle-status`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'User', id }, 'User'],
        }),

        // ==================== Requisitions Management ====================
        getWardenRequisitions: builder.query<
            RequisitionsResponse,
            {
                status?: 'all' | 'pending' | 'approved' | 'rejected' | 'escalated';
                search?: string;
                page?: number;
                limit?: number;
            } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.status) queryParams.append('status', params.status);
                if (params?.search) queryParams.append('search', params.search);
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/requisitions?${queryParams.toString()}`;
            },
            providesTags: ['Requisition'],
        }),

        getWardenRequisitionDetails: builder.query<ApiResponse<Requisition>, string>({
            query: (id) => `/warden/requisitions/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Requisition', id }],
        }),

        approveWardenRequisition: builder.mutation<ApiResponse<Requisition>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requisitions/${id}/approve`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        rejectWardenRequisition: builder.mutation<ApiResponse<Requisition>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/warden/requisitions/${id}/reject`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        escalateWardenRequisition: builder.mutation<ApiResponse<Requisition>, { id: string; data: EscalateRequisitionRequest }>({
            query: ({ id, data }) => ({
                url: `/warden/requisitions/${id}/escalate`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        // ==================== Announcements ====================
        getWardenAnnouncements: builder.query<ApiResponse<Announcement[]>, { page?: number; limit?: number } | undefined>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/announcements?${queryParams.toString()}`;
            },
            providesTags: ['Notice'],
        }),

        createWardenAnnouncement: builder.mutation<ApiResponse<Announcement>, CreateAnnouncementRequest>({
            query: (data) => ({
                url: '/warden/announcements',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),

        // ==================== Inventory Management ====================
        getWardenInventory: builder.query<
            InventoryResponse,
            {
                category?: 'all' | 'furniture' | 'electronics' | 'equipment' | 'supplies';
                search?: string;
                page?: number;
                limit?: number;
            } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.category) queryParams.append('category', params.category);
                if (params?.search) queryParams.append('search', params.search);
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/inventory?${queryParams.toString()}`;
            },
            providesTags: ['Hostel'],
        }),

        getWardenInventoryDetails: builder.query<ApiResponse<InventoryItem>, string>({
            query: (id) => `/warden/inventory/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Hostel', id }],
        }),

        addWardenInventoryItem: builder.mutation<ApiResponse<InventoryItem>, CreateInventoryRequest>({
            query: (data) => ({
                url: '/warden/inventory',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Hostel'],
        }),

        updateWardenInventoryItem: builder.mutation<ApiResponse<InventoryItem>, { id: string; data: UpdateInventoryRequest }>({
            query: ({ id, data }) => ({
                url: `/warden/inventory/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Hostel', id }, 'Hostel'],
        }),

        deleteWardenInventoryItem: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/warden/inventory/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Hostel', id }, 'Hostel'],
        }),

        // ==================== Mess Menu Management ====================
        getWardenWeeklyMenu: builder.query<ApiResponse<DayMenu[]>, { hostelId?: string; week?: string } | undefined>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params?.week) queryParams.append('week', params.week);
                return `/warden/mess/menu?${queryParams.toString()}`;
            },
            providesTags: ['MessMenu'],
        }),

        updateWardenDayMenu: builder.mutation<ApiResponse<DayMenu>, { dayId: string; data: UpdateMenuRequest }>({
            query: ({ dayId, data }) => ({
                url: `/warden/mess/menu/${dayId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['MessMenu'],
        }),

        getWardenMessFeedback: builder.query<
            MessFeedbackResponse,
            { hostelId?: string; startDate?: string; endDate?: string; page?: number; limit?: number } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params?.startDate) queryParams.append('startDate', params.startDate);
                if (params?.endDate) queryParams.append('endDate', params.endDate);
                if (params?.page) queryParams.append('page', String(params.page));
                if (params?.limit) queryParams.append('limit', String(params.limit));
                return `/warden/mess/feedback?${queryParams.toString()}`;
            },
            providesTags: ['Feedback'],
        }),

        // ==================== Reports ====================
        getWardenOccupancyReport: builder.query<
            ApiResponse<OccupancyReport>,
            { hostelId?: string; startDate?: string; endDate?: string } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params?.startDate) queryParams.append('startDate', params.startDate);
                if (params?.endDate) queryParams.append('endDate', params.endDate);
                return `/warden/reports/occupancy?${queryParams.toString()}`;
            },
            providesTags: ['Report'],
        }),

        getWardenComplaintsReport: builder.query<
            ApiResponse<ComplaintsReport>,
            { hostelId?: string; startDate?: string; endDate?: string } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params?.startDate) queryParams.append('startDate', params.startDate);
                if (params?.endDate) queryParams.append('endDate', params.endDate);
                return `/warden/reports/complaints?${queryParams.toString()}`;
            },
            providesTags: ['Report'],
        }),

        getWardenRequisitionsReport: builder.query<
            ApiResponse<RequisitionsReport>,
            { hostelId?: string; startDate?: string; endDate?: string } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params?.startDate) queryParams.append('startDate', params.startDate);
                if (params?.endDate) queryParams.append('endDate', params.endDate);
                return `/warden/reports/requisitions?${queryParams.toString()}`;
            },
            providesTags: ['Report'],
        }),

        getWardenPaymentsReport: builder.query<
            ApiResponse<PaymentsReport>,
            { hostelId?: string; startDate?: string; endDate?: string } | undefined
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params?.startDate) queryParams.append('startDate', params.startDate);
                if (params?.endDate) queryParams.append('endDate', params.endDate);
                return `/warden/reports/payments?${queryParams.toString()}`;
            },
            providesTags: ['Report'],
        }),

        exportWardenReport: builder.query<
            Blob,
            {
                reportType: 'occupancy' | 'complaints' | 'requisitions' | 'payments';
                format: 'pdf' | 'excel' | 'csv';
                hostelId?: string;
                startDate?: string;
                endDate?: string;
            }
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                queryParams.append('reportType', params.reportType);
                queryParams.append('format', params.format);
                if (params.hostelId) queryParams.append('hostelId', params.hostelId);
                if (params.startDate) queryParams.append('startDate', params.startDate);
                if (params.endDate) queryParams.append('endDate', params.endDate);
                return `/warden/reports/export?${queryParams.toString()}`;
            },
            providesTags: ['Report'],
        }),
    }),
});

export const {
    // Dashboard
    useGetWardenDashboardStatsQuery,
    useGetWardenRecentActivitiesQuery,
    useGetWardenPendingApprovalsQuery,
    // Approvals
    useGetWardenApprovalsQuery,
    useGetWardenApprovalDetailsQuery,
    useApproveWardenRequestMutation,
    useRejectWardenRequestMutation,
    // Complaints
    useGetWardenComplaintsQuery,
    useAssignWardenComplaintMutation,
    useResolveWardenComplaintMutation,
    useEscalateWardenComplaintMutation,
    // Caretakers
    useGetWardenCaretakersQuery,
    useGetWardenCaretakerDetailsQuery,
    useCreateWardenCaretakerMutation,
    useUpdateWardenCaretakerMutation,
    useToggleWardenCaretakerStatusMutation,
    // Requisitions
    useGetWardenRequisitionsQuery,
    useGetWardenRequisitionDetailsQuery,
    useApproveWardenRequisitionMutation,
    useRejectWardenRequisitionMutation,
    useEscalateWardenRequisitionMutation,
    // Announcements
    useGetWardenAnnouncementsQuery,
    useCreateWardenAnnouncementMutation,
    // Inventory
    useGetWardenInventoryQuery,
    useGetWardenInventoryDetailsQuery,
    useAddWardenInventoryItemMutation,
    useUpdateWardenInventoryItemMutation,
    useDeleteWardenInventoryItemMutation,
    // Mess Menu
    useGetWardenWeeklyMenuQuery,
    useUpdateWardenDayMenuMutation,
    useGetWardenMessFeedbackQuery,
    // Reports
    useGetWardenOccupancyReportQuery,
    useGetWardenComplaintsReportQuery,
    useGetWardenRequisitionsReportQuery,
    useGetWardenPaymentsReportQuery,
    useExportWardenReportQuery,
} = wardenApi;
