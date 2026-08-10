"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Birthday Cakes",
    slug: "birthday-cakes",
    image: "/images/cake9.jpeg",
    items: "15+ Designs",
  },
  {
    name: "Wedding Cakes",
    slug: "wedding-cakes",
    image: "/images/weddingCake1.jpeg",
    items: "8+ Tier Options",
  },
  {
    name: "Bento Cakes",
    slug: "bento-cakes",
    image: "/images/bentoCakePack1.jpeg",
    items: "12+ Mini Packs",
  },
  {
    name: "Cupcakes",
    slug: "cupcakes",
    image: "/images/cupCake1.jpeg",
    items: "20+ Flavors",
  },
  {
    name: "Fudgy Brownies",
    slug: "brownies",
    image: "/images/brownieCake1.jpeg",
    items: "Box of 6 / 12",
  },
  {
    name: "Jar Cakes",
    slug: "mini-cakes",
    image: "/images/jarCake1.jpeg",
    items: "Dessert Pots",
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C97B2A]">
              Bakery Catalog
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-[#4A2C1D]">
              Popular Categories
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-xl">
              Browse our delicious range of handcrafted cakes, cupcakes, brownies, and mini bento boxes.
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-bold text-[#4A2C1D] transition hover:bg-[#C97B2A] hover:text-white shadow-sm self-start md:self-auto"
          >
            All Categories
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-[#FFF8F2] p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#D9A11A] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                        {cat.items}
                      </span>
                      <h3 className="mt-1.5 text-2xl font-bold text-white drop-shadow">
                        {cat.name}
                      </h3>
                    </div>
                    
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4A2C1D] shadow transition duration-300 group-hover:bg-[#C97B2A] group-hover:text-white">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
