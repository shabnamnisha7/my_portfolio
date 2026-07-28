import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  Sparkles,
} from "lucide-react";

import {
  achievements,
  certifications,
  contact,
  creativeInterests,
  experience,
  projects,
  storyMoments,
} from "@/data/portfolio";
import { Reveal } from "@/components/portfolio/reveal";

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title max-w-3xl">{title}</h2>
      </div>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

export function StorySection() {
  return (
    <section id="story" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <div className="section-card glass-panel ambient-border">
          <div className="grid-sheen" />
          <SectionIntro
            eyebrow="001 / Story"
            title={
              <>
                More than an <span className="gold-gradient">engineering student</span>.
              </>
            }
            copy="Shabnam builds with both precision and feeling, moving between structured technical learning and expressive visual storytelling."
          />
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="glass-panel rounded-[1.7rem] p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-[1.35rem]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: [
                      "radial-gradient(circle at 25% 20%, rgba(30,78,216,0.65), transparent 45%)",
                      "radial-gradient(circle at 70% 80%, rgba(244,180,0,0.35), transparent 55%)",
                      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.00))",
                    ].join(","),
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/10" />
                <div className="absolute inset-0 grid-sheen opacity-60" />
                <div className="relative h-[480px] w-full">
                  <div className="absolute left-8 top-10 h-16 w-16 rounded-full border border-white/10 bg-white/5" />
                  <div className="absolute bottom-10 left-8 right-8">
                    <div className="h-2 w-2/3 rounded-full bg-white/20" />
                    <div className="mt-2 h-2 w-1/2 rounded-full bg-white/14" />
                    <div className="mt-2 h-2 w-3/4 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-white/76">
                <p>
                  She is currently focused on electronics, embedded systems, and the way thoughtful
                  interfaces can make complex technology feel human.
                </p>
                <p>
                  Alongside academics, she explores editing, visual mood, and narrative pacing. That
                  combination shapes a portfolio language that feels technical, curious, and cinematic.
                </p>
              </div>
            </Reveal>
            <div className="space-y-4">
              {storyMoments.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 0.07}
                  className="glass-panel rounded-[1.5rem] p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-gold/80">{item.year}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/60">{item.subtitle}</p>
                    </div>
                    <span className="rounded-full border border-white/12 bg-white/6 p-3">
                      {index < 2 ? <GraduationCap className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/74">{item.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const skillOrbs = [
    ["Python", "C", "Arduino", "MATLAB", "MySQL", "Git"],
    ["Embedded C", "Sensors", "Microcontrollers", "Digital Electronics"],
    ["Signals & Systems", "Debugging", "Visual Editing", "Problem Solving"],
  ];

  return (
    <section className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow="002 / Skills"
          title={
            <>
              Floating around the core <span className="royal-gradient">systems mindset</span>.
            </>
          }
          copy="Instead of skill bars, the site frames Shabnam's toolkit as clustered capability islands that continue to grow through projects and experimentation."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {skillOrbs.map((group, index) => (
            <Reveal
              key={index}
              delay={index * 0.08}
              className="section-card glass-panel ambient-border flex min-h-[300px] flex-wrap content-start gap-3 rounded-[1.8rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent" />
              {group.map((skill, skillIndex) => (
                <div
                  key={skill}
                  className={`animate-float-slow rounded-full border px-4 py-2 text-sm text-white/84 ${
                    skillIndex % 3 === 0
                      ? "border-gold/30 bg-gold/10"
                      : skillIndex % 2 === 0
                        ? "border-royal/25 bg-royal/10"
                        : "border-white/12 bg-white/8"
                  }`}
                  style={{ animationDelay: `${skillIndex * 0.6}s` }}
                >
                  {skill}
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow="003 / Selected Work"
          title={
            <>
              Projects shaped as <span className="gold-gradient">signals of direction</span>.
            </>
          }
          copy="Each card is positioned like a concept room: part prototype, part case-study preview, and part indicator of where her technical interests are heading."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 0.06}
              className={`section-card glass-panel ambient-border rounded-[1.8rem] ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-royal/10" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/45">
                      Project {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/8 p-3">
                    <ArrowUpRight className="h-5 w-5 text-gold" />
                  </div>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/74">{project.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/78">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm" href={project.hrefs.demo}>
                    Demo
                  </a>
                  <a className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm" href={project.hrefs.github}>
                    GitHub
                  </a>
                  <a className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm" href={project.hrefs.caseStudy}>
                    Case study
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow="004 / Experience"
          title={
            <>
              Leadership, outreach, and <span className="royal-gradient">presence under pressure</span>.
            </>
          }
          copy="The experience timeline focuses on communication, community, and leadership signals that strengthen her future as a builder and collaborator."
        />
        <div className="relative ml-4 border-l border-white/12 pl-8 sm:ml-8">
          {experience.map((item, index) => (
            <Reveal key={item.role} delay={index * 0.08} className="relative pb-8">
              <span className="absolute -left-[2.6rem] top-6 flex h-6 w-6 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
              </span>
              <div className="glass-panel rounded-[1.6rem] p-5 sm:p-6">
                <p className="text-sm uppercase tracking-[0.22em] text-gold/75">{item.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.role}</h3>
                <p className="mt-1 text-sm text-white/58">{item.org}</p>
                <p className="mt-4 text-sm leading-7 text-white/74">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow="005 / Certifications"
          title={
            <>
              Proof points across <span className="gold-gradient">security, space, AI, and fundamentals</span>.
            </>
          }
          copy="A premium wall of validations that reinforces depth, consistency, and range without overwhelming the browsing flow."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {certifications.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className="glass-panel rounded-[1.5rem] p-5">
              <BadgeCheck className="h-5 w-5 text-gold" />
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/58">{item.issuer}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-white/72">
                <span>{item.year}</span>
                <a className="inline-flex items-center gap-1 text-gold" href={item.link} target="_blank" rel="noreferrer">
                  View
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow="006 / Achievements"
          title={
            <>
              Signals of <span className="royal-gradient">initiative and creative confidence</span>.
            </>
          }
          copy="Awards and recognitions are framed as momentum markers that show how technical curiosity translates into action."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {achievements.map((item, index) => (
            <Reveal key={item} delay={index * 0.05} className="glass-panel rounded-[1.4rem] p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-white/44">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-base leading-7 text-white/84">{item}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CreativeSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow="007 / Creative Interests"
          title={
            <>
              Floating islands of <span className="gold-gradient">taste, narrative, and curiosity</span>.
            </>
          }
          copy="These interests keep the portfolio from feeling one-dimensional and highlight the editorial lens behind Shabnam's technical work."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {creativeInterests.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.07}
              className="section-card glass-panel rounded-[1.8rem] p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
              <h3 className="relative text-xl font-semibold text-white">{item.title}</h3>
              <p className="relative mt-4 text-sm leading-7 text-white/72">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="section-shell">
        <div className="section-card glass-panel ambient-border rounded-[2rem]">
          <SectionIntro
            eyebrow="008 / Contact"
            title={
              <>
                Ready to build something <span className="royal-gradient">thoughtful together</span>?
              </>
            }
            copy="The contact area keeps the premium tone while staying practical: a simple route into collaboration, conversation, or opportunity."
          />
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal className="glass-panel rounded-[1.6rem] p-6">
              <p className="text-sm leading-7 text-white/76">
                Reach out for internships, collaborations, creative projects, technical discussions, or
                portfolio feedback.
              </p>
              <div className="mt-6 space-y-3">
                <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4" href={contact.email}>
                  <span>
                    <span className="block text-sm text-white/50">Email</span>
                    <span className="block text-white">nishashabnam212006@gmail.com</span>
                  </span>
                  <Mail className="h-4 w-4 text-gold" />
                </a>
                <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4" href={contact.github} target="_blank" rel="noreferrer">
                  <span>
                    <span className="block text-sm text-white/50">GitHub</span>
                    <span className="block text-white">shabnamnisha7</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </a>
                <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4" href={contact.linkedin} target="_blank" rel="noreferrer">
                  <span>
                    <span className="block text-sm text-white/50">LinkedIn</span>
                    <span className="block text-white">Shabnam Nisha</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="glass-panel rounded-[1.6rem] p-6">
              <form className="grid gap-4">
                <label className="grid gap-2 text-sm text-white/72">
                  Name
                  <input
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/28 focus:border-gold/30"
                    placeholder="Your full name"
                  />
                </label>
                <label className="grid gap-2 text-sm text-white/72">
                  Email
                  <input
                    type="email"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/28 focus:border-gold/30"
                    placeholder="your@email.com"
                  />
                </label>
                <label className="grid gap-2 text-sm text-white/72">
                  Message
                  <textarea
                    rows={6}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/28 focus:border-gold/30"
                    placeholder="Tell me about your idea, team, or opportunity."
                  />
                </label>
                <a
                  href={contact.email}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950"
                >
                  Start the conversation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative pb-8">
      <div className="section-shell flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/54 sm:flex-row sm:items-center">
        <p>Shabnam Nisha / Premium portfolio / 2026</p>
        <div className="flex gap-5">
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={contact.email}>Email</a>
        </div>
      </div>
    </footer>
  );
}
