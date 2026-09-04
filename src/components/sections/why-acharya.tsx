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

        {/* Four feature blocks — vertical dividers on lg+, horizontal on mobile.
            Padding + first/last variants live on the grid children (RevealItems)
            so the first/last truly target the first/last column. */}
        <RevealGroup
          className="mt-16 grid grid-cols-1 divide-y divide-white/15 lg:mt-20 lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:divide-white/15"
        >
          {WHY_ACHARYA.map((f) => (
            <RevealItem
              key={f.number}
              className="px-1 py-10 first:pt-0 last:pb-0 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0"
            >
              <FeatureBlock feature={f} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default WhyAcharya;
