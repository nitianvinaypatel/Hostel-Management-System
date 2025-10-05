import { apiClient } from '@/lib/api-client'

export const wardenService = {
    getRequisitions: () => apiClient('/warden/requisitions'),
    approveRequisition: (id: string) => apiClient(`/warden/requisitions/${id}/approve`, { method: 'POST' }),
    getApprovals: () => apiClient('/warden/approvals'),
    getReports: () => apiClient('/warden/reports'),
}
