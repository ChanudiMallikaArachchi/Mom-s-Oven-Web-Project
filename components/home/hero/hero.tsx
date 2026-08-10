"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/heroImage1.jpg",
    title: "Handmade Cakes",
    subtitle: "Made With Love",
  },
  {
    image: "/images/heroImage2.jpg",
    title: "Freshly Baked",
    subtitle: "Every Day",
  },
  {
    image: "/images/heroImage3.jpg",
    title: "Sweet Moments",
    subtitle: "Start Here",
  },
  {
    image: "/images/heroImage4.jpg",
    title: "Delicious Treats",
    subtitle: "For Every Occasion",
  },
  {
    image: "/images/heroImage5.jpg",
    title: "Custom Creations",
    subtitle: "For Your Special Moments",
  },
  {
    image: "/images/heroImage6.jpg",
    title: "Indulge in Luxury",
    subtitle: "Experience the Best",
  },
  {
    image: "/images/heroImage7.jpg",
    title: "Sweeten Your Day",
    subtitle: "With Our Cakes",
  }
];

export default function Hero() {
  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 animate-[zoom_8s_ease-in-out_infinite]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Blur Layer */}
              <div className="absolute inset-0 backdrop-blur-[3px]" />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
                <div className="max-w-4xl">
                  <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-md">
                    🎂 Freshly Baked Happiness
                  </span>

                  <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white">
                    {slide.title}
                  </h1>

                  <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-[#D9A11A]">
                    {slide.subtitle}
                  </h2>

                  <p className="mt-6 text-lg md:text-xl text-gray-200">
                    Delicious cakes crafted with premium ingredients
                    for every celebration and special moment.
                  </p>

                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <button className="group rounded-full bg-[#D9A11A] px-8 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:shadow-xl">
                      <span className="flex items-center gap-2">
                        Order Now
                        <ArrowRight className="group-hover:translate-x-1 transition" />
                      </span>
                    </button>

                    <button className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-black">
                      View Cakes
                    </button>
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