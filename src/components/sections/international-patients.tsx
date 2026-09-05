"use client";

import { Plane, Hotel, CalendarClock, Video, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  RevealGroup,
  RevealItem,
  ImageReveal,
} from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { LuxuryButton } from "@/components/site/luxury-button";
import { INTERNATIONAL_FEATURES } from "@/lib/content";
import { assetPath } from "@/lib/utils";

/* ---------------------------------------------------------------
   InternationalPatients — luxury medical concierge service.
   Two-column on desktop:
     LEFT  — SectionHeading + a 2x2 airy feature grid (no heavy
             card chrome, just a top hairline rule for editorial
             rhythm) + a primary "Plan your visit" LuxuryButton.
     RIGHT — a single tall premium lifestyle image in aspect-[4/5]
             framed by the same L-shaped gold corner accents used
             in heritage.tsx, with a navy-scrim caption overlay
             ("Concierge support, end to end"). The single-image
             collage option was chosen over a stacked pair because
             it reads more refined and editorial.

   Visual language inherited from Tasks 4-a / 4-b:
     • warm-white section background
     • gold-rule eyebrow pattern (handled by SectionHeading)
     • .display-2 navy heading
     • thin gold OUTLINE lucide icons (strokeWidth 1.5,
       text-[var(--gold)]) — same restraint as the WhyAcharya icons
     • L-shaped gold corner accents on the image — matches heritage.tsx
     • navy-scrim caption overlay — matches heritage.tsx
   --------------------------------------------------------------- */

/* Map content icon names → lucide-react components */
const ICONS: Record<string, LucideIcon> = {
  Plane,
  Hotel,
  CalendarClock,
  Video,
};

type Feature = (typeof INTERNATIONAL_FEATURES)[number];

function FeatureBlock({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon] ?? Plane;

  return (
    <div className="border-t border-[var(--border)] pt-5">
      {/* Gold outline icon — elegant, thin stroke, no badge */}
      <Icon
        className="h-7 w-7 text-[var(--gold)]"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="mt-4 font-[var(--font-inter)] text-base font-medium leading-snug text-[var(--navy)]">
        {feature.title}
      </h3>
      <p className="mt-2 text-pretty text-[0.875rem] leading-[1.6] text-[var(--ink-soft)]">
        {feature.description}
      </p>
    </div>
  );
}

export function InternationalPatients() {
  return (
    <section
      id="international"
      aria-label="International patients — concierge care for patients travelling from abroad"
      className="section bg-[var(--warm-white)]"
    >
      <div className="container-editorial">
        <RevealGroup className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — heading + 2x2 features + CTA */}
          <div>
            <SectionHeading
              eyebrow="INTERNATIONAL PATIENTS"
              title="Concierge care, for patients travelling from abroad."
              lead="From the moment you land in Chennai to the day you leave, our team handles the logistics so you can focus on your treatment and recovery."
            />

            {/* 2x2 airy feature grid (sm+) */}
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {INTERNATIONAL_FEATURES.map((f) => (
                <RevealItem key={f.title}>
                  <FeatureBlock feature={f} />
                </RevealItem>
              ))}
            </div>

            {/* CTA */}
            <RevealItem className="mt-12">
              <LuxuryButton
                as="link"
                href="#contact"
                variant="primary"
                size="md"
                iconRight={
                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                }
              >
                Plan your visit
              </LuxuryButton>
            </RevealItem>
          </div>

          {/* RIGHT — single premium image, gold corner accent + caption */}
          <RevealItem className="relative">
            <div className="relative">
              {/* L-shaped gold corner accents (top-left + bottom-right) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-2 z-10 h-10 w-10 border-l border-t border-[var(--gold)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -right-2 z-10 h-10 w-10 border-b border-r border-[var(--gold)]"
              />

              <ImageReveal
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                alt="A concierge coordinator assisting an international dental patient with travel and accommodation arrangements at Acharya Dental"
                className="aspect-[4/5] w-full"
              />

              {/* Caption overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-[rgba(16,35,63,0.78)] via-[rgba(16,35,63,0.18)] to-transparent p-5 pt-12"
              >
                <span className="font-[var(--font-inter)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                  Concierge support, end to end
                </span>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

export default InternationalPatients;
