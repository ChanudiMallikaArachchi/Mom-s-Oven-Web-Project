"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-xl px-6">
        
        {/* Card Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4A2C1D]">Welcome To Mom&apos;s Oven</h1>
        </div>

        {/* Login Form Card */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#4A2C1D]">Logged In Successfully!</h2>
              <p className="mt-2 text-sm text-gray-600">
                Redirecting to your dashboard...
              </p>
              <Link
                href="/"
                className="mt-6 inline-block rounded-full bg-[#C97B2A] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#B86A1D]"
              >
                Go to Homepage
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Email Address</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Password</label>
                  <a href="#" className="text-xs font-semibold text-[#D9A11A] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-11 text-sm focus:border-[#D9A11A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#D9A11A] focus:ring-[#D9A11A]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 select-none">
                  Remember me on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97B2A] py-3.5 font-semibold text-white shadow-md transition hover:bg-[#B86A1D] hover:shadow-lg"
              >
                Login
                <ArrowRight size={18} />
              </button>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center border-t border-gray-100">
                <span className="bg-white px-3 text-xs uppercase tracking-wider text-gray-400">
                  Or continue with
                </span>
              </div>

              {/* Social Login Button */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              {/* Create Account Section */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm font-medium text-gray-600 mb-3">
                  Don&apos;t have an account yet?
                </p>
                <Link
                  href="/signup"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#C97B2A] py-3 text-sm font-bold text-[#C97B2A] transition hover:bg-[#C97B2A] hover:text-white"
                >
                  <UserPlus size={18} />
                  Create New Account
                </Link>
              </div>

            </form>
          )}
        </div>

      </div>
    </main>
  );
}
