"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/common/back-button"
import {
    Home,
    User,
    Mail,
    Phone,
    BookOpen,
    Calendar,
    Users,
    Building2,
    Bed,
    FileText,
    CheckCircle,
    AlertCircle,
} from "lucide-react"

export default function ApplyForHostel() {
    const [formData, setFormData] = useState({
        fullName: "",
        studentId: "",
        email: "",
        phone: "",
        course: "",
        year: "",
        gender: "",
        hostelPreference: "",
        roomType: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Application submitted:", formData)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <BackButton />
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                        <Home className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Apply for Hostel
                        </h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Fill out the form below to apply for hostel accommodation
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3 group">
                            <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                Full Name *
                            </Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="Enter your full name"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="studentId" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                Student ID *
                            </Label>
                            <Input
                                id="studentId"
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                placeholder="Enter your student ID"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                                    <Mail className="h-4 w-4 text-white" />
                                </div>
                                Email *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your.email@example.com"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                                    <Phone className="h-4 w-4 text-white" />
                                </div>
                                Phone Number *
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91 XXXXX XXXXX"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="course" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                    <BookOpen className="h-4 w-4 text-white" />
                                </div>
                                Course *
                            </Label>
                            <Input
                                id="course"
                                value={formData.course}
                                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                placeholder="e.g., B.Tech CSE"
                                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="year" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-md">
                                    <Calendar className="h-4 w-4 text-white" />
                                </div>
                                Year *
                            </Label>
                            <select
                                id="year"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="gender" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                Gender *
                            </Label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="hostelPreference" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md">
                                    <Building2 className="h-4 w-4 text-white" />
                                </div>
                                Hostel Preference *
                            </Label>
                            <select
                                id="hostelPreference"
                                value={formData.hostelPreference}
                                onChange={(e) => setFormData({ ...formData, hostelPreference: e.target.value })}
                                className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                                required
                            >
                                <option value="">Select Hostel</option>
                                <option value="hostel-a">Hostel A</option>
                                <option value="hostel-b">Hostel B</option>
                                <option value="hostel-c">Hostel C</option>
                                <option value="hostel-d">Hostel D</option>
                            </select>
                        </div>

                        <div className="space-y-3 group">
                            <Label htmlFor="roomType" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-md">
                                    <Bed className="h-4 w-4 text-white" />
                                </div>
                                Room Type *
                            </Label>
                            <select
                                id="roomType"
                                value={formData.roomType}
                                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                                className="flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium focus:border-rose-500 dark:focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all duration-300"
                                required
                            >
                                <option value="">Select Room Type</option>
                                <option value="single">Single Occupancy</option>
                                <option value="double">Double Occupancy</option>
                                <option value="triple">Triple Occupancy</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Submit Application
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 h-14 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold text-base hover:scale-[1.02] transition-all duration-300"
                            onClick={() =>
                                setFormData({
                                    fullName: "",
                                    studentId: "",
                                    email: "",
                                    phone: "",
                                    course: "",
                                    year: "",
                                    gender: "",
                                    hostelPreference: "",
                                    roomType: "",
                                })
                            }
                        >
                            Reset Form
                        </Button>
                    </div>
                </form>
            </div>


        </div>
    )
}
