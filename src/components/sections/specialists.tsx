"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { SPECIALISTS } from "@/lib/content";

/* ---------------------------------------------------------------
   Specialists — editorial / magazine-style team showcase.
   Four large portrait cards (4:5) on warm-white. NO circular
   avatars, minimal chrome. Hover: image scales 1.03x, a thin
   gold rule slides in under the name, and a small gold "+"
   fades in over the image corner.
   --------------------------------------------------------------- */

type Specialist = (typeof SPECIALISTS)[number];

function SpecialistCard({ specialist }: { specialist: Specialist }) {
  const [imgSrc, setImgSrc] = React.useState(specialist.image);

  return (
    <article className="group">
      {/* Portrait */}
      <div className="relative overflow-hidden rounded-lg bg-[var(--light-gray)] shadow-[0_0_0_rgba(16,35,63,0)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_12px_30px_-20px_rgba(16,35,63,0.25)]">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={`${specialist.name} — ${specialist.specialization}`}
            loading="lazy"
            decoding="async"
            onError={() => {
              setImgSrc("https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=85");
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>

        {/* Subtle navy scrim at the bottom for depth (very light) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Gold "+" affordance — fades in on hover, top-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 scale-90 items-center justify-center rounded-full border border-[var(--gold)]/70 bg-white/5 text-[var(--gold)] opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-6 pr-2">
        {/* Small gold eyebrow — specialization */}
        <p className="eyebrow mb-2 text-[0.66rem]">{specialist.specialization}</p>

        {/* Name — with thin gold rule that slides in on hover */}
        <div className="relative">
          <h3 className="font-[var(--font-playfair)] text-xl font-medium leading-tight text-[var(--navy)] md:text-2xl">
            {specialist.name}
          </h3>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 block h-px w-0 bg-[var(--gold)] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-10"
          />
        </div>

        {/* Qualification */}
        <p className="mt-4 text-[0.86rem] leading-relaxed text-[var(--ink-soft)]">
          {specialist.qualification}
        </p>

        {/* Experience in gold-soft */}
        <p className="mt-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--gold-soft)]">
          {specialist.experience}
        </p>
      </div>
    </article>
  );
}

export function Specialists() {
  return (
    <section
      id="specialists"
      aria-label="Meet our specialists"
      className="section bg-[var(--warm-white)]"
    >
      <div className="container-editorial">
        {/* Heading */}
        <SectionHeading
          eyebrow="MEET OUR SPECIALISTS"
          title="A team built for complex, considered care."
          lead="Each specialist brings deep training in their discipline, and a shared commitment to clinical precision and patient comfort."
        />

        {/* Grid of 4 specialists */}
        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7"
        >
          {SPECIALISTS.map((s) => (
            <RevealItem key={s.name}>
              <SpecialistCard specialist={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default Specialists;
