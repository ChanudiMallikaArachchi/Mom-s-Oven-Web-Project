"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FFF8F2] px-6 text-center pt-28 pb-24">
      <h2 className="text-3xl font-bold text-[#4A2C1D]">Oops! Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-600">
        We couldn&apos;t load this page properly. Please try again.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full bg-[#C97B2A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B86A1D]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
