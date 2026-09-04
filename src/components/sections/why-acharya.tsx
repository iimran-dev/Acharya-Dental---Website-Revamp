"use client";

import { Award, Globe2, ScanLine, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { WHY_ACHARYA } from "@/lib/content";

/* ---------------------------------------------------------------
   WhyAcharya — full-width dark navy luxury band.
   Four simple feature blocks with elegant gold OUTLINE icons and
   large "01–04" Playfair numerals (white/15, decorative).
   Vertical gold/white-10 dividers between columns on lg+,
   horizontal rules on mobile. Subtle fade-up reveal on scroll.
   NO excessive motion.
   --------------------------------------------------------------- */

/* Map content icon names → lucide-react components */
const ICONS: Record<string, LucideIcon> = {
  Award,
  Globe2,
  ScanLine,
  ShieldCheck,
};

type Feature = (typeof WHY_ACHARYA)[number];

function FeatureBlock({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon] ?? Award;

  return (
    <>
      {/* Decorative large ordinal — sits beside the icon, very subtle */}
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="font-[var(--font-playfair)] text-5xl font-medium leading-none text-white/25 md:text-6xl"
        >
          {feature.number}
        </span>

        {/* Gold outline icon — elegant, thin stroke, no badge */}
        <Icon
          className="h-11 w-11 text-[var(--gold)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="mt-7 font-[var(--font-inter)] text-lg font-medium tracking-[-0.005em] text-white md:text-xl">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-[0.92rem] leading-[1.65] text-pretty text-white/75">
        {feature.description}
      </p>
    </>
  );
}

export function WhyAcharya() {
  return (
    <section
      id="why-acharya"
      aria-label="Why Acharya Dental — institutional experience and modern clinical precision"
      className="section relative overflow-hidden bg-navy-gradient grain"
    >
      <div className="container-editorial relative z-10">
        {/* Heading — light tone for dark bg */}
        <SectionHeading
          eyebrow="WHY ACHARYA DENTAL"
          title="Where institutional experience meets modern clinical precision."
          lead="Four reasons patients trust us with their care — and with the care of their families."
          tone="light"
        />

        {/* Bento Grid — 1 dominant span-2 hero feature + 3 single-span features */}
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:mt-18 lg:grid-cols-3">
          {WHY_ACHARYA.map((f, i) => {
            const isHero = i === 0;
            const Icon = ICONS[f.icon] ?? Award;

            return (
              <RevealItem
                key={f.number}
                className={isHero ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <div
                  className={`card-bento-dark group relative flex h-full flex-col justify-between overflow-hidden p-8 md:p-10 ${
                    isHero ? "border-[var(--gold)]/30 bg-navy-700/60" : ""
                  }`}
                >
                  {/* Background glow accent for hero card */}
                  {isHero && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--gold)]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}

                  {/* Card Header: Ordinal + Icon */}
                  <div className="flex items-center justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="font-[var(--font-playfair)] text-5xl font-semibold leading-none text-white/30 transition-colors duration-300 group-hover:text-[var(--gold-soft)] md:text-6xl"
                    >
                      {f.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--gold)]/30 bg-[var(--navy)]/60 text-[var(--gold)] shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--gold)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 mt-8">
                    <h3 className="font-[var(--font-playfair)] text-xl font-medium tracking-tight text-white md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-pretty text-white/80 md:text-base">
                      {f.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export default WhyAcharya;
