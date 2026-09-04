"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   BeforeAfterSlider — premium clinical before/after comparison.
   - Drag interaction (mouse + touch)
   - Smooth handle movement
   - Keyboard accessible (left/right arrows when handle focused)
   - Clear before/after labels
   --------------------------------------------------------------- */

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  initialPosition = 50,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initialPosition?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(initialPosition);
  const [dragging, setDragging] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const updatePosition = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updatePosition(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.userSelect = "";
    };
  }, [dragging, updatePosition]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - 4));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + 4));
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full select-none overflow-hidden rounded-lg bg-[var(--light-gray)]",
        className,
      )}
      onPointerDown={(e) => {
        setDragging(true);
        updatePosition(e.clientX);
      }}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison slider. Use left and right arrow keys to adjust."
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${Math.round(position)}% ${afterLabel}`}
      onKeyDown={onKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ touchAction: "pan-y" }}
    >
      {/* AFTER (full image underneath) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="block h-full w-full object-cover"
        draggable={false}
      />
      <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-sm bg-[var(--navy)]/85 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white">
        {afterLabel}
      </span>

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }}
          draggable={false}
        />
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-sm bg-white/85 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">
          {beforeLabel}
        </span>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <div className="h-full w-px bg-white shadow-[0_0_18px_rgba(0,0,0,0.35)]" />
        <div
          className={cn(
            "absolute flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[var(--navy)]/90 backdrop-blur-md transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.45)]",
            (dragging || focused) &&
              "scale-110 border-[var(--gold)] shadow-[0_0_28px_rgba(200,161,90,0.65)]",
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 7L4 12l5 5M15 7l5 5-5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
