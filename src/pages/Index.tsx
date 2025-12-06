import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsCounter from "@/components/home/StatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import Certifications from "@/components/home/Certifications";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroCarousel />
        <ServicesOverview />
        <StatsCounter />
        <WhyChooseUs />
        <VideoTestimonials />
        <Testimonials />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
