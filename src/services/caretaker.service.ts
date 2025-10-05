import { apiClient } from '@/lib/api-client'

export const caretakerService = {
    getComplaints: () => apiClient('/caretaker/complaints'),
    updateComplaint: (id: string, data: any) => apiClient(`/caretaker/complaints/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    getRequisitions: () => apiClient('/caretaker/requisitions'),
    getMessManagement: () => apiClient('/caretaker/mess-management'),
}
