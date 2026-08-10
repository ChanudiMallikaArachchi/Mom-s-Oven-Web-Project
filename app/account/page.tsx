"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, Package, MapPin, LogOut, CheckCircle2, Clock, Truck, ChevronRight } from "lucide-react";

export default function AccountPage() {
  const { user, isLoggedIn, logout, login } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("profile");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "+94 77 123 4567",
        address: user.address || "123 Main Street, Colombo, Sri Lanka",
      });
    }
  }, [user]);

  // Sample order history data
  const orders = [
    {
      id: "MO-8924",
      date: "August 10, 2026",
      items: "Chocolate Birthday Cake (1kg)",
      total: 4500,
      status: "In Progress",
      statusColor: "bg-amber-100 text-amber-800",
      icon: Clock,
    },
    {
      id: "MO-8712",
      date: "July 28, 2026",
      items: "Red Velvet Cake + Cupcakes (Set of 6)",
      total: 8000,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
    {
      id: "MO-8201",
      date: "July 12, 2026",
      items: "Bento Cake Pack (2 Pcs)",
      total: 4500,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isLoggedIn && !user) {
    return (
      <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
        <div className="mx-auto max-w-md px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
            <User size={40} className="text-[#C97B2A]" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-[#4A2C1D]">Not Logged In</h1>
          <p className="mt-2 text-gray-600">Please log in to view your dashboard and orders.</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-[#C97B2A] px-8 py-3.5 font-semibold text-white transition hover:bg-[#B86A1D]"
          >
            Go to Login Page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Profile Banner / Header */}
        <div className="rounded-3xl bg-white p-8 shadow-xl md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFF8F2] text-3xl font-bold text-[#C97B2A] border-2 border-[#D9A11A]/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#4A2C1D]">
                {user?.name || "Valued Customer"}
              </h1>
              <p className="text-sm text-gray-500">{user?.email || "customer@example.com"}</p>
              <span className="mt-2 inline-block rounded-full bg-[#FFF8F2] px-3 py-1 text-xs font-semibold text-[#C97B2A]">
                🎂 Mom&apos;s Oven Member
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 md:mt-0"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mt-8 flex border-b border-gray-200 bg-white rounded-2xl p-2 shadow-sm">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
              activeTab === "profile"
                ? "bg-[#C97B2A] text-white shadow"
                : "text-gray-600 hover:text-[#4A2C1D]"
            }`}
          >
            <User size={18} />
            My Profile
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
              activeTab === "orders"
                ? "bg-[#C97B2A] text-white shadow"
                : "text-gray-600 hover:text-[#4A2C1D]"
            }`}
          >
            <Package size={18} />
            Order History ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
              activeTab === "addresses"
                ? "bg-[#C97B2A] text-white shadow"
                : "text-gray-600 hover:text-[#4A2C1D]"
            }`}
          >
            <MapPin size={18} />
            Saved Address
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 rounded-3xl bg-white p-8 shadow-xl">
          
          {/* 1. Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <h2 className="text-2xl font-bold text-[#4A2C1D]">Personal Information</h2>

              {savedSuccess && (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
                  <CheckCircle2 size={20} />
                  Profile updated successfully!
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Default Delivery Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-[#C97B2A] px-8 py-3.5 font-semibold text-white shadow transition hover:bg-[#B86A1D]"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* 2. Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#4A2C1D]">Recent Orders</h2>

              <div className="space-y-4">
                {orders.map((order) => {
                  const Icon = order.icon;
                  return (
                    <div
                      key={order.id}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-[#FFF8F2]/50 p-6 sm:flex-row sm:items-center"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#4A2C1D]">Order #{order.id}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${order.statusColor}`}>
                            <Icon size={14} />
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{order.items}</p>
                        <p className="text-xs text-gray-500">Placed on {order.date}</p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <span className="text-lg font-bold text-[#6F4422]">
                          Rs. {order.total.toLocaleString()}
                        </span>
                        <Link
                          href="/track-order"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#D9A11A] hover:underline"
                        >
                          Track Order <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#4A2C1D]">Saved Delivery Address</h2>

              <div className="rounded-2xl border border-gray-200 p-6 bg-[#FFF8F2]/30">
                <div className="flex items-center gap-2 font-bold text-[#4A2C1D]">
                  <MapPin size={20} className="text-[#C97B2A]" />
                  Home Address (Default)
                </div>
                <p className="mt-2 text-sm text-gray-600">{formData.address}</p>
                <p className="mt-1 text-xs text-gray-500">Phone: {formData.phone}</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
