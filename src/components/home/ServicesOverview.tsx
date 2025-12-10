import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Bug, Sparkles, Shirt, ArrowRight, CheckCircle2, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import fireServices from "@/assets/fire-services.jpg";
import fumigationServices from "@/assets/fumigation-services.jpg";
import cleaningServices from "@/assets/cleaning-services.jpg";
import tailoringServices from "@/assets/tailoring-services.jpg";
import { CountUp } from "./StatsCounter";

const services = [
  {
    icon: Flame,
    title: "Fire Services & Safety",
    description: "Complete fire safety solutions including equipment supply, installation, inspection, and staff training.",
    color: "from-red-500 to-orange-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-600 to-orange-500",
    image: fireServices,
    backDetails: [
      "Fire Extinguisher Supply & Installation",
      "Fire Alarm Systems",
      "Emergency Evacuation Planning",
      "Staff Safety Training",
      "Annual Inspections & Maintenance",
    ],
    stats: { projects: 250, clients: 180, experience: 12 },
  },
  {
    icon: Bug,
    title: "Fumigation & Pest Control",
    description: "Professional pest management for residential, commercial, and industrial spaces with eco-friendly solutions.",
    color: "from-green-500 to-teal-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-600 to-teal-500",
    image: fumigationServices,
    backDetails: [
      "Termite Control & Prevention",
      "Rodent Management",
      "Insect Extermination",
      "Eco-Friendly Treatments",
      "Regular Maintenance Programs",
    ],
    stats: { projects: 450, clients: 320, experience: 15 },
  },
  {
    icon: Sparkles,
    title: "General Cleanliness",
    description: "Comprehensive cleaning services for offices, homes, and industrial facilities with trained professionals.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-600 to-cyan-500",
    image: cleaningServices,
    backDetails: [
      "Office & Commercial Cleaning",
      "Post-Construction Cleanup",
      "Deep Cleaning Services",
      "Window & Facade Cleaning",
      "Sanitization & Disinfection",
    ],
    stats: { projects: 380, clients: 200, experience: 10 },
  },
  {
    icon: Shirt,
    title: "Ushanaji (Tailoring)",
    description: "Custom corporate uniforms, safety gear, and branded workwear with professional tailoring services.",
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-500",
    image: tailoringServices,
    backDetails: [
      "Corporate Uniform Design",
      "Safety Workwear Production",
      "Branded Apparel",
      "Bulk Order Capabilities",
      "Custom Fitting Services",
    ],
    stats: { projects: 150, clients: 95, experience: 8 },
  },
];

// Flip Card Component
const FlipCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-[380px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 corporate-card overflow-hidden backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Image Section */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-40`} />
            <div className={`absolute bottom-3 left-3 ${service.iconBg} w-11 h-11 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20`}>
              <service.icon className={`w-5 h-5 ${service.iconColor}`} />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-4">
            <h3 className="text-base font-bold mb-2">
              {service.title}
            </h3>
            <p className="text-muted-foreground mb-3 leading-relaxed text-xs">
              {service.description}
            </p>
            <div className="flex items-center text-primary font-semibold text-xs gap-1.5">
              <span>Hover for details</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className={`absolute inset-0 ${service.bgColor} rounded-xl p-4 flex flex-col justify-between text-white backface-hidden`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                <service.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-bold">{service.title}</h3>
            </div>
            
            <ul className="space-y-2">
              {service.backDetails.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -10 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <Link to="/services">
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold text-xs"
            >
              Learn More
              <ArrowRight className="ml-1.5 w-3 h-3" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Stats Card Component
const ServiceStats = ({ stats, index }: { stats: typeof services[0]["stats"]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className="grid grid-cols-3 gap-1.5 mt-3"
    >
      <div className="bg-muted/50 rounded-lg p-2 text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
          <Award className="w-3 h-3" />
        </div>
        <div className="text-base font-bold">
          <CountUp target={stats.projects} suffix="+" />
        </div>
        <div className="text-[10px] text-muted-foreground">Projects</div>
      </div>
      <div className="bg-muted/50 rounded-lg p-2 text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
          <Users className="w-3 h-3" />
        </div>
        <div className="text-base font-bold">
          <CountUp target={stats.clients} suffix="+" />
        </div>
        <div className="text-[10px] text-muted-foreground">Clients</div>
      </div>
      <div className="bg-muted/50 rounded-lg p-2 text-center">
        <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
          <Clock className="w-3 h-3" />
        </div>
        <div className="text-base font-bold">
          <CountUp target={stats.experience} suffix=" yrs" />
        </div>
        <div className="text-[10px] text-muted-foreground">Experience</div>
      </div>
    </motion.div>
  );
};

const ServicesOverview = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-block mb-3">
            <span className="text-primary font-semibold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
              Our Services
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Comprehensive Solutions for Every Need
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            We provide integrated services to keep your business safe, clean, and professional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={service.title}>
              <FlipCard service={service} index={index} />
              <ServiceStats stats={service.stats} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link to="/services">
            <Button size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 text-sm">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
