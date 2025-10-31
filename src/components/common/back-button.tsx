"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
    const router = useRouter()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-300/60 dark:border-gray-600/60 hover:bg-white dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-gray-900 dark:text-gray-100 font-semibold"
        >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
    )
}
