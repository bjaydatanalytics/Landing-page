import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden rounded-lg bg-[var(--brand-dark)] shadow-[0_24px_70px_rgba(6,8,33,0.18)]">
          <Image
            src="/images/innersolv-about.jpg"
            alt="About Innersolv brand statement"
            width={936}
            height={936}
            className="h-auto w-full"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue)]">
            About Brand
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[var(--brand-dark)] sm:text-5xl">
            Building positive mindsets and globally relevant brands.
          </h2>
          <p className="mt-6 text-base leading-8 text-black/70 sm:text-lg">
            Innersolv is a personal brand that specializes in innovating minds
            and brands, positioning them and getting them set for global
            relevance.
          </p>
          <p className="mt-5 text-base leading-8 text-black/70 sm:text-lg">
            Being in the fore-front of the industry, the brand is devoted to
            helping individuals, personal brands, startup brands and businesses
            build relevance and develop positive mindsets towards their
            endeavours and pursuits.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Innovative minds", "Brand positioning", "Global relevance", "Positive growth"].map((item) => (
              <div key={item} className="border-l-2 border-[var(--brand-cyan)] bg-white px-4 py-3 shadow-sm">
                <p className="font-semibold text-[var(--brand-dark)]">{item}</p>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] px-7 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(8,120,245,0.22)] transition hover:scale-[1.02]"
          >
            Work With Innersolv
          </a>
        </div>
      </div>
    </section>
  );
}
