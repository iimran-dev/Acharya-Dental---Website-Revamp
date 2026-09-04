# Task 4-c — Section Builder (SmileGallery / InternationalPatients / ClinicExperience)

Mirror of the record appended to `/home/z/my-project/worklog.md` for Task ID 4-c.

## Files produced
1. `/home/z/my-project/src/components/sections/smile-gallery.tsx` → `SmileGallery`
2. `/home/z/my-project/src/components/sections/international-patients.tsx` → `InternationalPatients`
3. `/home/z/my-project/src/components/sections/clinic-experience.tsx` → `ClinicExperience`

## Verification
- `bun run lint` → zero errors, zero warnings.
- `dev.log` shows clean compiles (only the pre-existing `themeColor` warning from `layout.tsx`).
- All required images already exist in `/public/images/` (no new generation needed).

## Inherited visual language
- Gold-rule eyebrow pattern via `SectionHeading` (matches Tasks 4-a / 4-b).
- `.display-2` navy headings on warm-white sections; `.display-2` white on the navy band.
- Reveal / RevealGroup / RevealItem stagger pattern from `motion.tsx`.
- Card hover register: image scale 1.03x on hover, gold accent, subtle elevation.
- Navy band treatment (`.bg-navy-gradient` + `.grain` + `relative z-10`) reused for ClinicExperience, matching WhyAcharya.
- L-shaped gold corner accents on the international-patients image, matching Heritage.
- Navy-scrim caption overlays with uppercase tracked white/85 text, matching Heritage.
- `.link-gold` "Read patient story →" affordance pattern, matching the "Explore treatment →" pattern in Treatments.
- Modal: gold accent strip at top + Playfair DialogTitle + 14px gold rule + sr-only DialogDescription + gold eyebrow section labels — same register as the Treatments modal.

## Key decisions
- **SmileGallery**: kept the per-case `CASE_TEASERS` map inside the component (instead of reusing the modal's `story` or `treatment`) so the modal reveals something the reader hasn't already seen.
- **SmileGallery**: `aspect-[4/3]` for the BeforeAfterSlider — clinical mouth photography reads better in a slightly wider frame than square.
- **InternationalPatients**: chose the single-large-image collage option over the stacked-pair — the L-shaped gold corner accents (matching Heritage) plus a single caption overlay reads more refined and editorial.
- **ClinicExperience**: dark navy band (not warm-white) so the warm photography pops against the dark background like a gallery wall — matches the WhyAcharya navy band treatment.
- **ClinicExperience parallax**: `-inset-y-[14%]` wrapper gives ~50px slack on each side of a 363px-tall (lg) image, comfortably covering the ±20px parallax range without ever exposing the container edges. Range kept to 40px total per the brief's "restrained, not aggressive" guidance.
- **ClinicExperience reduced-motion**: hooks (`useScroll`, `useTransform`, `useReducedMotion`) are called unconditionally (Rules of Hooks). The MotionValue is computed on every render but only applied to the DOM when `prefersReduced` is falsy. When reduced motion is preferred, the image renders with the entrance reveal only — no parallax wrapper. This avoids the "stuck parallax value" edge case that would occur if we tried to switch a MotionValue's output range after the user has already scrolled.
- **ClinicExperience label overlay**: sits OUTSIDE the parallax layer so it stays anchored to the container (the image moves, the label doesn't). Thin gold rule (`h-px w-8 bg-[var(--gold)]`) precedes the label — matches the gold-rule pattern used throughout the site.
