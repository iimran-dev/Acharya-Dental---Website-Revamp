"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Calendar } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuxuryButton } from "@/components/site/luxury-button";
import { WhatsAppIcon } from "@/components/site/icons";
import { EASE_EDITORIAL } from "@/components/site/motion";
import { NAV_LINKS, BRAND } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   Navbar — transparent over hero, transitions to solid navy on
   scroll. Sticky. Mobile menu via shadcn Sheet (right side).
   --------------------------------------------------------------- */

const SCROLL_THRESHOLD = 80;

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="grid h-8 w-8 place-items-center border border-[var(--gold)]/60 text-[var(--gold)] font-[var(--font-playfair)] text-sm leading-none"
    >
      A
    </span>
  );
}

function Wordmark({ scrolled }: { scrolled: boolean }) {
  return (
    <Link
      href="#top"
      aria-label="Acharya Dental — back to top"
      className={cn(
        "group inline-flex items-center gap-3 rounded-md transition-opacity",
      )}
    >
      <Monogram />
      <span
        className={cn(
          "font-[var(--font-playfair)] tracking-[0.28em] text-white transition-all duration-500",
          scrolled
            ? "text-[0.78rem] sm:text-[0.82rem]"
            : "text-[0.82rem] sm:text-[0.88rem]",
        )}
      >
        ACHARYA DENTAL
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-9">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="link-gold text-[0.78rem] font-medium uppercase tracking-[0.18em] text-white/85 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DesktopActions() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <a
        href={BRAND.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
      >
        <WhatsAppIcon className="h-4 w-4" />
      </a>
      <LuxuryButton
        as="link"
        href="#contact"
        variant="gold"
        size="sm"
        icon={<Calendar className="h-3.5 w-3.5" aria-hidden="true" />}
      >
        Book Appointment
      </LuxuryButton>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[88vw] max-w-sm border-l-0 bg-[var(--navy)] text-white sm:max-w-sm"
        >
          {/* Hide the default top-right X to use our own refined close */}
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col px-6 pb-10 pt-8">
            {/* Top: wordmark + close */}
            <div className="flex items-center justify-between">
              <span className="font-[var(--font-playfair)] text-sm tracking-[0.28em] text-white">
                ACHARYA DENTAL
              </span>
              <SheetClose
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  &times;
                </span>
              </SheetClose>
            </div>

            {/* Gold rule */}
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold)]/30 to-transparent" />

            {/* Nav links — stacked, refined */}
            <nav aria-label="Mobile primary" className="mt-8 flex-1">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: EASE_EDITORIAL,
                        delay: 0.08 * i,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 font-[var(--font-playfair)] text-2xl text-white/90 transition-colors hover:text-[var(--gold-soft)]"
                      >
                        <span className="mr-3 text-[0.7rem] text-[var(--gold)]/60">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTAs at bottom */}
            <div className="mt-auto flex flex-col gap-3">
              <LuxuryButton
                as="link"
                href="#contact"
                variant="gold"
                size="md"
                fullWidth
                icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
                onClick={() => setOpen(false)}
              >
                Book Appointment
              </LuxuryButton>
              <LuxuryButton
                as="link"
                href={BRAND.whatsappHref}
                variant="light"
                size="md"
                fullWidth
                icon={<WhatsAppIcon className="h-4 w-4" aria-hidden="true" />}
                onClick={() => setOpen(false)}
                ariaLabel="Chat on WhatsApp"
              >
                WhatsApp Now
              </LuxuryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll(); // initialize on mount (e.g., if page loads scrolled)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(16, 35, 63, 0.96)"
          : "rgba(16, 35, 63, 0)",
        boxShadow: scrolled
          ? "0 10px 30px -20px rgba(0,0,0,0.55)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
      className="fixed inset-x-0 top-0 z-50"
      aria-label="Site header"
    >
      {/* Subtle bottom hairline when scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Wordmark scrolled={scrolled} />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <DesktopActions />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
