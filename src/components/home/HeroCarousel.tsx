import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Shield, Flame, Bug, Sparkles, Scissors } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import fireServices from "@/assets/fire-services.jpg";
import fumigationServices from "@/assets/fumigation-services.jpg";
import cleaningServices from "@/assets/cleaning-services.jpg";
import c1Image from "@/assets/c1.jpeg";
import c5Image from "@/assets/c5.jpeg";


const slides = [
  {
    image: heroBanner,
    icon: Shield,
    badge: "Trusted by 22 Corporate Clients",
    title: "Complete Corporate Solutions for Your Business",
    description: "From fire safety to fumigation, cleaning to waste management – we deliver professional services that keep your business running smoothly and safely.",
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
    image: c1Image,
    icon: Flame,
    badge: "Fire Safety Installation",
    title: "Advanced Fire Protection Systems",
    description: "State-of-the-art fire safety equipment installation and maintenance for maximum protection and compliance.",
    cta: "View Projects",
    ctaLink: "/projects",
  },
  {
    image: c5Image,
    icon: Flame,
    badge: "Fire Safety Compliance",
    title: "Complete Fire Safety Management",
    description: "End-to-end fire safety services ensuring full compliance with safety regulations and industry standards.",
    cta: "Request Service",
    ctaLink: "/contact",
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
];

// Typewriter component for auto-typing effect
const Typewriter = ({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete && text.length > 0) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-secondary ml-1 align-middle"
        />
      )}
    </span>
  );
};

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.8, 1]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setShowDescription(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setShowDescription(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 8000);
    return () => clearInterval(timer);
  }, [goToNext]);

  // Ken Burns effect - slow zoom on image
  useEffect(() => {
    setImageScale(1);
    const timeout = setTimeout(() => setImageScale(1.1), 100);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  // 3D Cube rotation effect - slides rotate like faces of a cube
  const imageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      rotateX: direction > 0 ? -15 : 15,
      x: direction > 0 ? "50%" : "-50%",
      z: -500,
      scale: 0.8,
      opacity: 0,
      filter: "brightness(0.3)",
    }),
    center: {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      z: 0,
      scale: 1,
      opacity: 1,
      filter: "brightness(1)",
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      rotateX: direction > 0 ? 15 : -15,
      x: direction > 0 ? "-50%" : "50%",
      z: -500,
      scale: 0.8,
      opacity: 0,
      filter: "brightness(0.3)",
    }),
  };

  // Text container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
    },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden" style={{ perspective: "2000px", perspectiveOrigin: "center center" }}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-[1] opacity-30 pointer-events-none">
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--secondary) / 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Background Images with 3D Cube Rotation + Parallax effect */}
      <motion.div 
        className="absolute inset-0" 
        style={{ 
          transformStyle: "preserve-3d",
          y: backgroundY,
          scale: scale,
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              mass: 1.2,
            }}
            className="absolute inset-0"
            style={{ 
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              animate={{ scale: imageScale }}
              transition={{ duration: 8, ease: "linear" }}
            />
            {/* Modern gradient overlay with multiple layers */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" 
              style={{ opacity: overlayOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--primary)/0.3)_100%)]" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-secondary/30"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{ 
              y: "-10%",
              x: `${Math.random() * 100}%`,
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div className="container mx-auto px-4 relative z-10" style={{ y: contentY }}>
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              {/* Badge with Icon */}
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="p-3 bg-secondary/20 backdrop-blur-sm rounded-xl border border-secondary/30"
                >
                  <Icon className="w-6 h-6 text-secondary" />
                </motion.div>
                <span className="text-secondary font-bold text-sm uppercase tracking-[0.2em] px-4 py-2 bg-secondary/10 backdrop-blur-sm rounded-full border border-secondary/20">
                  {slide.badge}
                </span>
              </motion.div>

              {/* Title with Typewriter Effect */}
              <motion.div variants={itemVariants}>
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <Typewriter 
                    text={slide.title} 
                    speed={40}
                    onComplete={() => setShowDescription(true)}
                  />
                </h1>
                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-secondary via-secondary/50 to-transparent mt-4 origin-left rounded-full max-w-md"
                />
              </motion.div>

              {/* Description with fade-in after title completes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showDescription ? 1 : 0, 
                  y: showDescription ? 0 : 20 
                }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light">
                  {slide.description}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Link to={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="group relative bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-7 text-lg shadow-2xl shadow-secondary/30 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {slide.cta}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group bg-white/5 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-primary font-bold px-10 py-7 text-lg transition-all duration-300"
                  >
                    <span className="mr-2">Our Services</span>
                    <motion.span
                      className="inline-block"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modern Navigation Arrows */}
      <motion.button
        onClick={goToPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-secondary hover:border-secondary transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </motion.button>
      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-secondary hover:border-secondary transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </motion.button>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3 p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
        {slides.map((s, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setShowDescription(false);
              setCurrentSlide(index);
            }}
            className="group relative flex items-center justify-center"
          >
            <motion.div
              className={`h-3 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-10 bg-secondary"
                  : "w-3 bg-white/40 hover:bg-white/60"
              }`}
              layoutId={index === currentSlide ? "activeIndicator" : undefined}
            />
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {s.badge}
            </div>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-8 z-20 text-white/60 font-mono text-sm">
        <span className="text-secondary font-bold text-xl">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
      
      {/* Side accent line */}
      <motion.div
        className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-secondary to-transparent z-20 hidden lg:block"
        animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
};

export default HeroCarousel;
