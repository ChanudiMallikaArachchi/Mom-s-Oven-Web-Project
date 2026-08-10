import Link from "next/link";

export default function OrderSummary() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <h2 className="mb-6 text-2xl font-bold text-[#4A2C1D]">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. 4,500</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs. 500</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-[#6F4422]">
            Rs. 5,000
          </span>
        </div>

      </div>

      <Link
        href="/checkout"
        className="mt-8 block w-full rounded-full bg-[#6F4422] py-4 text-center font-semibold text-white transition hover:bg-[#5A3619]"
      >
        Proceed to Checkout
      </Link>

    </div>
  );
}