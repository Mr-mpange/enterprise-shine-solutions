import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame, Bug, Sparkles, Shirt, CheckCircle, ArrowRight } from "lucide-react";
import fireImage from "@/assets/fire-services.jpg";
import fumigationImage from "@/assets/fumigation-services.jpg";
import cleaningImage from "@/assets/cleaning-services.jpg";
import tailoringImage from "@/assets/tailoring-services.jpg";
import fireTraining from "@/assets/fire-training.jpg";
import pestInspection from "@/assets/pest-inspection.jpg";
import beforeAfterCleaning from "@/assets/before-after-cleaning.jpg";
import uniformShowcase from "@/assets/uniform-showcase.jpg";

const Services = () => {
  const services = [
    {
      id: "fire",
      icon: Flame,
      title: "Fire Services & Safety Solutions",
      image: fireImage,
      galleryImage: fireTraining,
      description: "Comprehensive fire protection services to keep your premises safe and compliant with all safety regulations.",
      features: [
        "Fire Equipment Supply & Installation",
        "Fire Alarm Systems",
        "Sprinkler System Installation",
        "Fire Extinguisher Inspection & Refilling",
        "Fire Safety Training for Staff",
        "Fire Safety Audits & Consultation",
        "Emergency Response Planning",
        "24/7 Emergency Support",
      ],
      color: "from-red-500 to-orange-500",
    },
    {
      id: "fumigation",
      icon: Bug,
      title: "Fumigation & Pest Control",
      image: fumigationImage,
      galleryImage: pestInspection,
      description: "Professional pest management solutions using eco-friendly methods to protect your property from unwanted pests.",
      features: [
        "Residential Pest Control",
        "Commercial & Industrial Fumigation",
        "Termite Control & Treatment",
        "Mosquito & Fly Control Programs",
        "Rodent Control & Prevention",
        "Bed Bug Elimination",
        "Disinfection Services",
        "Regular Maintenance Programs",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      id: "cleaning",
      icon: Sparkles,
      title: "General Cleanliness & Environmental Care",
      image: cleaningImage,
      galleryImage: beforeAfterCleaning,
      description: "Professional cleaning services tailored to meet the unique needs of your facility with trained staff and modern equipment.",
      features: [
        "Office Cleaning Services",
        "Domestic Cleaning",
        "Industrial Facility Cleaning",
        "Post-Construction Cleaning",
        "Deep Cleaning Services",
        "Floor Polishing & Maintenance",
        "Window & Glass Cleaning",
        "Landscaping & Garden Maintenance",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "tailoring",
      icon: Shirt,
      title: "Ushanaji (Tailoring & Uniform Production)",
      image: tailoringImage,
      galleryImage: uniformShowcase,
      description: "Custom tailoring services for corporate uniforms, safety gear, and branded workwear to enhance your professional image.",
      features: [
        "Corporate Uniform Design & Production",
        "Safety Uniforms (Reflective Gear, Overalls)",
        "School Uniforms",
        "Hospitality Uniforms",
        "Security Guard Uniforms",
        "Medical Scrubs & Lab Coats",
        "Custom Branding & Embroidery",
        "Uniform Maintenance & Repair",
      ],
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Comprehensive solutions for fire safety, pest control, cleaning, and professional uniforms – all under one trusted brand.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Detail Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
          >
            <div className="container mx-auto px-4">
              <div className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={index % 2 === 1 ? "md:order-2" : ""}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold">
                      Request This Service
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={index % 2 === 1 ? "md:order-1" : ""}
                >
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <img
                        src={service.galleryImage}
                        alt={`${service.title} - Additional view`}
                        className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Contact us today for a free consultation and quote. Our team is ready to provide the professional service you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8">
                    Get a Free Quote
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary font-semibold px-8">
                    View Our Projects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
