"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, PlusCircle, Edit, Trash2, Cake, CheckCircle2 } from "lucide-react";
import { cakes as initialCakes } from "@/app/data/cakes";

export default function ManageCakesPage() {
  const [cakesList, setCakesList] = useState(initialCakes);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleDeleteCake = (id: number) => {
    if (confirm("Are you sure you want to delete this cake?")) {
      setCakesList(cakesList.filter((c) => c.id !== id));
      showToast("🗑️ Cake deleted successfully!");
    }
  };

  const filteredCakes = cakesList.filter(
    (cake) =>
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Notification Toast */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#4A2C1D] px-6 py-3.5 text-sm font-semibold text-white shadow-2xl">
          <CheckCircle2 size={18} className="text-[#D9A11A]" />
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A2C1D]">Manage Cakes</h1>
          <p className="text-sm text-gray-500">
            View all bakery items, edit details, or remove products.
          </p>
        </div>

        <Link
          href="/admin/add-cake"
          className="flex items-center gap-2 rounded-xl bg-[#C97B2A] px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#B86A1D]"
        >
          <PlusCircle size={18} /> Add New Cake
        </Link>
      </div>

      {/* Search Bar */}
      <div className="rounded-3xl bg-white p-6 shadow-md">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search cake by name or category (e.g. Red Velvet, Cupcake)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 py-3.5 pl-11 pr-4 text-sm focus:border-[#D9A11A] focus:outline-none"
          />
        </div>
      </div>

      {/* Cakes Table */}
      <div className="rounded-3xl bg-white p-6 shadow-md overflow-x-auto">
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
                    <Link
                      href={`/admin/edit-cake/${cake.id}`}
                      className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      <Edit size={14} /> Edit
                    </Link>
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
            <Cake size={40} className="mx-auto mb-2 text-gray-300" />
            No cakes found matching &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>

    </div>
  );
}
