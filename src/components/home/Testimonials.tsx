import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import happyClients from "@/assets/happy-clients.jpg";

const testimonials = [

  {
    name: "Sarah Hassan",
    company: "Tech Solutions Tanzania",
    role: "CEO",
    content: "Outstanding fumigation service! They handled our office pest problem efficiently and with minimal disruption to our operations.",
    rating: 5,
    avatar: "SH",
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "Michael Ochieng",
    company: "Grand Hotel Dar",
    role: "Facilities Director",
    content: "We've been using their cleaning services for 3 years. Consistently reliable, professional, and high-quality work every time.",
    rating: 5,
    avatar: "MO",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Grace Kimani",
    company: "Nairobi Fashion House",
    role: "Creative Director",
    content: "The waste management service exceeded our expectations. Our facility is now cleaner and more organized. Exceptional service!",
    rating: 5,
    avatar: "GK",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "David Nyerere",
    company: "SafeGuard Industries",
    role: "Safety Officer",
    content: "Best fire safety partner we've ever had. Their training programs are comprehensive and their response time is remarkable.",
    rating: 5,
    avatar: "DN",
    gradient: "from-amber-500 to-orange-500",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);


  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div 
            className="inline-flex items-center gap-1.5 mb-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-secondary" />
            <span className="text-primary font-semibold text-xs uppercase tracking-wider">
              Client Testimonials
            </span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Don't just take our word for it – hear from businesses that trust us with their service needs.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
              <img 
                src={happyClients} 
                alt="Happy clients" 
                className="w-full h-full object-cover blur-sm"
              />
            </div>

            {/* Main Card */}
            <motion.div
              className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative p-6 md:p-8 lg:p-10">
                <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-center">
                  {/* Testimonial Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Quote Icon */}
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 fill-secondary text-secondary drop-shadow-lg" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-base md:text-lg font-medium leading-relaxed mb-5 text-foreground">
                        "{activeTestimonial.content}"
                      </blockquote>



                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeTestimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                          {activeTestimonial.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-foreground">{activeTestimonial.name}</div>
                          <div className="text-muted-foreground text-xs">{activeTestimonial.role}</div>
                          <div className="text-primary font-medium text-xs">{activeTestimonial.company}</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Avatar Stack & Navigation */}
                  <div className="hidden lg:flex flex-col items-center gap-6">
                    {/* Avatar Stack */}
                    <div className="flex flex-col gap-3">
                      {testimonials.map((t, index) => (
                        <motion.button
                          key={t.name}
                          onClick={() => setActiveIndex(index)}
                          className={`relative w-14 h-14 rounded-2xl overflow-hidden transition-all duration-300 ${
                            index === activeIndex
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                              : "opacity-50 hover:opacity-100 hover:scale-105"
                          }`}
                          whileHover={{ scale: index === activeIndex ? 1.1 : 1.05 }}
                        >
                          <div className={`w-full h-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold`}>
                            {t.avatar}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center justify-between mt-8 lg:hidden">
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={goToPrev}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:block">
              <motion.button
                onClick={goToPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-background border border-border rounded-full shadow-xl flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Happy Clients", value: "500+" },
              { label: "5-Star Reviews", value: "450+" },
              { label: "Years Trusted", value: "15+" },
              { label: "Repeat Clients", value: "85%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-3 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50"
              >
                <div className="text-xl md:text-2xl font-bold text-primary mb-0.5">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Testimonials;
