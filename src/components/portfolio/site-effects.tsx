"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function SiteEffects() {
  const reducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setPointer({ x: event.clientX, y: event.clientY });
    };

    const handleOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea")));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [reducedMotion]);

  const lightStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${pointer.x}px ${pointer.y}px, rgba(244, 180, 0, 0.12), transparent 0), radial-gradient(circle at ${pointer.x}px ${pointer.y}px, rgba(30, 78, 216, 0.2), transparent 220px)`,
    }),
    [pointer.x, pointer.y],
  );

  useEffect(() => {
    if (reducedMotion || !cursorRef.current || !ringRef.current) {
      return;
    }

    cursorRef.current.animate(
      {
        transform: `translate(${pointer.x - 6}px, ${pointer.y - 6}px) scale(${hovering ? 1.5 : 1})`,
      },
      { duration: 180, fill: "forwards", easing: "ease-out" },
    );

    ringRef.current.animate(
      {
        transform: `translate(${pointer.x - 18}px, ${pointer.y - 18}px) scale(${hovering ? 1.15 : 1})`,
      },
      { duration: 280, fill: "forwards", easing: "ease-out" },
    );
  }, [hovering, pointer.x, pointer.y, reducedMotion]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-white to-royal"
        style={{ scaleX }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] opacity-90" style={lightStyle} />
      <div aria-hidden className="noise-overlay z-[3]" />
      {!reducedMotion ? (
        <>
          <div
            ref={cursorRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-3 w-3 rounded-full bg-gold mix-blend-screen md:block"
          />
          <div
            ref={ringRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[69] hidden h-9 w-9 rounded-full border border-white/35 md:block"
          />
        </>
      ) : null}
    </>
  );
}
