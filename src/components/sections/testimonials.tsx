"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { BRAND, TESTIMONIALS } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------------------------------------------------------------
   Testimonials — spacious carousel (one testimonial at a time).
   Warm-white background, two-column layout on desktop:
     • LEFT: patient portrait (aspect-[4/5]) with the L-shaped
       gold corner accents used in Heritage/International.
     • RIGHT: quote + attribution + Google rating + video CTA.

   Auto-slides every 5s. PAUSE on interaction (control click,
   dot click, hover on desktop) and resume after 8s of
   inactivity — the brief allowed either "stay paused" or
   "resume after inactivity"; resume-after-inactivity keeps
   the carousel alive for browsing visitors without being
   aggressive. Transition: 600ms fade + slight slide (no bounce).
   --------------------------------------------------------------- */

type Testimonial = (typeof TESTIMONIALS)[number];

const AUTOPLAY_MS = 5000;
const RESUME_MS = 8000;
const TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function GoogleRatingBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5"
      aria-label={`${BRAND.rating} out of 5 ${BRAND.ratingPlatform}`}
    >
      {/* Google "G" — restrained monochrome mark */}
      <span
        aria-hidden="true"
        className="grid h-4 w-4 place-items-center rounded-full bg-[var(--navy)] font-[var(--font-inter)] text-[0.62rem] font-bold text-white"
      >
        G
      </span>
      <span className="font-[var(--font-inter)] text-[0.72rem] font-semibold tracking-[-0.005em] text-[var(--ink)]">
        {BRAND.rating}
      </span>
      <span
        aria-hidden="true"
        className="flex items-center"
      >
        <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" strokeWidth={0} />
      </span>
      <span className="font-[var(--font-inter)] text-[0.72rem] font-medium text-[var(--ink-muted)]">
        {BRAND.ratingPlatform}
      </span>
    </div>
  );
}

