export enum UserRole {
    STUDENT = 'student',
    CARETAKER = 'caretaker',
    WARDEN = 'warden',
    ADMIN = 'admin',
    DEAN = 'dean',
}

export const ROLE_LABELS = {
    [UserRole.STUDENT]: 'Student',
    [UserRole.CARETAKER]: 'Caretaker',
    [UserRole.WARDEN]: 'Warden',
    [UserRole.ADMIN]: 'Admin',
    [UserRole.DEAN]: 'Dean',
}
