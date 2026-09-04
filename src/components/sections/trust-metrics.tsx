"use client";

import { RevealGroup, RevealItem } from "@/components/site/motion";
import { CountUp } from "@/components/site/count-up";
import { HERO_METRICS } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   TrustMetrics — editorial reaffirmation band on warm white.
   Quiet typography only — no cards, no color blocks.
   Navy numbers on warm white, gold rules between, breathing room.
   --------------------------------------------------------------- */

type Metric = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

export function TrustMetrics() {
  return (
    <section
      aria-label="Acharya Dental — clinical record at a glance"
      className="border-b border-border bg-[var(--warm-white)] py-16 md:py-20"
    >
      <div className="container-wide">
        {/* Supporting eyebrow line */}
        <RevealGroup className="mb-12 md:mb-16">
          <RevealItem className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--gold)]"
            />
            <span className="eyebrow">A Record Built Over Generations</span>
            <span className="hidden h-px flex-1 bg-border sm:block" />
          </RevealItem>
        </RevealGroup>

        {/* Metrics — navy numbers, gold vertical rules, breathing room */}
        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-0"
          delay={0.1}
        >
          {HERO_METRICS.map((m, i) => (
            <RevealItem
              key={m.label}
              className={cn(
                "flex flex-col gap-3 md:px-10 md:first:pl-0",
                i > 0 && "md:border-l md:border-[var(--gold)]/30",
              )}
            >
              <div
                aria-label={`${m.label}: ${m.value}${m.suffix}`}
                className="flex flex-col gap-3"
              >
                <span className="font-[var(--font-playfair)] text-5xl font-medium leading-none tracking-tight text-[var(--navy)] md:text-6xl">
                  <CountUp
                    value={m.value}
                    decimals={m.decimals ?? 0}
                    suffix={m.suffix}
                    duration={1600}
                  />
                </span>
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                  {m.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default TrustMetrics;
