"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "@/types/category";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-lg"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 p-6 text-white">
          <h3 className="text-2xl font-bold">
            {category.name}
          </h3>

          <p className="mt-2 text-sm text-gray-200">
            {category.description}
          </p>

          <Link href={`/categories/${category.slug}`}>
             <button className="mt-4 w-full rounded-xl bg-[#C97B2A] py-3 font-semibold text-white transition hover:bg-[#b56b20]">
                View Details
             </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}