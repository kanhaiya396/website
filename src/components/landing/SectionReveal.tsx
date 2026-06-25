import { ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Disables the clip-path mask sweep on first reveal */
  noMask?: boolean;
  /** Disables the gentle parallax on scroll */
  noParallax?: boolean;
};

/**
 * Wraps a section's inner content with a parallax + clip-mask reveal.
 * On first scroll into view, content "unmasks" from bottom→top instead of fading.
 * Respects prefers-reduced-motion.
 */
export function SectionReveal({
  children,
  className,
  noMask = false,
  noParallax = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={!noParallax ? { y } : undefined}
      initial={noMask ? { opacity: 0, y: 24 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      whileInView={
        noMask
          ? { opacity: 1, y: 0 }
          : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
