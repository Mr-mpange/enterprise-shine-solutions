import { motion } from "framer-motion";
import { Shield, Award, FileCheck, CheckCircle } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    description: "Quality Management System",
  },
  {
    icon: FileCheck,
    title: "OSHA Certified",
    description: "Occupational Safety & Health",
  },
  {
    icon: Award,
    title: "Fire Safety Council",
    description: "Accredited Member",
  },
  {
    icon: CheckCircle,
    title: "EPA Registered",
    description: "Environmental Protection",
  },
];

const Certifications = () => {
  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Certified & Accredited
          </h3>
          <p className="text-muted-foreground">
            Trusted by regulatory bodies and industry leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                <cert.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-foreground mb-1">{cert.title}</h4>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