function VideoTestimonialDialog({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group/v inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/[0.06] px-4 py-2 font-[var(--font-inter)] text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--navy)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)]/15"
          aria-label={`Watch ${testimonial.name}'s video testimonial`}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--gold)] text-[var(--navy)] transition-transform duration-300 group-hover/v:scale-105">
            <Play className="h-3 w-3 fill-[var(--navy)]" strokeWidth={0} aria-hidden="true" />
          </span>
          Watch video
        </button>
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden border-[var(--gold)]/25 bg-[var(--navy)] p-0 sm:max-w-[640px]"
      >
        {/* Gold accent strip */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold)]/40 to-transparent"
        />
        <DialogTitle className="sr-only">
          {testimonial.name} — video testimonial
        </DialogTitle>
        <DialogDescription className="sr-only">
          A short video testimonial from {testimonial.name}, {testimonial.context}.
        </DialogDescription>

        {/* Video placeholder — patient portrait as backdrop with a navy scrim */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={testimonial.image}
            alt={`${testimonial.name}, ${testimonial.context}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {/* Heavy navy scrim for the placeholder */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[rgba(11,27,48,0.92)] via-[rgba(11,27,48,0.55)] to-[rgba(11,27,48,0.25)]"
          />
          {/* Centered play affordance */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <span
                aria-hidden="true"
                className="grid h-16 w-16 place-items-center rounded-full border border-[var(--gold)]/70 text-[var(--gold)] backdrop-blur-sm transition-transform duration-500"
              >
                <Play className="h-6 w-6 fill-[var(--gold)]" strokeWidth={0} />
              </span>
              <span className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                Video testimonial — preview
              </span>
            </div>
          </div>
          {/* Patient caption at the bottom */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
            <p className="font-[var(--font-playfair)] text-lg text-white">
              {testimonial.name}
            </p>
            <p className="mt-1 font-[var(--font-inter)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold-soft)]">
              {testimonial.context}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ActiveTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      {/* LEFT — patient portrait with gold corner accents */}
      <div className="relative">
        {/* L-shaped gold corner accents (matches Heritage/International) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -top-2 z-10 h-10 w-10 border-l border-t border-[var(--gold)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 -right-2 z-10 h-10 w-10 border-b border-r border-[var(--gold)]"
        />
        <div className="image-frame aspect-[4/5] w-full bg-[var(--light-gray)]">
          <img
            key={testimonial.image}
            src={testimonial.image}
            alt={`Portrait of ${testimonial.name}, ${testimonial.context}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT — quote + attribution */}
      <div className="flex flex-col justify-center">
        {/* Large gold quote mark — Playfair, restrained opacity */}
        <span
          aria-hidden="true"
          className="font-[var(--font-playfair)] text-7xl leading-none text-[var(--gold)]/50"
        >
          &ldquo;
        </span>

        {/* Quote */}
        <blockquote
          className="display-3 mt-3 text-pretty text-[var(--ink)] leading-[1.35]"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
        >
          {testimonial.quote}
        </blockquote>

        {/* Attribution + rating */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--gold)]/25 pt-6">
          <div>
            <p className="font-[var(--font-playfair)] text-xl font-medium text-[var(--navy)]">
              {testimonial.name}
            </p>
            <p className="mt-1.5 font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              {testimonial.context}
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < testimonial.rating
                      ? "h-4 w-4 fill-[var(--gold)] text-[var(--gold)]"
                      : "h-4 w-4 text-[var(--ink-muted)]/30"
                  }
                  strokeWidth={0}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">{testimonial.rating} out of 5 stars</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            {testimonial.hasVideo && (
              <VideoTestimonialDialog testimonial={testimonial} />
            )}
            <GoogleRatingBadge />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const lastInteractionRef = React.useRef<number>(0);

  const count = TESTIMONIALS.length;
  const go = React.useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );
  const next = React.useCallback(() => go(index + 1), [go, index]);
  const prev = React.useCallback(() => go(index - 1), [go, index]);

  const markInteraction = React.useCallback(() => {
    lastInteractionRef.current = Date.now();
    setIsPaused(true);
  }, []);

  // Autoplay — pause on interaction, resume after RESUME_MS of inactivity
  React.useEffect(() => {
    if (isPaused) {
      const t = window.setInterval(() => {
        if (Date.now() - lastInteractionRef.current >= RESUME_MS) {
          setIsPaused(false);
        }
      }, 1000);
      return () => window.clearInterval(t);
    }
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [isPaused, count]);

  // Keyboard nav for the carousel region
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      markInteraction();
      prev();
    } else if (e.key === "ArrowRight") {
      markInteraction();
      next();
    }
  };

  const active = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-label="Patient testimonials — stories from Acharya Dental patients"
      className="section bg-warm-gradient"
    >
      <div className="container-editorial">
        <SectionHeading
          eyebrow="PATIENT STORIES"
          title="Trusted by families across Chennai — and beyond."
          lead="Real experiences from patients who entrusted us with their care."
        />

        <Reveal>
          <div
            className="mt-16 lg:mt-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={TRANSITION}
              >
                <ActiveTestimonial testimonial={active} />
              </motion.div>
            </AnimatePresence>

            {/* Controls + dots */}
            <div className="mt-12 flex items-center justify-between gap-6 border-t border-[var(--border)] pt-6">
              {/* Prev / Next */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    markInteraction();
                    prev();
                  }}
                  aria-label="Previous testimonial"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[var(--gold)]/50 text-[var(--navy)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    markInteraction();
                    next();
                  }}
                  aria-label="Next testimonial"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[var(--gold)]/50 text-[var(--navy)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2.5">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => {
                      markInteraction();
                      go(i);
                    }}
                    aria-label={`Go to testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                    aria-current={i === index ? "true" : undefined}
                    className={
                      i === index
                        ? "h-2 w-8 rounded-full bg-[var(--gold)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        : "h-2 w-2 rounded-full bg-[var(--ink-muted)]/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--gold)]/60"
                    }
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="hidden items-baseline gap-1.5 font-[var(--font-inter)] text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)] sm:flex">
                <span className="text-[var(--navy)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true">/</span>
                <span>{String(TESTIMONIALS.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Testimonials;
