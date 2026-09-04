"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/* Editorial easing presets — restrained, never bouncy */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_LUX = [0.65, 0, 0.35, 1] as const;

/* Shared variants — keep consistent across the site */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EDITORIAL },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_EDITORIAL },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EDITORIAL },
  },
};

/* Container for staggered children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/* ---------------------------------------------------------------
   Reveal — fade-up on scroll into view. The workhorse wrapper.
   --------------------------------------------------------------- */
type RevealProps = HTMLMotionProps<"div"> & {
  variant?: "up" | "in" | "scale";
  delay?: number;
  once?: boolean;
};

export function Reveal({
  variant = "up",
  delay = 0,
  once = true,
  className,
  children,
  ...rest
}: RevealProps) {
  const v =
    variant === "in" ? fadeIn : variant === "scale" ? scaleReveal : fadeUp;
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container for grouped reveals */
export function RevealGroup({
  className,
  children,
  delay = 0,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delayChildren: delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Staggered child */
export function RevealItem({
  className,
  children,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   ImageReveal — image scales from a clip + fades in.
   Editorial image entrance, premium feel.
   --------------------------------------------------------------- */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("image-frame group", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
          imgClassName,
        )}
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: EASE_EDITORIAL }}
      />
    </div>
  );
}
