"use client";

import * as React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/section-heading";
import { LuxuryButton } from "@/components/site/luxury-button";
import { BRAND, TREATMENTS } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

/* ---------------------------------------------------------------
   Contact — clean two-column section.
     • LEFT: contact details (address, phone, email, hours,
       emergency) + an interactive Google Maps embed
       (no API key — using the ?q=...&output=embed URL).
     • RIGHT: a short booking form that POSTs to /api/appointment
       as JSON. On success: a toast + form reset. On error: an
       error toast. The submit button has a loading state.

   Form body shape (JSON):
     {
       name: string,
       phone: string,
       email?: string,
       treatment: string,
       date?: string,   // yyyy-mm-dd
       message?: string
     }
   --------------------------------------------------------------- */

type DetailRowProps = {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
};

function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  return (
    <div className="flex items-start gap-4 border-t border-[var(--border)] py-6 first:border-t-0 first:pt-0">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-[var(--font-inter)] text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
          {label}
        </p>
        <div className="mt-1.5 text-[0.95rem] leading-[1.55] text-[var(--ink)]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---- Booking form ---- */

type FormState = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  treatment: "",
  date: "",
  message: "",
};

function BookingForm() {
  const { toast } = useToast();
  const [form, setForm] = React.useState<FormState>(INITIAL);
  const [status, setStatus] = React.useState<"idle" | "submitting">("idle");

  const set = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Light client-side guard (native required attr handles most).
    if (!form.name.trim() || !form.phone.trim()) {
      toast({
        title: "Please share your name and phone number",
        description: "We need those to reach out and confirm your appointment.",
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      toast({
        title: "Thank you — we'll be in touch within one business day.",
        description: "Our team will call to confirm your consultation.",
      });
      setForm(INITIAL);
    } catch (err) {
      console.error("[appointment] submit error", err);
      toast({
        title: "Something went wrong.",
        description:
          "Please try again, or reach us directly at " + BRAND.phone + ".",
      });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-[var(--border)] bg-white p-6 md:p-8"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <span
          aria-hidden="true"
          className="h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent"
        />
        <h3 className="font-[var(--font-playfair)] text-2xl font-medium leading-tight text-[var(--navy)]">
          Request an appointment
        </h3>
        <p className="text-[0.9rem] text-[var(--ink-soft)]">
          Tell us a little about your visit. We'll call to confirm.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="appt-name">
            Full name <span className="text-[var(--gold)]" aria-hidden="true">*</span>
          </Label>
          <Input
            id="appt-name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            className="h-11"
            aria-required="true"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="appt-phone">
            Phone <span className="text-[var(--gold)]" aria-hidden="true">*</span>
          </Label>
          <Input
            id="appt-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 ..."
            className="h-11"
            aria-required="true"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="appt-email">Email <span className="text-[var(--ink-muted)]">(optional)</span></Label>
          <Input
            id="appt-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@email.com"
            className="h-11"
          />
        </div>

        {/* Preferred treatment */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="appt-treatment">Preferred treatment</Label>
          <Select
            value={form.treatment}
            onValueChange={(v) => set("treatment", v)}
          >
            <SelectTrigger
              id="appt-treatment"
              className="h-11 w-full bg-white"
              aria-label="Preferred treatment"
            >
              <SelectValue placeholder="Select a treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General consultation">General consultation</SelectItem>
              {TREATMENTS.map((t) => (
                <SelectItem key={t.name} value={t.name}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preferred date */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="appt-date">Preferred date</Label>
          <Input
            id="appt-date"
            name="date"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="h-11"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="appt-message">Anything we should know?</Label>
          <Textarea
            id="appt-message"
            name="message"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us briefly what brings you in"
            className="min-h-[110px]"
          />
        </div>
      </div>

      <div className="mt-7">
        <LuxuryButton
          as="button"
          type="submit"
          variant="gold"
          size="lg"
          fullWidth
          disabled={status === "submitting"}
          icon={
            status === "submitting" ? undefined : (
              <Calendar className="h-4 w-4" aria-hidden="true" />
            )
          }
          ariaLabel="Request appointment"
        >
          {status === "submitting" ? "Sending..." : "Request appointment"}
        </LuxuryButton>
      </div>

      <p className="mt-4 text-center text-[0.74rem] text-[var(--ink-muted)]">
        By submitting, you agree to be contacted about your consultation.
      </p>
    </form>
  );
}

/* ---- Section ---- */

export function Contact() {
  const mapSrc = React.useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapQuery)}&output=embed`,
    [],
  );

  return (
    <section
      id="contact"
      aria-label="Contact Acharya Dental — address, phone, hours, and appointment request"
      className="section bg-[var(--warm-white)]"
    >
      <div className="container-editorial">
        <SectionHeading
          eyebrow="CONTACT"
          title="Visit us, write to us, or call."
          lead="Our team will help you schedule a consultation that fits your visit to Chennai."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — details + map */}
          <Reveal>
            <div>
              {/* Contact details list */}
              <div className="flex flex-col">
                <DetailRow icon={MapPin} label="Address">
                  <div className="flex flex-col gap-0.5">
                    <span>{BRAND.addressLine1}</span>
                    <span>{BRAND.addressLine2}</span>
                    <span>{BRAND.addressLine3}</span>
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-gold mt-2 inline-flex w-fit items-center gap-1 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--navy)]"
                    >
                      View on map
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </div>
                </DetailRow>

                <DetailRow icon={Phone} label="Phone">
                  <a
                    href={BRAND.phoneHref}
                    className="link-gold font-medium text-[var(--navy)]"
                  >
                    {BRAND.phone}
                  </a>
                </DetailRow>

                <DetailRow icon={Mail} label="Email">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="link-gold font-medium text-[var(--navy)]"
                  >
                    {BRAND.email}
                  </a>
                </DetailRow>

                <DetailRow icon={Clock} label="Hours">
                  <ul className="flex flex-col gap-1.5">
                    {BRAND.hours.map((h) => (
                      <li
                        key={h.day}
                        className="grid grid-cols-[1fr_auto] items-baseline gap-x-6"
                      >
                        <span className="text-[var(--ink-soft)]">{h.day}</span>
                        <span className="font-medium text-[var(--ink)] text-right whitespace-nowrap">
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </DetailRow>

                <DetailRow icon={AlertCircle} label="Dental emergency">
                  <div className="flex flex-col gap-1">
                    <a
                      href={BRAND.emergencyHref}
                      className="link-gold font-medium text-[var(--navy)]"
                    >
                      {BRAND.emergency}
                    </a>
                    <span className="text-[0.78rem] text-[var(--ink-muted)]">
                      Available after hours — please call ahead.
                    </span>
                  </div>
                </DetailRow>
              </div>

              {/* Map */}
              <div className="mt-10 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--light-gray)]">
                <iframe
                  title="Map showing Acharya Dental clinic location in Chennai"
                  src={mapSrc}
                  className="h-[280px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </Reveal>

          {/* RIGHT — booking form */}
          <Reveal delay={0.08}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
