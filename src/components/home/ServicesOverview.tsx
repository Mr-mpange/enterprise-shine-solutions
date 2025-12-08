import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Bug, Sparkles, Shirt, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fireServices from "@/assets/fire-services.jpg";
import fumigationServices from "@/assets/fumigation-services.jpg";
import cleaningServices from "@/assets/cleaning-services.jpg";
import tailoringServices from "@/assets/tailoring-services.jpg";

const services = [
  {
    icon: Flame,
    title: "Fire Services & Safety",
    description: "Complete fire safety solutions including equipment supply, installation, inspection, and staff training.",
    color: "from-red-500 to-orange-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    image: fireServices,
  },
  {
    icon: Bug,
    title: "Fumigation & Pest Control",
    description: "Professional pest management for residential, commercial, and industrial spaces with eco-friendly solutions.",
    color: "from-green-500 to-teal-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
    image: fumigationServices,
  },
  {
    icon: Sparkles,
    title: "General Cleanliness",
    description: "Comprehensive cleaning services for offices, homes, and industrial facilities with trained professionals.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    image: cleaningServices,
  },
  {
    icon: Shirt,
    title: "Ushanaji (Tailoring)",
    description: "Custom corporate uniforms, safety gear, and branded workwear with professional tailoring services.",
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    image: tailoringServices,
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Solutions for Every Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide integrated services to keep your business safe, clean, and professional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="corporate-card overflow-hidden h-full group hover:border-primary/50 cursor-pointer">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                  <div className={`absolute bottom-4 left-4 ${service.iconBg} w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <Link to="/services" className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
