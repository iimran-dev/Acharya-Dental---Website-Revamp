"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

/* ---------------------------------------------------------------
   SectionHeading — eyebrow + display heading + optional lead
   Used across every section for consistent typography rhythm.
   --------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div
      className={cn(
        "max-w-3xl",
        alignClass,
        tone === "light" && "text-white",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3 mb-5",
              align === "center" && "justify-center",
            )}
          >
            <span
              className={cn(
                "h-px w-10",
                tone === "light" ? "bg-[var(--gold-soft)]" : "bg-[var(--gold)]",
              )}
            />
            <span
              className={cn(
                "eyebrow",
                tone === "light" && "eyebrow-light",
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="display-2 text-balance">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "lead mt-6 text-pretty",
              tone === "light" && "text-white/80",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
