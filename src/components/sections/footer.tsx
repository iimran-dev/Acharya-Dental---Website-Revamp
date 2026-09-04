"use client";

import Link from "next/link";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/site/motion";
import { BRAND, NAV_LINKS, SPECIALISTS } from "@/lib/content";

/* ---------------------------------------------------------------
   Footer — dark navy. Slightly darker than the WhyAcharya/
   ClinicExperience band (uses #0B1B30 directly), with a
   subtle top gold/20 hairline.

   Top section (py-16): 4-column grid on desktop, stacked on
   mobile.
     • Brand: monogram + wordmark + tagline + minimal social icons
     • Quick Links: NAV_LINKS as .link-gold white/70 → white
     • Specialists: SPECIALISTS names as anchor links
     • Contact: address, phone, email + "View on map" link

   Bottom bar: copyright + Privacy / Terms / Sitemap. Compact,
   elegant. Semantic <footer> wraps the whole thing.
   --------------------------------------------------------------- */

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="grid h-9 w-9 place-items-center border border-[var(--gold)]/60 font-[var(--font-playfair)] text-base leading-none text-[var(--gold)]"
    >
      A
    </span>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold-soft)]">
      {children}
    </h2>
  );
}

const SOCIAL = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="relative mt-auto border-t border-[var(--gold)]/20 bg-[#0B1B30] text-white"
    >
      {/* Top section */}
      <div className="container-editorial py-14 md:py-16">
        <RevealGroup className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <RevealItem>
            <Link
              href="#top"
              aria-label="Acharya Dental — back to top"
              className="inline-flex items-center gap-3 rounded-md"
            >
              <Monogram />
              <span className="font-[var(--font-playfair)] text-[0.86rem] tracking-[0.28em] text-white">
                ACHARYA DENTAL
              </span>
            </Link>

            <p className="mt-5 max-w-[26ch] text-[0.88rem] leading-[1.6] text-white/60">
              50+ years of trusted dental excellence in Chennai.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)] focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </RevealItem>

          {/* Quick Links */}
          <RevealItem>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-gold text-[0.9rem] text-white/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Specialists */}
          <RevealItem>
            <ColumnHeading>Specialists</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {SPECIALISTS.map((doc) => (
                <li key={doc.name}>
                  <a
                    href="#specialists"
                    className="link-gold text-[0.9rem] text-white/70 hover:text-white"
                  >
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Contact */}
          <RevealItem>
            <ColumnHeading>Contact</ColumnHeading>
            <address className="mt-5 flex flex-col gap-2 text-[0.9rem] not-italic leading-[1.55] text-white/70">
              <span>{BRAND.addressLine1}</span>
              <span>{BRAND.addressLine2}</span>
              <span>{BRAND.addressLine3}</span>
              <a
                href={BRAND.phoneHref}
                className="link-gold mt-1 w-fit text-white/70 hover:text-white"
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="link-gold w-fit text-white/70 hover:text-white"
              >
                {BRAND.email}
              </a>
            </address>
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-gold mt-5 inline-flex items-center gap-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-white/85 hover:text-[var(--gold-soft)]"
            >
              View on map
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 py-6 sm:flex-row sm:gap-6">
          <p className="text-[0.78rem] text-white/55">
            &copy; 2024 Acharya Dental. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex items-center gap-4 text-[0.78rem] text-white/55">
              <li>
                <a href="#" className="link-gold hover:text-white">Privacy</a>
              </li>
              <li aria-hidden="true" className="text-white/20">&middot;</li>
              <li>
                <a href="#" className="link-gold hover:text-white">Terms</a>
              </li>
              <li aria-hidden="true" className="text-white/20">&middot;</li>
              <li>
                <a href="#" className="link-gold hover:text-white">Sitemap</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
