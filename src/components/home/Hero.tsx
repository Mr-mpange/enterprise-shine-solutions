import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Professional corporate services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Trusted by 500+ Businesses
              </span>
            </div>

            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Complete Corporate Solutions for Your Business
            </h1>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
              From fire safety to fumigation, cleaning to custom uniforms – we deliver professional services that keep your business running smoothly and safely.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-6 text-base shadow-xl hover:scale-105 transition-transform"
                >
                  Request Service
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

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-white font-bold text-2xl">15+</div>
                  <div className="text-white/80 text-sm">Years Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-white font-bold text-2xl">100%</div>
                  <div className="text-white/80 text-sm">Certified & Licensed</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
