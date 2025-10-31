"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useRegisterMutation,
  useGetRegistrationOptionsQuery,
  useLazyGetAvailableHostelsQuery
} from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  // Fetch registration options
  const { data: optionsData, isLoading: optionsLoading } = useGetRegistrationOptionsQuery();
  const [getHostels, { data: hostelsData, isLoading: hostelsLoading }] = useLazyGetAvailableHostelsQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    enrollmentNumber: "",
    year: "",
    branch: "",
    semester: "",
    course: "",
    gender: "",
    hostel: "",
  });
  const [error, setError] = useState("");

  // Fetch hostels when gender changes
  useEffect(() => {
    if (formData.gender) {
      getHostels({ gender: formData.gender.toLowerCase() });
    }
  }, [formData.gender, getHostels]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Basic validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.mobile ||
        !formData.enrollmentNumber ||
        !formData.year ||
        !formData.branch ||
        !formData.semester ||
        !formData.course ||
        !formData.gender ||
        !formData.hostel
      ) {
        setError("Please fill in all required fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      // Mobile validation
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }

      // Password validation
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      // Call register API with all required fields including hostelId
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: `+91${formData.mobile}`,
        studentId: formData.enrollmentNumber,
        course: formData.course,
        branch: formData.branch,
        year: parseInt(formData.year),
        semester: parseInt(formData.semester),
        gender: formData.gender.toLowerCase(),
        hostelId: formData.hostel, // Required field
      }).unwrap();

      console.log("Registration successful! Redirecting to login...");

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err: any) {
      console.error("Registration failed:", err);

      // Display validation errors if available
      if (err?.data?.errors && Array.isArray(err.data.errors)) {
        const errorMessages = err.data.errors.map((e: any) => e.message || e).join(', ');
        setError(errorMessages);
      } else {
        setError(err?.data?.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-white/80 text-sm">
          Fill in your details to create your account
        </p>
        {error && (
          <div className="w-full p-3 text-sm text-red-100 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-md mt-2">
            {error}
          </div>
        )}
      </div>
      <div className="grid gap-8">
        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-white font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Row 2: Password and Mobile */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-white font-medium">
              Create Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile" className="text-white font-medium">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              required
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Row 3: Year and Course */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="year" className="text-white font-medium">
              Year
            </Label>
            <select
              id="year"
              value={formData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
              disabled={isLoading || optionsLoading}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800 text-white">
                {optionsLoading ? "Loading..." : "Select your year"}
              </option>
              {optionsData?.data.years.map((year) => (
                <option key={year.value} value={year.value} className="bg-gray-800 text-white">
                  {year.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course" className="text-white font-medium">
              Course
            </Label>
            <select
              id="course"
              value={formData.course}
              onChange={(e) => handleInputChange("course", e.target.value)}
              disabled={isLoading || optionsLoading}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800 text-white">
                {optionsLoading ? "Loading..." : "Select your course"}
              </option>
              {optionsData?.data.courses.map((course) => (
                <option key={course.value} value={course.value} className="bg-gray-800 text-white">
                  {course.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Branch and Semester */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="branch" className="text-white font-medium">
              Branch
            </Label>
            <select
              id="branch"
              value={formData.branch}
              onChange={(e) => handleInputChange("branch", e.target.value)}
              disabled={isLoading || optionsLoading}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800 text-white">
                {optionsLoading ? "Loading..." : "Select your branch"}
              </option>
              {optionsData?.data.branches.map((branch) => (
                <option key={branch.value} value={branch.value} className="bg-gray-800 text-white">
                  {branch.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="semester" className="text-white font-medium">
              Semester
            </Label>
            <select
              id="semester"
              value={formData.semester}
              onChange={(e) => handleInputChange("semester", e.target.value)}
              disabled={isLoading || optionsLoading}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800 text-white">
                {optionsLoading ? "Loading..." : "Select your semester"}
              </option>
              {optionsData?.data.semesters.map((semester) => (
                <option key={semester.value} value={semester.value} className="bg-gray-800 text-white">
                  {semester.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Gender and Hostel Name */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="gender" className="text-white font-medium">
              Gender
            </Label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              disabled={isLoading || optionsLoading}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800 text-white">
                {optionsLoading ? "Loading..." : "Select your gender"}
              </option>
              {optionsData?.data.genders.map((gender) => (
                <option key={gender.value} value={gender.value} className="bg-gray-800 text-white">
                  {gender.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hostel" className="text-white font-medium">
              Hostel
            </Label>
            <select
              id="hostel"
              value={formData.hostel}
              onChange={(e) => handleInputChange("hostel", e.target.value)}
              disabled={isLoading || hostelsLoading || !formData.gender}
              required
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800 text-white">
                {!formData.gender
                  ? "Select gender first"
                  : hostelsLoading
                    ? "Loading hostels..."
                    : "Select your hostel"}
              </option>
              {hostelsData?.data.map((hostel) => (
                <option key={hostel._id} value={hostel._id} className="bg-gray-800 text-white">
                  {hostel.name} ({hostel.code}) - {hostel.availableCapacity}/{hostel.totalCapacity} available
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 6: Enrollment Number and Create Account Button */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="enrollmentNumber" className="text-white font-medium">
              Enrollment Number
            </Label>
            <Input
              id="enrollmentNumber"
              type="text"
              placeholder="e.g., BT22CS006"
              required
              value={formData.enrollmentNumber}
              onChange={(e) => handleInputChange("enrollmentNumber", e.target.value)}
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-transparent">Button</Label>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-white/80">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-white hover:text-white/90 font-medium underline-offset-4 hover:underline bg-transparent border-none cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
