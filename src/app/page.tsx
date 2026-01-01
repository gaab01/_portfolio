'use client';

import { SiteNav } from "@/components/ui/site-nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("@/components/Particles"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-accent/30 selection:text-white">
      {/* Global Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={150}
          particleSpread={15}
          speed={0.05}
          particleColors={["#ffffff", "#1E4DFF", "#3b66ff"]}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.8}
          cameraDistance={25}
          moveParticlesOnHover={false}
        />
      </div>

      <SiteNav />
      <Hero />
      <About />
      <ProjectsGrid />
      <Contact />
      <Footer />
    </main>
  );
}
