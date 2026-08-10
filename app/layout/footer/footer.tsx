"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Globe,
  Send,
  Phone,
  Mail,
  MapPin,
  ChevronUp,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#4A2C1D] text-white">

      {/* Top */}
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>

            <Image
              src="/images/logo.JPG"
              alt="Mom&apos;s Oven"
              width={150}
              height={150}
              className="mb-5 rounded-full object-cover"
            />

            <p className="leading-7 text-gray-300">
              Freshly baked cakes made with love for birthdays,
              weddings and every sweet celebration.
            </p>

            <div className="mt-6 flex gap-4">

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-[#D9A11A]"
              >
                <Globe size={20} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-[#D9A11A]"
              >
                <Send size={20} />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>
                <Link href="/" className="hover:text-[#D9A11A]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="hover:text-[#D9A11A]">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/categories" className="hover:text-[#D9A11A]">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-[#D9A11A]">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/admin" className="font-semibold text-[#D9A11A] hover:underline">
                  Admin Panel
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Categories
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>Birthday Cakes</li>
              <li>Wedding Cakes</li>
              <li>Anniversary Cakes</li>
              <li>Cupcakes</li>
              <li>Bento Cakes</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Contact
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex items-start gap-3">

                <Phone
                  size={18}
                  className="mt-1 text-[#D9A11A]"
                />

                <span>+94 77 123 4567</span>

              </div>

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-1 text-[#D9A11A]"
                />

                <span>info@momsoven.com</span>

              </div>

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 text-[#D9A11A]"
                />

                <span>
                  No.25, Main Street,
                  <br />
                  Colombo, Sri Lanka
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 md:flex-row">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mom&apos;s Oven.
            All Rights Reserved.
          </p>

          <button
            onClick={scrollTop}
            className="rounded-full bg-[#D9A11A] p-3 transition hover:scale-110"
          >
            <ChevronUp size={20} />
          </button>

        </div>

      </div>

    </footer>
  );
}