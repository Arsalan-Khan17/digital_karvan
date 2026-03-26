import Hero from "@/components/home/Hero";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import Mission from "@/components/home/Mission";
import ServicesPreview from "@/components/home/ServicesPreview";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import CoreValues from "@/components/home/CoreValues";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import QuoteForm from "@/components/home/QuoteForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnersMarquee />
      <Mission />
      <ServicesPreview />
      <PortfolioPreview />
      <CoreValues />
      <Team />
      <Testimonials />
      <BlogPreview />
      <QuoteForm />
    </>
  );
}
