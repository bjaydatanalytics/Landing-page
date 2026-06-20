import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="brand-bg brand-pattern relative grid min-h-screen place-items-center overflow-hidden px-4 text-center text-white">
      <div className="glass-panel relative max-w-lg rounded-2xl p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
          Innersolv.
        </p>
        <h1 className="mt-4 text-4xl font-extrabold">Thank you!</h1>
        <p className="mt-4 leading-7 text-white/72">
          We have received your inquiry and will contact you shortly.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] px-7 text-sm font-semibold text-white"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
