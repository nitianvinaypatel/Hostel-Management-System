import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        'Auth',
        'User',
        'Student',
        'Complaint',
        'Requisition',
        'Payment',
        'Request',
        'MessMenu',
        'Notice',
        'Notification',
        'Hostel',
        'Room',
        'Message',
        'Rating',
        'Report',
    ],
    endpoints: () => ({}),
});
