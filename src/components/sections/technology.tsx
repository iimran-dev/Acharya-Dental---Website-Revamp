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

function TechCard({ tech, isHero = false }: { tech: Tech; isHero?: boolean }) {
  return (
    <article
      className={`card-bento-dark group relative flex flex-col overflow-hidden ${
        isHero ? "lg:flex-row" : ""
      }`}
    >
      {/* Image Frame */}
      <div
        className={`relative overflow-hidden bg-[var(--navy-700)] ${
          isHero
            ? "aspect-[16/10] w-full lg:aspect-auto lg:w-1/2"
            : "aspect-[16/10] w-full"
        }`}
      >
        <img
          src={tech.image}
          alt={`${tech.name} at Acharya Dental — modern clinical technology`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 var(--ease-editorial) group-hover:scale-105"
        />
        {/* Bottom navy gradient overlay for legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/20 to-transparent"
        />
      </div>

      {/* Content panel */}
      <div
        className={`flex flex-col justify-center p-6 md:p-8 ${
          isHero ? "lg:w-1/2" : ""
        }`}
      >
        {/* Gold rule above the name */}
        <span
          aria-hidden="true"
          className="mb-4 block h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-500 var(--ease-editorial) group-hover:w-16"
        />
        <h3 className="font-[var(--font-playfair)] text-xl font-medium leading-tight text-white md:text-2xl">
          {tech.name}
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-white/80 md:text-base">
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

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:mt-18 lg:grid-cols-2">
          {TECHNOLOGY.map((t, index) => {
            const isHero = index === 0;
            return (
              <RevealItem
                key={t.name}
                className={isHero ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <TechCard tech={t} isHero={isHero} />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export default Technology;
