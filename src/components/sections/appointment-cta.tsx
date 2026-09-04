"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { LuxuryButton } from "@/components/site/luxury-button";
import { WhatsAppIcon } from "@/components/site/icons";
import { EASE_EDITORIAL } from "@/components/site/motion";
import { BRAND } from "@/lib/content";

/* ---------------------------------------------------------------
   AppointmentCTA — large, visually focused conversion section.
   Full-bleed background image (cta-background.jpg) with a heavy
   navy overlay (rgba(16,35,63,0.85)) and the .grain texture
   overlay for visual continuity with the dark sections.

   Centered: eyebrow with gold rules on both sides → .display-1
   headline → supporting line → two CTAs. NO form. NO clutter.
   Subtle staggered fade-up entrance for eyebrow → headline →
   supporting → CTAs.
   --------------------------------------------------------------- */

const ease = EASE_EDITORIAL;

export function AppointmentCTA() {
  return (
    <section
      id="appointment"
      aria-label="Book a consultation at Acharya Dental"
      className="section relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[var(--navy)]"
    >
      {/* Background image */}
      <img
        src="/images/cta-background.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {/* Heavy navy overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(16,35,63,0.85)]"
      />
      {/* Grain texture (matches dark sections) */}
      <div
        aria-hidden="true"
        className="grain absolute inset-0"
      />

      <div className="container-editorial relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow — gold rules on both sides */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center justify-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]"
            />
            <span className="eyebrow eyebrow-light">Begin Your Journey</span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--gold)]"
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="display-1 mt-7 text-balance text-white"
          >
            Ready For A Healthier,
            <br className="hidden sm:block" /> More Confident Smile?
          </motion.h2>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.16 }}
            className="lead mt-7 max-w-xl text-pretty text-white/70"
          >
            Book a consultation with our specialists — in person or virtually.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <LuxuryButton
              as="link"
              href="#contact"
              variant="gold"
              size="lg"
              icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
            >
              Book Consultation
            </LuxuryButton>
            <LuxuryButton
              as="link"
              href={BRAND.whatsappHref}
              variant="light"
              size="lg"
              icon={<WhatsAppIcon className="h-4 w-4" aria-hidden="true" />}
              ariaLabel="Chat with us on WhatsApp"
            >
              WhatsApp Us
            </LuxuryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AppointmentCTA;
