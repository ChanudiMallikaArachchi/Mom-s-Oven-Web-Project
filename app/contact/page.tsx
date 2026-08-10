"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+94 77 123 4567",
      subDetails: "Mon - Sat: 8:00 AM - 7:00 PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "momsoven@gmail.com",
      subDetails: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Bakery Lane, Colombo",
      subDetails: "Sri Lanka",
    },
    {
      icon: Clock,
      title: "Baking Hours",
      details: "Everyday",
      subDetails: "Fresh batches daily from 7:00 AM",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#4A2C1D] md:text-5xl">Contact Us</h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-[#D9A11A]" />
          <p className="mt-4 text-lg text-gray-600">
            Have a custom cake request or a inquiry? We&apos;d love to hear from you!
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF8F2] text-[#D9A11A]">
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#4A2C1D]">{item.title}</h3>
                <p className="mt-1 font-semibold text-[#6F4422]">{item.details}</p>
                <p className="mt-1 text-xs text-gray-500">{item.subDetails}</p>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="mt-12 rounded-3xl bg-white p-8 shadow-xl md:p-12">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-[#4A2C1D]">Message Sent Successfully!</h2>
              <p className="mt-3 text-lg text-gray-600">
                Thank you, <span className="font-semibold text-[#4A2C1D]">{formData.name}</span>. We have received your message and will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-8 rounded-full bg-[#C97B2A] px-8 py-3.5 font-semibold text-white transition hover:bg-[#B86A1D]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-[#4A2C1D]">Send Us a Message</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A2C1D]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Custom Birthday Cake Order"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2C1D]">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your order details, date, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-3.5 focus:border-[#D9A11A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#C97B2A] py-4 text-lg font-semibold text-white shadow-md transition hover:bg-[#B86A1D] hover:shadow-lg"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
