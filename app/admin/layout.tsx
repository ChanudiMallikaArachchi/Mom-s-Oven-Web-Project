"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cake,
  PlusCircle,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Cakes", href: "/admin/cakes", icon: Cake },
    { name: "Add Cake", href: "/admin/add-cake", icon: PlusCircle },
    { name: "Manage Orders", href: "/admin/orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-20">
      <div className="flex">
        
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] w-64 border-r border-gray-200 bg-white p-6 shadow-sm hidden md:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4A2C1D]">Admin Panel</h2>
            <p className="text-xs text-gray-500">Mom&apos;s Oven Management</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#C97B2A] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#4A2C1D]"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3 text-xs font-bold text-gray-700 transition hover:bg-gray-100"
            >
              <ArrowLeft size={16} /> Back to Website
            </Link>
          </div>
        </aside>

        {/* Mobile Sub-Navigation Header */}
        <div className="md:hidden fixed top-20 left-0 right-0 z-30 bg-white border-b border-gray-200 p-3 overflow-x-auto flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#C97B2A] text-white shadow"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Main Content View Container */}
        <div className="flex-1 md:ml-64 p-6 md:p-10">
          {children}
        </div>

      </div>
    </div>
  );
}
