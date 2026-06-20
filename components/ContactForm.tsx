"use client";

import { FormEvent, useState } from "react";
import SocialLinks from "@/components/SocialLinks";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(form)),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Please check your details and try again.");
      return;
    }

    window.location.href = "/thank-you";
  }

  return (
    <section id="contact" className="bg-[linear-gradient(180deg,#eef6ff_0%,#f8fbff_100%)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue)]">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[var(--brand-dark)] sm:text-5xl">
            Ready to build relevance with Innersolv?
          </h2>
          <p className="mt-6 leading-8 text-black/70">
            Share a few details about your mind, brand, startup, or business
            goal and we will follow up with the best next step.
          </p>
          <div className="mt-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black/50">
              Connect With Us
            </p>
            <SocialLinks className="mt-4 text-[var(--brand-blue)]" />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-lg border border-[#dfe8ff] bg-white p-5 shadow-[0_22px_60px_rgba(8,120,245,0.12)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="fullName"
              required
              placeholder="Full Name"
              className="min-h-12 w-full rounded-md border border-black/15 px-4 outline-none transition focus:border-[var(--brand-blue)]"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="min-h-12 w-full rounded-md border border-black/15 px-4 outline-none transition focus:border-[var(--brand-blue)]"
            />
            <input
              name="phone"
              required
              placeholder="Phone"
              className="min-h-12 w-full rounded-md border border-black/15 px-4 outline-none transition focus:border-[var(--brand-blue)]"
            />
            <select
              name="serviceInterest"
              required
              defaultValue=""
              className="min-h-12 w-full rounded-md border border-black/15 bg-white px-4 outline-none transition focus:border-[var(--brand-blue)]"
            >
              <option value="" disabled>
                Service Interest
              </option>
              <option>Mind Innovation</option>
              <option>Brand Positioning</option>
              <option>Global Relevance</option>
            </select>
          </div>

          <textarea
            name="message"
            required
            minLength={10}
            placeholder="Message"
            rows={5}
            className="mt-4 w-full resize-y rounded-md border border-black/15 px-4 py-3 outline-none transition focus:border-[var(--brand-blue)]"
          />

          <input name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

          <button
            disabled={loading}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] px-7 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(8,120,245,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
