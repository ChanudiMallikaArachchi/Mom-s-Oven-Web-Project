"use client";

import { useState } from "react";
import { PackageCheck, Clock, Truck, Check } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("MO-8924");
  const [tracked, setTracked] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTracked(true);
  };

  const steps = [
    { title: "Order Received", desc: "Your order has been confirmed.", done: true, icon: PackageCheck },
    { title: "Baking & Decorating", desc: "Our bakers are preparing your cake.", done: true, icon: Clock },
    { title: "Out for Delivery", desc: "Your order is on the way.", done: false, icon: Truck },
    { title: "Delivered", desc: "Enjoy your fresh cake!", done: false, icon: Check },
  ];

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold text-[#4A2C1D]">Track Your Order</h1>
        <p className="mt-2 text-gray-600">Enter your order ID to see real-time updates.</p>

        <form onSubmit={handleTrack} className="mt-6 flex gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. MO-8924)"
            className="flex-1 rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#C97B2A] px-8 py-3.5 font-semibold text-white transition hover:bg-[#B86A1D]"
          >
            Track
          </button>
        </form>

        {tracked && (
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
            <h2 className="text-2xl font-bold text-[#4A2C1D]">Status for Order #{orderId}</h2>
            
            <div className="mt-8 space-y-6">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        step.done ? "bg-[#D9A11A] text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${step.done ? "text-[#4A2C1D]" : "text-gray-400"}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
