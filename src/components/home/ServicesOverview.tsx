import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Bug, Sparkles, Shirt, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Flame,
    title: "Fire Services & Safety",
    description: "Complete fire safety solutions including equipment supply, installation, inspection, and staff training.",
    color: "from-red-500 to-orange-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
  },
  {
    icon: Bug,
    title: "Fumigation & Pest Control",
    description: "Professional pest management for residential, commercial, and industrial spaces with eco-friendly solutions.",
    color: "from-green-500 to-teal-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
  },
  {
    icon: Sparkles,
    title: "General Cleanliness",
    description: "Comprehensive cleaning services for offices, homes, and industrial facilities with trained professionals.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Shirt,
    title: "Ushanaji (Tailoring)",
    description: "Custom corporate uniforms, safety gear, and branded workwear with professional tailoring services.",
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
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
              <div className="corporate-card p-8 h-full group hover:border-primary/50 cursor-pointer">
                <div className={`${service.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link to="/services" className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
