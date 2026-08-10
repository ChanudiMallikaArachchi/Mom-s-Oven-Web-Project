import CartItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/orderSummary";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">

      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-center text-5xl font-bold text-[#4A2C1D]">
          Shopping Cart
        </h1>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          <div className="space-y-6">
            <CartItem />
            <CartItem />
          </div>

          <OrderSummary />

        </div>

      </div>

    </main>
  );
}