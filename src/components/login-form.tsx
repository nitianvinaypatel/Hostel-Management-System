"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import authData from "@/data/auth.json"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Find user in auth.json
      const user = authData.users.find(
        (u) => u.email === email && u.password === password
      )

      if (user) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }))

        console.log(`Login successful! Welcome ${user.name} (${user.role})`)

        // Redirect based on role
        switch (user.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "student":
            router.push("/student/dashboard")
            break
          case "warden":
            router.push("/warden/dashboard")
            break
          case "dean":
            router.push("/dean/dashboard")
            break
          case "caretaker":
            router.push("/caretaker/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked")
    // Implement Google OAuth if needed
    // Example: window.location.href = "/api/auth/google"
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-white/80 text-sm">
          Enter your credentials to access your account
        </p>
        {error && (
          <div className="w-full p-3 text-sm text-red-100 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-md mt-2">
            {error}
          </div>
        )}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-white font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-white font-medium">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm text-white/90 hover:text-white underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white/20">
          <span className="relative z-10 bg-transparent px-2 text-white/70">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
      <div className="text-center text-sm text-white/80">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-white hover:text-white/90 font-medium underline-offset-4 hover:underline">
          Sign up
        </a>
      </div>

      {/* Demo Credentials */}
      {/* <div className="text-xs text-white/70 bg-white/5 backdrop-blur-sm p-3 rounded-md border border-white/10">
        <p className="font-semibold mb-1 text-white">Demo Credentials:</p>
        <p>Admin: admin@hostel.com / admin123</p>
        <p>Student: student@hostel.com / student123</p>
        <p>Warden: warden@hostel.com / warden123</p>
      </div> */}
    </form>
  )
}
