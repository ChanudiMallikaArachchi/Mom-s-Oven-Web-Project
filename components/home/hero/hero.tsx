"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/heroImage1.jpg",
    title: "Handmade Cakes",
    subtitle: "Made With Love",
    description: "Delicious cakes crafted with premium ingredients for every celebration and special moment.",
  },
  {
    image: "/images/heroImage2.jpg",
    title: "Freshly Baked",
    subtitle: "Every Day",
    description: "Experience the irresistible aroma and melt-in-your-mouth taste of fresh oven-baked goodness.",
  },
  {
    image: "/images/heroImage3.jpg",
    title: "Sweet Moments",
    subtitle: "Start Here",
    description: "From birthdays to weddings, make every occasion memorable with our handcrafted creations.",
  },
  {
    image: "/images/heroImage4.jpg",
    title: "Delicious Treats",
    subtitle: "For Every Occasion",
    description: "Indulge in artisanal cupcakes, fudgy brownies, and cute bento cake boxes.",
  },
  {
    image: "/images/heroImage5.jpg",
    title: "Custom Creations",
    subtitle: "For Your Special Moments",
    description: "Customized designs tailored to your unique flavor preferences and celebration theme.",
  },
  {
    image: "/images/heroImage6.jpg",
    title: "Indulge in Luxury",
    subtitle: "Experience the Best",
    description: "Gourmet recipes baked with love using 100% natural, high quality ingredients.",
  },
  {
    image: "/images/heroImage7.jpg",
    title: "Sweeten Your Day",
    subtitle: "With Our Cakes",
    description: "Order online for fast, safe delivery straight to your doorstep.",
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            
            {/* Background Image */}
            <div className="relative h-screen w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center transition-transform duration-10000 ease-out scale-105"
              />

              {/* Crisp Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/40" />

              {/* Centered Content Block */}
              <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6 pt-16">
                <div className="max-w-4xl space-y-6">
                  
                  <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md border border-white/30 shadow-lg">
                    🎂 Freshly Baked Happiness
                  </span>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                    {slide.title}
                  </h1>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#D9A11A] drop-shadow-md">
                    {slide.subtitle}
                  </h2>

                  <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 drop-shadow">
                    {slide.description}
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <Link
                      href="/categories"
                      className="group inline-flex items-center justify-center rounded-full bg-[#C97B2A] px-8 py-4 text-base md:text-lg font-bold text-white shadow-xl transition hover:bg-[#B86A1D] hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        Order Now
                        <ArrowRight size={20} className="transition group-hover:translate-x-1" />
                      </span>
                    </Link>

                    <Link
                      href="/categories"
                      className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 text-base md:text-lg font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#4A2C1D]"
                    >
                      View Cakes
                    </Link>
                  </div>

                </div>
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}