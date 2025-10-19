'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        phoneNumber: "",
        hostelId: "",
        roomNumber: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Creating user:", formData)
        // Add user creation logic
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

            <Card className="p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="student">Student</option>
                                <option value="caretaker">Caretaker</option>
                                <option value="warden">Warden</option>
                                <option value="dean">Dean</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {(formData.role === 'student' || formData.role === 'caretaker' || formData.role === 'warden') && (
                            <div className="space-y-2">
                                <Label htmlFor="hostelId">Hostel</Label>
                                <select
                                    id="hostelId"
                                    value={formData.hostelId}
                                    onChange={(e) => setFormData({ ...formData, hostelId: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select Hostel</option>
                                    <option value="1">Hostel A</option>
                                    <option value="2">Hostel B</option>
                                    <option value="3">Hostel C</option>
                                </select>
                            </div>
                        )}

                        {formData.role === 'student' && (
                            <div className="space-y-2">
                                <Label htmlFor="roomNumber">Room Number</Label>
                                <Input
                                    id="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit">Create User</Button>
                        <Link href="/admin/users">
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
