"use client";

import { motion } from "framer-motion";
import {
  CakeSlice,
  Truck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: CakeSlice,
    title: "Freshly Baked Daily",
    description:
      "Every cake is baked fresh each day using premium quality ingredients.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We deliver your cakes safely and on time for every celebration.",
  },
  {
    icon: Sparkles,
    title: "Custom Cake Designs",
    description:
      "Create personalized cakes for birthdays, weddings and special occasions.",
  },
  {
    icon: HeartHandshake,
    title: "Made With Love",
    description:
      "Every cake is handcrafted with care to make your moments unforgettable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-[#D9A11A]">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#6F4422]">
            Why Choose Mom&apos;s Oven?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            We combine passion, premium ingredients and creativity to deliver
            delicious cakes that make every celebration unforgettable.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group rounded-3xl border border-[#F4E6D4] bg-[#FFF8F2] p-8 text-center shadow-sm transition-all duration-300 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D9A11A]/20 transition duration-300 group-hover:bg-[#D9A11A]">

                  <Icon
                    size={38}
                    className="text-[#6F4422] transition duration-300 group-hover:text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#6F4422]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
