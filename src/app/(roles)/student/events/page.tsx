"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    PartyPopper,
    Trophy,
    Music,
    Dumbbell,
    BookOpen,
    Camera,
    CheckCircle,
    ArrowLeft,
    Loader,
    Loader2,
    UserPlus,
    Image as ImageIcon,
    AlertCircle,
} from "lucide-react"
import {
    useGetUpcomingEventsQuery,
    useGetPastEventsQuery,
    useGetEventCalendarQuery,
    useRegisterForEventMutation,
    useCancelEventRegistrationMutation
} from '@/store/api/studentApi'

type EventCategory = "cultural" | "sports" | "academic" | "social" | "other"

type Event = {
    id: string
    title: string
    category: EventCategory
    description: string
    date: string
    time: string
    venue: string
    organizer: string
    maxParticipants: number
    registeredCount: number
    isRegistered: boolean
    image?: string
    isPast?: boolean
}

const upcomingEvents: Event[] = [
    {
        id: "E001",
        title: "Diwali Celebration 2024",
        category: "cultural",
        description: "Join us for a grand Diwali celebration with cultural programs, rangoli competition, and festive dinner.",
        date: "2024-11-05",
        time: "6:00 PM",
        venue: "Hostel Common Area",
        organizer: "Cultural Committee",
        maxParticipants: 200,
        registeredCount: 145,
        isRegistered: false,
        image: "https://images.unsplash.com/photo-1605641379126-83f0e6a7e4f1?w=400",
    },
    {
        id: "E002",
        title: "Inter-Hostel Cricket Tournament",
        category: "sports",
        description: "Annual cricket tournament between all hostels. Register your team now!",
        date: "2024-11-10",
        time: "8:00 AM",
        venue: "University Sports Ground",
        organizer: "Sports Committee",
        maxParticipants: 100,
        registeredCount: 67,
        isRegistered: true,
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400",
    },
    {
        id: "E003",
        title: "Career Guidance Workshop",
        category: "academic",
        description: "Expert session on career planning, resume building, and interview preparation.",
        date: "2024-11-08",
        time: "4:00 PM",
        venue: "Seminar Hall",
        organizer: "Placement Cell",
        maxParticipants: 150,
        registeredCount: 89,
        isRegistered: false,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    },
    {
        id: "E004",
        title: "Movie Night - Bollywood Special",
        category: "social",
        description: "Enjoy a fun movie night with popcorn and snacks. Vote for your favorite movie!",
        date: "2024-11-12",
        time: "8:00 PM",
        venue: "Hostel Auditorium",
        organizer: "Entertainment Committee",
        maxParticipants: 180,
        registeredCount: 156,
        isRegistered: true,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400",
    },
]

