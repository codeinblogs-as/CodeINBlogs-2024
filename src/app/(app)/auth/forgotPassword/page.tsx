"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast'
import { ArrowRight, CheckCircle2, Mail, KeyRound, Lock } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleRequestOtp = async () => {
    try {
      const res = await fetch("/api/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message)
        setStep(2)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleVerifyOtp = () => {
    try {
      // Verify OTP logic here
      toast.success("Code verified successfully")
      setStep(3)
    } catch (error) {
      toast.error("Invalid code")
    }
  }

  const handleResetPassword = async () => {
    try {
      const res = await fetch("/api/forgotPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message)
        setStep(4)
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] p-4">
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      <div className="w-full max-w-md rounded-lg border border-[#27272A] bg-[#18181B] p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="mt-1 text-sm text-[#71717A]">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Create your new password"}
            {step === 4 && "Password reset successful!"}
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-0 top-[22px] h-[2px] w-full bg-[#27272A]">
              <div
                className="absolute left-0 top-0 h-full bg-[#374151] transition-all duration-500"
                style={{
                  width: step === 1 ? '0%' :
                         step === 2 ? '50%' :
                         '100%'
                }}
              />
            </div>

            {/* Timeline steps */}
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center gap-2">
                <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#18181B] ${
                  step >= 1 ? 'border-[#374151]' : 'border-[#27272A]'
                }`}>
                  {step > 1 ? (
                    <CheckCircle2 className="h-5 w-5 text-[#374151]" />
                  ) : (
                    <Mail className={`h-5 w-5 ${step === 1 ? 'text-[#374151]' : 'text-[#71717A]'}`} />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-medium ${step >= 1 ? 'text-[#374151]' : 'text-[#71717A]'}`}>
                    Email
                  </span>
                  <span className="text-xs text-[#71717A]">
                    Verify email
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#18181B] ${
                  step >= 2 ? 'border-[#374151]' : 'border-[#27272A]'
                }`}>
                  {step > 2 ? (
                    <CheckCircle2 className="h-5 w-5 text-[#374151]" />
                  ) : (
                    <KeyRound className={`h-5 w-5 ${step === 2 ? 'text-[#374151]' : 'text-[#71717A]'}`} />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-medium ${step >= 2 ? 'text-[#374151]' : 'text-[#71717A]'}`}>
                    Code
                  </span>
                  <span className="text-xs text-[#71717A]">
                    Enter code
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#18181B] ${
                  step >= 3 ? 'border-[#374151]' : 'border-[#27272A]'
                }`}>
                  {step > 3 ? (
                    <CheckCircle2 className="h-5 w-5 text-[#374151]" />
                  ) : (
                    <Lock className={`h-5 w-5 ${step === 3 ? 'text-[#374151]' : 'text-[#71717A]'}`} />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-medium ${step >= 3 ? 'text-[#374151]' : 'text-[#71717A]'}`}>
                    Password
                  </span>
                  <span className="text-xs text-[#71717A]">
                    Reset password
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#27272A] bg-[#18181B] px-3 py-2 text-sm text-white placeholder-[#71717A] focus:border-[#374151] focus:outline-none focus:ring-1 focus:ring-[#374151]"
              />
            </div>
            <button
              onClick={handleRequestOtp}
              className="flex w-full items-center justify-center rounded-md bg-[#374151] px-4 py-2 text-sm font-medium text-white hover:bg-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#374151] focus:ring-offset-2 focus:ring-offset-[#18181B] disabled:opacity-50"
            >
              Send Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-white">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter the code sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-md border border-[#27272A] bg-[#18181B] px-3 py-2 text-sm text-white placeholder-[#71717A] focus:border-[#374151] focus:outline-none focus:ring-1 focus:ring-[#374151]"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="flex w-full items-center justify-center rounded-md bg-[#374151] px-4 py-2 text-sm font-medium text-white hover:bg-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#374151] focus:ring-offset-2 focus:ring-offset-[#18181B] disabled:opacity-50"
            >
              Verify Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="new-password" className="block text-sm font-medium text-white">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-md border border-[#27272A] bg-[#18181B] px-3 py-2 text-sm text-white placeholder-[#71717A] focus:border-[#374151] focus:outline-none focus:ring-1 focus:ring-[#374151]"
              />
            </div>
            <button
              onClick={handleResetPassword}
              className="flex w-full items-center justify-center rounded-md bg-[#374151] px-4 py-2 text-sm font-medium text-white hover:bg-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#374151] focus:ring-offset-2 focus:ring-offset-[#18181B] disabled:opacity-50"
            >
              Reset Password
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-[#374151]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Password Reset Successful</h3>
              <p className="text-sm text-[#71717A]">
                Your password has been reset successfully. Redirecting to login...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

