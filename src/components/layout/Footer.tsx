import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Fire Services", path: "/services#fire" },
    { name: "Fumigation", path: "/services#fumigation" },
    { name: "General Cleanliness", path: "/services#cleaning" },
    { name: "Waste Management", path: "/services#waste-management" },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="./placeholder.svg" 
                alt="PISON INVESTMENT COMPANY Logo" 
                className="w-12 h-12 object-contain rounded-full bg-white/10 p-2"
              />
              <div>
                <div className="text-lg font-bold">PISON INVESTMENT</div>
                <div className="text-sm opacity-80">LIMITED</div>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-6 leading-relaxed">
              Your trusted partner for comprehensive fire safety, fumigation, cleaning, and waste management services. Excellence delivered with every project.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full group-hover:w-2 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full group-hover:w-2 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                <div className="text-sm opacity-90">
                  <div>Dar es Salaam: PSPF Twin Tower, 22nd Floor</div>
                  <div>Mtwara: PSSF Building, 1st Floor</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                <div className="text-sm opacity-90">
                  <div><a href="tel:+255715179901" className="hover:opacity-100 transition-opacity">+255 715 179 901</a></div>
                  <div><a href="tel:+255784167476" className="hover:opacity-100 transition-opacity">+255 784 167 476</a></div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-secondary" />
                <a href="mailto:info@pisoninvestment.co.tz" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  info@pisoninvestment.co.tz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-75">
            © {currentYear} Pison Investment Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-75">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
