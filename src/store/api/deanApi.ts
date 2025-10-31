import { apiSlice } from './apiSlice';
import { ApiResponse, PaginatedResponse } from '@/types/common';

interface UpdateRequisitionRequest {
    action: 'approve' | 'reject';
    comments?: string;
    budgetAllocation?: number;
}

interface NoticeRequest {
    title: string;
    content: string;
    priority: string;
    targetRole: string;
    targetHostels: string[];
}

export const deanApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard
        getDeanDashboard: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/dashboard',
            providesTags: ['Requisition', 'Hostel'],
        }),

        getDeanStatistics: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/statistics',
            providesTags: ['Hostel', 'Requisition'],
        }),

        // Requisitions
        getDeanRequisitions: builder.query<PaginatedResponse<any>, { status?: string; page?: number; limit?: number }>({
            query: ({ status, page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                return `/dean/requisitions?${params}`;
            },
            providesTags: ['Requisition'],
        }),

        getDeanRequisitionById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/dean/requisitions/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Requisition', id }],
        }),

        updateDeanRequisition: builder.mutation<ApiResponse<any>, { requisitionId: string; data: UpdateRequisitionRequest }>({
            query: ({ requisitionId, data }) => ({
                url: `/dean/requisitions/${requisitionId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { requisitionId }) => [{ type: 'Requisition', id: requisitionId }, 'Requisition'],
        }),

        approveDeanRequisition: builder.mutation<ApiResponse<any>, { id: string; comments?: string; budgetAllocation?: number }>({
            query: ({ id, comments, budgetAllocation }) => ({
                url: `/dean/requisitions/${id}/approve`,
                method: 'PUT',
                body: { comments, budgetAllocation },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        rejectDeanRequisition: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/dean/requisitions/${id}/reject`,
                method: 'PUT',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        forwardRequisitionToAdmin: builder.mutation<ApiResponse<any>, { id: string; comments?: string }>({
            query: ({ id, comments }) => ({
                url: `/dean/requisitions/${id}/forward`,
                method: 'POST',
                body: { comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Requisition', id }, 'Requisition'],
        }),

        // Complaints
        getDeanComplaints: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/dean/complaints?page=${page}&limit=${limit}`,
            providesTags: ['Complaint'],
        }),

        getDeanComplaintById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/dean/complaints/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Complaint', id }],
        }),

        updateDeanComplaintStatus: builder.mutation<ApiResponse<any>, { id: string; status: string; comments?: string }>({
            query: ({ id, status, comments }) => ({
                url: `/dean/complaints/${id}/status`,
                method: 'PUT',
                body: { status, comments },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        addDeanComplaintComment: builder.mutation<ApiResponse<any>, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/dean/complaints/${id}/comment`,
                method: 'POST',
                body: { comment },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }],
        }),

        // Hostel Reports
        getHostelReports: builder.query<ApiResponse<any[]>, void>({
            query: () => '/dean/hostel-reports',
            providesTags: ['Report'],
        }),

        getHostelReportById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/dean/hostel-reports/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Report', id }],
        }),

        // Fund Usage
        getFundUsage: builder.query<ApiResponse<any>, { startDate?: string; endDate?: string }>({
            query: ({ startDate, endDate }) => {
                const params = new URLSearchParams();
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                return `/dean/fund-usage?${params}`;
            },
            providesTags: ['Report'],
        }),

        // Financial Summary
        getFinancialSummary: builder.query<ApiResponse<any>, { startDate?: string; endDate?: string }>({
            query: ({ startDate, endDate }) => {
                const params = new URLSearchParams();
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                return `/dean/financial-summary?${params}`;
            },
            providesTags: ['Report'],
        }),

        // Budget Allocation
        getBudgetAllocations: builder.query<ApiResponse<any[]>, void>({
            query: () => '/dean/budget-allocations',
        }),

        createBudgetAllocation: builder.mutation<ApiResponse<any>, any>({
            query: (data) => ({
                url: '/dean/budget-allocations',
                method: 'POST',
                body: data,
            }),
        }),

        updateBudgetAllocation: builder.mutation<ApiResponse<any>, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/dean/budget-allocations/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        // Notices
        getDeanNotices: builder.query<ApiResponse<any[]>, void>({
            query: () => '/dean/notices',
            providesTags: ['Notice'],
        }),

        sendDeanNotice: builder.mutation<ApiResponse<any>, NoticeRequest>({
            query: (data) => ({
                url: '/dean/notices',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),

        updateDeanNotice: builder.mutation<ApiResponse<any>, { id: string; data: Partial<NoticeRequest> }>({
            query: ({ id, data }) => ({
                url: `/dean/notices/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Notice'],
        }),

        deleteDeanNotice: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/dean/notices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notice'],
        }),

        // Hostels Overview
        getAllHostelsForDean: builder.query<ApiResponse<any[]>, void>({
            query: () => '/dean/hostels',
            providesTags: ['Hostel'],
        }),

        getHostelDetailsForDean: builder.query<ApiResponse<any>, string>({
            query: (id) => `/dean/hostels/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Hostel', id }],
        }),

        // Reports
        getDeanReports: builder.query<ApiResponse<any>, { reportType: string; startDate?: string; endDate?: string }>({
            query: ({ reportType, startDate, endDate }) => {
                const params = new URLSearchParams({ reportType });
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                return `/dean/reports?${params}`;
            },
            providesTags: ['Report'],
        }),

        getHostelsReportForDean: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/reports/hostels',
            providesTags: ['Report'],
        }),

        getComplaintsReportForDean: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/reports/complaints',
            providesTags: ['Report'],
        }),

        getRequisitionsReportForDean: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/reports/requisitions',
            providesTags: ['Report'],
        }),

        getOccupancyReportForDean: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/reports/occupancy',
            providesTags: ['Report'],
        }),

        getPaymentsReportForDean: builder.query<ApiResponse<any>, void>({
            query: () => '/dean/reports/payments',
            providesTags: ['Report'],
        }),
    }),
});

export const {
    useGetDeanDashboardQuery,
    useGetDeanStatisticsQuery,
    useGetDeanRequisitionsQuery,
    useGetDeanRequisitionByIdQuery,
    useUpdateDeanRequisitionMutation,
    useApproveDeanRequisitionMutation,
    useRejectDeanRequisitionMutation,
    useForwardRequisitionToAdminMutation,
    useGetDeanComplaintsQuery,
    useGetDeanComplaintByIdQuery,
    useUpdateDeanComplaintStatusMutation,
    useAddDeanComplaintCommentMutation,
    useGetHostelReportsQuery,
    useGetHostelReportByIdQuery,
    useGetFundUsageQuery,
    useGetFinancialSummaryQuery,
    useGetBudgetAllocationsQuery,
    useCreateBudgetAllocationMutation,
    useUpdateBudgetAllocationMutation,
    useGetDeanNoticesQuery,
    useSendDeanNoticeMutation,
    useUpdateDeanNoticeMutation,
    useDeleteDeanNoticeMutation,
    useGetAllHostelsForDeanQuery,
    useGetHostelDetailsForDeanQuery,
    useGetDeanReportsQuery,
    useGetHostelsReportForDeanQuery,
    useGetComplaintsReportForDeanQuery,
    useGetRequisitionsReportForDeanQuery,
    useGetOccupancyReportForDeanQuery,
    useGetPaymentsReportForDeanQuery,
} = deanApi;
