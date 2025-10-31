'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ArrowLeft,
    Loader2,
    CheckCircle,
    AlertCircle,
    Users,
    Building2,
    Shield,
    GraduationCap,
    UserCog,
    Eye,
    EyeOff,
    Mail,
    Phone,
    Lock,
    User,
    Check,
    X
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { adminService } from "@/services/admin.service"

export default function AddUser() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        phone: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    const roles = [
        {
            value: 'student',
            label: 'Student',
            icon: GraduationCap,
            description: 'Basic access for students',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
            border: 'border-blue-200 dark:border-blue-800',
        },
        {
            value: 'caretaker',
            label: 'Caretaker',
            icon: UserCog,
            description: 'Day-to-day operations',
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
            border: 'border-green-200 dark:border-green-800',
        },
        {
            value: 'warden',
            label: 'Warden',
            icon: Building2,
            description: 'Hostel management',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
            border: 'border-purple-200 dark:border-purple-800',
        },
        {
            value: 'dean',
            label: 'Dean',
            icon: Users,
            description: 'High-level oversight',
            gradient: 'from-orange-500 to-amber-500',
            bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
            border: 'border-orange-200 dark:border-orange-800',
        },
        {
            value: 'admin',
            label: 'Admin',
            icon: Shield,
            description: 'Full system access',
            gradient: 'from-red-500 to-rose-500',
            bgGradient: 'from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30',
            border: 'border-red-200 dark:border-red-800',
        },
    ]

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (password.length >= 12) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z0-9]/.test(password)) strength++
        return strength
    }

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 1) return 'bg-red-500'
        if (passwordStrength <= 3) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return 'Weak'
        if (passwordStrength <= 3) return 'Medium'
        return 'Strong'
    }

    const validateField = (name: string, value: string) => {
        const errors: Record<string, string> = { ...validationErrors }

        switch (name) {
            case 'name':
                if (value.length < 3) {
                    errors.name = 'Name must be at least 3 characters'
                } else {
                    delete errors.name
                }
                break
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = 'Invalid email format'
                } else {
                    delete errors.email
                }
                break
            case 'phone':
                if (!/^\+?[1-9]\d{9,14}$/.test(value.replace(/\s/g, ''))) {
                    errors.phone = 'Invalid phone number'
                } else {
                    delete errors.phone
                }
                break
            case 'password':
                if (value.length < 8) {
                    errors.password = 'Password must be at least 8 characters'
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(value)) {
                    errors.password = 'Password must include uppercase, lowercase, number and special character'
                } else {
                    delete errors.password
                }
                break
        }

        setValidationErrors(errors)
    }

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
        validateField(name, value)

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const userData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: formData.role as 'student' | 'caretaker' | 'warden' | 'dean' | 'admin',
                phone: formData.phone,
            }

            await adminService.createUser(userData)
            setSuccess(true)

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push('/admin/users')
            }, 2000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create user')
            console.error('Create user error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <Link href="/admin/users">
                        <Button variant="outline" size="icon" className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border-white/50 dark:border-gray-700/50 hover:scale-110 transition-transform">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Add New User ✨
                        </h1>
                        <p className="text-muted-foreground text-lg">Create a new user account with role-based access</p>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-xl border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-green-900 dark:text-green-100">Success!</p>
                            <p className="text-sm text-green-700 dark:text-green-300">User created successfully! Redirecting...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                            <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-red-900 dark:text-red-100">Error!</p>
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Personal Information</h2>
                                <p className="text-sm text-muted-foreground">Basic user details</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Full Name *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        disabled={loading}
                                        className={`bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 focus:border-green-500 focus:ring-green-500/20 pl-4 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${validationErrors.name ? 'border-red-500' : ''}`}
                                    />
                                    {formData.name && !validationErrors.name && (
                                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                    )}
                                </div>
                                {validationErrors.name && (
                                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <X className="h-3 w-3" />
                                        {validationErrors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email Address *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="user@example.com"
                                        required
                                        disabled={loading}
                                        className={`bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 focus:border-green-500 focus:ring-green-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${validationErrors.email ? 'border-red-500' : ''}`}
                                    />
                                    {formData.email && !validationErrors.email && (
                                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                    )}
                                </div>
                                {validationErrors.email && (
                                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <X className="h-3 w-3" />
                                        {validationErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Phone Number *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="+919876543210"
                                        required
                                        disabled={loading}
                                        className={`bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 focus:border-green-500 focus:ring-green-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${validationErrors.phone ? 'border-red-500' : ''}`}
                                    />
                                    {formData.phone && !validationErrors.phone && (
                                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                    )}
                                </div>
                                {validationErrors.phone && (
                                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <X className="h-3 w-3" />
                                        {validationErrors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Password *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="Min 8 characters"
                                        required
                                        disabled={loading}
                                        minLength={8}
                                        className={`bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 focus:border-green-500 focus:ring-green-500/20 pr-10 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${validationErrors.password ? 'border-red-500' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                        {validationErrors.password && (
                                            <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                                <X className="h-3 w-3" />
                                                {validationErrors.password}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Role Selection Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Role & Permissions</h2>
                                <p className="text-sm text-muted-foreground">Select user role and access level</p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {roles.map((role) => {
                                const Icon = role.icon
                                const isSelected = formData.role === role.value
                                return (
                                    <button
                                        key={role.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: role.value })}
                                        disabled={loading}
                                        className={`relative overflow-hidden bg-gradient-to-br ${role.bgGradient} backdrop-blur-xl border-2 ${isSelected ? role.border : 'border-gray-200/50 dark:border-gray-700/50'} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group text-left ${isSelected ? 'scale-105 shadow-lg' : 'hover:scale-105'}`}
                                    >
                                        <div className="relative space-y-3">
                                            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{role.label}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                                                    <Check className="h-4 w-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button
                            type="submit"
                            disabled={loading || Object.keys(validationErrors).length > 0}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating User...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Create User
                                </>
                            )}
                        </Button>
                        <Link href="/admin/users">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                className="bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
