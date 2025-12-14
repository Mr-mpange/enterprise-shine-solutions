import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X, Send } from "lucide-react";
import { Button } from "./button";

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickMessages = [
    "I need a quote for fire safety services",
    "I'm interested in fumigation services",
    "I want to inquire about cleaning services",
    "I need waste management services",
  ];

  const handleSendMessage = (msg: string) => {
    const encodedMessage = encodeURIComponent(msg);
    window.open(`https://wa.me/255123456789?text=${encodedMessage}`, "_blank");
    setShowChat(false);
    setMessage("");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* WhatsApp Chat Widget */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="absolute bottom-20 right-0 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Chat Header */}
                <div className="bg-green-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Geke Mtambo</p>
                        <p className="text-xs text-white/80">Usually replies instantly</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowChat(false)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="p-4 bg-muted/30">
                  {/* Welcome Message */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] mb-4"
                  >
                    <p className="text-sm text-foreground">
                      👋 Hello! Welcome to Geke Mtambo. How can we assist you today?
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 block">Just now</span>
                  </motion.div>

                  {/* Quick Messages */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium mb-2">Quick messages:</p>
                    {quickMessages.map((msg, index) => (
                      <motion.button
                        key={msg}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        onClick={() => handleSendMessage(msg)}
                        className="w-full text-left text-xs bg-card hover:bg-accent p-2.5 rounded-lg border border-border transition-colors"
                      >
                        {msg}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-3 bg-card border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 text-sm bg-muted/50 border border-border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && message.trim()) {
                          handleSendMessage(message);
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      className="rounded-full bg-green-500 hover:bg-green-600 w-10 h-10"
                      onClick={() => message.trim() && handleSendMessage(message)}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Options */}
          <AnimatePresence>
            {isOpen && !showChat && (
              <motion.div className="absolute bottom-20 right-0 flex flex-col gap-3">
                <motion.a
                  href="tel:+255123456789"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium text-sm whitespace-nowrap">Call Us</span>
                </motion.a>
                
                <motion.a
                  href="mailto:info@mtambo.co.tz"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg bg-secondary hover:bg-secondary/90 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium text-sm whitespace-nowrap">Email</span>
                </motion.a>

                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowChat(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg bg-green-500 hover:bg-green-600 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium text-sm whitespace-nowrap">WhatsApp</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            onClick={() => {
              if (showChat) {
                setShowChat(false);
              } else {
                setIsOpen(!isOpen);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-green-500 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:shadow-2xl relative"
          >
            {/* Pulse animation */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-green-500"
            />
            <motion.div
              animate={{ rotate: isOpen || showChat ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen || showChat ? (
                <X className="w-6 h-6 relative z-10" />
              ) : (
                <MessageCircle className="w-6 h-6 relative z-10" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContact;
