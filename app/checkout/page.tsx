"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/order-success");
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-bold text-[#4A2C1D]">Checkout</h1>
        <p className="mt-2 text-gray-600">Complete your order details below.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-md md:col-span-2">
            <h2 className="text-2xl font-bold text-[#4A2C1D]">Customer Information</h2>
            
            <div>
              <label className="block text-sm font-semibold text-[#4A2C1D]">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:border-[#D9A11A] focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:border-[#D9A11A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+94 77 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:border-[#D9A11A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4A2C1D]">Delivery Address</label>
              <textarea
                required
                rows={3}
                placeholder="123 Main Street, City"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:border-[#D9A11A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#C97B2A] py-4 text-lg font-semibold text-white transition hover:bg-[#B86A1D]"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
