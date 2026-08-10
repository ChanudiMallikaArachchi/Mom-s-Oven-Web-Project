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
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/images/logo.JPG"
            alt="Mom&apos;s Oven"
            width={55}
            height={55}
            priority
          />

          <div>
            <h1
              className={`text-2xl font-bold transition ${
                isSolid ? "text-[#6F4422]" : "text-white"
              }`}
            >
              Mom&apos;s Oven
            </h1>

            <p
              className={`text-xs tracking-[0.3em] uppercase transition ${
                isSolid ? "text-[#D9A11A]" : "text-yellow-300"
              }`}
            >
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
              className={`font-medium transition hover:text-[#D9A11A] ${
                isSolid ? "text-[#6F4422]" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Right Icons */}

        <div className="hidden lg:flex items-center gap-5">

          <button aria-label="Search">
            <Search
              className={isSolid ? "text-[#6F4422]" : "text-white"}
            />
          </button>

          <Link
            href={isLoggedIn ? "/account" : "/login"}
            aria-label="Account Login"
            title={isLoggedIn ? `Dashboard (${user?.name})` : "Login / Account"}
            className="relative"
          >
            <User
              className={`transition hover:text-[#D9A11A] ${
                isSolid ? "text-[#6F4422]" : "text-white"
              }`}
            />
            {isLoggedIn && (
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            )}
          </Link>

          <Link href="/cart" className="relative" aria-label="Shopping Cart" title="View Cart">

            <ShoppingCart
              className={`transition hover:text-[#D9A11A] ${
                isSolid ? "text-[#6F4422]" : "text-white"
              }`}
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A11A] text-xs text-white">
              0
            </span>

          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? (
            <X className={isSolid ? "text-[#6F4422]" : "text-white"} />
          ) : (
            <Menu className={isSolid ? "text-[#6F4422]" : "text-white"} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="bg-white lg:hidden shadow-xl">

          <nav className="flex flex-col p-6">

            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="border-b py-4 text-[#6F4422] font-medium transition hover:text-[#D9A11A]"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href={isLoggedIn ? "/account" : "/login"}
              className="flex items-center gap-3 pt-4 font-semibold text-[#C97B2A]"
              onClick={() => setMobileOpen(false)}
            >
              <User size={20} />
              {isLoggedIn ? `Dashboard (${user?.name})` : "Login / Account"}
            </Link>

          </nav>

        </div>
      )}
    </header>
  );
}