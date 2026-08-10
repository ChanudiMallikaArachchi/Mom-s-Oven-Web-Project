"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF8F2] px-6 text-center">
          <h2 className="text-3xl font-bold text-[#4A2C1D]">Something went wrong!</h2>
          <p className="mt-2 text-sm text-gray-600">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 rounded-full bg-[#C97B2A] px-6 py-3 font-semibold text-white transition hover:bg-[#B86A1D]"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
