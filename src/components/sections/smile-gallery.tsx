"use client";

import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { BeforeAfterSlider } from "@/components/site/before-after-slider";
import { SMILE_CASES } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------------------------------------------------------------
   SmileGallery — premium clinical before/after experience.
   Two cases in a 2-col grid on lg+, each with a draggable
   BeforeAfterSlider and a "Read patient story" trigger that opens
   an accessible shadcn Dialog showing the patient story, the
   treatment performed, and the outcome.

   Visual language inherited from Tasks 4-a / 4-b:
     • warm-white section background
     • gold-rule eyebrow pattern (handled by SectionHeading)
     • .display-2 navy heading
     • .link-gold "Read patient story →" affordance (matches the
       "Explore treatment →" pattern used in treatments.tsx)
     • modal: gold accent strip at the top, Playfair DialogTitle,
       14px gold rule, sr-only DialogDescription, gold eyebrow
       labels above each section — same register as the
       treatment modal.
   --------------------------------------------------------------- */

/* Short editorial teaser line under each case title. Distinct
   from the modal's full story, so the modal reveals something new. */
const CASE_TEASERS: Record<string, string> = {
  "case-1":
    "Worn and uneven enamel, restored conservatively with porcelain veneers.",
  "case-2":
    "Anterior spaces and discoloration, addressed without orthodontics.",
};

type SmileCase = (typeof SMILE_CASES)[number];

function SmileCaseCard({ caseItem }: { caseItem: SmileCase }) {
  const teaser = CASE_TEASERS[caseItem.id] ?? caseItem.treatment;

  return (
    <Dialog>
      <RevealItem>
        <article className="group">
          {/* Before / after comparison slider (keyboard accessible) */}
          <div className="relative overflow-hidden rounded-lg shadow-[0_18px_48px_-30px_rgba(16,35,63,0.35)]">
            <BeforeAfterSlider
              beforeSrc={caseItem.before}
              afterSrc={caseItem.after}
              beforeAlt={`${caseItem.title} — before treatment, clinical close-up`}
              afterAlt={`${caseItem.title} — after treatment, clinical close-up`}
              className="aspect-[4/3] w-full"
            />
          </div>

          {/* Caption */}
          <div className="mt-6">
            <h3 className="font-[var(--font-playfair)] text-2xl font-medium leading-tight text-[var(--navy)]">
              {caseItem.title}
            </h3>

            <span
              aria-hidden="true"
              className="mt-4 mb-3 block h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent"
            />

            <p className="max-w-[42ch] text-pretty text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
              {teaser}
            </p>

            {/* Trigger — opens the patient-story Dialog */}
            <DialogTrigger asChild>
              <button
                type="button"
                className="link-gold group/btn mt-5 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--navy)]"
              >
                Read patient story
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </DialogTrigger>
          </div>
        </article>
      </RevealItem>

      {/* Modal — accessible (Esc, focus trap handled by Radix) */}
      <DialogContent className="overflow-hidden border-[var(--gold)]/25 bg-white p-0 sm:max-w-[560px]">
        {/* Thin gold accent strip at the top of the modal */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold)]/40 to-transparent"
        />
        <div className="px-7 pb-8 pt-7 md:px-9 md:pb-9 md:pt-9">
          <DialogTitle asChild>
            <h2 className="font-[var(--font-playfair)] text-3xl font-medium leading-tight text-[var(--navy)] md:text-[2.1rem]">
              {caseItem.title}
            </h2>
          </DialogTitle>

          <span
            aria-hidden="true"
            className="mt-5 mb-6 block h-px w-14 bg-gradient-to-r from-[var(--gold)] to-transparent"
          />

          {/* Visually-hidden description for screen readers (required by Radix aria-describedby) */}
          <DialogDescription className="sr-only">
            Patient story, treatment performed and outcome for{" "}
            {caseItem.title}.
          </DialogDescription>

          {/* Three editorial blocks: The Patient · Treatment · Outcome */}
          <div className="space-y-6">
            <section>
              <h3 className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                The Patient
              </h3>
              <p className="mt-2 text-pretty text-[0.95rem] leading-[1.7] text-[var(--ink-soft)]">
                {caseItem.story}
              </p>
            </section>

            <section>
              <h3 className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                Treatment Performed
              </h3>
              <p className="mt-2 text-pretty text-[0.95rem] leading-[1.7] text-[var(--ink-soft)]">
                {caseItem.treatment}
              </p>
            </section>

            <section>
              <h3 className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                Outcome
              </h3>
              <p className="mt-2 text-pretty text-[0.95rem] leading-[1.7] text-[var(--ink-soft)]">
                {caseItem.outcome}
              </p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SmileGallery() {
  return (
    <section
      id="gallery"
      aria-label="Smile transformations — before and after clinical results"
      className="section bg-[var(--warm-white)]"
    >
      <div className="container-editorial">
        <SectionHeading
          eyebrow="SMILE TRANSFORMATIONS"
          title="Real results, considered and conservative."
          lead="Drag the handle to compare before and after. Each case is planned digitally and executed conservatively."
        />

        {/* Two-case grid — staggered entrance via RevealGroup */}
        <RevealGroup className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {SMILE_CASES.map((c) => (
            <SmileCaseCard key={c.id} caseItem={c} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default SmileGallery;
