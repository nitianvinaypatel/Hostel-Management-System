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
            className="mb-4 glass hover:bg-white/90 dark:hover:bg-white/10 transition-all"
        >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
    )
}
