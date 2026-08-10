"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      setErrorMsg("Please accept the Terms & Conditions.");
      return;
    }

    login({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    setSubmitted(true);
    setTimeout(() => {
      router.push("/account");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-xl px-6">
        
        {/* Card Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4A2C1D]">Create Account</h1>
        </div>

        {/* Signup Form Card */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#4A2C1D]">Account Created!</h2>
              <p className="mt-2 text-base text-gray-600">
                Welcome to Mom&apos;s Oven, <span className="font-semibold text-[#4A2C1D]">{formData.name}</span>. Your account is ready.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block rounded-full bg-[#C97B2A] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#B86A1D]"
              >
                Sign In to Your Account
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMsg && (
                <div className="rounded-xl bg-red-50 p-3.5 text-sm font-semibold text-red-600 text-center">
                  {errorMsg}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-base font-semibold text-[#4A2C1D]">Full Name *</label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-base font-semibold text-[#4A2C1D]">Email Address *</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-base font-semibold text-[#4A2C1D]">Phone Number</label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-base font-semibold text-[#4A2C1D]">Password *</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="At least 6 characters"
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-11 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-base font-semibold text-[#4A2C1D]">Confirm Password *</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-[#D9A11A] focus:ring-[#D9A11A]"
                />
                <label htmlFor="terms" className="ml-2.5 text-xs leading-5 text-gray-600 select-none">
                  I agree to the{" "}
                  <a href="#" className="font-semibold text-[#D9A11A] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-semibold text-[#D9A11A] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97B2A] py-4 text-base font-semibold text-white shadow-md transition hover:bg-[#B86A1D] hover:shadow-lg"
              >
                Create Account
                <ArrowRight size={20} />
              </button>

            </form>
          )}
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#C97B2A] hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </main>
  );
}
