import { apiSlice } from './apiSlice';
import { Complaint } from '@/types/complaint';
import { ApiResponse, PaginatedResponse } from '@/types/common';

interface DashboardData {
    user?: {
        name: string;
        email: string;
    };
    stats?: {
        myRequests?: {
            total: number;
            pending: number;
            approved: number;
        };
        complaints?: {
            total: number;
            inProgress: number;
        };
        pendingPayments?: {
            total: number;
            count: number;
            nextDueDate: string | null;
        };
        roomDetails?: {
            roomNumber: string;
            hostelName: string;
            floor: number;
            blockName?: string;
        } | null;
    };
    latestNotices?: Array<{
        _id?: string;
        id?: string;
        title: string;
        message?: string;
        content?: string;
        type?: string;
        category?: string;
        priority?: string;
        createdAt?: string;
        date?: string;
        isNew?: boolean;
    }>;
    recentActivity?: Array<{
        id: string;
        type: string;
        title: string;
        description?: string;
        time?: string;
        timestamp?: string;
        status?: string;
    }>;
}

interface CreateComplaintRequest {
    title: string;
    description: string;
    category: string;
    priority?: string;
}

interface ComplaintsResponse {
    success: boolean;
    data: {
        complaints: Complaint[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    };
}

interface RequestsResponse {
    success: boolean;
    data: {
        requests: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    };
}

interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    dateOfBirth?: string;
    address?: string;
    emergencyContact?: {
        name: string;
        relation: string;
        phone: string;
    };
}

interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

interface HostelApplicationRequest {
    hostelId?: string;
    hostelName?: string;
    roomNumber: string;
}

interface PaymentInitiateRequest {
    paymentId: string;
    amount: number;
    method: string;
}

interface PaymentVerifyRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface CreateRequestData {
    type: 'leave' | 'room_change' | 'hostel_change' | 'other';
    subject: string;
    description: string;
    startDate?: string;
    endDate?: string;
}

interface FeedbackData {
    category: string;
    subject: string;
    description: string;
    rating: number;
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

