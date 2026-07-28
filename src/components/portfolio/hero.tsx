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

        <div className="grid items-center gap-14 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <div className="relative z-10">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="eyebrow"
            >
              Cinematic portfolio / Hyderabad / 2026
            </motion.p>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 34 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08 }}
              className="space-y-8"
            >
              <h1 className="max-w-[12ch] font-display text-[clamp(4rem,8vw,7.8rem)] leading-[0.9] tracking-[-0.06em]">
                Hello, I&apos;m <span className="gold-gradient">Shabnam Nisha</span>.
              </h1>
              <div className="space-y-4 text-[1.05rem] leading-[1.7] text-white/78 md:text-[1.2rem]">
                <p>Creative Developer. Full Stack Engineer. UI Designer. Electronics Engineer. Builder. Dreamer. Problem Solver.</p>
                <p>Building premium digital systems and immersive product experiences that feel as thoughtful as the technology behind them.</p>
              </div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-6 flex flex-wrap gap-3 text-sm text-white/72"
            >
              <span className="rounded-full border border-gold/35 bg-gold/10 px-4 py-2">
                Today: <span ref={typingRef} className="font-medium text-white" />
              </span>
              <span className="rounded-full border border-white/12 bg-white/5 px-4 py-2">
                Intelligent systems, embedded experiences, motion-led design
              </span>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 26 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:-translate-y-1"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/12"
              >
                Download Resume
                <Download className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-3 font-medium text-white transition hover:translate-y-[-1px]"
              >
                Let&apos;s Build Something
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
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="absolute inset-10 rounded-full bg-royal/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/5 p-6 shadow-card">
              <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-royal/20 blur-3xl" />
              <div className="absolute left-8 top-12 h-16 w-16 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/10 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,78,216,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(244,180,0,0.18),transparent_40%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_25%,rgba(255,255,255,0.02))]" />
                <div className="relative grid gap-5">
                  <div className="glass-panel rounded-[1.75rem] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/60">Live node</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">System v4.2</span>
                    </div>
                    <div className="mt-5 grid gap-4 text-sm text-white/75">
                      <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/40">Circuit stability</p>
                        <p className="mt-3 text-lg font-semibold text-white">0.997 signal integrity</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-white/70">
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-3 py-3">React</div>
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-3 py-3">Three.js</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="glass-panel rounded-[1.5rem] p-4 text-sm text-white/75">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">Telemetry</p>
                      <div className="mt-4 space-y-2">
                        <div className="h-2 w-full rounded-full bg-white/10" />
                        <div className="h-2 w-4/5 rounded-full bg-white/10" />
                        <div className="h-2 w-2/3 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="glass-panel rounded-[1.5rem] p-4 text-sm text-white/75">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">Network load</p>
                      <div className="mt-4 grid gap-2 text-xs text-white/70">
                        <span>Latency 12ms</span>
                        <span>Packet integrity 99.8%</span>
                        <span>Throughput 24Gb/s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
