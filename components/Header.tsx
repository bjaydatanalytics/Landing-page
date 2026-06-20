import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(7,8,39,0.82)] text-white shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="relative block h-11 w-36 overflow-hidden rounded-full border border-white/10 bg-[var(--brand-dark)] shadow-[0_0_24px_rgba(180,35,138,0.22)] sm:w-44"
          aria-label="Innersolv home"
        >
          <Image
            src="/images/innersolv-logo.jpeg"
            alt="Innersolv logo"
            fill
            priority
            sizes="(min-width: 640px) 176px, 144px"
            className="object-cover object-center"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="#" className="transition hover:text-[var(--brand-blue)]">
            Home
          </a>
          <a href="#about" className="transition hover:text-[var(--brand-blue)]">
            About
          </a>
          <a href="#services" className="transition hover:text-[var(--brand-blue)]">
            Services
          </a>
          <a href="#testimonials" className="transition hover:text-[var(--brand-blue)]">
            Impact
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/8 px-5 py-2 transition hover:border-transparent hover:bg-[var(--brand-cyan)] hover:text-[var(--brand-dark)]"
          >
            Contact Us
          </a>
        </nav>

        <details className="group relative md:hidden">
          <summary
            aria-label="Toggle menu"
            className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-1 rounded-full border border-white/25 marker:hidden"
          >
            <span className="h-0.5 w-4 rounded-full bg-white" />
            <span className="h-0.5 w-4 rounded-full bg-white" />
            <span className="h-0.5 w-4 rounded-full bg-white" />
          </summary>
          <nav className="absolute right-0 mt-3 grid w-56 gap-1 rounded-lg border border-white/15 bg-[var(--brand-dark)] p-3 text-sm shadow-xl">
            <a href="#" className="rounded-md px-3 py-2 hover:bg-white/10">
              Home
            </a>
            <a href="#about" className="rounded-md px-3 py-2 hover:bg-white/10">
              About
            </a>
            <a href="#services" className="rounded-md px-3 py-2 hover:bg-white/10">
              Services
            </a>
            <a href="#testimonials" className="rounded-md px-3 py-2 hover:bg-white/10">
              Impact
            </a>
            <a
              href="#contact"
              className="mt-1 rounded-md bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] px-3 py-2 text-center font-semibold text-white"
            >
              Contact Us
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
