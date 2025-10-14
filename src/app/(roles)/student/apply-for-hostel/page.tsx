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
        reason: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Application submitted:", formData)
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="glass rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Apply for Hostel</h1>
                        <p className="text-muted-foreground mt-1">
                            Fill out the form below to apply for hostel accommodation
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Full Name *
                            </Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="studentId" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Student ID *
                            </Label>
                            <Input
                                id="studentId"
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                placeholder="Enter your student ID"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone Number *
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91 XXXXX XXXXX"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="course" className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Course *
                            </Label>
                            <Input
                                id="course"
                                value={formData.course}
                                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                placeholder="e.g., B.Tech CSE"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Year *
                            </Label>
                            <select
                                id="year"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Gender *
                            </Label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hostelPreference" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Hostel Preference *
                            </Label>
                            <select
                                id="hostelPreference"
                                value={formData.hostelPreference}
                                onChange={(e) => setFormData({ ...formData, hostelPreference: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select Hostel</option>
                                <option value="hostel-a">Hostel A</option>
                                <option value="hostel-b">Hostel B</option>
                                <option value="hostel-c">Hostel C</option>
                                <option value="hostel-d">Hostel D</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="roomType" className="flex items-center gap-2">
                                <Bed className="h-4 w-4" />
                                Room Type *
                            </Label>
                            <select
                                id="roomType"
                                value={formData.roomType}
                                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select Room Type</option>
                                <option value="single">Single Occupancy</option>
                                <option value="double">Double Occupancy</option>
                                <option value="triple">Triple Occupancy</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Reason for Application *
                        </Label>
                        <textarea
                            id="reason"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            placeholder="Please provide a brief reason for your hostel application"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" className="flex-1 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Submit Application
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
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
                                    reason: "",
                                })
                            }
                        >
                            Reset Form
                        </Button>
                    </div>
                </form>
            </div>

            <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Application Guidelines
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            All fields marked with * are mandatory
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            Applications are processed within 5-7 working days
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            You will receive an email notification once your application is reviewed
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                            Hostel allotment is subject to availability
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
