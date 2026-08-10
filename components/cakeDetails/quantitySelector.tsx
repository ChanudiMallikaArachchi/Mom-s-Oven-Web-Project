"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  onQuantityChange?: (quantity: number) => void;
}

export default function QuantitySelector({
  min = 1,
  max = 10,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(min);

  const increase = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const decrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-[#4A2C1A]">
        Quantity
      </h3>

      <div className="flex w-fit items-center rounded-xl border border-gray-300 bg-white shadow-sm">
        <button
          onClick={decrease}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
        >
          <Minus size={18} />
        </button>

        <span className="w-14 text-center text-lg font-semibold">
          {quantity}
        </span>

        <button
          onClick={increase}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}