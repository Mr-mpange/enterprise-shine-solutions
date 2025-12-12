import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
    </motion.div>
  );
};
