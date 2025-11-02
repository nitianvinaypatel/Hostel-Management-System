'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Utensils, Clock, ArrowLeft, Save, X, Coffee, Loader2 } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useGetWardenWeeklyMenuQuery, useUpdateWardenDayMenuMutation } from "@/store/api/wardenApi"
import type { DayMenu, MealDetails } from "@/types/warden"

type EditableDayMenu = {
    id: string
    day: string
    breakfast: MealDetails
    lunch: MealDetails
    snacks: MealDetails
    dinner: MealDetails
}

export default function MessMenu() {
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<EditableDayMenu | null>(null)
    const [editedMenu, setEditedMenu] = useState<EditableDayMenu | null>(null)

    // RTK Query hooks
    const { data: menuData, isLoading, error } = useGetWardenWeeklyMenuQuery(undefined)
    const [updateDayMenu, { isLoading: isUpdating }] = useUpdateWardenDayMenuMutation()

    const weeklyMenu = menuData?.data || []

    const handleEditClick = (day: DayMenu) => {
        const editableDay: EditableDayMenu = {
            id: day.id,
            day: day.day,
            breakfast: day.breakfast,
            lunch: day.lunch,
            snacks: day.snacks,
            dinner: day.dinner
        }
        setSelectedDay(editableDay)
        setEditedMenu(JSON.parse(JSON.stringify(editableDay))) // Deep copy
        setEditDialogOpen(true)
    }

    const handleSaveMenu = async () => {
        if (!editedMenu) return

        try {
            await updateDayMenu({
                dayId: editedMenu.id,
                data: {
                    breakfast: editedMenu.breakfast,
                    lunch: editedMenu.lunch,
                    snacks: editedMenu.snacks,
                    dinner: editedMenu.dinner
                }
            }).unwrap()

            toast.success(`${editedMenu.day}'s menu updated successfully!`)
            setEditDialogOpen(false)
            setSelectedDay(null)
            setEditedMenu(null)
        } catch (err) {
            toast.error('Failed to update menu. Please try again.')
            console.error('Failed to update menu:', err)
        }
    }

    const updateMealItems = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner', itemsString: string) => {
        if (!editedMenu) return
        const items = itemsString.split(',').map(item => item.trim()).filter(item => item)
        setEditedMenu({
            ...editedMenu,
            [mealType]: {
                ...editedMenu[mealType],
                items
            }
        })
    }

    const updateMealTime = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner', time: string) => {
        if (!editedMenu) return
        setEditedMenu({
            ...editedMenu,
            [mealType]: {
                ...editedMenu[mealType],
                time
            }
        })
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-500" />
                    <p className="text-muted-foreground">Loading mess menu...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="text-red-500 text-5xl">⚠️</div>
                    <p className="text-muted-foreground">Failed to load mess menu</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/warden/dashboard">
                                <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                    Mess Menu
                                </h1>
                                <p className="text-muted-foreground text-lg">Weekly meal schedule</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Menu */}
            <div className="grid gap-5">
                {weeklyMenu.map((day) => (
                    <div key={day.day} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">{day.day}</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full md:w-auto"
                                onClick={() => handleEditClick(day)}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Breakfast */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/50">
                                            <Utensils className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-orange-700 dark:text-orange-300">Breakfast</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.breakfast.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.breakfast.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Lunch */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md shadow-green-500/50">
                                            <Utensils className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-green-700 dark:text-green-300">Lunch</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.lunch.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.lunch.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Snacks */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/50">
                                            <Coffee className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-purple-700 dark:text-purple-300">Snacks</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.snacks.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.snacks.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Dinner */}
                            <div className="group p-5 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/50">
                                            <Utensils className="h-4 w-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-blue-700 dark:text-blue-300">Dinner</h4>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {day.dinner.time}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {day.dinner.items.map((item, index) => (
                                        <li key={index} className="text-sm flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Menu Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Edit {selectedDay?.day}'s Menu</DialogTitle>
                        <DialogDescription>
                            Update the meal items and timings for {selectedDay?.day}
                        </DialogDescription>
                    </DialogHeader>
                    {editedMenu && (
                        <div className="space-y-6 py-4">
                            {/* Breakfast */}
                            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/50">
                                        <Utensils className="h-4 w-4 text-white" />
                                    </div>
                                    <h4 className="font-bold text-orange-700 dark:text-orange-300">Breakfast</h4>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="breakfast-items">Items (comma separated)</Label>
                                    <Input
                                        id="breakfast-items"
                                        value={editedMenu.breakfast.items.join(', ')}
                                        onChange={(e) => updateMealItems('breakfast', e.target.value)}
                                        placeholder="Idli, Sambar, Chutney, Tea/Coffee"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="breakfast-time">Timing</Label>
                                    <Input
                                        id="breakfast-time"
                                        value={editedMenu.breakfast.time}
                                        onChange={(e) => updateMealTime('breakfast', e.target.value)}
                                        placeholder="7:30 AM - 9:30 AM"
                                    />
                                </div>
                            </div>

                            {/* Lunch */}
                            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md shadow-green-500/50">
                                        <Utensils className="h-4 w-4 text-white" />
                                    </div>
                                    <h4 className="font-bold text-green-700 dark:text-green-300">Lunch</h4>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lunch-items">Items (comma separated)</Label>
                                    <Input
                                        id="lunch-items"
                                        value={editedMenu.lunch.items.join(', ')}
                                        onChange={(e) => updateMealItems('lunch', e.target.value)}
                                        placeholder="Rice, Dal, Sabzi, Roti, Curd"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lunch-time">Timing</Label>
                                    <Input
                                        id="lunch-time"
                                        value={editedMenu.lunch.time}
                                        onChange={(e) => updateMealTime('lunch', e.target.value)}
                                        placeholder="12:00 PM - 2:00 PM"
                                    />
                                </div>
                            </div>

                            {/* Snacks */}
                            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/50">
                                        <Coffee className="h-4 w-4 text-white" />
                                    </div>
                                    <h4 className="font-bold text-purple-700 dark:text-purple-300">Snacks</h4>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="snacks-items">Items (comma separated)</Label>
                                    <Input
                                        id="snacks-items"
                                        value={editedMenu.snacks.items.join(', ')}
                                        onChange={(e) => updateMealItems('snacks', e.target.value)}
                                        placeholder="Samosa, Tea/Coffee"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="snacks-time">Timing</Label>
                                    <Input
                                        id="snacks-time"
                                        value={editedMenu.snacks.time}
                                        onChange={(e) => updateMealTime('snacks', e.target.value)}
                                        placeholder="4:00 PM - 5:30 PM"
                                    />
                                </div>
                            </div>

                            {/* Dinner */}
                            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/50">
                                        <Utensils className="h-4 w-4 text-white" />
                                    </div>
                                    <h4 className="font-bold text-blue-700 dark:text-blue-300">Dinner</h4>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dinner-items">Items (comma separated)</Label>
                                    <Input
                                        id="dinner-items"
                                        value={editedMenu.dinner.items.join(', ')}
                                        onChange={(e) => updateMealItems('dinner', e.target.value)}
                                        placeholder="Rice, Rajma, Roti, Salad"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dinner-time">Timing</Label>
                                    <Input
                                        id="dinner-time"
                                        value={editedMenu.dinner.time}
                                        onChange={(e) => updateMealTime('dinner', e.target.value)}
                                        placeholder="7:00 PM - 9:00 PM"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setEditDialogOpen(false)
                                setSelectedDay(null)
                                setEditedMenu(null)
                            }}
                            disabled={isUpdating}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            onClick={handleSaveMenu}
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
