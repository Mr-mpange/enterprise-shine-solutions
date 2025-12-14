import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Flame, Bug, Sparkles, Trash2, ArrowRight, CheckCircle2, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import fireServices from "@/assets/fire-services.jpg";
import fumigationServices from "@/assets/fumigation-services.jpg";
import cleaningServices from "@/assets/cleaning-services.jpg";

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
    title: "General Cleanliness & Waste Management",
    description: "Comprehensive cleaning services and waste management solutions for offices, homes, and industrial facilities.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-600 to-cyan-500",
    image: cleaningServices,
    backDetails: [
      "Office & Commercial Cleaning",
      "Non-Hazardous Waste Collection",
      "Waste Transportation to Dumps",
      "Deep Cleaning Services",
      "Sanitization & Disinfection",
    ],
    stats: { projects: 380, clients: 200, experience: 10 },
  },
  {
    icon: Trash2,
    title: "Waste Management",
    description: "Professional waste collection and disposal services for non-hazardous waste from various locations to authorized dumps.",
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-600 to-teal-500",
    image: cleaningServices,
    backDetails: [
      "Non-Hazardous Waste Collection",
      "Scheduled Pickup Services",
      "Waste Transportation",
      "Authorized Dump Disposal",
      "Environmental Compliance",
    ],
    stats: { projects: 200, clients: 150, experience: 8 },
  },
];

// Enhanced 3D Flip Card Component with dynamic effects
const FlipCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-[380px]"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        animate={{ 
          rotateY: isFlipped ? 180 : mousePosition.x * 15,
          rotateX: isFlipped ? 0 : -mousePosition.y * 15,
          scale: isFlipped ? 1.02 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 20,
          rotateY: { duration: 0.6 }
        }}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <motion.div
          className="absolute inset-0 corporate-card overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            }}
          />
          
          {/* Image Section with 3D depth */}
          <motion.div 
            className="relative h-40 overflow-hidden"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isFlipped ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-40`} />
            <motion.div 
              className={`absolute bottom-3 left-3 ${service.iconBg} w-11 h-11 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ transform: "translateZ(30px)" }}
            >
              <service.icon className={`w-5 h-5 ${service.iconColor}`} />
            </motion.div>
          </motion.div>
          
          {/* Content Section */}
          <div className="p-4" style={{ transform: "translateZ(10px)" }}>
            <h3 className="text-base font-bold mb-2">
              {service.title}
            </h3>
            <p className="text-muted-foreground mb-3 leading-relaxed text-xs">
              {service.description}
            </p>
            <motion.div 
              className="flex items-center text-primary font-semibold text-xs gap-1.5"
              animate={{ x: isFlipped ? 0 : [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>Hover for details</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </div>
        </motion.div>

        {/* Back of Card with enhanced 3D */}
        <motion.div
          className={`absolute inset-0 ${service.bgColor} rounded-xl p-4 flex flex-col justify-between text-white overflow-hidden`}
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          
          <div style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-center gap-2 mb-4">
              <motion.div 
                className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"
                animate={{ rotate: isFlipped ? [0, 360] : 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <service.icon className="w-4 h-4 text-white" />
              </motion.div>
              <h3 className="text-base font-bold">{service.title}</h3>
            </div>
            
            <ul className="space-y-2">
              {service.backDetails.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20, rotateX: -90 }}
                  animate={{ 
                    opacity: isFlipped ? 1 : 0, 
                    x: isFlipped ? 0 : -20,
                    rotateX: isFlipped ? 0 : -90,
                  }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ transformOrigin: "left center" }}
                >
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
            transition={{ delay: 0.4 }}
            style={{ transform: "translateZ(30px)" }}
            className="pointer-events-auto relative z-50"
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold text-xs shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/services');
              }}
            >
              Learn More
              <ArrowRight className="ml-1.5 w-3 h-3" />
            </Button>
          </motion.div>
        </motion.div>
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
