"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Lock,
    Camera,
    Save,
    ArrowLeft,
    Loader,
    Shield,
    Home,
    Users,
    Loader2,
} from "lucide-react"
import {
    useGetStudentProfileQuery,
    useUpdateStudentProfileMutation,
    useUploadProfilePictureMutation,
    useChangePasswordMutation,
} from "@/store/api/studentApi"

export default function StudentProfile() {
    const [activeTab, setActiveTab] = useState<"profile" | "password">("profile")

    // Fetch profile data
    const { data: profileResponse, isLoading } = useGetStudentProfileQuery()
    const [updateProfile, { isLoading: isSaving }] = useUpdateStudentProfileMutation()
    const [uploadPicture, { isLoading: isUploading }] = useUploadProfilePictureMutation()
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation()

    // Profile data
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        studentId: "",
        course: "",
        year: "",
        dateOfBirth: "",
        address: "",
        emergencyContact: "",
        emergencyContactName: "",
        emergencyContactRelation: "",
        bloodGroup: "",
        profilePicture: "/placeholder-avatar.jpg",
    })

    // Password data
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    // Update profile data when API response is received
    useEffect(() => {
        if (profileResponse?.data) {
            const profile = profileResponse.data
            setProfileData({
                name: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                studentId: profile.studentId || "",
                course: profile.course || "",
                year: profile.year || "",
                dateOfBirth: profile.dateOfBirth || "",
                address: profile.address || "",
                emergencyContact: profile.emergencyContact?.phone || "",
                emergencyContactName: profile.emergencyContact?.name || "",
                emergencyContactRelation: profile.emergencyContact?.relation || "",
                bloodGroup: profile.bloodGroup || "",
                profilePicture: profile.profilePicture || "/placeholder-avatar.jpg",
            })
        }
    }, [profileResponse])

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await updateProfile({
                name: profileData.name,
                phone: profileData.phone,
                dateOfBirth: profileData.dateOfBirth,
                address: profileData.address,
                emergencyContact: {
                    name: profileData.emergencyContactName,
                    relation: profileData.emergencyContactRelation,
                    phone: profileData.emergencyContact,
                },
            }).unwrap()

            toast.success('Profile updated successfully!')
        } catch (error) {
            toast.error('Failed to update profile')
            console.error('Profile update error:', error)
        }
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match!')
            return
        }

        if (passwordData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long!')
            return
        }

        try {
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            }).unwrap()

            toast.success('Password changed successfully!')
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (error) {
            toast.error('Failed to change password')
            console.error('Password change error:', error)
        }
    }

    const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file!')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB!')
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', file)

            await uploadPicture(formData).unwrap()

            // Create preview URL
            const previewUrl = URL.createObjectURL(file)
            setProfileData({ ...profileData, profilePicture: previewUrl })

            toast.success('Profile picture updated successfully!')
        } catch (error) {
            toast.error('Failed to upload profile picture')
            console.error('Upload error:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center gap-4">
                        <Link href="/student/dashboard">
                            <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Profile & Settings
                            </h1>
                            <p className="text-muted-foreground text-lg">Manage your personal information and account settings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "profile"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <User className="h-4 w-4" />
                        Profile Information
                    </button>
                    <button
                        onClick={() => setActiveTab("password")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "password"
                            ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/40 scale-105"
                            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        <Lock className="h-4 w-4" />
                        Change Password
                    </button>
                </div>

                {activeTab === "profile" ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200/50 dark:border-indigo-800/50">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl shadow-indigo-500/50">
                                    <img
                                        src={profileData.profilePicture}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&size=128&background=6366f1&color=fff`
                                        }}
                                    />
                                </div>
                                <label
                                    htmlFor="profile-picture"
                                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-indigo-500/50 group-hover:shadow-xl"
                                >
                                    {isUploading ? (
                                        <Loader className="h-5 w-5 text-white animate-spin" />
                                    ) : (
                                        <Camera className="h-5 w-5 text-white" />
                                    )}
                                </label>
                                <input
                                    id="profile-picture"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfilePictureUpload}
                                    disabled={isUploading}
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{profileData.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.studentId}</p>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                Personal Information
                            </h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                            <Mail className="h-4 w-4 text-white" />
                                        </div>
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                                            <Phone className="h-4 w-4 text-white" />
                                        </div>
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="dob" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                            <Calendar className="h-4 w-4 text-white" />
                                        </div>
                                        Date of Birth *
                                    </Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={profileData.dateOfBirth}
                                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                                            <MapPin className="h-4 w-4 text-white" />
                                        </div>
                                        Address *
                                    </Label>
                                    <Input
                                        id="address"
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                                Emergency Contact
                            </h3>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-3">
                                    <Label htmlFor="emergencyName" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        Contact Name *
                                    </Label>
                                    <Input
                                        id="emergencyName"
                                        value={profileData.emergencyContactName}
                                        onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="emergencyRelation" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-md">
                                            <Users className="h-4 w-4 text-white" />
                                        </div>
                                        Relation *
                                    </Label>
                                    <Input
                                        id="emergencyRelation"
                                        value={profileData.emergencyContactRelation}
                                        onChange={(e) => setProfileData({ ...profileData, emergencyContactRelation: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-rose-500 dark:focus:border-rose-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="emergencyPhone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                            <Phone className="h-4 w-4 text-white" />
                                        </div>
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="emergencyPhone"
                                        type="tel"
                                        value={profileData.emergencyContact}
                                        onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                                    <Lock className="h-5 w-5 text-white" />
                                </div>
                                Change Password
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-md">
                                            <Lock className="h-4 w-4 text-white" />
                                        </div>
                                        Current Password *
                                    </Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        placeholder="Enter your current password"
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-500 dark:focus:border-gray-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                            <Lock className="h-4 w-4 text-white" />
                                        </div>
                                        New Password *
                                    </Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        placeholder="Enter new password (min 8 characters)"
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                                            <Lock className="h-4 w-4 text-white" />
                                        </div>
                                        Confirm New Password *
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        placeholder="Confirm your new password"
                                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                                <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Password Requirements:</h4>
                                <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        At least 8 characters long
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        Include uppercase and lowercase letters
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        Include at least one number
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        Include at least one special character
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isChangingPassword}
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold text-base shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {isChangingPassword ? (
                                <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Changing Password...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-5 w-5" />
                                    Change Password
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}
