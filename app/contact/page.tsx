export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-center text-4xl font-bold text-[#4A2C1D] md:text-5xl">Contact Us</h1>
        <div className="mx-auto mt-4 h-1 w-20 rounded bg-[#D9A11A]" />
        
        <p className="mt-4 text-center text-lg text-gray-600">
          Have a custom request or question? We&apos;d love to hear from you!
        </p>

        <form className="mt-12 rounded-2xl bg-white p-8 shadow-md space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#4A2C1D]">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A2C1D]">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A2C1D]">Message</label>
            <textarea
              rows={4}
              placeholder="Tell us about your order or inquiry..."
              className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-[#C97B2A] py-4 text-lg font-semibold text-white transition hover:bg-[#B86A1D]"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
