import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    color: "text-secondary",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Clients",
    color: "text-primary",
  },
  {
    icon: Building2,
    value: 1200,
    suffix: "+",
    label: "Projects Completed",
    color: "text-accent",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    color: "text-secondary",
  },
];

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {isVisible && <CountUp target={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

export default StatsCounter;
