"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Cake,
  PlusCircle,
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  Edit,
  Trash2,
  X,
  Search,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { cakes as initialCakes } from "@/app/data/cakes";

interface CakeItem {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  items: string;
  total: number;
  date: string;
  status: "Received" | "Baking" | "Out for Delivery" | "Delivered";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "cakes" | "orders">("dashboard");

  // Cakes State
  const [cakesList, setCakesList] = useState<CakeItem[]>(initialCakes);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCake, setEditingCake] = useState<CakeItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New / Edit Cake Form State
  const [cakeForm, setCakeForm] = useState<Omit<CakeItem, "id">>({
    name: "",
    category: "birthday-cakes",
    image: "/images/cake9.jpeg",
    price: 3500,
    description: "",
  });

  // Notification Banner
  const [toastMsg, setToastMsg] = useState("");

  // Orders State
  const [orders, setOrders] = useState<OrderItem[]>([
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
    {
      id: "MO-8600",
      customer: "Dilani Rajapaksha",
      phone: "+94 72 444 1122",
      items: "Bento Cake Pack (2 Pcs)",
      total: 4500,
      date: "August 08, 2026",
      status: "Delivered",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Add Cake Handler
  const handleAddCake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cakeForm.name || !cakeForm.price) return;

    const newCake: CakeItem = {
      id: Date.now(),
      ...cakeForm,
    };

    setCakesList([newCake, ...cakesList]);
    setIsAddModalOpen(false);
    setCakeForm({
      name: "",
      category: "birthday-cakes",
      image: "/images/cake9.jpeg",
      price: 3500,
      description: "",
    });
    showToast("🍰 New Cake added successfully!");
  };

  // Edit Cake Handler
  const handleUpdateCake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCake) return;

    setCakesList(cakesList.map((c) => (c.id === editingCake.id ? editingCake : c)));
    setEditingCake(null);
    showToast("✏️ Cake details updated successfully!");
  };

  // Delete Cake Handler
  const handleDeleteCake = (id: number) => {
    if (confirm("Are you sure you want to delete this cake?")) {
      setCakesList(cakesList.filter((c) => c.id !== id));
      showToast("🗑️ Cake deleted.");
    }
  };

  // Update Order Status Handler
  const handleOrderStatusChange = (orderId: string, newStatus: OrderItem["status"]) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`📦 Order ${orderId} status updated to ${newStatus}`);
  };

  // Filtered Cakes
  const filteredCakes = cakesList.filter(
    (cake) =>
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total Revenue Calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <main className="min-h-screen bg-[#F9F6F0] pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Toast */}
        {toastMsg && (
          <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#4A2C1D] px-6 py-3.5 text-sm font-semibold text-white shadow-2xl animate-fade-in">
            <CheckCircle2 size={18} className="text-[#D9A11A]" />
            {toastMsg}
          </div>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-[#FFF8F2] p-2 text-[#C97B2A]">
                <Cake size={28} />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#4A2C1D]">
                  Mom&apos;s Oven Admin Panel
                </h1>
                <p className="text-sm text-gray-500">
                  Manage bakery catalog, track customer orders, and add new cakes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#C97B2A] px-5 py-3 font-semibold text-white shadow transition hover:bg-[#B86A1D]"
            >
              <PlusCircle size={20} />
              Add New Cake
            </button>
            <Link
              href="/"
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              View Website
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-3 rounded-2xl bg-white p-2 shadow-md">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition ${
              activeTab === "dashboard"
                ? "bg-[#C97B2A] text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab("cakes")}
            className={`flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition ${
              activeTab === "cakes"
                ? "bg-[#C97B2A] text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Cake size={18} />
            Manage Cakes ({cakesList.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition ${
              activeTab === "orders"
                ? "bg-[#C97B2A] text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag size={18} />
            Manage Orders ({orders.length})
          </button>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <div className="mt-8 space-y-8">
            
            {/* 4 Stat Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-lg border-l-4 border-[#C97B2A]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Revenue
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[#4A2C1D]">
                      Rs. {totalRevenue.toLocaleString()}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-3 text-[#C97B2A]">
                    <DollarSign size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                  <TrendingUp size={14} /> +18.4% from last month
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Orders
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[#4A2C1D]">
                      {orders.length} Orders
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                    <ShoppingBag size={24} />
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">Updated in real-time</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Active Products
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[#4A2C1D]">
                      {cakesList.length} Cakes
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                    <Cake size={24} />
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">Across 6 categories</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Pending Deliveries
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[#4A2C1D]">
                      {orders.filter((o) => o.status !== "Delivered").length} Orders
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                    <Package size={24} />
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">In baking & delivery queue</p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#4A2C1D]">Recent Customer Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-1 text-sm font-semibold text-[#C97B2A] hover:underline"
                >
                  View All Orders <ChevronRight size={16} />
                </button>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-[#FFF8F2] text-xs uppercase font-semibold text-[#4A2C1D]">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
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
                        <td className="p-4 text-xs text-gray-500">{order.date}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Baking"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
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
        )}

        {/* TAB 2: MANAGE CAKES */}
        {activeTab === "cakes" && (
          <div className="mt-8 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search cake by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 py-3 pl-11 pr-4 text-sm focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#C97B2A] px-6 py-3 font-semibold text-white shadow transition hover:bg-[#B86A1D]"
              >
                <PlusCircle size={18} />
                Add New Cake
              </button>
            </div>

            {/* Cakes Table */}
            <div className="rounded-3xl bg-white p-6 shadow-lg overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-[#FFF8F2] text-xs uppercase font-semibold text-[#4A2C1D]">
                  <tr>
                    <th className="p-4 rounded-l-xl">Image</th>
                    <th className="p-4">Cake Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCakes.map((cake) => (
                    <tr key={cake.id} className="hover:bg-gray-50/50">
                      <td className="p-4">
                        <Image
                          src={cake.image}
                          alt={cake.name}
                          width={55}
                          height={55}
                          className="h-14 w-14 rounded-xl object-cover border border-gray-100 shadow-sm"
                        />
                      </td>
                      <td className="p-4 font-bold text-[#4A2C1D]">
                        {cake.name}
                        <p className="text-xs font-normal text-gray-400 line-clamp-1 max-w-xs">
                          {cake.description}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="rounded-full bg-[#FFF8F2] px-3 py-1 text-xs font-semibold text-[#C97B2A] capitalize">
                          {cake.category.replace("-", " ")}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-[#6F4422]">
                        Rs. {cake.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingCake(cake)}
                            className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCake(cake.id)}
                            className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCakes.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  No cakes found matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: MANAGE ORDERS */}
        {activeTab === "orders" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#4A2C1D] mb-6">Customer Orders Queue</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-[#FFF8F2] text-xs uppercase font-semibold text-[#4A2C1D]">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Ordered Items</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center rounded-r-xl">Change Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-[#4A2C1D]">{order.id}</td>
                        <td className="p-4">
                          <div className="font-semibold text-gray-800">{order.customer}</div>
                          <div className="text-xs text-gray-400">{order.phone}</div>
                        </td>
                        <td className="p-4 text-gray-700">{order.items}</td>
                        <td className="p-4 font-bold text-[#6F4422]">
                          Rs. {order.total.toLocaleString()}
                        </td>
                        <td className="p-4 text-xs text-gray-500">{order.date}</td>
                        <td className="p-4 text-center">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleOrderStatusChange(
                                order.id,
                                e.target.value as OrderItem["status"]
                              )
                            }
                            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm focus:border-[#D9A11A] focus:outline-none"
                          >
                            <option value="Received">Received</option>
                            <option value="Baking">Baking</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ADD CAKE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-[#4A2C1D]">Add New Cake</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddCake} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Cake Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chocolate Fudge Supreme"
                  value={cakeForm.name}
                  onChange={(e) => setCakeForm({ ...cakeForm, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Category *</label>
                  <select
                    value={cakeForm.category}
                    onChange={(e) => setCakeForm({ ...cakeForm, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none bg-white"
                  >
                    <option value="birthday-cakes">Birthday Cakes</option>
                    <option value="wedding-cakes">Wedding Cakes</option>
                    <option value="bento-cakes">Bento Cakes</option>
                    <option value="cupcakes">Cupcakes</option>
                    <option value="brownies">Brownies</option>
                    <option value="mini-cakes">Mini Cakes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Price (Rs) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    placeholder="3500"
                    value={cakeForm.price}
                    onChange={(e) => setCakeForm({ ...cakeForm, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Image Select *</label>
                <select
                  value={cakeForm.image}
                  onChange={(e) => setCakeForm({ ...cakeForm, image: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none bg-white"
                >
                  <option value="/images/cake1.jpeg">Cake 1 (Birthday Cake)</option>
                  <option value="/images/cake7.jpeg">Cake 7 (Red Velvet)</option>
                  <option value="/images/cake9.jpeg">Cake 9 (Bliss Cake)</option>
                  <option value="/images/weddingCake1.jpeg">Wedding Cake 1</option>
                  <option value="/images/cupCake1.jpeg">Cupcake 1</option>
                  <option value="/images/browniesBox1.jpeg">Brownies Box 1</option>
                  <option value="/images/bentoCakePack1.jpeg">Bento Cake Pack 1</option>
                  <option value="/images/jarCake1.jpeg">Jar Cake 1</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Description</label>
                <textarea
                  rows={3}
                  placeholder="Fresh handcrafted cake details..."
                  value={cakeForm.description}
                  onChange={(e) => setCakeForm({ ...cakeForm, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#C97B2A] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#B86A1D]"
                >
                  Add Cake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CAKE MODAL */}
      {editingCake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-[#4A2C1D]">Edit Cake Details</h3>
              <button
                onClick={() => setEditingCake(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateCake} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Cake Name</label>
                <input
                  type="text"
                  required
                  value={editingCake.name}
                  onChange={(e) => setEditingCake({ ...editingCake, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Category</label>
                  <select
                    value={editingCake.category}
                    onChange={(e) => setEditingCake({ ...editingCake, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none bg-white"
                  >
                    <option value="birthday-cakes">Birthday Cakes</option>
                    <option value="wedding-cakes">Wedding Cakes</option>
                    <option value="bento-cakes">Bento Cakes</option>
                    <option value="cupcakes">Cupcakes</option>
                    <option value="brownies">Brownies</option>
                    <option value="mini-cakes">Mini Cakes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Price (Rs)</label>
                  <input
                    type="number"
                    required
                    value={editingCake.price}
                    onChange={(e) => setEditingCake({ ...editingCake, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Description</label>
                <textarea
                  rows={3}
                  value={editingCake.description}
                  onChange={(e) => setEditingCake({ ...editingCake, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCake(null)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#C97B2A] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#B86A1D]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
