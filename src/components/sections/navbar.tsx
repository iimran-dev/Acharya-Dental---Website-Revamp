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
   Navbar — light luxury theme. Warm white / white glassmorphism
   with deep navy typography, gold monogram, and sticky header.
   --------------------------------------------------------------- */

const SCROLL_THRESHOLD = 80;

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="grid h-8 w-8 place-items-center rounded-md border border-[var(--gold)] bg-[var(--navy)] text-[var(--gold)] font-[var(--font-playfair)] text-sm font-semibold leading-none shadow-sm"
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
          "font-[var(--font-playfair)] tracking-[0.28em] font-semibold text-[var(--navy)] transition-all duration-500",
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

function DesktopNav({ activeId }: { activeId: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-7 xl:gap-9">
        {NAV_LINKS.map((link) => {
          const targetId = link.href.replace("#", "");
          const isActive = activeId === targetId;

          return (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "relative py-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                  isActive
                    ? "text-[var(--gold)] font-bold"
                    : "text-[var(--navy)] hover:text-[var(--gold)]",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-x-0 -bottom-1 h-[2px] bg-[var(--gold)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          );
        })}
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
        className="grid h-10 w-10 place-items-center rounded-full border border-[var(--navy)]/20 text-[var(--navy)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)]"
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

function MobileMenu({ activeId }: { activeId: string }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }, 150);
    }
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--navy)]/20 text-[var(--navy)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[88vw] max-w-sm border-l border-[var(--border)] bg-[var(--warm-white)] text-[var(--navy)] sm:max-w-sm"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col px-6 pb-10 pt-8">
            {/* Top: wordmark + close */}
            <div className="flex items-center justify-between">
              <span className="font-[var(--font-playfair)] text-sm font-semibold tracking-[0.28em] text-[var(--navy)]">
                ACHARYA DENTAL
              </span>
              <SheetClose
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--navy)]/20 text-[var(--navy)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  &times;
                </span>
              </SheetClose>
            </div>

            {/* Gold rule */}
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold)]/30 to-transparent" />

            {/* Nav links */}
            <nav aria-label="Mobile primary" className="mt-8 flex-1">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const targetId = link.href.replace("#", "");
                  const isActive = activeId === targetId;

                  return (
                    <li key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE_EDITORIAL,
                          delay: 0.06 * i,
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleClick(e, link.href)}
                          className={cn(
                            "flex items-center justify-between py-3 font-[var(--font-playfair)] text-xl font-medium transition-colors",
                            isActive
                              ? "text-[var(--gold)] font-semibold"
                              : "text-[var(--navy)] hover:text-[var(--gold)]",
                          )}
                        >
                          <div>
                            <span className="mr-3 text-[0.7rem] font-semibold text-[var(--gold)]">
                              0{i + 1}
                            </span>
                            {link.label}
                          </div>
                          {isActive && (
                            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                          )}
                        </a>
                      </motion.div>
                    </li>
                  );
                })}
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
                variant="primary"
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
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(248, 248, 246, 0.92)",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled
          ? "0 10px 30px -15px rgba(16, 35, 63, 0.12)"
          : "0 2px 10px -5px rgba(16, 35, 63, 0.05)",
      }}
      transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]"
      aria-label="Site header"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Wordmark scrolled={scrolled} />
        <DesktopNav activeId={activeId} />
        <div className="flex items-center gap-3">
          <DesktopActions />
          <MobileMenu activeId={activeId} />
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
