export default function Services() {
  const services = [
    {
      title: "Mind Innovation",
      description:
        "Develop positive mindsets, clarity, and confidence for purposeful growth.",
    },
    {
      title: "Brand Positioning",
      description:
        "Shape personal, startup, and business brands for stronger relevance.",
    },
    {
      title: "Global Relevance",
      description:
        "Prepare ideas, stories, and offers to connect beyond local boundaries.",
    },
  ];

  return (
    <section id="services" className="brand-bg brand-pattern relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[rgba(7,8,39,0.36)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            Strategy for minds, brands, and meaningful influence.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-panel rounded-lg p-6 transition hover:-translate-y-1 hover:bg-white/[0.12]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] text-lg font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
              <p className="mt-4 leading-7 text-white/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
