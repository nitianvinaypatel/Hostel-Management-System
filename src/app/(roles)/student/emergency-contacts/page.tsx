"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    AlertTriangle,
    Shield,
    Heart,
    Building2,
    Users,
    Wrench,
    Flame,
    Droplet,
    Zap,
    ArrowLeft,
    Copy,
    ExternalLink,
    Loader2,
    AlertCircle as AlertCircleIcon,
} from "lucide-react"
import { toast } from "sonner"
import { useGetEmergencyContactsQuery } from '@/store/api/studentApi'

type ContactCategory = "emergency" | "hostel" | "medical" | "security" | "maintenance" | "administration"

type Contact = {
    id: string
    name: string
    designation: string
    category: ContactCategory
    phone: string
    alternatePhone?: string
    email?: string
    location?: string
    availability: string
    priority: "critical" | "high" | "medium"
}

const emergencyContacts: Contact[] = [
    // Critical Emergency Services
    {
        id: "E001",
        name: "Emergency Helpline",
        designation: "24/7 Emergency Response",
        category: "emergency",
        phone: "100",
        alternatePhone: "112",
        availability: "24/7",
        priority: "critical",
    },
    {
        id: "E002",
        name: "Ambulance Service",
        designation: "Medical Emergency",
        category: "medical",
        phone: "108",
        alternatePhone: "102",
        availability: "24/7",
        priority: "critical",
    },
    {
        id: "E003",
        name: "Fire Department",
        designation: "Fire Emergency",
        category: "emergency",
        phone: "101",
        availability: "24/7",
        priority: "critical",
    },
    {
        id: "E004",
        name: "Police Station",
        designation: "Law Enforcement",
        category: "security",
        phone: "100",
        alternatePhone: "+91 98765 11111",
        location: "University Campus",
        availability: "24/7",
        priority: "critical",
    },

    // Hostel Staff
    {
        id: "H001",
        name: "Dr. Rajesh Kumar",
        designation: "Chief Warden",
        category: "hostel",
        phone: "+91 98765 12345",
        email: "warden@university.edu",
        location: "Hostel Office, Block A",
        availability: "24/7",
        priority: "high",
    },
    {
        id: "H002",
        name: "Mr. Suresh Patel",
        designation: "Assistant Warden",
        category: "hostel",
        phone: "+91 98765 23456",
        email: "asst.warden@university.edu",
        location: "Hostel Office, Block B",
        availability: "8 AM - 10 PM",
        priority: "high",
    },
    {
        id: "H003",
        name: "Security Control Room",
        designation: "Campus Security",
        category: "security",
        phone: "+91 98765 34567",
        alternatePhone: "+91 98765 34568",
        location: "Main Gate",
        availability: "24/7",
        priority: "high",
    },

    // Medical Services
    {
        id: "M001",
        name: "University Health Center",
        designation: "Medical Facility",
        category: "medical",
        phone: "+91 98765 45678",
        email: "health@university.edu",
        location: "Near Sports Complex",
        availability: "8 AM - 8 PM",
        priority: "high",
    },
    {
        id: "M002",
        name: "Dr. Priya Sharma",
        designation: "On-Call Doctor",
        category: "medical",
        phone: "+91 98765 56789",
        email: "doctor@university.edu",
        availability: "24/7 (Emergency)",
        priority: "high",
    },
    {
        id: "M003",
        name: "City Hospital",
        designation: "Nearest Hospital",
        category: "medical",
        phone: "+91 98765 67890",
        alternatePhone: "1800-XXX-XXXX",
        location: "2 km from campus",
        availability: "24/7",
        priority: "high",
    },

    // Maintenance
    {
        id: "MT001",
        name: "Maintenance Office",
        designation: "Repairs & Maintenance",
        category: "maintenance",
        phone: "+91 98765 78901",
        email: "maintenance@university.edu",
        location: "Behind Mess Hall",
        availability: "8 AM - 6 PM",
        priority: "medium",
    },
    {
        id: "MT002",
        name: "Electrician (Emergency)",
        designation: "Electrical Issues",
        category: "maintenance",
        phone: "+91 98765 89012",
        availability: "24/7",
        priority: "high",
    },
    {
        id: "MT003",
        name: "Plumber (Emergency)",
        designation: "Plumbing Issues",
        category: "maintenance",
        phone: "+91 98765 90123",
        availability: "24/7",
        priority: "high",
    },

    // Administration
    {
        id: "A001",
        name: "Dean of Students",
        designation: "Student Affairs",
        category: "administration",
        phone: "+91 98765 01234",
        email: "dean@university.edu",
        location: "Administration Block",
        availability: "9 AM - 5 PM",
        priority: "medium",
    },
    {
        id: "A002",
        name: "Hostel Office",
        designation: "General Inquiries",
        category: "administration",
        phone: "+91 98765 11223",
        email: "hostel@university.edu",
        location: "Hostel Reception",
        availability: "8 AM - 8 PM",
        priority: "medium",
    },
]

