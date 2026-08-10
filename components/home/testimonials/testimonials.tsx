"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { testimonials } from "@/app/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-[#FFF8F2] py-24">
      <div className="mx-auto max-w-6xl px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#6F4422]">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-600">
            Thousands of happy customers trust Mom&apos;s Oven for every celebration.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
          }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={30}
        >
          {testimonials.map((customer) => (
            <SwiperSlide key={customer.id}>

              <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

                <div className="flex flex-col items-center">

                  <Image
                    src={customer.image}
                    alt={customer.name}
                    width={110}
                    height={110}
                    className="rounded-full border-4 border-[#D9A11A] object-cover"
                  />

                  <div className="mt-5 flex">
                    {Array.from({ length: customer.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="mt-6 text-center text-lg leading-8 text-gray-600 italic">
                    &quot;{customer.review}&quot;
                  </p>

                  <h3 className="mt-8 text-2xl font-bold text-[#6F4422]">
                    {customer.name}
                  </h3>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
