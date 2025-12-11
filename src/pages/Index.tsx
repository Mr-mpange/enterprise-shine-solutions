import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsCounter from "@/components/home/StatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import Certifications from "@/components/home/Certifications";
import ClientLogos from "@/components/home/ClientLogos";
import ServicesComparison from "@/components/home/ServicesComparison";
import Newsletter from "@/components/home/Newsletter";
import FloatingContact from "@/components/ui/FloatingContact";
import PageTransition from "@/components/ui/PageTransition";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroCarousel />
          <ScrollReveal direction="up">
            <ClientLogos />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <ServicesOverview />
          </ScrollReveal>
          <ScrollReveal direction="left">
            <ServicesComparison />
          </ScrollReveal>
          <ScrollReveal direction="up">
            <StatsCounter />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <WhyChooseUs />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <VideoTestimonials />
          </ScrollReveal>
          <ScrollReveal direction="up">
            <Testimonials />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Newsletter />
          </ScrollReveal>
          <ScrollReveal direction="up">
            <Certifications />
          </ScrollReveal>
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </PageTransition>
  );
};

export default Index;
