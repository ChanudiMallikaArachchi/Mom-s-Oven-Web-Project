"use client";

import { motion } from "framer-motion";
import CakeCard from "./cakeCard";
import { featuredCakes } from "@/app/data/featuredCakes";
import Link from "next/link";

export default function FeaturedCakes() {
  return (
    <section id="featured-cakes" className="bg-[#FFF8F2] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-[#6F4422]">
            Featured Cakes
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Discover our handcrafted cakes baked with love and the finest
            ingredients for every celebration.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredCakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-16 text-center">
          <Link
            href="/categories"
            className="rounded-full bg-[#D9A11A] px-8 py-4 font-semibold text-white transition hover:bg-[#6F4422]"
          >
            View All Cakes →
          </Link>
        </div>

      </div>
    </section>
  );
}