"use client";

import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { LuxuryButton } from "@/components/site/luxury-button";
import { TREATMENTS } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------------------------------------------------------------
   TreatmentShowcase — four signature treatments in large,
   image-led cards. Each card opens an accessible shadcn Dialog
   with an extended (non-medical-claim) description of the
   approach, a gold rule, and a "Book Consultation" CTA.

   Hover: image scales 1.03x, card lifts 4px, border accent
   shifts to gold/40, very small shadow. NO flip cards.
   --------------------------------------------------------------- */

/* Extended approach copy — kept to ~2-3 sentences, no medical claims */
const LONG_DESCRIPTIONS: Record<string, string> = {
  "Dental Implants":
    "Every implant case begins with 3D imaging and digital planning to map bone, nerve and sinus anatomy before any procedure is scheduled. The surgical and restorative phases are sequenced around your healing, and the final crown is designed to match your natural dentition. The aim is a stable, considered outcome — not a quick fix.",
  "Smile Makeover":
    "We start with facial proportions, lip line and bite, then build a digital smile design you can preview before any treatment begins. Veneers, whitening and contouring are sequenced around your comfort and timeline. The result should look like your own smile — refined, not replaced.",
  "Full Mouth Rehabilitation":
    "Complex, worn or compromised dentitions are approached as one coordinated plan — not a series of isolated fixes. Diagnostic wax-ups and digital planning guide the sequence, so each stage protects what the last one built. The aim is functional stability that lasts for years, not months.",
  Orthodontics:
    "Aligner and fixed-appliance plans are designed digitally, with progress tracked in software rather than guesswork. We treat adults, teens and children, with the approach and timing tailored to dental development. Treatment plans are reviewed with you at every stage.",
};

type Treatment = (typeof TREATMENTS)[number];

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const longDescription =
    LONG_DESCRIPTIONS[treatment.name] ?? treatment.description;

  return (
    <Dialog>
      <RevealItem>
        <article
          className="group overflow-hidden rounded-lg border border-transparent bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-[0_18px_48px_-24px_rgba(16,35,63,0.18)]"
        >
          {/* Image */}
          <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--light-gray)]">
            <img
              src={treatment.image}
              alt={`${treatment.name} — Acharya Dental signature treatment`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </div>

          {/* Caption */}
          <div className="p-6 md:p-7">
            <h3 className="font-[var(--font-playfair)] text-2xl font-medium leading-tight text-[var(--navy)]">
              {treatment.name}
            </h3>
            <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
              {treatment.description}
            </p>

            {/* Trigger — opens the Dialog */}
            <DialogTrigger asChild>
              <button
                type="button"
                className="link-gold group/btn mt-6 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--navy)]"
              >
                Explore treatment
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
                  strokeWidth={1.5}
                />
              </button>
            </DialogTrigger>
          </div>
        </article>
      </RevealItem>

      {/* Modal — accessible (Esc, focus trap handled by Radix) */}
      <DialogContent
        className="overflow-hidden border-[var(--gold)]/25 bg-white p-0 sm:max-w-[560px]"
      >
        {/* Thin gold accent strip at the top of the modal */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold)]/40 to-transparent"
        />
        <div className="px-7 pb-8 pt-7 md:px-9 md:pb-9 md:pt-9">
          <DialogTitle asChild>
            <h2 className="font-[var(--font-playfair)] text-3xl font-medium leading-tight text-[var(--navy)] md:text-[2.1rem]">
              {treatment.name}
            </h2>
          </DialogTitle>

          <span
            aria-hidden="true"
            className="mt-5 mb-6 block h-px w-14 bg-gradient-to-r from-[var(--gold)] to-transparent"
          />

          {/* Visually-hidden description for screen readers (required by Radix aria-describedby) */}
          <DialogDescription className="sr-only">
            Approach to {treatment.name} at Acharya Dental.
          </DialogDescription>

          <p className="text-pretty text-[1rem] leading-[1.7] text-[var(--ink-soft)]">
            {longDescription}
          </p>

          <div className="mt-8">
            <LuxuryButton
              as="link"
              href="#contact"
              variant="gold"
              size="md"
              iconRight={
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              }
            >
              Book Consultation
            </LuxuryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TreatmentShowcase() {
  return (
    <section
      id="treatments"
      aria-label="Signature treatments"
      className="section bg-[var(--warm-white)]"
    >
      <div className="container-editorial">
        {/* Heading */}
        <SectionHeading
          eyebrow="SIGNATURE TREATMENTS"
          title="Considered treatment, designed around your outcome."
          lead="From single implants to comprehensive rehabilitation, every treatment begins with digital planning and ends with a result you can trust."
        />

        {/* Grid — 2 columns on md+, 1 on mobile */}
        <RevealGroup className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {TREATMENTS.map((t) => (
            <TreatmentCard key={t.name} treatment={t} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default TreatmentShowcase;
