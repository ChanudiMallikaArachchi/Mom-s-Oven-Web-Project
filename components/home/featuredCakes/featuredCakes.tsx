"use client";

import CakeCard from "./cakeCard";
import { featuredCakes } from "@/app/data/featuredCakes";
import Link from "next/link";

export default function FeaturedCakes() {
  return (
    <section id="featured-cakes" className="bg-[#FFF8F2] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#6F4422]">
            Featured Cakes
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Discover our handcrafted cakes baked with love and the finest
            ingredients for every celebration.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredCakes.map((cake) => (
            <div key={cake.id}>
              <CakeCard cake={cake} />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-16 text-center">
          <Link
            href="/categories"
            className="inline-block rounded-full bg-[#D9A11A] px-8 py-4 font-semibold text-white transition hover:bg-[#6F4422] shadow-md"
          >
            View All Cakes →
          </Link>
        </div>

      </div>
    </section>
  );
}