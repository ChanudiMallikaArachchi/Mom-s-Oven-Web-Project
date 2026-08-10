import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="py-24 text-center">

      <ShoppingCart
        size={70}
        className="mx-auto text-[#D9A11A]"
      />

      <h2 className="mt-6 text-3xl font-bold text-[#4A2C1D]">
        Your cart is empty
      </h2>

      <p className="mt-3 text-gray-500">
        Looks like you haven&apos;t added any cakes yet.
      </p>

      <Link
        href="/categories"
        className="mt-8 inline-block rounded-full bg-[#6F4422] px-8 py-3 text-white transition hover:bg-[#5A3619]"
      >
        Browse Cakes
      </Link>

    </div>
  );
}