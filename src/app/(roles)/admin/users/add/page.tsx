'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react"
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
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/users">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Add New User</h1>
                    <p className="text-muted-foreground">Create a new user account</p>
                </div>
            </div>

            {success && (
                <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <p className="font-medium">User created successfully! Redirecting...</p>
                    </div>
                </Card>
            )}

            {error && (
                <Card className="p-4 bg-red-50 border-red-200">
                    <div className="flex items-center gap-2 text-red-800">
                        <AlertCircle className="h-5 w-5" />
                        <p className="font-medium">{error}</p>
                    </div>
                </Card>
            )}

            <Card className="p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="user@example.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Min 8 characters"
                                required
                                disabled={loading}
                                minLength={8}
                            />
                            <p className="text-xs text-muted-foreground">
                                Must be at least 8 characters with uppercase, lowercase, number and special character
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+919876543210"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role *</Label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                                disabled={loading}
                            >
                                <option value="student">Student</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="warden">Warden</option>
                                <option value="dean">Dean</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create User'
                            )}
                        </Button>
                        <Link href="/admin/users">
                            <Button type="button" variant="outline" disabled={loading}>
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
