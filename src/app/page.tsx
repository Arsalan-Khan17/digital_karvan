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
import { Team } from "@/components/sections/Team";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
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
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
