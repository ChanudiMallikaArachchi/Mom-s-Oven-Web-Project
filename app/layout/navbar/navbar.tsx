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
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isSolid
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-amber-900/5 text-gray-900"
          : "bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-[2px] py-5 text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <Image
            src="/images/logo.JPG"
            alt="Mom&apos;s Oven"
            width={52}
            height={52}
            priority
            className="rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105"
          />

          <div>
            <h1
              className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isSolid ? "text-[#4A2C1D]" : "text-white drop-shadow-md"
              }`}
            >
              Mom&apos;s Oven
            </h1>

            <p
              className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                isSolid ? "text-[#C97B2A]" : "text-[#D9A11A]"
              }`}
            >
              Homemade Cakes
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1 text-base font-bold transition-all duration-300 hover:text-[#C97B2A] ${
                  isActive
                    ? "text-[#C97B2A]"
                    : isSolid
                    ? "text-[#4A2C1D]"
                    : "text-white drop-shadow"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#C97B2A] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons & Auth Buttons */}
        <div className="hidden lg:flex items-center gap-5">
          
          <button aria-label="Search" className="transition hover:scale-110">
            <Search
              size={22}
              className={`transition-colors duration-300 ${
                isSolid ? "text-[#4A2C1D] hover:text-[#C97B2A]" : "text-white hover:text-[#D9A11A]"
              }`}
            />
          </button>

          {/* Account Profile Icon */}
          <Link
            href="/account"
            aria-label="User Account"
            title={isLoggedIn ? `Dashboard (${user?.name})` : "My Account"}
            className="relative transition hover:scale-110"
          >
            <User
              size={22}
              className={`transition-colors duration-300 ${
                isSolid ? "text-[#4A2C1D] hover:text-[#C97B2A]" : "text-white hover:text-[#D9A11A]"
              }`}
            />
            {isLoggedIn && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative transition hover:scale-110"
            aria-label="Shopping Cart"
            title="View Cart"
          >
            <ShoppingCart
              size={22}
              className={`transition-colors duration-300 ${
                isSolid ? "text-[#4A2C1D] hover:text-[#C97B2A]" : "text-white hover:text-[#D9A11A]"
              }`}
            />

            <span className="absolute -right-2.5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C97B2A] text-[11px] font-bold text-white shadow">
              0
            </span>
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-[#C97B2A] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#B86A1D] hover:shadow-lg hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? (
            <X className={isSolid ? "text-[#4A2C1D]" : "text-white"} size={26} />
          ) : (
            <Menu className={isSolid ? "text-[#4A2C1D]" : "text-white"} size={26} />
          )}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="bg-white border-b border-gray-200 lg:hidden shadow-2xl animate-fade-in">
          <nav className="flex flex-col p-6 space-y-3">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-base font-bold transition ${
                    isActive
                      ? "bg-[#FFF8F2] text-[#C97B2A]"
                      : "text-[#4A2C1D] hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/account"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-[#4A2C1D] hover:bg-gray-50 transition"
              onClick={() => setMobileOpen(false)}
            >
              <User size={20} className="text-[#C97B2A]" />
              {isLoggedIn ? `My Account (${user?.name})` : "My Account"}
            </Link>

            <Link
              href="/login"
              className="mt-2 flex items-center justify-center rounded-full bg-[#C97B2A] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#B86A1D]"
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