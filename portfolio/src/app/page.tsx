import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import WhatIDo from "@/components/WhatIDo";
import Arsenal from "@/components/Arsenal";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import FooterCTA from "@/components/FooterCTA";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <FloatingNav />
      <ScrollyCanvas />
      <Projects />
      <WhatIDo />
      <Arsenal />
      <AboutMe />
      <Experience />
      <FooterCTA />
    </main>
  );
}

