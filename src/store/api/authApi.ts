import { apiSlice } from './apiSlice';
import { User } from '@/types/user';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    studentId?: string;
    course?: string;
    branch?: string;
    year?: number;
    semester?: number;
    gender?: string;
    hostelId?: string;
    role?: string;
}

interface AuthResponse {
    success: boolean;
    data: {
        user: User;
        token: string;
        refreshToken?: string;
    };
    message?: string;
}

interface RegistrationOptions {
    courses: Array<{ value: string; label: string }>;
    branches: Array<{ value: string; label: string }>;
    years: Array<{ value: number; label: string }>;
    semesters: Array<{ value: number; label: string }>;
    genders: Array<{ value: string; label: string }>;
}

interface Hostel {
    _id: string;
    name: string;
    code: string;
    type: 'boys' | 'girls';
    totalCapacity: number;
    occupiedCapacity: number;
    availableCapacity: number;
    facilities: string[];
    isAvailable: boolean;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        getRegistrationOptions: builder.query<{ success: boolean; data: RegistrationOptions }, void>({
            query: () => '/auth/registration-options',
        }),
        getAvailableHostels: builder.query<{ success: boolean; data: Hostel[] }, { gender?: string }>({
            query: ({ gender }) => {
                const params = gender ? `?gender=${gender}` : '';
                return `/auth/hostels${params}`;
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['Auth', 'User'],
        }),
        updateProfile: builder.mutation<User, Partial<User>>({
            query: (data) => ({
                url: '/auth/update-profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'PUT',
                body: data,
            }),
        }),
        forgotPassword: builder.mutation<{ message: string }, { email: string }>({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
            query: ({ token, password }) => ({
                url: `/auth/reset-password/${token}`,
                method: 'POST',
                body: { password },
            }),
        }),
        verifyEmail: builder.mutation<{ message: string }, { token: string }>({
            query: ({ token }) => ({
                url: `/auth/verify-email/${token}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyEmailMutation,
    useGetRegistrationOptionsQuery,
    useGetAvailableHostelsQuery,
    useLazyGetAvailableHostelsQuery,
} = authApi;
