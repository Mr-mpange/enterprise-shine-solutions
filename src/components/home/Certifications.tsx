import { motion } from "framer-motion";
import { Shield, Award, FileCheck, CheckCircle } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "Fire Safety Certificate",
    description: "Fire Protection Systems",
  },
  {
    icon: FileCheck,
    title: "Fumigation Certificate",
    description: "Pest Control & Fumigation",
  },
  {
    icon: Award,
    title: "Waste Management License",
    description: "Environmental Protection",
  },
  {
    icon: CheckCircle,
    title: "Fully Licensed",
    description: "All Regulatory Compliance",
  },
];

const Certifications = () => {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-lg md:text-xl font-bold mb-2">
            Certified & Accredited
          </h3>
          <p className="text-muted-foreground text-sm">
            Trusted by regulatory bodies and industry leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-3 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                <cert.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-foreground mb-0.5 text-sm">{cert.title}</h4>
              <p className="text-xs text-muted-foreground">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
