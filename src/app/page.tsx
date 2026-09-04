import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { Heritage } from "@/components/sections/heritage";
import { Specialists } from "@/components/sections/specialists";
import { TreatmentShowcase } from "@/components/sections/treatments";
import { WhyAcharya } from "@/components/sections/why-acharya";
import { SmileGallery } from "@/components/sections/smile-gallery";
import { InternationalPatients } from "@/components/sections/international-patients";
import { ClinicExperience } from "@/components/sections/clinic-experience";
import { Testimonials } from "@/components/sections/testimonials";
import { Technology } from "@/components/sections/technology";
import { AppointmentCTA } from "@/components/sections/appointment-cta";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCTA } from "@/components/site/mobile-sticky-cta";

/**
 * Acharya Dental — Homepage
 *
 * Narrative order (per design brief §31):
 *   Trust → Expertise → Proof → Experience → Action
 *
 * FIRST IMPRESSION (Hero)
 *   → 50+ YEARS OF TRUST (TrustMetrics + Heritage)
 *   → CLINICAL EXPERTISE (Specialists)
 *   → SIGNATURE TREATMENTS (TreatmentShowcase)
 *   → WHY ACHARYA (WhyAcharya)
 *   → PROOF / TRANSFORMATIONS (SmileGallery)
 *   → INTERNATIONAL PATIENT EXPERIENCE (InternationalPatients)
 *   → CLINIC EXPERIENCE (ClinicExperience)
 *   → PATIENT TESTIMONIALS (Testimonials)
 *   → ADVANCED TECHNOLOGY (Technology)
 *   → APPOINTMENT (AppointmentCTA + Contact)
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* id="top" anchor lives inside Hero */}
        <Hero />
        <TrustMetrics />
        <Heritage />
        <Specialists />
        <TreatmentShowcase />
        <WhyAcharya />
        <SmileGallery />
        <InternationalPatients />
        <ClinicExperience />
        <Testimonials />
        <Technology />
        <AppointmentCTA />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCTA />
      {/* Spacer so the fixed mobile sticky CTA does not cover the footer bottom bar */}
      <div className="h-24 md:hidden" aria-hidden="true" />
    </>
  );
}
