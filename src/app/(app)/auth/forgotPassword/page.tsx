'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
const router=useRouter();
  const handleRequestOtp = async () => {
    try {
      const res = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch('/api/forgotPassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        router.push("/auth/login")
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-gray-800 rounded shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-black"
            />
            <button
              onClick={handleRequestOtp}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-black"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-black"
            />
            <button
              onClick={handleResetPassword}
              className="w-full p-2 bg-green-500 text-white rounded"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
