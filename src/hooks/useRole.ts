import { useAuth } from './useAuth'
import { UserRole } from '@/constants/roles'

export function useRole() {
    const { user } = useAuth()

    const hasRole = (role: UserRole) => {
        return user?.role === role
    }

    const isStudent = () => hasRole(UserRole.STUDENT)
    const isCaretaker = () => hasRole(UserRole.CARETAKER)
    const isWarden = () => hasRole(UserRole.WARDEN)
    const isAdmin = () => hasRole(UserRole.ADMIN)
    const isDean = () => hasRole(UserRole.DEAN)

    return {
        role: user?.role,
        hasRole,
        isStudent,
        isCaretaker,
        isWarden,
        isAdmin,
        isDean,
    }
}
