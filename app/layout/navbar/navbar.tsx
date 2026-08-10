"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, Search, X, Sparkles } from "lucide-react";

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
          ? "bg-[#4A2C1D]/95 backdrop-blur-xl border-b border-[#D9A11A]/40 shadow-[0_10px_30px_rgba(74,44,29,0.5)] py-3"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/images/logo.JPG"
              alt="Mom&apos;s Oven"
              width={54}
              height={54}
              priority
              className="rounded-full border-2 border-[#D9A11A] object-cover ring-2 ring-[#D9A11A]/50 shadow-[0_0_15px_rgba(217,161,26,0.4)] transition group-hover:scale-105"
            />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide text-white transition group-hover:text-[#D9A11A] drop-shadow-md flex items-center gap-1.5">
              Mom&apos;s Oven
              <Sparkles size={16} className="text-[#D9A11A] animate-pulse" />
            </h1>

            <p className="text-[10px] tracking-[0.25em] uppercase text-[#D9A11A] font-extrabold drop-shadow">
              Homemade Cakes
            </p>
          </div>
        </Link>

        {/* Desktop Highlighted Pill Menu */}
        <nav className="hidden lg:flex items-center gap-2 bg-black/25 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#C97B2A] text-white shadow-md scale-105"
                    : "text-white/90 hover:bg-white/15 hover:text-[#D9A11A]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons & Highlighted Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button aria-label="Search" className="rounded-full p-2.5 text-white/90 hover:bg-white/15 hover:text-[#D9A11A] transition drop-shadow">
            <Search size={20} />
          </button>

          {/* Account Profile Icon -> Links directly to /account */}
          <Link
            href="/account"
            aria-label="User Account"
            title={isLoggedIn ? `Dashboard (${user?.name})` : "My Account"}
            className="relative rounded-full p-2.5 text-white/90 hover:bg-white/15 hover:text-[#D9A11A] transition drop-shadow"
          >
            <User size={20} />
            {isLoggedIn && (
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#4A2C1D] shadow" />
            )}
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative rounded-full p-2.5 text-white/90 hover:bg-white/15 hover:text-[#D9A11A] transition drop-shadow" aria-label="Shopping Cart" title="View Cart">
            <ShoppingCart size={20} />
            <span className="absolute -right-1 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A11A] text-[11px] font-extrabold text-white shadow-lg ring-2 ring-[#4A2C1D]">
              0
            </span>
          </Link>

          {/* Highlighted Login Button */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-gradient-to-r from-[#C97B2A] to-[#D9A11A] px-7 py-2.5 text-sm font-extrabold text-white shadow-[0_4px_15px_rgba(201,123,42,0.4)] transition duration-300 hover:from-[#D9A11A] hover:to-[#C97B2A] hover:scale-105 hover:shadow-xl"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 rounded-xl bg-white/10 backdrop-blur-sm"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="bg-[#4A2C1D] border-t border-[#D9A11A]/30 lg:hidden shadow-2xl">
          <nav className="flex flex-col p-6 space-y-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3.5 font-bold text-lg transition ${
                    isActive
                      ? "bg-[#C97B2A] text-white shadow-md"
                      : "text-white/90 hover:bg-white/10 hover:text-[#D9A11A]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/account"
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 font-bold text-white text-lg hover:bg-white/10 hover:text-[#D9A11A]"
              onClick={() => setMobileOpen(false)}
            >
              <User size={22} />
              {isLoggedIn ? `My Account (${user?.name})` : "My Account"}
            </Link>

            <Link
              href="/login"
              className="mt-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#C97B2A] to-[#D9A11A] py-3.5 text-base font-extrabold text-white shadow-lg transition hover:scale-105"
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