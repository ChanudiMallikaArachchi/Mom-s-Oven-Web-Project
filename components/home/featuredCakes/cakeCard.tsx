"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CakeCardProps {
  cake: {
    id: number;
    name: string;
    price: number;
    image: string;
    badge: string;
    rating: number;
  };
}

export default function CakeCard({ cake }: CakeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={cake.image}
          alt={cake.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-[#D9A11A] px-4 py-1 text-sm font-semibold text-white">
          {cake.badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#6F4422]">
          {cake.name}
        </h3>

        <div className="mt-3 flex">
          {Array.from({ length: cake.rating }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <p className="mt-4 text-2xl font-bold text-[#D9A11A]">
          Rs. {cake.price}
        </p>

        <Link
          href={`/cake/${cake.id}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6F4422] py-3 font-semibold text-white transition hover:bg-[#D9A11A]"
        >
          <ShoppingCart size={20} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
}