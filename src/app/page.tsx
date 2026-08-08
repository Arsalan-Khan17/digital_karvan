import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Workflow } from "@/components/sections/Workflow";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyWorkWithUs } from "@/components/sections/WhyWorkWithUs";
// Team section hidden until team images/content are ready
// import { Team } from "@/components/sections/Team";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";

export default function Home() {
  return (
    <>
      <ScrollFX />
      {/* Content layer sits above the pinned footer and scrolls up to reveal it */}
      <div className="relative z-10 bg-white">
        <Header />
        <main>
          <Hero />
          <LogoStrip />
          <Workflow />
          <Services />
          <Process />
          <Stats />
          <Projects />
          <Testimonials />
          <WhyWorkWithUs />
          {/* <Team /> */}
          <Faq />
          <Contact />
        </main>
        <FooterReveal />
      </div>
    </>
  );
}
