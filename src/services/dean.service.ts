import { apiClient } from '@/lib/api-client'

export const deanService = {
    getRequisitions: () => apiClient('/dean/requisitions'),
    approveRequisition: (id: string) => apiClient(`/dean/requisitions/${id}/approve`, { method: 'POST' }),
    getReports: () => apiClient('/dean/reports'),
    getAnnouncements: () => apiClient('/dean/announcements'),
    createAnnouncement: (data: Record<string, unknown>) => apiClient('/dean/announcements', { method: 'POST', body: JSON.stringify(data) }),
}
