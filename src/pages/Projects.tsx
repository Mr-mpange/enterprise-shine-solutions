import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import fireImage from "@/assets/fire-services.jpg";
import fumigationImage from "@/assets/fumigation-services.jpg";
import cleaningImage from "@/assets/cleaning-services.jpg";
import tailoringImage from "@/assets/tailoring-services.jpg";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: "ABC Manufacturing Fire Safety Upgrade",
      category: "fire",
      image: fireImage,
      description: "Complete fire safety system installation including alarms, sprinklers, and equipment.",
      client: "ABC Manufacturing Ltd",
    },
    {
      title: "Grand Hotel Pest Control Program",
      category: "fumigation",
      image: fumigationImage,
      description: "Ongoing pest management and fumigation services for 200-room hotel facility.",
      client: "Grand Hotel Dar es Salaam",
    },
    {
      title: "Tech Solutions Office Cleaning",
      category: "cleaning",
      image: cleaningImage,
      description: "Daily office cleaning and maintenance for modern tech company headquarters.",
      client: "Tech Solutions Tanzania",
    },
    {
      title: "Bank Staff Uniform Production",
      category: "tailoring",
      image: tailoringImage,
      description: "Custom corporate uniforms for 150+ banking staff across 5 branches.",
      client: "National Bank of Tanzania",
    },
    {
      title: "Industrial Complex Fire Training",
      category: "fire",
      image: fireImage,
      description: "Fire safety training program for 200+ industrial workers and management.",
      client: "Industrial Complex Ltd",
    },
    {
      title: "School Termite Treatment",
      category: "fumigation",
      image: fumigationImage,
      description: "Comprehensive termite control and prevention for educational institution.",
      client: "Premier Academy",
    },
    {
      title: "Mall Deep Cleaning Services",
      category: "cleaning",
      image: cleaningImage,
      description: "Post-construction deep cleaning and ongoing maintenance for shopping mall.",
      client: "City Mall Dar",
    },
    {
      title: "Security Uniforms & Gear",
      category: "tailoring",
      image: tailoringImage,
      description: "Reflective safety uniforms and protective gear for security company.",
      client: "SecureGuard Services",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "fire", label: "Fire Services" },
    { id: "fumigation", label: "Fumigation" },
    { id: "cleaning", label: "Cleaning" },
    { id: "tailoring", label: "Tailoring" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Discover the quality and excellence we deliver across fire safety, fumigation, cleaning, and tailoring services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-12 bg-muted/30 border-b border-border sticky top-[88px] z-40 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  className={activeFilter === filter.id ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="corporate-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                      {filters.find(f => f.id === project.category)?.label}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="text-sm font-medium text-foreground">
                      Client: {project.client}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Work Together
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Ready to start your project? Contact us today for a free consultation and see how we can help your business.
              </p>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8">
                Request a Quote
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
