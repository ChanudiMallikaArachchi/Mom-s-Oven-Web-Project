"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  onClick?: () => void;
}

export default function AddToCartButton({
  onClick,
}: AddToCartButtonProps) {
  return (
    <Link
      href="/cart"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        bg-[#C97B2A]
        px-6
        py-4
        text-lg
        font-semibold
        text-white
        shadow-lg
        transition
        duration-300
        hover:bg-[#B86A1D]
        hover:shadow-xl
      "
    >
      <ShoppingCart size={22} />
      Add to Cart
    </Link>
  );
}