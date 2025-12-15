import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+255715179901" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="w-4 h-4" />
              +255 715 179 901
            </a>
            <a href="mailto:info@pisoninvestment.co.tz" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="w-4 h-4" />
              info@pisoninvestment.co.tz
            </a>
          </div>
          <div className="text-sm">
            Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="./placeholder.svg" 
                alt="PISON INVESTMENT COMPANY Logo" 
                className="w-12 h-12 object-contain rounded-full bg-white/10 p-2"
              />
              <div>
                <div className="text-xl font-bold text-foreground">PISON INVESTMENT</div>
                <div className="text-xs text-muted-foreground">LIMITED</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors relative group ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${
                      location.pathname === item.path
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Link to="/contact">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium shadow-lg">
                  Request Service
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Request Service
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;
