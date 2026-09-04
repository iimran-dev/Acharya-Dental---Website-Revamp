"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { RevealGroup, RevealItem, EASE_EDITORIAL } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { CLINIC_GALLERY } from "@/lib/content";

/* ---------------------------------------------------------------
   ClinicExperience — cinematic full-width photography section.
   Dark navy band (.bg-navy-gradient + .grain) so the warm clinic
   photography glows against the dark background like a gallery
   wall — matches the WhyAcharya navy band treatment from Task 4-b.

   Two large images in a 2-col grid (lg:grid-cols-2 gap-6). Each
   image has:
     • an entrance reveal (opacity 0→1, scale 1.08→1) — same easing
       as ImageReveal, so the initial reveal matches the rest of the
       site.
     • a subtle parallax: framer-motion's useScroll + useTransform
       translate the image Y by -20px → +20px as the section scrolls
       through view. RESTRAINED (small range, 40px total) — the brief
       says "restrained, not aggressive".
     • the parallax layer is an oversized wrapper (-inset-y-[14%])
       so the image always covers the container at any translate.
     • prefers-reduced-motion guard: when reduced motion is
       preferred, we render the entrance-revealed image WITHOUT the
       parallax wrapper (no y transform). Hooks are called
       unconditionally so the Rules of Hooks are respected; the
       parallax MotionValue is computed but only applied to the DOM
       on the non-reduced branch.
     • a small label overlay at the bottom-left (the gallery item's
       label, e.g. "Reception"), uppercase tracked white/90 text
       preceded by a thin gold rule. The label sits OUTSIDE the
       parallax layer so it stays anchored to the container.
   --------------------------------------------------------------- */

type GalleryItem = (typeof CLINIC_GALLERY)[number];

function ParallaxImage({ item }: { item: GalleryItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  /* Hooks are called unconditionally (Rules of Hooks). The parallax
     MotionValue is computed on every render but only applied to
     the DOM when prefersReduced is falsy. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const revealTransition = {
    duration: 1.1,
    ease: EASE_EDITORIAL,
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[var(--navy-700)]"
    >
      {prefersReduced ? (
        /* Reduced-motion path: entrance reveal only, no parallax. */
        <motion.img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={revealTransition}
        />
      ) : (
        /* Parallax path: oversized wrapper translates Y based on
           scroll position; the image inside handles the entrance. */
        <motion.div
          style={{ y }}
          className="absolute -inset-y-[14%] inset-x-0"
        >
          <motion.img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={revealTransition}
          />
        </motion.div>
      )}

      {/* Label overlay — sits above the parallax layer, stays put. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-[rgba(11,27,48,0.85)] via-[rgba(11,27,48,0.18)] to-transparent px-5 pb-5 pt-12"
      >
        <span className="h-px w-8 bg-[var(--gold)]" />
        <span className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/90">
          {item.label}
        </span>
      </div>
    </div>
  );
}

export function ClinicExperience() {
  return (
    <section
      id="clinic"
      aria-label="The Acharya Dental clinic — designed for calm, equipped for precision"
      className="section relative overflow-hidden bg-navy-gradient grain"
    >
      <div className="container-editorial relative z-10">
        {/* Light-tone heading for the dark background */}
        <SectionHeading
          eyebrow="THE CLINIC"
          title="The environment is part of the patient experience."
          lead="Designed for calm, equipped for precision — every space in the clinic is considered."
          tone="light"
        />

        {/* Two-image grid — staggered entrance via RevealGroup */}
        <RevealGroup className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
          {CLINIC_GALLERY.map((item) => (
            <RevealItem key={item.label}>
              <ParallaxImage item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default ClinicExperience;
