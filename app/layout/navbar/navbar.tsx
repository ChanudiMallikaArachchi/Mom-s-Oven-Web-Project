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
          ? "bg-[#4A2C1D]/60 backdrop-blur-lg border-b border-white/10 shadow-lg py-3"
          : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5"
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
            className="rounded-full border-2 border-[#D9A11A] object-cover shadow-md transition group-hover:scale-105"
          />

          <div>
            <h1 className="text-2xl font-bold text-white transition group-hover:text-[#D9A11A] drop-shadow-md">
              Mom&apos;s Oven
            </h1>

            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9A11A] font-bold drop-shadow">
              Homemade Cakes
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#D9A11A] text-white shadow-lg scale-105"
                    : "text-white hover:bg-white/15 hover:text-[#D9A11A]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons & Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button aria-label="Search" className="text-white hover:text-[#D9A11A] transition p-2.5 rounded-full hover:bg-white/10">
            <Search size={20} />
          </button>

          {/* Account Profile Icon -> Links directly to /account */}
          <Link
            href="/account"
            aria-label="User Account"
            title={isLoggedIn ? `Dashboard (${user?.name})` : "My Account"}
            className="relative text-white hover:text-[#D9A11A] transition p-2.5 rounded-full hover:bg-white/10"
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
            className="relative text-white hover:text-[#D9A11A] transition p-2.5 rounded-full hover:bg-white/10"
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-1 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A11A] text-xs font-bold text-white shadow-md">
              0
            </span>
          </Link>

          {/* Transparent Gradient Login Button */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-gradient-to-r from-[#D9A11A] to-[#C97B2A] px-7 py-2.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-105 border border-white/20 active:scale-95"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 rounded-xl bg-white/10 hover:bg-white/20"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="bg-[#4A2C1D]/90 backdrop-blur-xl border-t border-white/10 lg:hidden shadow-2xl">
          <nav className="flex flex-col p-6 space-y-3">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-2xl px-5 py-3 text-base font-bold transition ${
                    isActive
                      ? "bg-[#D9A11A] text-white shadow-md"
                      : "text-white hover:bg-white/10 hover:text-[#D9A11A]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/account"
              className="flex items-center gap-3 rounded-2xl px-5 py-3 font-bold text-white text-base hover:bg-white/10 hover:text-[#D9A11A]"
              onClick={() => setMobileOpen(false)}
            >
              <User size={22} />
              {isLoggedIn ? `My Account (${user?.name})` : "My Account"}
            </Link>

            <Link
              href="/login"
              className="mt-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#D9A11A] to-[#C97B2A] py-3.5 text-base font-extrabold text-white shadow-lg"
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