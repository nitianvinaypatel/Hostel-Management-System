import { apiClient } from '@/lib/api-client'

export const studentService = {
    // Dashboard
    getDashboard: () => apiClient('/student/dashboard'),

    // Complaints
    getComplaints: () => apiClient('/student/complaints'),
    createComplaint: (data: Record<string, unknown>) =>
        apiClient('/student/complaints', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

    // Requests
    getRequests: () => apiClient('/student/requests'),

    // Payments
    getPayments: () => apiClient('/student/payments'),

    // Mess Menu
    getMessMenu: () => apiClient('/student/mess-menu'),
}
