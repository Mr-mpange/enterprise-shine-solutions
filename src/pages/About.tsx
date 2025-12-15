import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
// import TeamSection from "@/components/home/TeamSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import { ImageLightbox, GalleryImage } from "@/components/ui/image-lightbox";

import PageTransition from "@/components/ui/PageTransition";
import teamPhoto from "@/assets/team-photo.jpg";
import officeInterior from "@/assets/office-interior.jpg";
import partnership from "@/assets/partnership.jpg";
import companyBuilding from "@/assets/company-building.jpg";
// import certificationsDisplay from "@/assets/certifications-display.jpg"; // Removed - replaced with real certificates

const About = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [certificateLightboxOpen, setCertificateLightboxOpen] = useState(false);
  const [certificateLightboxIndex, setCertificateLightboxIndex] = useState(0);

  const galleryImages = [
    { src: companyBuilding, alt: "Company headquarters", title: "Our Modern Headquarters" },
    { src: officeInterior, alt: "Modern office interior", title: "State-of-the-Art Facilities" },
    { src: teamPhoto, alt: "Our professional team", title: "Our Professional Team" },
    { src: partnership, alt: "Professional partnership", title: "Strong Partnerships" },
  ];

  // Certificate images for lightbox
  const certificateImages = [
    { src: "/Certificate1.png", alt: "Fire Safety Certificate", title: "Fire Safety Certificate - Fire Protection Systems" },
    { src: "/fumigation.png", alt: "Fumigation Certificate", title: "Fumigation Certificate - Pest Control & Fumigation" },
    { src: "/waste.png", alt: "Waste Management Certificate", title: "Waste Management License - Environmental Protection" },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openCertificateLightbox = (index: number) => {
    setCertificateLightboxIndex(index);
    setCertificateLightboxOpen(true);
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Building safer, cleaner, and more efficient workspaces for businesses across Tanzania since 2008.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block mb-4">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
                    Our Story
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Excellence in Service Since 2008
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pison Investment Limited is a leading provider of comprehensive fire protection systems and pest control services. The company is built on a strong commitment to quality, safety, innovation, and customer satisfaction.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With a team of highly trained professionals, Pison Investment delivers tailored solutions that meet the specific needs of each client. By leveraging modern technology and proven methodologies, the company ensures efficient service delivery while maintaining the highest safety and industry standards.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="corporate-card p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="corporate-card p-6 text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="corporate-card p-6 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">1200+</div>
                  <div className="text-sm text-muted-foreground">Projects Done</div>
                </div>
                <div className="corporate-card p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
              </motion.div>
            </div>

            {/* Image Gallery Section with Lightbox */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {galleryImages.slice(0, 3).map((image, index) => (
                <GalleryImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  className="rounded-2xl h-64 shadow-lg"
                  onClick={() => openLightbox(index)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vision, Mission & Core Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our Foundation</h2>
              <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="corporate-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the foremost provider of fire safety and pest control solutions, setting the industry standard for safety, reliability, and innovation.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="corporate-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-secondary">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To protect lives and property by delivering exceptional fire safety and pest control services, fostering safe and healthy environments through expertise, dedication, and advanced technology.
                </p>
              </motion.div>

              {/* Core Values */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="corporate-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-accent">Core Values</h3>
                <ul className="text-muted-foreground text-left space-y-2">
                  <li><strong>Customer Focus</strong> – Personalized solutions and responsive support</li>
                  <li><strong>Quality & Safety</strong> – Strict adherence to safety and service standards</li>
                  <li><strong>Professional Expertise</strong> – Highly trained and experienced personnel</li>
                  <li><strong>Innovation</strong> – Use of modern tools, systems, and methodologies</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>





        {/* Team Section */}
        {/* <TeamSection /> */}

        {/* Key Strengths with Images */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Strengths</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                What makes us the preferred choice for businesses across Tanzania
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GalleryImage
                  src={partnership}
                  alt="Professional partnership"
                  title="Strong Business Partnerships"
                  className="rounded-2xl h-96 shadow-xl"
                  onClick={() => openLightbox(3)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Highly trained professionals with decades of combined experience delivering exceptional results
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Certified Excellence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      ISO certified with full regulatory compliance and industry accreditations
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      15+ years of consistent excellence serving 500+ satisfied clients
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Certifications Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-16">
                <div className="inline-block mb-6">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
                    🏆 Certified Excellence
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Our Professional Certifications
                </h3>
                <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                  Industry recognition and regulatory compliance that validates our commitment to safety, quality, and environmental responsibility
                </p>
              </div>
              
              {/* Certificates Grid */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {/* Fire Safety Certificate */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Fire Safety Certificate</h4>
                      <p className="text-red-600 font-medium text-sm">Fire Protection Systems</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-inner mb-6 cursor-pointer" onClick={() => openCertificateLightbox(0)}>
                      <img 
                        src="/Certificate1.png" 
                        alt="Fire Safety Certificate - Fire Protection Systems" 
                        className="w-full h-64 object-contain rounded-xl group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        CERTIFIED
                      </div>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <Eye className="w-6 h-6 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-red-600 font-medium bg-red-50 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Fire Safety Compliance
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Fumigation Certificate */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Fumigation Certificate</h4>
                      <p className="text-purple-600 font-medium text-sm">Pest Control & Fumigation</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-inner mb-6 cursor-pointer" onClick={() => openCertificateLightbox(1)}>
                      <img 
                        src="/fumigation.png" 
                        alt="Fumigation Certificate - Pest Control & Fumigation Services" 
                        className="w-full h-64 object-contain rounded-xl group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        CERTIFIED
                      </div>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <Eye className="w-6 h-6 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-purple-600 font-medium bg-purple-50 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        Pest Control Licensed
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Waste Management Certificate */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Waste Management License</h4>
                      <p className="text-green-600 font-medium text-sm">Environmental Protection</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-inner mb-6 cursor-pointer" onClick={() => openCertificateLightbox(2)}>
                      <img 
                        src="/waste.png" 
                        alt="Waste Management Certificate - Environmental Protection" 
                        className="w-full h-64 object-contain rounded-xl group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        LICENSED
                      </div>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <Eye className="w-6 h-6 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        EPA Approved
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex flex-wrap items-center justify-center gap-8 p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl border border-primary/10 shadow-lg">
                  <div className="flex items-center gap-3 text-base font-semibold text-gray-700">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    <span>Fully Licensed & Certified</span>
                  </div>
                  <div className="w-px h-8 bg-gray-300 hidden md:block"></div>
                  <div className="flex items-center gap-3 text-base font-semibold text-gray-700">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Industry Recognized</span>
                  </div>
                  <div className="w-px h-8 bg-gray-300 hidden md:block"></div>
                  <div className="flex items-center gap-3 text-base font-semibold text-gray-700">
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                    <span>15+ Years Excellence</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
              <p className="text-muted-foreground text-lg">Milestones that shaped our success</p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                { year: "2008", title: "Company Founded", desc: "Started as a fire safety equipment supplier" },
                { year: "2012", title: "Service Expansion", desc: "Added fumigation and pest control services" },
                { year: "2016", title: "ISO Certification", desc: "Achieved ISO 9001:2015 quality management certification" },
                { year: "2019", title: "Waste Management Division", desc: "Launched comprehensive waste collection and disposal services" },
                { year: "2023", title: "500+ Clients", desc: "Reached milestone of serving 500+ businesses across Tanzania" },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                  <div className="flex-1 corporate-card p-6">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Certificate Lightbox */}
      <ImageLightbox
        images={certificateImages}
        initialIndex={certificateLightboxIndex}
        isOpen={certificateLightboxOpen}
        onClose={() => setCertificateLightboxOpen(false)}
      />
      </div>
    </PageTransition>
  );
};

export default About;
