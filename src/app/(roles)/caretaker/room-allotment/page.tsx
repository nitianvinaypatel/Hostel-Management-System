'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { UserPlus, Zap, Search, Users, CheckCircle2, AlertCircle } from "lucide-react"

export default function RoomAllotment() {


    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <UserPlus className="h-7 w-7 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            Room Allotment 🏠
                        </h1>
                        <p className="text-muted-foreground text-lg">Allocate rooms to students manually or automatically</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Manual Allocation */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <Search className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Manual Allocation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Assign a specific room to a student</p>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Student ID</FieldLabel>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input type="text" placeholder="Enter student ID or name" className="pl-10 bg-white dark:bg-gray-800" />
                                </div>
                                <FieldDescription>Search by ID, name, or email</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Select Room</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm [&>option]:text-gray-900 [&>option]:dark:text-white [&>optgroup]:text-gray-900 [&>optgroup]:dark:text-white">
                                    <option value="">Choose available room</option>
                                    <optgroup label="Floor 1">
                                        <option value="101">Room 101 - Available (1/2) - Double</option>
                                        <option value="103">Room 103 - Empty (0/1) - Single</option>
                                    </optgroup>
                                    <optgroup label="Floor 2">
                                        <option value="201">Room 201 - Available (1/3) - Triple</option>
                                        <option value="205">Room 205 - Empty (0/2) - Double</option>
                                    </optgroup>
                                </select>
                                <FieldDescription>Only showing rooms with available space</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Bed Preference (Optional)</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm [&>option]:text-gray-900 [&>option]:dark:text-white">
                                    <option value="">No preference</option>
                                    <option value="lower">Lower Bunk</option>
                                    <option value="upper">Upper Bunk</option>
                                    <option value="window">Near Window</option>
                                    <option value="door">Near Door</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Allocation Notes</FieldLabel>
                                <textarea
                                    className="flex min-h-20 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none"
                                    placeholder="Any special notes or requirements..."
                                ></textarea>
                            </Field>

                            <Button type="submit" className="w-full">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Allocate Room
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Automatic Allocation */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Automatic Allocation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Automatically allocate rooms based on availability and preferences
                        </p>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4">
                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Number of Students</FieldLabel>
                                <Input type="number" placeholder="Enter number of students" min="1" className="bg-white dark:bg-gray-800" />
                                <FieldDescription>Students pending room allocation</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Allocation Criteria</FieldLabel>
                                <select className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 text-sm [&>option]:text-gray-900 [&>option]:dark:text-white">
                                    <option value="fcfs">First Come First Serve</option>
                                    <option value="merit">By Merit/CGPA</option>
                                    <option value="preference">By Student Preference</option>
                                    <option value="year">By Academic Year</option>
                                    <option value="department">By Department</option>
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel className="text-gray-900 dark:text-white">Room Type Preference</FieldLabel>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm text-gray-900 dark:text-white">Single Occupancy</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm text-gray-900 dark:text-white">Double Occupancy</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm text-gray-900 dark:text-white">Triple Occupancy</span>
                                    </label>
                                </div>
                            </Field>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">Auto-Allocation Preview</p>
                                        <p className="text-blue-700 dark:text-blue-400">The system will allocate rooms based on your criteria. You can review and modify allocations before finalizing.</p>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" variant="secondary" className="w-full">
                                <Zap className="h-4 w-4 mr-2" />
                                Start Auto Allocation
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Recent Allocations */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-lg">
                <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Allocations</h3>
                    <p className="text-sm text-muted-foreground mt-1">Latest room assignments</p>
                </div>
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                    <div className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">John Doe (#12345)</p>
                                    <p className="text-sm text-muted-foreground">Allocated to Room 205</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Completed
                                </span>
                                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Jane Smith (#12346)</p>
                                    <p className="text-sm text-muted-foreground">Allocated to Room 103</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Completed
                                </span>
                                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Mike Johnson (#12347)</p>
                                    <p className="text-sm text-muted-foreground">Allocated to Room 201</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Completed
                                </span>
                                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
