"use client";

import { RevealGroup, RevealItem } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { TECHNOLOGY } from "@/lib/content";

/* ---------------------------------------------------------------
   Technology — sophisticated DARK section.
   Same navy band treatment as WhyAcharya / ClinicExperience
   (.bg-navy-gradient + .grain + relative + overflow-hidden).

   2-col grid of four "tech cards". Each card:
     • dark image on top (aspect-[16/10]) with a navy gradient
       overlay at the bottom for legibility
     • content area on a slightly lighter navy panel
       (rgba(255,255,255,0.04) bg, white/10 border, very
       subtle backdrop-blur-sm — minimal glassmorphism)
     • a thin gold rule above the name
     • name (Playfair white) + description (white/60, small)

   Hover: image scales 1.03x, border shifts to gold/30, a very
   subtle controlled gold/10 glow shadow. NO neon, NO sci-fi.
   Communicates precision, confidence, modern clinical excellence.
   --------------------------------------------------------------- */

type Tech = (typeof TECHNOLOGY)[number];

function TechCard({ tech }: { tech: Tech }) {
  return (
    <article
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--gold)]/30 hover:shadow-[0_24px_60px_-30px_rgba(200,161,90,0.18)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--navy-700)]">
        <img
          src={tech.image}
          alt={`${tech.name} at Acharya Dental — modern clinical technology`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        {/* Bottom navy gradient overlay for legibility (decorative) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(11,27,48,0.65)] via-[rgba(11,27,48,0.18)] to-transparent"
        />
      </div>

      {/* Content panel — minimal glassmorphism */}
      <div className="p-6 md:p-7">
        {/* Gold rule above the name */}
        <span
          aria-hidden="true"
          className="mb-4 block h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16"
        />
        <h3 className="font-[var(--font-playfair)] text-xl font-medium leading-tight text-white md:text-2xl">
          {tech.name}
        </h3>
        <p className="mt-3 text-pretty text-[0.92rem] leading-[1.65] text-white/75">
          {tech.description}
        </p>
      </div>
    </article>
  );
}

export function Technology() {
  return (
    <section
      id="technology"
      aria-label="Advanced technology — digital tools behind Acharya Dental's clinical planning"
      className="section relative overflow-hidden bg-navy-gradient grain"
    >
      <div className="container-editorial relative z-10">
        <SectionHeading
          eyebrow="ADVANCED TECHNOLOGY"
          title="Precision you can see, planning you can trust."
          lead="Modern dentistry is a planning discipline. These are the tools we use to plan it."
          tone="light"
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-2">
          {TECHNOLOGY.map((t) => (
            <RevealItem key={t.name}>
              <TechCard tech={t} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default Technology;
