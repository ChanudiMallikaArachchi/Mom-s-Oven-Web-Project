"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartItem() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-5 shadow-md md:flex-row md:items-center">

      <div className="relative h-32 w-32 overflow-hidden rounded-xl">
        <Image
          src="/images/image1.jpg"
          alt="Chocolate Cake"
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#4A2C1D]">
          Chocolate Birthday Cake
        </h2>

        <p className="mt-2 text-gray-500">
          1kg Chocolate Cake with butter icing
        </p>

        <p className="mt-3 text-xl font-semibold text-[#6F4422]">
          Rs. 4,500
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="h-10 w-10 rounded-lg bg-gray-200 text-xl">
          -
        </button>

        <span className="w-8 text-center font-semibold">
          1
        </span>

        <button className="h-10 w-10 rounded-lg bg-gray-200 text-xl">
          +
        </button>
      </div>

      <button className="rounded-lg p-3 text-red-500 transition hover:bg-red-50">
        <Trash2 size={22} />
      </button>

    </div>
  );
}