"use client";

import { RevealGroup, RevealItem } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { TECHNOLOGY } from "@/lib/content";

/* ---------------------------------------------------------------
   Technology — sophisticated DARK section.
   Same navy band treatment as WhyAcharya / ClinicExperience
   (.bg-navy-gradient + .grain + relative + overflow-hidden).

   Balanced 2x2 grid of four technology cards. Each card:
     • dark image on top (aspect-[16/10]) with a navy gradient
       overlay at the bottom for legibility
     • content area on a slightly lighter navy panel
       (rgba(255,255,255,0.04) bg, white/10 border, backdrop-blur-sm)
     • a thin gold rule above the name
     • name (Playfair white) + description (white/80)

   Hover: image scales 1.05x, gold rule expands, border shifts to gold/45.
   Communicates precision, confidence, modern clinical excellence.
   --------------------------------------------------------------- */

type Tech = (typeof TECHNOLOGY)[number];

function TechCard({ tech }: { tech: Tech }) {
  return (
    <article className="card-bento-dark group relative flex h-full flex-col overflow-hidden">
      {/* Image Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--navy-700)]">
        <img
          src={tech.image}
          alt={`${tech.name} at Acharya Dental — modern clinical technology`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        {/* Bottom navy gradient overlay for legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/20 to-transparent"
        />
      </div>

      {/* Content panel */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          {/* Gold rule above the name */}
          <span
            aria-hidden="true"
            className="mb-4 block h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16"
          />
          <h3 className="font-[var(--font-playfair)] text-xl font-medium leading-tight text-white md:text-2xl">
            {tech.name}
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/80 md:text-base">
            {tech.description}
          </p>
        </div>
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

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-18 lg:gap-10">
          {TECHNOLOGY.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <TechCard tech={t} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default Technology;
