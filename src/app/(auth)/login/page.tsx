import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"
                    alt="Background"
                    className="h-full w-full object-cover"
                />
                {/* Blur Overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
            </div>

            {/* Logo */}
            <div className="absolute top-6 left-6 z-20">
                <a href="#" className="flex items-center gap-2 font-medium text-white">
                    <div className="bg-white text-black flex size-8 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-5" />
                    </div>
                    <span className="text-lg font-semibold">Hostel Management System</span>
                </a>
            </div>

            {/* Login Form Container */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
