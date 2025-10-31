// Student Module Types

export interface StudentDashboardData {
    user: {
        name: string
        email: string
    }
    stats: {
        myRequests: {
            total: number
            pending: number
            approved: number
        }
        complaints: {
            total: number
            inProgress: number
        }
        pendingPayments: {
            total: number
            count: number
            nextDueDate: string | null
        }
        roomDetails: RoomDetails | null
    }
    latestNotices: Notice[]
    recentActivity: Activity[]
}

export interface RoomDetails {
    roomNumber: string
    hostelName: string
    floor: number
    blockName?: string
}

export interface Notice {
    _id: string
    id?: string
    title: string
    message?: string
    content?: string
    type: 'emergency' | 'policy' | 'announcement' | 'maintenance' | 'info'
    category?: 'urgent' | 'event' | 'maintenance' | 'general'
    priority?: 'low' | 'medium' | 'high'
    createdAt: string
    date?: string
    isNew?: boolean
}

export interface Activity {
    id: string
    type: 'request' | 'complaint' | 'payment' | 'notice'
    title: string
    description?: string
    time: string
    timestamp?: string
    status?: string
}
