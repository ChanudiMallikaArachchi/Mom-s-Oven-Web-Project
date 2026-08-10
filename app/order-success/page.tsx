import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={48} />
        </div>

        <h1 className="mt-6 text-4xl font-bold text-[#4A2C1D]">Order Placed Successfully!</h1>
        <p className="mt-3 text-lg text-gray-600">
          Thank you for ordering from Mom&apos;s Oven. We have received your order and our bakers are preparing it with care.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/track-order"
            className="rounded-full bg-[#C97B2A] px-8 py-3.5 font-semibold text-white transition hover:bg-[#B86A1D]"
          >
            Track Order
          </Link>
          <Link
            href="/categories"
            className="rounded-full border border-[#4A2C1D] px-8 py-3.5 font-semibold text-[#4A2C1D] transition hover:bg-[#4A2C1D] hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
