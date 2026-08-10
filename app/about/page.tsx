export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl font-bold text-[#4A2C1D] md:text-5xl">About Mom&apos;s Oven</h1>
        <div className="mx-auto mt-4 h-1 w-20 rounded bg-[#D9A11A]" />
        
        <p className="mt-8 text-lg text-gray-700 leading-relaxed">
          Welcome to Mom&apos;s Oven! We are dedicated to bringing you the finest, handcrafted cakes made with pure love and premium ingredients. Every slice tells a story of tradition, warmth, and irresistible flavors.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="text-3xl font-bold text-[#D9A11A]">100%</div>
            <div className="mt-2 font-semibold text-[#4A2C1D]">Fresh Ingredients</div>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="text-3xl font-bold text-[#D9A11A]">Handcrafted</div>
            <div className="mt-2 font-semibold text-[#4A2C1D]">Made with Love</div>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="text-3xl font-bold text-[#D9A11A]">Fast</div>
            <div className="mt-2 font-semibold text-[#4A2C1D]">Doorstep Delivery</div>
          </div>
        </div>
      </div>
    </main>
  );
}
