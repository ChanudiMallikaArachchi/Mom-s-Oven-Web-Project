"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "View Cakes", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isSolid
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.JPG"
            alt="Mom&apos;s Oven"
            width={50}
            height={50}
            priority
            className="rounded-full border-2 border-[#C97B2A] object-cover shadow-sm transition group-hover:scale-105"
          />

          <div>
            <h1
              className={`text-2xl font-bold transition ${
                isSolid ? "text-[#4A2C1D]" : "text-white drop-shadow"
              }`}
            >
              Mom&apos;s Oven
            </h1>

            <p
              className={`text-[10px] tracking-[0.3em] uppercase font-bold transition ${
                isSolid ? "text-[#C97B2A]" : "text-[#D9A11A] drop-shadow"
              }`}
            >
              Homemade Cakes
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? isSolid
                      ? "bg-[#C97B2A] text-white shadow-sm font-bold"
                      : "bg-white/20 backdrop-blur-md text-white font-bold border border-white/30"
                    : isSolid
                    ? "text-[#4A2C1D] hover:text-[#C97B2A] hover:bg-gray-100"
                    : "text-white hover:text-[#D9A11A] hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons & Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            aria-label="Search"
            className={`p-2 rounded-full transition ${
              isSolid ? "text-[#4A2C1D] hover:bg-gray-100 hover:text-[#C97B2A]" : "text-white hover:bg-white/10 hover:text-[#D9A11A]"
            }`}
          >
            <Search size={20} />
          </button>

          {/* Account Profile Icon -> Links directly to /account */}
          <Link
            href="/account"
            aria-label="User Account"
            title={isLoggedIn ? `Dashboard (${user?.name})` : "My Account"}
            className={`relative p-2 rounded-full transition ${
              isSolid ? "text-[#4A2C1D] hover:bg-gray-100 hover:text-[#C97B2A]" : "text-white hover:bg-white/10 hover:text-[#D9A11A]"
            }`}
          >
            <User size={20} />
            {isLoggedIn && (
              <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            title="View Cart"
            className={`relative p-2 rounded-full transition ${
              isSolid ? "text-[#4A2C1D] hover:bg-gray-100 hover:text-[#C97B2A]" : "text-white hover:bg-white/10 hover:text-[#D9A11A]"
            }`}
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-1 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C97B2A] text-xs font-bold text-white shadow">
              0
            </span>
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-[#C97B2A] px-6 py-2 text-sm font-bold text-white shadow transition hover:bg-[#B86A1D] hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-xl transition ${
            isSolid ? "text-[#4A2C1D]" : "text-white"
          }`}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="bg-white border-t border-gray-100 lg:hidden shadow-xl">
          <nav className="flex flex-col p-6 space-y-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-[#C97B2A] text-white shadow-sm"
                      : "text-[#4A2C1D] hover:bg-gray-50 hover:text-[#C97B2A]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/account"
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-[#4A2C1D] hover:bg-gray-50 hover:text-[#C97B2A]"
              onClick={() => setMobileOpen(false)}
            >
              <User size={20} />
              {isLoggedIn ? `My Account (${user?.name})` : "My Account"}
            </Link>

            <Link
              href="/login"
              className="mt-4 flex items-center justify-center rounded-full bg-[#C97B2A] py-3 text-base font-bold text-white shadow transition hover:bg-[#B86A1D]"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}