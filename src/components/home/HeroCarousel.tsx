import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Shield, Flame, Bug, Sparkles, Scissors } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import fireServices from "@/assets/fire-services.jpg";
import fumigationServices from "@/assets/fumigation-services.jpg";
import cleaningServices from "@/assets/cleaning-services.jpg";
import tailoringServices from "@/assets/tailoring-services.jpg";

const slides = [
  {
    image: heroBanner,
    icon: Shield,
    badge: "Trusted by 500+ Businesses",
    title: "Complete Corporate Solutions for Your Business",
    description: "From fire safety to fumigation, cleaning to custom uniforms – we deliver professional services that keep your business running smoothly and safely.",
    cta: "Request Service",
    ctaLink: "/contact",
  },
  {
    image: fireServices,
    icon: Flame,
    badge: "Fire Safety Experts",
    title: "Professional Fire Safety Solutions",
    description: "Comprehensive fire equipment supply, installation, inspection, and staff training to protect your business and employees.",
    cta: "Learn More",
    ctaLink: "/services",
  },
  {
    image: fumigationServices,
    icon: Bug,
    badge: "Certified Pest Control",
    title: "Expert Fumigation & Pest Control",
    description: "Advanced pest management solutions for residential, commercial, and industrial properties with eco-friendly treatments.",
    cta: "Get Quote",
    ctaLink: "/contact",
  },
  {
    image: cleaningServices,
    icon: Sparkles,
    badge: "Premium Cleaning",
    title: "Industrial & Commercial Cleaning",
    description: "Professional cleaning services for offices, hotels, factories, and post-construction sites with attention to every detail.",
    cta: "Schedule Service",
    ctaLink: "/contact",
  },
  {
    image: tailoringServices,
    icon: Scissors,
    badge: "Custom Uniforms",
    title: "Corporate Uniform Production",
    description: "Custom-designed professional uniforms, safety wear, and branded apparel that represent your company's identity.",
    cta: "Design Now",
    ctaLink: "/contact",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  {slide.badge}
                </span>
              </div>

              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {slide.title}
              </h1>

              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-6 text-base shadow-xl hover:scale-105 transition-transform"
                  >
                    {slide.cta}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-base"
                  >
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-secondary"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroCarousel;
