import { apiClient } from '@/lib/api-client'

export const studentService = {
    getComplaints: () => apiClient('/student/complaints'),
    createComplaint: (data: any) => apiClient('/student/complaints', { method: 'POST', body: JSON.stringify(data) }),
    getRequests: () => apiClient('/student/requests'),
    getPayments: () => apiClient('/student/payments'),
    getMessMenu: () => apiClient('/student/mess-menu'),
}
