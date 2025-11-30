import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import officeInterior from "@/assets/office-interior.jpg";
import partnership from "@/assets/partnership.jpg";
import companyBuilding from "@/assets/company-building.jpg";
import certificationsDisplay from "@/assets/certifications-display.jpg";

const About = () => {
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
                  MultiService Professional Solutions was founded with a vision to provide comprehensive corporate services under one trusted brand. What started as a fire safety equipment supplier has grown into a multi-service company serving over 500 businesses across Tanzania.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we pride ourselves on delivering integrated solutions that help businesses operate safely, maintain clean environments, and present a professional image through our diverse service offerings.
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

            {/* Image Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={companyBuilding} alt="Company headquarters" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={officeInterior} alt="Modern office interior" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={teamPhoto} alt="Our professional team" className="w-full h-64 object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="corporate-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional corporate services that ensure safety, cleanliness, and professionalism for businesses across Tanzania.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="corporate-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and comprehensive corporate service provider in East Africa by 2030.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="corporate-card p-8 text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Excellence, Integrity, Safety, Customer Focus, and Continuous Innovation in everything we do.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Strengths with Images */}
        <section className="py-24 bg-background">
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
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img src={partnership} alt="Professional partnership" className="w-full h-96 object-cover" />
                </div>
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

            {/* Certifications Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={certificationsDisplay} alt="Our certifications and awards" className="w-full h-80 object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-24 bg-muted/30">
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
                { year: "2019", title: "Tailoring Division", desc: "Launched custom uniform production services" },
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
    </div>
  );
};

export default About;
