"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote:
        "Innersolv helped me find clearer language for my brand and the confidence to show up with more direction.",
      name: "Personal Brand Client",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "The process gave our startup a stronger sense of relevance, purpose, and the message we needed to communicate.",
      name: "Startup Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "I came in with scattered ideas and left with a positive mindset, practical next steps, and a clearer path forward.",
      name: "Growth Client",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      quote:
        "My ideas finally felt organized. I understood what my brand should stand for and how to communicate it.",
      name: "Creative Founder",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      quote:
        "The guidance helped me see my work differently and take action with more courage and consistency.",
      name: "Emerging Leader",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  function scrollTestimonials(direction: "left" | "right") {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const distance = scroller.clientWidth;

    scroller.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const interval = window.setInterval(() => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const isAtEnd = scroller.scrollLeft >= maxScrollLeft - 8;

      if (isAtEnd) {
        scroller.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      scroller.scrollBy({
        left: scroller.clientWidth,
        behavior: "smooth",
      });
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="brand-bg brand-pattern relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,8,39,0.36),rgba(36,48,168,0.16),rgba(180,35,138,0.22))]" />
      <div className="absolute right-8 top-5 hidden text-8xl font-serif leading-none text-white/26 sm:block">
        S
      </div>

      <div className="relative mx-auto max-w-7xl text-center">
        <h2 className="font-serif text-3xl uppercase tracking-[0.18em] text-white sm:text-4xl">
          Testimonials
        </h2>

        <div className="mt-14 grid grid-cols-1 items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => scrollTestimonials("left")}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/8 text-xl font-bold text-white transition hover:bg-white/14 sm:flex"
          >
            <span aria-hidden="true">&lt;</span>
          </button>

          <div
            ref={scrollerRef}
            tabIndex={0}
            aria-label="Scrollable testimonials"
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-8 pt-10 sm:gap-6 sm:px-2 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                style={{ animationDelay: `${index * 120}ms` }}
                className={`testimonial-card relative min-h-[230px] w-[88vw] max-w-[360px] shrink-0 snap-center border border-white/12 bg-white/95 px-5 pb-6 pt-14 text-[var(--text-dark)] shadow-[0_18px_45px_rgba(7,8,39,0.18)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(7,8,39,0.28)] sm:w-[340px] sm:px-6 lg:w-[calc((100%-4rem)/3)] lg:max-w-none ${
                  index % 2 === 1 ? "sm:mt-6" : ""
                }`}
              >
                <div className="testimonial-avatar absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_10px_24px_rgba(7,8,39,0.25)]">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} avatar`}
                    fill
                    sizes="80px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[13px] italic leading-7 text-black/72 sm:text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-[var(--brand-purple)]">
                  {testimonial.name}
                </p>
              </article>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => scrollTestimonials("right")}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/8 text-xl font-bold text-white transition hover:bg-white/14 sm:flex"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => scrollTestimonials("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/8 text-xl font-bold text-white"
          >
            <span aria-hidden="true">&lt;</span>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => scrollTestimonials("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/8 text-xl font-bold text-white"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-white/70">
          Swipe, use your trackpad, or press the arrow buttons to scroll.
        </p>

        <div className="mt-8 flex justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
        </div>
      </div>
    </section>
  );
}
