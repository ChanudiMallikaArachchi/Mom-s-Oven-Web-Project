"use client";

import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Cake,
  Package,
  TrendingUp,
  PlusCircle,
  ChevronRight,
  Clock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rs. 184,500",
      change: "+18.4% this month",
      icon: DollarSign,
      color: "border-[#C97B2A]",
      bg: "bg-amber-50 text-[#C97B2A]",
    },
    {
      title: "Total Orders",
      value: "42 Orders",
      change: "+12 new today",
      icon: ShoppingBag,
      color: "border-blue-500",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Cakes",
      value: "8 Products",
      change: "Across 6 categories",
      icon: Cake,
      color: "border-purple-500",
      bg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Pending Deliveries",
      value: "5 Orders",
      change: "In baking queue",
      icon: Package,
      color: "border-green-500",
      bg: "bg-green-50 text-green-600",
    },
  ];

  const recentOrders = [
    {
      id: "MO-8924",
      customer: "Kamal Perera",
      phone: "+94 77 123 4567",
      items: "Chocolate Birthday Cake (1kg)",
      total: 4500,
      date: "August 10, 2026",
      status: "Baking",
    },
    {
      id: "MO-8925",
      customer: "Nimali Silva",
      phone: "+94 71 987 6543",
      items: "Red Velvet Delight (1kg)",
      total: 4200,
      date: "August 10, 2026",
      status: "Received",
    },
    {
      id: "MO-8712",
      customer: "Sunil Fernando",
      phone: "+94 76 555 4321",
      items: "Jar Cake Special (Pack of 3)",
      total: 3800,
      date: "August 09, 2026",
      status: "Out for Delivery",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A2C1D]">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to Mom&apos;s Oven control center.</p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/add-cake"
            className="flex items-center gap-2 rounded-xl bg-[#C97B2A] px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#B86A1D]"
          >
            <PlusCircle size={18} /> Add Cake
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ShoppingBag size={18} /> Manage Orders
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`rounded-3xl bg-white p-6 shadow-md border-l-4 ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[#4A2C1D]">
                    {stat.value}
                  </h3>
                </div>
                <div className={`rounded-2xl p-3 ${stat.bg}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-600">
                <TrendingUp size={14} className="text-green-600" /> {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/admin/cakes"
          className="group rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                <Cake size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4A2C1D]">Manage Cakes</h4>
                <p className="text-xs text-gray-500">Edit, update price & delete</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 transition group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/admin/add-cake"
          className="group rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-[#C97B2A]">
                <PlusCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4A2C1D]">Add New Cake</h4>
                <p className="text-xs text-gray-500">Create new bakery item</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 transition group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="group rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4A2C1D]">Manage Orders</h4>
                <p className="text-xs text-gray-500">Update status & delivery</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 transition group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#4A2C1D]">Recent Customer Orders</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm font-semibold text-[#C97B2A] hover:underline"
          >
            View All Orders <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FFF8F2] text-xs uppercase font-semibold text-[#4A2C1D]">
              <tr>
                <th className="p-4 rounded-l-xl">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-[#4A2C1D]">{order.id}</td>
                  <td className="p-4 font-medium text-gray-800">
                    {order.customer}
                    <div className="text-xs text-gray-400">{order.phone}</div>
                  </td>
                  <td className="p-4 text-gray-600">{order.items}</td>
                  <td className="p-4 font-bold text-[#6F4422]">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "Baking"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      <Clock size={12} />
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