const pastEvents: Event[] = [
    {
        id: "P001",
        title: "Freshers Welcome Party 2024",
        category: "social",
        description: "Grand welcome party for new students with music, dance, and games.",
        date: "2024-09-15",
        time: "7:00 PM",
        venue: "Hostel Lawn",
        organizer: "Cultural Committee",
        maxParticipants: 250,
        registeredCount: 238,
        isRegistered: true,
        isPast: true,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
    },
    {
        id: "P002",
        title: "Independence Day Celebration",
        category: "cultural",
        description: "Flag hoisting ceremony followed by cultural programs and patriotic songs.",
        date: "2024-08-15",
        time: "8:00 AM",
        venue: "Hostel Premises",
        organizer: "Hostel Administration",
        maxParticipants: 300,
        registeredCount: 287,
        isRegistered: true,
        isPast: true,
        image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400",
    },
    {
        id: "P003",
        title: "Yoga & Wellness Workshop",
        category: "sports",
        description: "Morning yoga session and wellness tips by certified instructor.",
        date: "2024-10-15",
        time: "6:00 AM",
        venue: "Hostel Terrace",
        organizer: "Health Committee",
        maxParticipants: 50,
        registeredCount: 42,
        isRegistered: true,
        isPast: true,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
]

export default function StudentEvents() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "calendar" | "past">("upcoming")
    const [categoryFilter, setCategoryFilter] = useState('')
    const [isRegistering, setIsRegistering] = useState<string | null>(null)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    // Fetch upcoming events
    const { data: upcomingData, isLoading: loadingUpcoming, error: upcomingError } = useGetUpcomingEventsQuery({
        category: categoryFilter
    })

    // Fetch past events
    const { data: pastData, isLoading: loadingPast, error: pastError } = useGetPastEventsQuery()

    // Fetch calendar events
    const { data: calendarData, isLoading: loadingCalendar } = useGetEventCalendarQuery({
        month: selectedMonth,
        year: selectedYear
    })

    // Register/Cancel mutations
    const [registerForEvent] = useRegisterForEventMutation()
    const [cancelRegistration] = useCancelEventRegistrationMutation()

    console.log('Upcoming Events:', upcomingData)
    console.log('Past Events:', pastData)
    console.log('Calendar Data:', calendarData)

    // Handle nested response structure
    const upcomingEvents = Array.isArray(upcomingData?.data)
        ? upcomingData.data
        : upcomingData?.data?.events || []

    const pastEvents = Array.isArray(pastData?.data)
        ? pastData.data
        : pastData?.data?.events || []

    console.log('Processed upcoming events:', upcomingEvents)
    console.log('Processed past events:', pastEvents)

    const handleRegister = async (eventId: string, isRegistered: boolean) => {
        setIsRegistering(eventId)

        try {
            if (isRegistered) {
                await cancelRegistration(eventId).unwrap()
                toast.success('Registration cancelled successfully!')
            } else {
                await registerForEvent(eventId).unwrap()
                toast.success('Registered for event successfully!')
            }
        } catch (error: any) {
            console.error('Registration error:', error)
            const errorMessage = error?.data?.message || error?.data?.error || 'Failed to process registration'
            toast.error(errorMessage)
        } finally {
            setIsRegistering(null)
        }
    }

    if (loadingUpcoming && activeTab === "upcoming") {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (loadingPast && activeTab === "past") {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const getCategoryIcon = (category: EventCategory) => {
        switch (category) {
            case "cultural":
                return <PartyPopper className="h-4 w-4" />
            case "sports":
                return <Trophy className="h-4 w-4" />
            case "academic":
                return <BookOpen className="h-4 w-4" />
            case "social":
                return <Music className="h-4 w-4" />
            default:
                return <Calendar className="h-4 w-4" />
        }
    }

    const getCategoryColor = (category: EventCategory) => {
        switch (category) {
            case "cultural":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20"
            case "sports":
                return "bg-green-500/10 text-green-500 border-green-500/20"
            case "academic":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case "social":
                return "bg-pink-500/10 text-pink-500 border-pink-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    // Calendar logic
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    const getEventsForDate = (date: number) => {
        const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(date).padStart(2, '0')}`
        return upcomingEvents.filter((event: any) => event.date === dateStr)
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Events & Activities
                            </h1>
                            <p className="text-muted-foreground text-lg">Discover and participate in hostel events</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "upcoming"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <PartyPopper className="h-4 w-4" />
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => setActiveTab("calendar")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "calendar"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Calendar className="h-4 w-4" />
                        Event Calendar
                    </button>
                    <button
                        onClick={() => setActiveTab("past")}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "past"
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Camera className="h-4 w-4" />
                        Past Events
                    </button>
                </div>

                {activeTab === "upcoming" && (
                    <div className="space-y-6">
                        {upcomingEvents.length === 0 ? (
                            <div className="text-center py-12">
                                <PartyPopper className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No upcoming events</p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Check back later for new events</p>
                            </div>
                        ) : (
                            upcomingEvents.map((event: any) => (
                                <div key={event.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                    <div className="md:flex">
                                        {/* Event Image */}
                                        <div className="md:w-1/3 relative overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&size=400&background=random`
                                                }}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-lg border backdrop-blur-sm ${getCategoryColor(event.category)}`}>
                                                    {getCategoryIcon(event.category)}
                                                    {event.category.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Event Details */}
                                        <div className="md:w-2/3 p-6">
                                            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{event.title}</h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{event.description}</p>

                                            <div className="grid gap-3 md:grid-cols-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm font-medium p-3 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-medium p-3 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                    <Clock className="h-4 w-4" />
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-medium p-3 rounded-lg bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                                    <MapPin className="h-4 w-4" />
                                                    {event.venue}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-medium p-3 rounded-lg bg-orange-100/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                                                    <Users className="h-4 w-4" />
                                                    {event.registeredCount}/{event.maxParticipants} Registered
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Organized by <span className="font-semibold">{event.organizer}</span>
                                                </span>
                                                <Button
                                                    onClick={() => handleRegister(event._id || event.id, event.isRegistered)}
                                                    disabled={isRegistering === (event._id || event.id) || event.registeredCount >= event.maxParticipants}
                                                    className={`h-10 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${event.isRegistered
                                                        ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
                                                        : event.registeredCount >= event.maxParticipants
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                                        }`}
                                                >
                                                    {isRegistering === (event._id || event.id) ? (
                                                        <>
                                                            <Loader className="h-4 w-4 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : event.registeredCount >= event.maxParticipants ? (
                                                        "Event Full"
                                                    ) : event.isRegistered ? (
                                                        <>
                                                            <CheckCircle className="h-4 w-4" />
                                                            Cancel Registration
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlus className="h-4 w-4" />
                                                            Register Now
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "calendar" && (
                    <div className="space-y-6">
                        {/* Month/Year Selector */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50">
                            <Button
                                onClick={() => {
                                    if (selectedMonth === 0) {
                                        setSelectedMonth(11)
                                        setSelectedYear(selectedYear - 1)
                                    } else {
                                        setSelectedMonth(selectedMonth - 1)
                                    }
                                }}
                                variant="outline"
                                size="sm"
                                className="rounded-lg"
                            >
                                Previous
                            </Button>
                            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                                {monthNames[selectedMonth]} {selectedYear}
                            </h3>
                            <Button
                                onClick={() => {
                                    if (selectedMonth === 11) {
                                        setSelectedMonth(0)
                                        setSelectedYear(selectedYear + 1)
                                    } else {
                                        setSelectedMonth(selectedMonth + 1)
                                    }
                                }}
                                variant="outline"
                                size="sm"
                                className="rounded-lg"
                            >
                                Next
                            </Button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Day Headers */}
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="text-center font-bold text-sm p-3 text-gray-700 dark:text-gray-300">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: getFirstDayOfMonth(selectedMonth, selectedYear) }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square" />
                            ))}

                            {/* Calendar Days */}
                            {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }).map((_, i) => {
                                const date = i + 1
                                const eventsForDate = getEventsForDate(date)
                                const isToday = date === new Date().getDate() && selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear()

                                return (
                                    <div
                                        key={date}
                                        className={`aspect-square p-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${isToday
                                            ? "border-blue-500 bg-blue-50/80 dark:bg-blue-950/30"
                                            : eventsForDate.length > 0
                                                ? "border-purple-300 dark:border-purple-700 bg-purple-50/80 dark:bg-purple-950/30 cursor-pointer hover:shadow-lg"
                                                : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
                                            }`}
                                    >
                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{date}</div>
                                        {eventsForDate.length > 0 && (
                                            <div className="space-y-1">
                                                {eventsForDate.slice(0, 2).map((event) => (
                                                    <div
                                                        key={event.id}
                                                        className="text-xs p-1 rounded bg-purple-500 text-white truncate"
                                                        title={event.title}
                                                    >
                                                        {event.title}
                                                    </div>
                                                ))}
                                                {eventsForDate.length > 2 && (
                                                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                                                        +{eventsForDate.length - 2} more
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {activeTab === "past" && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                <Camera className="h-5 w-5 text-white" />
                            </div>
                            Past Events Gallery
                        </h2>

                        {pastEvents.length === 0 ? (
                            <div className="text-center py-12">
                                <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No past events</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {pastEvents.map((event) => (
                                    <div key={event.id} className="group bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&size=400&background=random`
                                                }}
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-lg border backdrop-blur-sm ${getCategoryColor(event.category)}`}>
                                                    {getCategoryIcon(event.category)}
                                                    {event.category.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <Button className="w-full bg-white/90 hover:bg-white text-gray-900 rounded-lg">
                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                    View Gallery
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{event.title}</h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{event.description}</p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                    <Users className="h-3 w-3" />
                                                    {event.registeredCount} attended
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
