export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',

    STUDENT: {
        DASHBOARD: '/student/dashboard',
        COMPLAINTS: '/student/complaints',
        REQUESTS: '/student/requests',
        PAYMENTS: '/student/payments',
        MESS_MENU: '/student/mess-menu',
    },

    CARETAKER: {
        DASHBOARD: '/caretaker/dashboard',
        COMPLAINTS: '/caretaker/complaints',
        REQUISITIONS: '/caretaker/requisitions',
        MESS_MANAGEMENT: '/caretaker/mess-management',
    },

    WARDEN: {
        DASHBOARD: '/warden/dashboard',
        REQUISITIONS: '/warden/requisitions',
        APPROVALS: '/warden/approvals',
        REPORTS: '/warden/reports',
    },

    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users',
        HOSTELS: '/admin/hostels',
        REPORTS: '/admin/reports',
        REQUISITIONS: '/admin/requisitions',
    },

    DEAN: {
        DASHBOARD: '/dean/dashboard',
        REQUISITIONS: '/dean/requisitions',
        REPORTS: '/dean/reports',
        ANNOUNCEMENTS: '/dean/announcements',
    },
}
