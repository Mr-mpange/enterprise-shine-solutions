import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
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
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-semibold text-xs uppercase tracking-wider">
                Trusted by 500+ Businesses
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Complete Corporate Solutions for Your Business
            </h1>

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">
              From fire safety to fumigation, cleaning to custom uniforms – we deliver professional services that keep your business running smoothly and safely.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link to="/contact">
                <Button
                  size="default"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-5 text-sm shadow-xl hover:scale-105 transition-transform"
                >
                  Request Service
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="default"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary font-semibold px-6 py-5 text-sm"
                >
                  Our Services
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">15+</div>
                  <div className="text-white/80 text-xs">Years Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">100%</div>
                  <div className="text-white/80 text-xs">Certified & Licensed</div>
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
