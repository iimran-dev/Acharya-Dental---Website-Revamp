"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { LuxuryButton } from "@/components/site/luxury-button";
import { WhatsAppIcon } from "@/components/site/icons";
import { EASE_EDITORIAL } from "@/components/site/motion";
import { BRAND } from "@/lib/content";

/* ---------------------------------------------------------------
   MobileStickyCTA — sticky bottom bar, MOBILE ONLY (md:hidden).
   Fixed to bottom. White background with a soft top shadow + a
   1px top border. Respects the iOS safe area via
   env(safe-area-inset-bottom).

   Appears only after the user scrolls past the hero
   (scrollY > innerHeight * 0.8). Hides when the #contact section
   is in view (so it doesn't cover the booking form).

   One useEffect combines a scroll listener (for the hero-passed
   flag) with an IntersectionObserver (for the contact-in-view
   flag). visible = scrolledPastHero && !contactInView.
   AnimatePresence + a y:100% -> 0 slide-up animation handles
   enter/exit. 400ms, EASE_EDITORIAL — restrained.

   NOTE: this bar is fixed-position on mobile only. Because it
   overlaps content, the page (or the orchestrator) should add
   bottom padding to the body on mobile so the sticky bar never
   covers the very last line of content (e.g. footer bottom bar).
   This bar handles its own safe-area padding so its own height is
   predictable; a 96px spacer on mobile (md:hidden) is
   recommended in page.tsx.
   --------------------------------------------------------------- */

const ease = EASE_EDITORIAL;

export function MobileStickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Skip everything on desktop — bar is hidden via md:hidden,
    // but we also short-circuit so the listeners don't run.
    if (window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    let scrolledPastHero = false;
    let contactInView = false;

    const compute = () => setVisible(scrolledPastHero && !contactInView);

    const onScroll = () => {
      scrolledPastHero = window.scrollY > window.innerHeight * 0.8;
      compute();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contactEl = document.getElementById("contact");
    let observer: IntersectionObserver | null = null;
    if (contactEl) {
      observer = new IntersectionObserver(
        (entries) => {
          // Hide the sticky bar whenever ANY part of the contact
          // section is visible in the viewport — the user is at the
          // form, so the duplicate CTAs are redundant and would
          // overlap the form fields.
          contactInView = entries[0]?.isIntersecting ?? false;
          compute();
        },
        { threshold: 0, rootMargin: "0px 0px -60% 0px" },
      );
      observer.observe(contactEl);
    }

    // If the viewport crosses the md breakpoint, hide the bar
    // and stop tracking (listeners will be re-attached on the
    // next mount if the user shrinks back below md).
    const mq = window.matchMedia("(min-width: 768px)");
    const onBreak = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setVisible(false);
      }
    };
    mq.addEventListener("change", onBreak);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      mq.removeEventListener("change", onBreak);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-sticky-cta"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white shadow-[0_-8px_24px_-12px_rgba(16,35,63,0.18)] md:hidden"
          role="region"
          aria-label="Quick actions"
        >
          <div
            className="flex items-center gap-3 px-4 pt-3"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
          >
            <LuxuryButton
              as="link"
              href="#contact"
              variant="gold"
              size="md"
              fullWidth
              icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
              ariaLabel="Book appointment"
            >
              Book Appointment
            </LuxuryButton>
            <LuxuryButton
              as="link"
              href={BRAND.whatsappHref}
              variant="whatsapp"
              size="md"
              fullWidth
              icon={<WhatsAppIcon className="h-4 w-4" aria-hidden="true" />}
              ariaLabel="Chat with us on WhatsApp"
            >
              WhatsApp
            </LuxuryButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileStickyCTA;
