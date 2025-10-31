import { UserRole } from '@/constants/roles'

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    phone?: string
    profileImage?: string
    hostelId?: string
    roomNumber?: string
    createdAt?: string
    updatedAt?: string
}