        updateStudentProfile: builder.mutation<ApiResponse<any>, UpdateProfileRequest>({
            query: (data) => ({
                url: '/student/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Student', 'User'],
        }),

        uploadProfilePicture: builder.mutation<ApiResponse<any>, FormData>({
            query: (formData) => ({
                url: '/student/profile/picture',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Student', 'User'],
        }),

        changePassword: builder.mutation<ApiResponse<void>, ChangePasswordRequest>({
            query: (data) => ({
                url: '/student/profile/password',
                method: 'PUT',
                body: data,
            }),
        }),

        // Hostel Application
        getAvailableHostels: builder.query<ApiResponse<any[]>, void>({
            query: () => '/student/hostels/available',
            providesTags: ['Hostel'],
        }),

        getAvailableRooms: builder.query<ApiResponse<any[]>, string>({
            query: (hostelId) => `/student/hostels/${hostelId}/rooms`,
            providesTags: ['Room'],
        }),

        submitHostelApplication: builder.mutation<ApiResponse<any>, HostelApplicationRequest>({
            query: (data) => ({
                url: '/student/hostel-application',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Student'],
        }),

        getApplicationStatus: builder.query<ApiResponse<any>, void>({
            query: () => '/student/hostel-application/status',
            providesTags: ['Student'],
        }),

        // Room Allotment
        getRoomAllotment: builder.query<ApiResponse<any>, void>({
            query: () => '/student/room-allotment',
            providesTags: ['Room'],
        }),

        // Complaints
        getStudentComplaints: builder.query<ComplaintsResponse, { page?: number; limit?: number; status?: string }>({
            query: ({ page = 1, limit = 10, status }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (status) params.append('status', status);
                return `/student/complaints?${params.toString()}`;
            },
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

        // Requests
        getStudentRequests: builder.query<RequestsResponse, { status?: string; type?: string }>({
            query: ({ status, type }) => {
                const params = new URLSearchParams();
                if (status) params.append('status', status);
                if (type) params.append('type', type);
                return `/student/requests?${params.toString()}`;
            },
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

        // Payments
        getPaymentSummary: builder.query<ApiResponse<any>, void>({
            query: () => '/student/payments/summary',
            providesTags: ['Payment'],
        }),

        getPendingPayments: builder.query<ApiResponse<any[]>, void>({
            query: () => '/student/payments/pending',
            providesTags: ['Payment'],
        }),

        getPaymentHistory: builder.query<PaginatedResponse<any>, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `/student/payments/history?page=${page}&limit=${limit}`,
            providesTags: ['Payment'],
        }),

        initiatePayment: builder.mutation<ApiResponse<any>, PaymentInitiateRequest>({
            query: (data) => ({
                url: '/student/payments/initiate',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Payment'],
        }),

        downloadReceipt: builder.query<Blob, string>({
            query: (transactionId) => ({
                url: `/student/payments/${transactionId}/receipt`,
                responseHandler: (response) => response.blob(),
            }),
        }),

        // Mess Menu
        getMessMenu: builder.query<ApiResponse<any>, void>({
            query: () => '/student/mess-menu',
            providesTags: ['MessMenu'],
        }),

        getTodayMessMenu: builder.query<ApiResponse<any>, void>({
            query: () => '/student/mess-menu/today',
            providesTags: ['MessMenu'],
        }),

        getMessInfo: builder.query<ApiResponse<any>, void>({
            query: () => '/student/mess-menu/info',
            providesTags: ['MessMenu'],
        }),

        // Notifications
        getNotifications: builder.query<{ success: boolean; data: any[] | { notifications: any[] } }, { type?: string; isRead?: boolean }>({
            query: ({ type, isRead }) => {
                const params = new URLSearchParams();
                if (type) params.append('type', type);
                if (isRead !== undefined) params.append('isRead', String(isRead));
                return `/student/notifications?${params.toString()}`;
            },
            providesTags: ['Notification'],
        }),

        markNotificationAsRead: builder.mutation<ApiResponse<void>, string>({
            query: (notificationId) => ({
                url: `/student/notifications/${notificationId}/read`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),

        markAllNotificationsAsRead: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: '/student/notifications/read-all',
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),

        deleteNotification: builder.mutation<ApiResponse<void>, string>({
            query: (notificationId) => ({
                url: `/student/notifications/${notificationId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notification'],
        }),

        // Events
        getUpcomingEvents: builder.query<{ success: boolean; data: any[] | { events: any[] } }, { category?: string }>({
            query: ({ category }) => {
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                return `/student/events/upcoming?${params.toString()}`;
            },
            providesTags: ['Event'],
        }),

        getPastEvents: builder.query<{ success: boolean; data: any[] | { events: any[] } }, void>({
            query: () => '/student/events/past',
            providesTags: ['Event'],
        }),

        getEventById: builder.query<ApiResponse<any>, string>({
            query: (eventId) => `/student/events/${eventId}`,
            providesTags: (_result, _error, id) => [{ type: 'Event', id }],
        }),

        registerForEvent: builder.mutation<ApiResponse<void>, string>({
            query: (eventId) => ({
                url: `/student/events/${eventId}/register`,
                method: 'POST',
            }),
            invalidatesTags: ['Event'],
        }),

        cancelEventRegistration: builder.mutation<ApiResponse<void>, string>({
            query: (eventId) => ({
                url: `/student/events/${eventId}/register`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event'],
        }),

        getEventCalendar: builder.query<ApiResponse<any>, { month: number; year: number }>({
            query: ({ month, year }) => `/student/events/calendar?month=${month}&year=${year}`,
            providesTags: ['Event'],
        }),

        // Feedback
        getAllFeedback: builder.query<{ success: boolean; data: { feedbacks: any[]; pagination?: any } }, { status?: string; category?: string }>({
            query: ({ status, category }) => {
                const params = new URLSearchParams();
                if (status) params.append('status', status);
                if (category) params.append('category', category);
                return `/student/feedback?${params.toString()}`;
            },
            providesTags: ['Feedback'],
        }),

        submitFeedback: builder.mutation<ApiResponse<any>, FeedbackData>({
            query: (data) => ({
                url: '/student/feedback',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Feedback'],
        }),

        getFeedbackById: builder.query<ApiResponse<any>, string>({
            query: (feedbackId) => `/student/feedback/${feedbackId}`,
            providesTags: (_result, _error, id) => [{ type: 'Feedback', id }],
        }),

        // Emergency Contacts
        getEmergencyContacts: builder.query<ApiResponse<any[]>, { category?: string; priority?: string }>({
            query: ({ category, priority }) => {
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                if (priority) params.append('priority', priority);
                return `/student/emergency-contacts?${params.toString()}`;
            },
            providesTags: ['EmergencyContact'],
        }),
    }),
});

export const {
    useGetStudentDashboardQuery,
    useGetStudentProfileQuery,
    useUpdateStudentProfileMutation,
    useUploadProfilePictureMutation,
    useChangePasswordMutation,
    useGetAvailableHostelsQuery,
    useGetAvailableRoomsQuery,
    useSubmitHostelApplicationMutation,
    useGetApplicationStatusQuery,
    useGetRoomAllotmentQuery,
    useGetStudentComplaintsQuery,
    useGetComplaintByIdQuery,
    useCreateComplaintMutation,
    useGetStudentRequestsQuery,
    useGetRequestByIdQuery,
    useCreateRequestMutation,
    useGetPaymentSummaryQuery,
    useGetPendingPaymentsQuery,
    useGetPaymentHistoryQuery,
    useInitiatePaymentMutation,
    useLazyDownloadReceiptQuery,
    useGetMessMenuQuery,
    useGetTodayMessMenuQuery,
    useGetMessInfoQuery,
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useDeleteNotificationMutation,
    useGetUpcomingEventsQuery,
    useGetPastEventsQuery,
    useGetEventByIdQuery,
    useRegisterForEventMutation,
    useCancelEventRegistrationMutation,
    useGetEventCalendarQuery,
    useGetAllFeedbackQuery,
    useSubmitFeedbackMutation,
    useGetFeedbackByIdQuery,
    useGetEmergencyContactsQuery,
} = studentApi;
