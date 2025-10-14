import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            {/* Hero Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"
                    alt="Hero Background"
                    className="h-full w-full object-cover"
                />
                {/* Gradient Overlay for Hero Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-black/70"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            </div>

            {/* Header */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
                <img
                    src="https://nitmz.ac.in/images/Logo_NITMZ.png"
                    alt="NIT Mizoram Logo"
                    className="h-12 md:h-16 w-auto"
                />
                <img
                    src="https://nitmz.ac.in/images/logo_text1.png"
                    alt="National Institute of Technology Mizoram"
                    className="h-10 md:h-14 w-auto"
                />
            </div>

            {/* Login Form Container */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                    <LoginForm />
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-0 right-0 z-20 text-center">
                <p className="text-white/80 text-sm">
                    Designed and Developed with ❤️ by <span className="font-semibold">Vinay Patel (BT22CS006)</span>
                </p>
                <p className="text-white/60 text-xs mt-1">
                    © 2025 NIT Mizoram. All rights reserved.
                </p>
            </div>
        </div>
    )
}
