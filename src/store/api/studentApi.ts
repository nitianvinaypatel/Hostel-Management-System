import { apiSlice } from './apiSlice';
import { Complaint } from '@/types/complaint';
import { ApiResponse, PaginatedResponse } from '@/types/common';

interface DashboardData {
    profile: any;
    complaints: { total: number; pending: number; resolved: number };
    payments: { pending: number; total: number };
    notices: number;
    roomDetails: any;
}

interface CreateComplaintRequest {
    title: string;
    description: string;
    category: string;
    priority?: string;
}

interface PaymentInitiateRequest {
    amount: number;
    paymentType: string;
    description: string;
}

interface PaymentVerifyRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface CreateRequestData {
    requestType: 'room_change' | 'hostel_change' | 'roommate_change';
    requestedRoomId?: string;
    requestedHostelId?: string;
    reason: string;
}

interface RatingData {
    category: string;
    rating: number;
    feedback: string;
    isAnonymous: boolean;
}

interface MessageData {
    receiverId: string;
    content: string;
}

export const studentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard
        getStudentDashboard: builder.query<ApiResponse<DashboardData>, void>({
            query: () => '/student/dashboard',
            providesTags: ['Student'],
        }),

        // Profile
        getStudentProfile: builder.query<ApiResponse<any>, void>({
            query: () => '/student/profile',
            providesTags: ['Student', 'User'],
        }),

        // Complaints
        getStudentComplaints: builder.query<PaginatedResponse<Complaint>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `/student/complaints?page=${page}&limit=${limit}`,
            providesTags: ['Complaint'],
        }),

        getComplaintById: builder.query<ApiResponse<Complaint>, string>({
            query: (id) => `/student/complaints/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Complaint', id }],
        }),

        createComplaint: builder.mutation<ApiResponse<Complaint>, CreateComplaintRequest>({
            query: (data) => ({
                url: '/student/complaints',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Complaint', 'Student'],
        }),

        updateComplaint: builder.mutation<ApiResponse<Complaint>, { id: string; data: Partial<CreateComplaintRequest> }>({
            query: ({ id, data }) => ({
                url: `/student/complaints/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }, 'Complaint'],
        }),

        deleteComplaint: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/student/complaints/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Complaint'],
        }),

        addComplaintComment: builder.mutation<ApiResponse<any>, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/student/complaints/${id}/comment`,
                method: 'POST',
                body: { comment },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Complaint', id }],
        }),

        // Payments
        getPendingPayments: builder.query<ApiResponse<any[]>, void>({
            query: () => '/student/payments/pending',
            providesTags: ['Payment'],
        }),

        getPaymentHistory: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `/student/payments/history?page=${page}&limit=${limit}`,
            providesTags: ['Payment'],
        }),

        getPaymentById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/student/payments/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Payment', id }],
        }),

        initiatePayment: builder.mutation<ApiResponse<any>, PaymentInitiateRequest>({
            query: (data) => ({
                url: '/student/payments/initiate',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Payment'],
        }),

        verifyPayment: builder.mutation<ApiResponse<any>, PaymentVerifyRequest>({
            query: (data) => ({
                url: '/student/payments/verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Payment', 'Student'],
        }),

        downloadReceipt: builder.query<Blob, string>({
            query: (id) => ({
                url: `/student/payments/receipt/${id}`,
                responseHandler: (response) => response.blob(),
            }),
        }),

        // Requests (Room/Hostel Change)
        getStudentRequests: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `/student/requests?page=${page}&limit=${limit}`,
            providesTags: ['Request'],
        }),

        getRequestById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/student/requests/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Request', id }],
        }),

        createRequest: builder.mutation<ApiResponse<any>, CreateRequestData>({
            query: (data) => ({
                url: '/student/requests',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Request'],
        }),

        updateRequest: builder.mutation<ApiResponse<any>, { id: string; data: Partial<CreateRequestData> }>({
            query: ({ id, data }) => ({
                url: `/student/requests/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        cancelRequest: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/student/requests/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Request'],
        }),

        // Mess Menu
        getMessMenu: builder.query<ApiResponse<any>, void>({
            query: () => '/student/mess-menu',
            providesTags: ['MessMenu'],
        }),

        // Notices
        getNotices: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `/student/notices?page=${page}&limit=${limit}`,
            providesTags: ['Notice'],
        }),

        getNoticeById: builder.query<ApiResponse<any>, string>({
            query: (id) => `/student/notices/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Notice', id }],
        }),

        markNoticeAsViewed: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/student/notices/${id}/view`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Notice', id }],
        }),

        // Room Details
        getRoomDetails: builder.query<ApiResponse<any>, void>({
            query: () => '/student/room-details',
            providesTags: ['Room'],
        }),

        // Ratings
        submitRating: builder.mutation<ApiResponse<any>, RatingData>({
            query: (data) => ({
                url: '/student/ratings',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Rating'],
        }),

        getMyRatings: builder.query<ApiResponse<any[]>, void>({
            query: () => '/student/ratings',
            providesTags: ['Rating'],
        }),

        updateRating: builder.mutation<ApiResponse<any>, { id: string; data: Partial<RatingData> }>({
            query: ({ id, data }) => ({
                url: `/student/ratings/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Rating'],
        }),

        // Messages
        getConversations: builder.query<ApiResponse<any[]>, void>({
            query: () => '/student/messages/conversations',
            providesTags: ['Message'],
        }),

        getMessages: builder.query<PaginatedResponse<any>, { userId: string; page?: number; limit?: number }>({
            query: ({ userId, page = 1, limit = 50 }) => `/student/messages/${userId}?page=${page}&limit=${limit}`,
            providesTags: ['Message'],
        }),

        sendMessage: builder.mutation<ApiResponse<any>, MessageData>({
            query: (data) => ({
                url: '/student/messages',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Message'],
        }),

        markMessageAsRead: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/student/messages/${id}/read`,
                method: 'PUT',
            }),
            invalidatesTags: ['Message'],
        }),

        deleteMessage: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/student/messages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Message'],
        }),

        // Notifications
        getNotifications: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/student/notifications?page=${page}&limit=${limit}`,
            providesTags: ['Notification'],
        }),

        markNotificationAsRead: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/student/notifications/${id}/read`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const {
    useGetStudentDashboardQuery,
    useGetStudentProfileQuery,
    useGetStudentComplaintsQuery,
    useGetComplaintByIdQuery,
    useCreateComplaintMutation,
    useUpdateComplaintMutation,
    useDeleteComplaintMutation,
    useAddComplaintCommentMutation,
    useGetPendingPaymentsQuery,
    useGetPaymentHistoryQuery,
    useGetPaymentByIdQuery,
    useInitiatePaymentMutation,
    useVerifyPaymentMutation,
    useLazyDownloadReceiptQuery,
    useGetStudentRequestsQuery,
    useGetRequestByIdQuery,
    useCreateRequestMutation,
    useUpdateRequestMutation,
    useCancelRequestMutation,
    useGetMessMenuQuery,
    useGetNoticesQuery,
    useGetNoticeByIdQuery,
    useMarkNoticeAsViewedMutation,
    useGetRoomDetailsQuery,
    useSubmitRatingMutation,
    useGetMyRatingsQuery,
    useUpdateRatingMutation,
    useGetConversationsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
    useMarkMessageAsReadMutation,
    useDeleteMessageMutation,
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
} = studentApi;
