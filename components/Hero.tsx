import Image from "next/image";

export default function Hero() {
  return (
    <section className="brand-bg brand-pattern relative min-h-[92vh] overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,39,0.58),rgba(7,8,39,0.22)_52%,rgba(7,8,39,0.38))]" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
              Innovating minds and brands
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              Position your mind and brand for global relevance.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
              Innersolv is a personal brand devoted to helping individuals,
              personal brands, startup brands, and businesses build relevance,
              develop positive mindsets, and move with purpose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] px-7 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(4,199,244,0.24)] transition hover:scale-[1.02]"
              >
                Start a Conversation
              </a>
              <a
                href="#about"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                About Innersolv
              </a>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/18 pt-6 text-sm">
              <div>
                <dt className="text-2xl font-semibold text-[var(--brand-cyan)]">01</dt>
                <dd className="mt-1 text-white/70">Mindset</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold text-[var(--brand-purple)]">02</dt>
                <dd className="mt-1 text-white/70">Positioning</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold text-[var(--brand-magenta)]">03</dt>
                <dd className="mt-1 text-white/70">Relevance</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute -inset-4 rounded-[34px] bg-[linear-gradient(135deg,rgba(4,199,244,0.5),rgba(36,48,168,0.34),rgba(180,35,138,0.42))] blur-xl" />
            <div className="glass-panel relative overflow-hidden rounded-[28px] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[var(--brand-navy)]">
                <Image
                  src="/images/image.png"
                  alt="Founder of Innersolv"
                  fill
                  priority
                  sizes="(min-width: 1024px) 430px, 92vw"
                  className="object-cover object-[center_24%]"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/14 bg-[rgba(7,8,39,0.72)] p-4 backdrop-blur-md">
                <p className="text-lg font-extrabold">Innersolv.</p>
                <p className="mt-1 text-sm leading-6 text-white/72">
                  Innovating minds and brands for global relevance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
