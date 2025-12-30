import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageLightbox, GalleryImage } from "@/components/ui/image-lightbox";
import { LazyImage } from "@/components/ui/lazy-image";
import PageTransition from "@/components/ui/PageTransition";
import fireImage from "@/assets/fire-services.jpg";
import fumigationImage from "@/assets/fumigation-services.jpg";
import cleaningImage from "@/assets/cleaning-services.jpg";
import fireTraining from "@/assets/fire-training.jpg";
import pestInspection from "@/assets/pest-inspection.jpg";
import beforeAfterCleaning from "@/assets/before-after-cleaning.jpg";
import happyClients from "@/assets/happy-clients.jpg";
import c2Image from "@/assets/c2.jpeg";
import c3Image from "@/assets/c3.jpeg";
import c4Image from "@/assets/c4.jpeg";


const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projects = [
    {
      title: "Corporate Fire Safety System",
      category: "fire",
      image: c2Image,
      description: "Advanced fire safety equipment installation for corporate headquarters.",
      client: "Corporate Office Complex",
    },
    {
      title: "Industrial Fire Protection",
      category: "fire", 
      image: c3Image,
      description: "Comprehensive fire protection system for manufacturing facility.",
      client: "Industrial Manufacturing Ltd",
    },
    {
      title: "Commercial Fire Safety Setup",
      category: "fire",
      image: c4Image,
      description: "Professional fire safety installation for commercial building.",
      client: "Commercial Plaza",
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
      title: "Industrial Complex Fire Training",
      category: "fire",
      image: fireTraining,
      description: "Fire safety training program for 200+ industrial workers and management.",
      client: "Industrial Complex Ltd",
    },
    {
      title: "School Termite Treatment",
      category: "fumigation",
      image: pestInspection,
      description: "Comprehensive termite control and prevention for educational institution.",
      client: "Premier Academy",
    },
    {
      title: "Mall Deep Cleaning Services",
      category: "cleaning",
      image: beforeAfterCleaning,
      description: "Post-construction deep cleaning and ongoing maintenance for shopping mall.",
      client: "City Mall Dar",
    },
    {
      title: "Corporate Office Fire Safety Audit",
      category: "fire",
      image: fireImage,
      description: "Comprehensive fire safety audit and equipment installation for corporate headquarters.",
      client: "Finance Corporation",
    },
    {
      title: "Restaurant Pest Management",
      category: "fumigation",
      image: fumigationImage,
      description: "Monthly pest control and sanitation services for restaurant chain.",
      client: "Fine Dining Group",
    },
    {
      title: "Factory Floor Cleaning",
      category: "cleaning",
      image: cleaningImage,
      description: "Industrial cleaning and maintenance services for manufacturing facility.",
      client: "Production Industries Ltd",
    },
    {
      title: "Office Complex Waste Management",
      category: "waste-management",
      image: cleaningImage,
      description: "Regular waste collection and disposal services for multi-story office complex.",
      client: "Business Park Tanzania",
    },
    {
      title: "Hospital Waste Collection Program",
      category: "waste-management",
      image: beforeAfterCleaning,
      description: "Non-hazardous waste collection and proper disposal for healthcare facility.",
      client: "City Medical Center",
    },
    {
      title: "Shopping Mall Waste Management",
      category: "waste-management",
      image: cleaningImage,
      description: "Comprehensive waste collection and transportation services for retail complex.",
      client: "Mlimani City Mall",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "fire", label: "Fire Services" },
    { id: "fumigation", label: "Fumigation" },
    { id: "cleaning", label: "Cleaning" },
    { id: "waste-management", label: "Waste Management" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const lightboxImages = filteredProjects.map(p => ({
    src: p.image,
    alt: p.title,
    title: `${p.title} - ${p.client}`,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <PageTransition>
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
                Discover the quality and excellence we deliver across fire safety, fumigation, cleaning, and waste management services.
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

        {/* Projects Grid with Lazy Loading */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title + index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="corporate-card overflow-hidden group"
                >
                  <GalleryImage
                    src={project.image}
                    alt={project.title}
                    title={project.title}
                    className="h-64"
                    onClick={() => openLightbox(index)}
                  />
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



        {/* Before & After Showcase */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-block mb-4">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
                  Results That Speak
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Before & After</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See the transformation our services deliver
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GalleryImage
                  src={beforeAfterCleaning}
                  alt="Deep cleaning transformation"
                  title="Deep Cleaning Transformation"
                  className="rounded-2xl h-80 shadow-xl"
                  onClick={() => {
                    const beforeAfterIndex = lightboxImages.findIndex(img => img.src === beforeAfterCleaning);
                    setLightboxIndex(beforeAfterIndex);
                    setLightboxOpen(true);
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GalleryImage
                  src={happyClients}
                  alt="Satisfied clients"
                  title="Our Happy Clients"
                  className="rounded-2xl h-80 shadow-xl"
                  onClick={() => {
                    const happyClientsIndex = lightboxImages.findIndex(img => img.src === happyClients);
                    setLightboxIndex(happyClientsIndex);
                    setLightboxOpen(true);
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background">
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

        {/* Lightbox */}
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </PageTransition>
  );
};

export default Projects;
