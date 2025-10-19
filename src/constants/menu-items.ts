export const adminMenuItems = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: "LayoutDashboard",
    },
    {
        title: "User Management",
        icon: "Users",
        items: [
            {
                title: "All Users",
                url: "/admin/users",
            },
            {
                title: "Add User",
                url: "/admin/users/add",
            },
            {
                title: "Roles & Permissions",
                url: "/admin/users/roles",
            },
        ],
    },
    {
        title: "Hostel Management",
        icon: "Building2",
        items: [
            {
                title: "All Hostels",
                url: "/admin/hostels",
            },
            {
                title: "Rooms & Blocks",
                url: "/admin/hostels/rooms",
            },
            {
                title: "Fee Structure",
                url: "/admin/hostels/fees",
            },
        ],
    },
    {
        title: "Requisitions",
        url: "/admin/requisitions",
        icon: "ClipboardList",
    },
    {
        title: "Reports",
        icon: "FileText",
        items: [
            {
                title: "All Reports",
                url: "/admin/reports",
            },
            {
                title: "Occupancy Report",
                url: "/admin/reports/occupancy",
            },
            {
                title: "Fee Collection",
                url: "/admin/reports/fees",
            },
            {
                title: "Complaints Summary",
                url: "/admin/reports/complaints",
            },
            {
                title: "Maintenance Costs",
                url: "/admin/reports/maintenance",
            },
        ],
    },
    {
        title: "Notifications",
        url: "/admin/notifications",
        icon: "Bell",
    },
    {
        title: "Analytics",
        url: "/admin/analytics",
        icon: "BarChart3",
    },
    {
        title: "System",
        icon: "Settings",
        items: [
            {
                title: "Backup & Restore",
                url: "/admin/system/backup",
            },
            {
                title: "Document Archives",
                url: "/admin/system/documents",
            },
        ],
    },
]

export const studentMenuItems = [
    {
        title: "Dashboard",
        url: "/student/dashboard",
        icon: "LayoutDashboard",
    },
    {
        title: "Apply for Hostel",
        url: "/student/apply-for-hostel",
        icon: "Home",
    },
    {
        title: "Room Allotment",
        url: "/student/room-allotment",
        icon: "DoorOpen",
    },
    {
        title: "Complaints",
        url: "/student/complaints",
        icon: "MessageSquare",
    },
    {
        title: "Requests",
        url: "/student/requests",
        icon: "ClipboardList",
    },
    {
        title: "Mess Menu",
        url: "/student/mess-menu",
        icon: "Utensils",
    },
    {
        title: "Hostel Notices",
        url: "/student/notices",
        icon: "Bell",
    },
    {
        title: "Payments",
        url: "/student/payments",
        icon: "CreditCard",
    },
]

export const wardenMenuItems = [
    {
        title: "Dashboard",
        url: "/warden/dashboard",
        icon: "LayoutDashboard",
    },
    {
        title: "Approvals",
        icon: "CheckSquare",
        items: [
            {
                title: "All Approvals",
                url: "/warden/approvals",
            },
            {
                title: "Room Allotments",
                url: "/warden/approvals/room-allotments",
            },
            {
                title: "Hostel Changes",
                url: "/warden/approvals/hostel-changes",
            },
            {
                title: "Complaints",
                url: "/warden/approvals/complaints",
            },
        ],
    },
    {
        title: "Requisitions",
        url: "/warden/requisitions",
        icon: "ClipboardList",
    },
    {
        title: "Mess Management",
        icon: "Utensils",
        items: [
            {
                title: "Mess Menu",
                url: "/warden/mess/menu",
            },
            {
                title: "Quality Feedback",
                url: "/warden/mess/feedback",
            },
        ],
    },
    {
        title: "Reports",
        icon: "FileText",
        items: [
            {
                title: "All Reports",
                url: "/warden/reports",
            },
            {
                title: "Occupancy",
                url: "/warden/reports/occupancy",
            },
            {
                title: "Complaints",
                url: "/warden/reports/complaints",
            },
            {
                title: "Requisitions",
                url: "/warden/reports/requisitions",
            },
            {
                title: "Payments",
                url: "/warden/reports/payments",
            },
        ],
    },
    {
        title: "Announcements",
        url: "/warden/announcements",
        icon: "Megaphone",
    },
    {
        title: "Caretakers",
        url: "/warden/caretakers",
        icon: "Users",
    },
    {
        title: "Inventory",
        url: "/warden/inventory",
        icon: "Package",
    },
    {
        title: "Messages",
        url: "/warden/messages",
        icon: "MessageSquare",
    },
]

export const deanMenuItems = [
    {
        title: "Dashboard",
        url: "/dean/dashboard",
        icon: "LayoutDashboard",
    },
    {
        title: "Requisitions",
        icon: "ClipboardList",
        items: [
            {
                title: "All Requisitions",
                url: "/dean/requisitions",
            },
            {
                title: "Pending Approval",
                url: "/dean/requisitions/pending",
            },
            {
                title: "Approved",
                url: "/dean/requisitions/approved",
            },
            {
                title: "Rejected",
                url: "/dean/requisitions/rejected",
            },
        ],
    },
    {
        title: "Reports",
        icon: "FileText",
        items: [
            {
                title: "All Reports",
                url: "/dean/reports",
            },
            {
                title: "Occupancy",
                url: "/dean/reports/occupancy",
            },
            {
                title: "Complaints",
                url: "/dean/reports/complaints",
            },
            {
                title: "Financial Summary",
                url: "/dean/reports/financial",
            },
        ],
    },
    {
        title: "Fund Management",
        icon: "DollarSign",
        items: [
            {
                title: "Fund Usage",
                url: "/dean/funds/usage",
            },
            {
                title: "Budget Allocation",
                url: "/dean/funds/budget",
            },
        ],
    },
    {
        title: "Announcements",
        url: "/dean/announcements",
        icon: "Megaphone",
    },
    {
        title: "Feedback & Comments",
        url: "/dean/feedback",
        icon: "MessageCircle",
    },
]

export const caretakerMenuItems = [
    {
        title: "Dashboard",
        url: "/caretaker/dashboard",
        icon: "LayoutDashboard",
    },
    {
        title: "Room Management",
        icon: "DoorOpen",
        items: [
            {
                title: "Add Room",
                url: "/caretaker/room-management/add",
            },
            {
                title: "Modify Room",
                url: "/caretaker/room-management/modify",
            },
            {
                title: "Remove Room",
                url: "/caretaker/room-management/remove",
            },
            {
                title: "View Rooms",
                url: "/caretaker/room-management/view",
            },
            {
                title: "Room Capacity",
                url: "/caretaker/room-management/capacity",
            },
        ],
    },
    {
        title: "Room Allotment",
        url: "/caretaker/room-allotment",
        icon: "UserPlus",
    },
    {
        title: "Complaints",
        url: "/caretaker/complaints",
        icon: "MessageSquare",
    },
    {
        title: "Requests",
        url: "/caretaker/requests",
        icon: "FileEdit",
    },
    {
        title: "Mess Management",
        url: "/caretaker/mess-management",
        icon: "Utensils",
    },
    {
        title: "Requisitions",
        url: "/caretaker/requisitions",
        icon: "ClipboardList",
    },
]
