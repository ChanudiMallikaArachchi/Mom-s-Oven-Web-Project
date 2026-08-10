"use client";

import { useState } from "react";
import { ShoppingBag, CheckCircle2 } from "lucide-react";

interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  items: string;
  total: number;
  date: string;
  status: "Received" | "Baking" | "Out for Delivery" | "Delivered";
}

export default function ManageOrdersPage() {
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

  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderItem["status"]) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`📦 Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#4A2C1D] px-6 py-3.5 text-sm font-semibold text-white shadow-2xl">
          <CheckCircle2 size={18} className="text-[#D9A11A]" />
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="rounded-3xl bg-white p-8 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A2C1D]">Manage Orders</h1>
          <p className="text-sm text-gray-500">
            Track and update customer order fulfillment status.
          </p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-3 text-[#C97B2A]">
          <ShoppingBag size={24} />
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="rounded-3xl bg-white p-6 shadow-md overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-[#FFF8F2] text-xs uppercase font-semibold text-[#4A2C1D]">
            <tr>
              <th className="p-4 rounded-l-xl">Order ID</th>
              <th className="p-4">Customer Details</th>
              <th className="p-4">Ordered Items</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Order Date</th>
              <th className="p-4 text-center rounded-r-xl">Update Status</th>
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
                      handleStatusChange(order.id, e.target.value as OrderItem["status"])
                    }
                    className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm focus:border-[#D9A11A] focus:outline-none"
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
  );
}
