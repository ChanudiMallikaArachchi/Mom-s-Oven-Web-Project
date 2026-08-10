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
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isSolid
          ? "bg-[#4A2C1D]/95 backdrop-blur-md shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.JPG"
            alt="Mom&apos;s Oven"
            width={52}
            height={52}
            priority
            className="rounded-full border-2 border-[#D9A11A]/60 object-cover shadow-sm transition group-hover:scale-105"
          />

          <div>
            <h1 className="text-2xl font-bold text-white transition group-hover:text-[#D9A11A]">
              Mom&apos;s Oven
            </h1>

            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9A11A] font-semibold">
              Homemade Cakes
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-semibold text-white transition hover:text-[#D9A11A] ${
                pathname === item.href ? "text-[#D9A11A] font-bold border-b-2 border-[#D9A11A] pb-0.5" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons & Action Buttons */}
        <div className="hidden lg:flex items-center gap-5">
          <button aria-label="Search" className="text-white hover:text-[#D9A11A] transition p-1">
            <Search size={22} />
          </button>

          {/* Account Profile Icon -> Links directly to /account */}
          <Link
            href="/account"
            aria-label="User Account"
            title={isLoggedIn ? `Dashboard (${user?.name})` : "My Account"}
            className="relative text-white hover:text-[#D9A11A] transition p-1"
          >
            <User size={22} />
            {isLoggedIn && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#4A2C1D]" />
            )}
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative text-white hover:text-[#D9A11A] transition p-1" aria-label="Shopping Cart" title="View Cart">
            <ShoppingCart size={22} />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A11A] text-xs font-bold text-white shadow">
              0
            </span>
          </Link>

          {/* Login Button to Login Page */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-[#C97B2A] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#B86A1D] hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="bg-[#4A2C1D] border-t border-white/10 lg:hidden shadow-2xl">
          <nav className="flex flex-col p-6 space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="border-b border-white/10 py-3 text-white font-semibold transition hover:text-[#D9A11A]"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/account"
              className="flex items-center gap-3 border-b border-white/10 py-3 font-semibold text-white hover:text-[#D9A11A]"
              onClick={() => setMobileOpen(false)}
            >
              <User size={20} />
              {isLoggedIn ? `My Account (${user?.name})` : "My Account"}
            </Link>

            <Link
              href="/login"
              className="mt-4 flex items-center justify-center rounded-full bg-[#C97B2A] py-3 text-sm font-bold text-white shadow transition hover:bg-[#B86A1D]"
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