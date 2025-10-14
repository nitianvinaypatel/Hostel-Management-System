import { apiClient } from '@/lib/api-client'

export const adminService = {
    getUsers: () => apiClient('/admin/users'),
    createUser: (data: Record<string, unknown>) => apiClient('/admin/users', { method: 'POST', body: JSON.stringify(data) }),
    getHostels: () => apiClient('/admin/hostels'),
    getReports: () => apiClient('/admin/reports'),
    getRequisitions: () => apiClient('/admin/requisitions'),
}
