import { motion } from "framer-motion";
import { Shield, Users, Clock, Award, Wrench, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Certified & Licensed",
    description: "Fully certified professionals with all necessary licenses and insurance coverage.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "15+ years of industry experience with highly trained and skilled personnel.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Support",
    description: "Round-the-clock availability for urgent service requests and emergencies.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Commitment to excellence with quality assurance on every project.",
  },
  {
    icon: Wrench,
    title: "Modern Equipment",
    description: "Latest technology and equipment for efficient and effective service delivery.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description: "Dedicated customer support and personalized service solutions.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-background">
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
              Why Choose Us
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your Trusted Service Partner
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            We combine expertise, reliability, and dedication to deliver exceptional results for every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex-shrink-0">
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <feature.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