export default function EmergencyContacts() {
    const [categoryFilter, setCategoryFilter] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('')

    // Fetch emergency contacts from API
    const { data: contactsData, isLoading, error } = useGetEmergencyContactsQuery({
        category: categoryFilter,
        priority: priorityFilter
    })

    console.log('Emergency Contacts Data:', contactsData)

    const emergencyContacts = contactsData?.data || []

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`
    }

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} copied to clipboard!`)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-400">Failed to load emergency contacts</p>
                </div>
            </div>
        )
    }

    const getCategoryIcon = (category: ContactCategory) => {
        switch (category) {
            case "emergency":
                return <AlertTriangle className="h-5 w-5" />
            case "medical":
                return <Heart className="h-5 w-5" />
            case "security":
                return <Shield className="h-5 w-5" />
            case "hostel":
                return <Building2 className="h-5 w-5" />
            case "maintenance":
                return <Wrench className="h-5 w-5" />
            case "administration":
                return <Users className="h-5 w-5" />
            default:
                return <Phone className="h-5 w-5" />
        }
    }

    const getCategoryColor = (category: ContactCategory) => {
        switch (category) {
            case "emergency":
                return "from-red-500 to-rose-600"
            case "medical":
                return "from-pink-500 to-rose-600"
            case "security":
                return "from-blue-500 to-indigo-600"
            case "hostel":
                return "from-purple-500 to-indigo-600"
            case "maintenance":
                return "from-orange-500 to-amber-600"
            case "administration":
                return "from-green-500 to-emerald-600"
            default:
                return "from-gray-500 to-gray-600"
        }
    }

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "critical":
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 animate-pulse"
            case "high":
                return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700"
            case "medium":
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
            default:
                return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"
        }
    }

    const criticalContacts = emergencyContacts.filter((c: any) => c.priority === "critical")
    const otherContacts = emergencyContacts.filter((c: any) => c.priority !== "critical")

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-orange-500/10 to-amber-500/10 dark:from-red-500/20 dark:via-orange-500/20 dark:to-amber-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-amber-400/30 to-yellow-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                                Emergency Contacts
                            </h1>
                            <p className="text-muted-foreground text-lg">Important contacts for emergencies and assistance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Emergency Numbers */}
            <div className="bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 backdrop-blur-xl border-2 border-red-300/50 dark:border-red-800/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
                        <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">Critical Emergency Numbers</h2>
                        <p className="text-sm text-red-700 dark:text-red-300">Call immediately in case of emergency</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {criticalContacts.map((contact: any) => (
                        <div key={contact._id || contact.id} className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-red-200/60 dark:border-red-800/60 rounded-xl p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${getCategoryColor(contact.category)} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    <div className="text-white">
                                        {getCategoryIcon(contact.category)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">{contact.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{contact.designation}</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => handleCall(contact.phone)}
                                                className="flex-1 h-10 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-lg shadow-lg"
                                            >
                                                <Phone className="h-4 w-4 mr-2" />
                                                {contact.phone}
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleCopy(contact.phone, "Phone number")}
                                                className="h-10 w-10 rounded-lg"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {contact.alternatePhone && (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    onClick={() => handleCall(contact.alternatePhone!)}
                                                    variant="outline"
                                                    className="flex-1 h-9 rounded-lg text-sm"
                                                >
                                                    <Phone className="h-3 w-3 mr-2" />
                                                    {contact.alternatePhone}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Other Important Contacts */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <Phone className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold dark:text-white">Other Important Contacts</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {otherContacts.map((contact: any) => (
                        <div key={contact._id || contact.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <div className="flex items-start gap-3 mb-4">
                                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${getCategoryColor(contact.category)} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    <div className="text-white">
                                        {getCategoryIcon(contact.category)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{contact.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${getPriorityBadge(contact.priority)}`}>
                                            {contact.priority}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{contact.designation}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    onClick={() => handleCall(contact.phone)}
                                    className="w-full h-9 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md text-sm"
                                >
                                    <Phone className="h-3 w-3 mr-2" />
                                    {contact.phone}
                                </Button>

                                {contact.alternatePhone && (
                                    <Button
                                        onClick={() => handleCall(contact.alternatePhone!)}
                                        variant="outline"
                                        className="w-full h-8 rounded-lg text-xs"
                                    >
                                        <Phone className="h-3 w-3 mr-1" />
                                        {contact.alternatePhone}
                                    </Button>
                                )}

                                {contact.email && (
                                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80">
                                        <Mail className="h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">{contact.email}</span>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => handleCopy(contact.email!, "Email")}
                                            className="h-6 w-6 ml-auto flex-shrink-0"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}

                                {contact.location && (
                                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80">
                                        <MapPin className="h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">{contact.location}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80">
                                    <Clock className="h-3 w-3 flex-shrink-0" />
                                    <span>{contact.availability}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Emergency Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Save these numbers in your phone for quick access</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>In case of medical emergency, call ambulance (108) first, then inform hostel warden</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>For fire emergencies, evacuate immediately and call 101</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Keep your emergency contact information updated in your profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>For non-emergency maintenance issues, use the complaints/requests system</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
