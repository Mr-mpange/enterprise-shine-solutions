import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X, Plus } from "lucide-react";

const contactOptions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/255123456789",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    icon: Phone,
    label: "Call Us",
    href: "tel:+255123456789",
    color: "bg-primary hover:bg-primary/90",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:info@mtambo.co.tz",
    color: "bg-secondary hover:bg-secondary/90",
  },
];

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3"
        >
          {/* Contact Options */}
          <AnimatePresence>
            {isOpen &&
              contactOptions.map((option, index) => (
                <motion.a
                  key={option.label}
                  href={option.href}
                  target={option.label === "WhatsApp" ? "_blank" : undefined}
                  rel={option.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg ${option.color} transition-all duration-300`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="font-medium text-sm whitespace-nowrap">
                    {option.label}
                  </span>
                </motion.a>
              ))}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-xl flex items-center justify-center transition-all duration-300 hover:shadow-2xl"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContact;
