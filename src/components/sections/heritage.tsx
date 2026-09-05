"use client";

import { RevealGroup, RevealItem, ImageReveal } from "@/components/site/motion";
import { assetPath } from "@/lib/utils";

/* ---------------------------------------------------------------
   Heritage — editorial about / legacy section.
   Two-column on desktop: editorial copy (left) + archival
   image with a refined gold corner accent (right).
   --------------------------------------------------------------- */

export function Heritage() {
  return (
    <section
      id="about"
      aria-label="Our heritage — three generations of dental care"
      className="section bg-[var(--warm-white)]"
    >
      <div className="container-editorial">
        <RevealGroup className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — editorial copy */}
          <div className="flex flex-col gap-6">
            <RevealItem className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-12 bg-gradient-to-r from-[var(--gold)] to-transparent"
              />
              <span className="eyebrow">Our Heritage</span>
            </RevealItem>

            <RevealItem>
              <h2 className="display-2 max-w-[18ch] text-balance text-[var(--navy)]">
                Three generations of trust, refined over fifty years.
              </h2>
            </RevealItem>

            <RevealItem>
              <p className="lead max-w-[52ch] text-pretty">
                Acharya Dental began as a single-chair practice in Chennai.
                Across five decades and three generations of clinicians, the
                institution has evolved from traditional dentistry into a
                modern, technology-led practice — without losing the
                patient-first principle that started it.
              </p>
            </RevealItem>

            <RevealItem>
              <p className="max-w-[52ch] text-pretty text-[var(--ink-soft)] text-base">
                Today, the clinic blends institutional experience with
                contemporary clinical capability — for families in Chennai and
                patients travelling from abroad.
              </p>
            </RevealItem>

            {/* Refined statistic with thin gold rule */}
            <RevealItem className="mt-4">
              <div className="flex items-end gap-6 border-t border-[var(--gold)]/30 pt-6">
                <span className="font-[var(--font-playfair)] text-6xl font-medium leading-none tracking-tight text-[var(--navy)] md:text-7xl">
                  50+
                </span>
                <span className="max-w-[24ch] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                  Years of continuous clinical practice
                </span>
              </div>
            </RevealItem>
          </div>

          {/* RIGHT — archival image with gold corner accent + caption */}
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
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85"
                alt="Archival clinical instruments from the early days of Acharya Dental, restored and preserved"
                className="aspect-[4/5] w-full"
              />

              {/* Caption overlay at bottom */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-[rgba(16,35,63,0.78)] via-[rgba(16,35,63,0.18)] to-transparent p-5 pt-12"
              >
                <span className="font-[var(--font-inter)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                  Archival clinical instruments, restored.
                </span>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

export default Heritage;
