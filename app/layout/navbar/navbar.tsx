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
          ? "bg-[#3D2317]/95 backdrop-blur-md shadow-2xl py-3 border-b-2 border-[#D9A11A]/40"
          : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5"
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
              className="rounded-full ring-2 ring-[#D9A11A] ring-offset-2 ring-offset-[#3D2317] object-cover shadow-lg transition group-hover:scale-105"
            />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white transition group-hover:text-[#D9A11A] drop-shadow-md tracking-tight">
              Mom&apos;s Oven
            </h1>

            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9A11A] font-extrabold drop-shadow">
              Homemade Cakes
            </p>
          </div>
        </Link>

        {/* Desktop Menu - Highlighted Pill Buttons */}
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

        {/* Right Icons & Highlighted Action Buttons */}
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
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#3D2317]" />
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative text-white hover:text-[#D9A11A] transition p-2.5 rounded-full hover:bg-white/10"
            aria-label="Shopping Cart"
            title="View Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-1 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A11A] text-xs font-black text-white shadow-lg ring-2 ring-[#3D2317]">
              0
            </span>
          </Link>

          {/* Glowing Login Button */}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-gradient-to-r from-[#D9A11A] via-[#C97B2A] to-[#B86A1D] px-7 py-2.5 text-sm font-black text-white shadow-xl transition hover:scale-105 border border-yellow-200/30 active:scale-95"
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
        <div className="bg-[#3D2317] border-t-2 border-[#D9A11A]/40 lg:hidden shadow-2xl">
          <nav className="flex flex-col p-6 space-y-3">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-2xl px-5 py-3 text.base font-bold transition ${
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
              className="flex items-center gap-3 rounded-2xl px-5 py-3 font-bold text-white text.base hover:bg-white/10 hover:text-[#D9A11A]"
              onClick={() => setMobileOpen(false)}
            >
              <User size={22} />
              {isLoggedIn ? `My Account (${user?.name})` : "My Account"}
            </Link>

            <Link
              href="/login"
              className="mt-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#D9A11A] to-[#C97B2A] py-3.5 text-base font-black text-white shadow-xl"
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