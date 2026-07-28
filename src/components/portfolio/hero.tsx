"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";

import { contact, metrics, roles } from "@/data/portfolio";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const typingRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (reducedMotion || !typingRef.current) {
      if (typingRef.current) {
        typingRef.current.textContent = roles[0];
      }
      return;
    }

    const element = typingRef.current;
    let roleIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const animateRole = () => {
      const currentRole = roles[roleIndex];
      element.textContent = "";
      const state = { count: 0 };

      tweenRef.current = gsap.to(state, {
        duration: currentRole.length * 0.045,
        count: currentRole.length,
        onUpdate() {
          const chars = Math.round(state.count);
          element.textContent = currentRole.slice(0, chars);
        },
        onComplete() {
          timeoutId = setTimeout(() => {
            const deleting = { count: currentRole.length };

            tweenRef.current = gsap.to(deleting, {
              duration: currentRole.length * 0.03,
              count: 0,
              onUpdate() {
                element.textContent = currentRole.slice(0, Math.max(Math.round(deleting.count), 0));
              },
              onComplete() {
                roleIndex = (roleIndex + 1) % roles.length;
                animateRole();
              },
            });
          }, 1100);
        },
      });
    };

    animateRole();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      tweenRef.current?.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-6">
      <div className="section-shell flex min-h-screen flex-col justify-between pb-10 pt-16">
        <div className="glass-panel ambient-border sticky top-4 z-30 hidden items-center justify-between rounded-full px-5 py-3 text-sm text-white/80 lg:flex">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            Shabnam Nisha
          </span>
          <div className="flex items-center gap-6">
            <a href="#story">Story</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <a
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2"
            href={contact.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>

        <div className="grid items-center gap-14 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:pt-20">
          <div className="relative z-10">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="eyebrow"
            >
              Cinematic portfolio / Hyderabad / 2026
            </motion.p>
            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 34 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08 }}
              className="max-w-5xl font-display text-[clamp(3.6rem,9vw,8.6rem)] leading-[0.92] tracking-[-0.06em]"
            >
              Designing a future where <span className="gold-gradient">engineering</span> and{" "}
              <span className="royal-gradient">storytelling</span> move together.
            </motion.h1>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/78"
            >
              Shabnam Nisha is an ECE student building toward intelligent systems, embedded experiences,
              and beautiful digital narratives that feel as thoughtful as the technology behind them.
            </motion.p>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26 }}
              className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/72"
            >
              <span className="rounded-full border border-gold/35 bg-gold/10 px-4 py-2">
                Now becoming: <span ref={typingRef} className="font-medium text-white" />
              </span>
              <span className="rounded-full border border-white/12 bg-white/5 px-4 py-2">
                AI, embedded systems, communication, visual editing
              </span>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 26 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:translate-y-[-1px]"
              >
                Explore selected work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/12"
              >
                View resume
                <Download className="h-4 w-4" />
              </a>
            </motion.div>

            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.06 }}
                  className="glass-panel rounded-[1.6rem] p-4"
                >
                  <div className="text-2xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-1 text-sm text-white/66">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="absolute inset-10 rounded-full bg-royal/25 blur-3xl" />
            <div className="relative grid grid-cols-3 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={`glass-panel h-[200px] overflow-hidden rounded-[1.75rem] md:h-[240px] ${
                    index === 2 ? "col-span-2 h-[300px] md:h-[360px]" : index === 1 || index === 4 ? "translate-y-8 h-[240px] md:h-[280px]" : index % 2 === 0 ? "-translate-y-4" : ""
                  }`}
                >
                  <div className="relative h-full w-full">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: [
                          "radial-gradient(circle at 25% 20%, rgba(30,78,216,0.55), transparent 45%)",
                          "radial-gradient(circle at 70% 80%, rgba(244,180,0,0.25), transparent 55%)",
                          "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)",
                        ].join(","),
                        filter: index % 3 === 0 ? "saturate(1.2)" : "saturate(1.0)",
                        transform: `scale(${index % 2 === 0 ? 1.05 : 1.0})`,
                      }}
                    />
                    <div className="grid-sheen opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
