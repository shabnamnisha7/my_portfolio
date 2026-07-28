import dynamic from "next/dynamic";

import { Hero } from "@/components/portfolio/hero";
import {
  AchievementsSection,
  CertificationsSection,
  ContactSection,
  CreativeSection,
  ExperienceSection,
  Footer,
  ProjectsSection,
  SkillsSection,
  StorySection,
} from "@/components/portfolio/sections";

const WorldScene = dynamic(
  () => import("@/components/portfolio/world-scene").then((mod) => mod.WorldScene),
  { ssr: false },
);

const SiteEffects = dynamic(
  () => import("@/components/portfolio/site-effects").then((mod) => mod.SiteEffects),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <WorldScene />
      <SiteEffects />
      <div className="relative z-10">
        <Hero />
        <StorySection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <AchievementsSection />
        <CreativeSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
