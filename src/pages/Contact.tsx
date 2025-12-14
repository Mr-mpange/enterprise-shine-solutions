import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Headphones, Shield, CheckCircle2, ArrowRight, Building2, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageTransition from "@/components/ui/PageTransition";
import officeInterior from "@/assets/office-interior.jpg";
import companyBuilding from "@/assets/company-building.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will contact you within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+255 715 179 901", "+255 784 167 476"],
      action: "tel:+255123456789",
      actionLabel: "Call Now",
      gradient: "from-primary to-primary/80",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@pisoninvestment.co.tz", "support@pisoninvestment.co.tz"],
      action: "mailto:info@pisoninvestment.co.tz",
      actionLabel: "Send Email",
      gradient: "from-secondary to-secondary/80",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Dar es Salaam Office: PSPF Twin Tower, 22nd Floor", "Mtwara Office: PSSF Building, 1st Floor"],
      action: "#map",
      actionLabel: "Get Directions",
      gradient: "from-accent to-accent/80",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      action: null,
      actionLabel: null,
      gradient: "from-muted-foreground to-muted-foreground/80",
    },
  ];

  const features = [
    { icon: Headphones, text: "24/7 Customer Support" },
    { icon: Shield, text: "100% Satisfaction Guarantee" },
    { icon: CheckCircle2, text: "Free Initial Consultation" },
    { icon: Users, text: "Dedicated Account Manager" },
  ];

  const faqs = [
    {
      q: "How quickly can you respond to service requests?",
      a: "We typically respond within 24 hours for standard requests and within 2 hours for emergency situations. Our dedicated team ensures prompt communication and swift action.",
    },
    {
      q: "Do you provide free consultations?",
      a: "Yes, we offer free initial consultations for all our services to assess your needs and provide accurate quotes. Our experts will visit your site at no cost.",
    },
    {
      q: "Are your services available nationwide?",
      a: "We primarily serve Dar es Salaam and surrounding regions, but we can arrange services in other major cities upon request.",
    },
    {
      q: "What certifications do you hold?",
      a: "We are ISO 9001:2015 certified, OSHA compliant, and hold all necessary regulatory licenses for our services including fire safety, pest control, and environmental management.",
    },
    {
      q: "Can you handle large commercial projects?",
      a: "Absolutely! We have extensive experience with commercial and industrial clients, including hotels, factories, office buildings, and government institutions.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept bank transfers, mobile money (M-Pesa, Tigo Pesa), cash, and corporate invoicing for established clients. Flexible payment terms are available.",
    },
  ];

  const stats = [
    { icon: Building2, value: "500+", label: "Corporate Clients" },
    { icon: Globe, value: "15+", label: "Regions Served" },
    { icon: Users, value: "50+", label: "Team Members" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={companyBuilding} 
              alt="Contact Us" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                <MessageCircle className="w-4 h-4" />
                We're Here to Help
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Let's Start a <span className="text-secondary">Conversation</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                Get in touch with our expert team for personalized solutions. We respond within 24 hours and offer free consultations.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards - Floating */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto -mt-20 relative z-10">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-card rounded-2xl p-6 shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${info.gradient}`} />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                      {detail}
                    </p>
                  ))}
                  {info.action && (
                    <a 
                      href={info.action}
                      className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors group-hover:gap-3"
                    >
                      {info.actionLabel}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
              {/* Contact Form - Takes 3 columns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <div className="bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-primary to-primary/90 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">Request a Free Quote</h2>
                    <p className="text-white/80">
                      Fill out the form and our team will get back to you within 24 hours.
                    </p>
                  </div>
                  
                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Full Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="h-12 rounded-xl border-border/50 focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="h-12 rounded-xl border-border/50 focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+255 715 179 901"
                          className="h-12 rounded-xl border-border/50 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Company Name</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company Ltd"
                          className="h-12 rounded-xl border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Service Needed *</label>
                        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-border/50">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fire">🔥 Fire Services & Safety</SelectItem>
                            <SelectItem value="fumigation">🐜 Fumigation & Pest Control</SelectItem>
                            <SelectItem value="cleaning">🧹 General Cleanliness</SelectItem>
                            <SelectItem value="waste-management">🗑️ Waste Management</SelectItem>
                            <SelectItem value="multiple">📦 Multiple Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Estimated Budget</label>
                        <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-border/50">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Under TZS 500,000</SelectItem>
                            <SelectItem value="medium">TZS 500,000 - 2,000,000</SelectItem>
                            <SelectItem value="large">TZS 2,000,000 - 10,000,000</SelectItem>
                            <SelectItem value="enterprise">Above TZS 10,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">Project Details *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your requirements, timeline, and any specific needs..."
                        rows={5}
                        className="rounded-xl border-border/50 focus:border-primary resize-none"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Submit Request
                        </span>
                      )}
                    </Button>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <feature.icon className="w-4 h-4 text-accent" />
                          {feature.text}
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Right Side - Map & Info - Takes 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Office Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl group">
                  <img 
                    src={officeInterior} 
                    alt="Our Office" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Visit Our Headquarters</h3>
                      <p className="text-white/80 text-sm">Experience our state-of-the-art facilities</p>
                    </div>
                  </div>
                </div>
                
                {/* Map */}
                <div id="map" className="rounded-3xl overflow-hidden shadow-xl border border-border/50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.4347582478495!2d39.27358431477288!3d-6.828370295068492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b5f42b9c1c5%3A0x7e0a6f0b5f5e5f5e!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1234567890123"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>

                {/* Emergency Card */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 text-white shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">24/7 Emergency Line</h3>
                      <p className="text-white/80 text-sm mb-4">
                        For urgent fire safety or pest emergencies, our team is available around the clock.
                      </p>
                      <a 
                        href="tel:+255715179901" 
                        className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        +255 715 179 901
                      </a>
                    </div>
                  </div>
                </div>


              </motion.div>
            </div>
          </div>
        </section>

        {/* Office Locations Map */}
        <section id="map" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Office Locations</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Visit us at our convenient locations in Dar es Salaam and Mtwara
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Dar es Salaam Office */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="corporate-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Dar es Salaam Office</h3>
                    <p className="text-muted-foreground">Main Headquarters</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">PSPF Twin Tower</p>
                      <p className="text-muted-foreground">22nd Floor, Dar es Salaam, Tanzania</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a href="tel:+255715179901" className="text-foreground hover:text-primary transition-colors">
                      +255 715 179 901
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a href="mailto:info@pisoninvestment.co.tz" className="text-foreground hover:text-primary transition-colors">
                      info@pisoninvestment.co.tz
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Mtwara Office */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="corporate-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Mtwara Office</h3>
                    <p className="text-muted-foreground">Regional Branch</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">PSSF Building</p>
                      <p className="text-muted-foreground">1st Floor, Mtwara, Tanzania</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a href="tel:+255784167476" className="text-foreground hover:text-primary transition-colors">
                      +255 784 167 476
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a href="mailto:info@pisoninvestment.co.tz" className="text-foreground hover:text-primary transition-colors">
                      info@pisoninvestment.co.tz
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="corporate-card p-8 text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground mb-6">
                  Get detailed directions to our offices using your preferred map service
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => window.open('https://maps.google.com/?q=PSPF+Twin+Tower+Dar+es+Salaam', '_blank')}
                  >
                    <MapPin className="w-4 h-4" />
                    Dar es Salaam Office
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => window.open('https://maps.google.com/?q=PSSF+Building+Mtwara', '_blank')}
                  >
                    <MapPin className="w-4 h-4" />
                    Mtwara Office
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Got Questions?
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find quick answers to common questions about our services, processes, and policies.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <AccordionItem 
                      value={`item-${index}`}
                      className="bg-card rounded-2xl border border-border/50 px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                <Mail className="w-4 h-4 mr-2" />
                Email Our Support Team
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
