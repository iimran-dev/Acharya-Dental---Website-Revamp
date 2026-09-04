"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { LuxuryButton } from "@/components/site/luxury-button";
import { WhatsAppIcon } from "@/components/site/icons";
import { CountUp } from "@/components/site/count-up";
import { EASE_EDITORIAL } from "@/components/site/motion";
import { BRAND, HERO_METRICS } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   Hero — full-screen cinematic editorial hero.
   Subtle slow zoom on bg image, staggered fade-up content,
   CountUp trust metrics row, scroll indicator.
   --------------------------------------------------------------- */

type Metric = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EDITORIAL },
  },
};

function MetricNumber({ m }: { m: Metric }) {
  return (
    <span className="font-[var(--font-playfair)] text-4xl font-medium tracking-tight text-white md:text-5xl">
      <CountUp
        value={m.value}
        decimals={m.decimals ?? 0}
        suffix={m.suffix}
        duration={1800}
      />
    </span>
  );
}

function HeroMetric({ m }: { m: Metric }) {
  return (
    <div className="flex flex-col gap-2">
      <MetricNumber m={m} />
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/70">
        {m.label}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Acharya Dental — 50 years of dental excellence"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      {/* Background image — slow zoom */}
      <motion.img
        src="/images/hero-clinic.jpg"
        alt="The Acharya Dental clinic interior — a calm, refined operatory setting"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 18, ease: "easeOut" }}
      />

      {/* Navy overlay — top to bottom gradient for legibility.
          Stronger at top (so the transparent navbar text reads cleanly
          against bright hero photography) and a deeper bottom fade so
          the trust metrics don't vibrate against complex imagery. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(11,22,42,0.88)] via-[rgba(16,35,63,0.7)] to-[rgba(11,22,42,0.92)]"
      />
      {/* Extra bottom floor so metrics sit on a clean dark base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40vh] bg-gradient-to-t from-[rgba(11,22,42,0.85)] to-transparent"
      />

      {/* Subtle grain texture */}
      <div
        aria-hidden="true"
        className="grain absolute inset-0 -z-10 opacity-60"
      />

      {/* Content */}
      <motion.div
        className="mx-auto w-full max-w-[1180px] px-6"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Eyebrow with gold rule */}
        <motion.div
          variants={heroItem}
          className="mb-7 flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="h-px w-12 bg-gradient-to-r from-[var(--gold)] to-transparent"
          />
          <span className="eyebrow eyebrow-light">
            50+ Years of Dental Excellence
          </span>
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          variants={heroItem}
          className="display-1 max-w-[14ch] text-balance text-white sm:max-w-[16ch]"
        >
          50 Years of Trusted Dental Excellence
        </motion.h1>

        {/* 3. Supporting lead */}
        <motion.p
          variants={heroItem}
          className="lead mt-7 max-w-[52ch] text-pretty text-white/75"
        >
          Advanced Dentistry in Chennai for Families and International Patients.
        </motion.p>

        {/* 4. CTAs */}
        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
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
            ariaLabel="Chat with Acharya Dental on WhatsApp"
          >
            WhatsApp Now
          </LuxuryButton>
        </motion.div>

        {/* Trust metrics row */}
        <motion.div
          variants={heroItem}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 md:grid-cols-4 md:gap-x-0"
        >
          {HERO_METRICS.map((m, i) => (
            <div
              key={m.label}
              className={cn(
                "md:px-8 md:first:pl-0",
                i > 0 && "md:border-l md:border-white/15",
              )}
            >
              <HeroMetric m={m as Metric} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.span
          aria-hidden="true"
          className="block h-10 w-px bg-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 text-white/40"
          strokeWidth={1.25}
        />
      </motion.a>
    </section>
  );
}

export default Hero;
