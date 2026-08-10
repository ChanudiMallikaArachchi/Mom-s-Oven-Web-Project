"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cakes } from "@/app/data/cakes";

export default function EditCakePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const cakeId = Number(id);
  const existingCake = cakes.find((c) => c.id === cakeId) || cakes[0];

  const [formData, setFormData] = useState({
    name: existingCake.name,
    category: existingCake.category,
    image: existingCake.image,
    price: existingCake.price,
    description: existingCake.description,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/admin/cakes");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      
      {/* Back Button & Title */}
      <div>
        <Link
          href="/admin/cakes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#C97B2A] hover:underline mb-4"
        >
          <ArrowLeft size={16} /> Back to Manage Cakes
        </Link>
        <h1 className="text-3xl font-bold text-[#4A2C1D]">Edit Cake Details</h1>
        <p className="mt-1 text-sm text-gray-500">
          Updating information for <span className="font-semibold text-[#4A2C1D]">{existingCake.name}</span>.
        </p>
      </div>

      {/* Edit Cake Form Card */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-[#4A2C1D]">Cake Updated!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Redirecting to Manage Cakes page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#4A2C1D]">Cake Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
              />
            </div>

            {/* Category & Price */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none bg-white"
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
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
                />
              </div>
            </div>

            {/* Image Select */}
            <div>
              <label className="block text-sm font-semibold text-[#4A2C1D]">Image Asset *</label>
              <select
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none bg-white"
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

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#4A2C1D]">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-base focus:border-[#D9A11A] focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
              <Link
                href="/admin/cakes"
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#C97B2A] px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#B86A1D]"
              >
                <Edit size={18} />
                Save Changes
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
