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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroCarousel />
        <ClientLogos />
        <ServicesOverview />
        <ServicesComparison />
        <StatsCounter />
        <WhyChooseUs />
        <VideoTestimonials />
        <Testimonials />
        <Newsletter />
        <Certifications />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
