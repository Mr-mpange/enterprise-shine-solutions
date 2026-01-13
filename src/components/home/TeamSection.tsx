import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import teamCeo from "@/assets/team-ceo.jpg";
import teamOperations from "@/assets/team-operations.jpg";
import teamTechnical from "@/assets/team-technical.jpg";
import teamMarketing from "@/assets/team-marketing.jpg";

const teamMembers = [
  {
    name: "James Mwangi",
    title: "Chief Executive Officer",
    image: teamCeo,
    bio: "With over 20 years of experience in corporate services, James founded MultiService to bring professional solutions to Tanzanian businesses.",
    linkedin: "#",
    twitter: "#",
    email: "james@pisoninvestment.co.tz",
  },
  {
    name: "Grace Kimaro",
    title: "Operations Director",
    image: teamOperations,
    bio: "Grace oversees all service delivery operations, ensuring quality and efficiency across our fire, fumigation, and cleaning divisions.",
    linkedin: "#",
    twitter: "#",
    email: "grace@pisoninvestment.co.tz",
  },
  {
    name: "David Okonkwo",
    title: "Technical Manager",
    image: teamTechnical,
    bio: "David leads our technical teams with expertise in fire safety systems, pest control, and industrial cleaning solutions.",
    linkedin: "#",
    twitter: "#",
    email: "david@pisoninvestment.co.tz",
  },
  {
    name: "Amina Hassan",
    title: "Marketing Manager",
    image: teamMarketing,
    bio: "Amina drives our brand growth and client relationships, connecting businesses with the services they need.",
    linkedin: "#",
    twitter: "#",
    email: "amina@pisoninvestment.co.tz",
  },
  {
    name: "Michael Temba",
    title: "Fire Safety Specialist",
    image: teamCeo,
    bio: "Michael brings 15 years of fire safety expertise, ensuring our clients meet all safety regulations and standards.",
    linkedin: "#",
    twitter: "#",
    email: "michael@pisoninvestment.co.tz",
  },
  {
    name: "Sarah Mwalimu",
    title: "Quality Assurance Manager",
    image: teamOperations,
    bio: "Sarah maintains our high service standards across all divisions, implementing quality control processes and client satisfaction protocols.",
    linkedin: "#",
    twitter: "#",
    email: "sarah@pisoninvestment.co.tz",
  },
  {
    name: "John Msigwa",
    title: "Regional Coordinator",
    image: teamTechnical,
    bio: "John coordinates our nationwide operations, ensuring consistent service delivery across all regions we serve.",
    linkedin: "#",
    twitter: "#",
    email: "john@pisoninvestment.co.tz",
  },
  {
    name: "Fatuma Ali",
    title: "Customer Relations Specialist",
    image: teamMarketing,
    bio: "Fatuma manages client relationships and ensures exceptional customer service experiences across all our service offerings.",
    linkedin: "#",
    twitter: "#",
    email: "fatuma@pisoninvestment.co.tz",
  },
];

const TeamSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-background">
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
              Our Leadership
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dedicated professionals committed to delivering excellence in every service
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 ${
              prevBtnEnabled ? 'hover:bg-primary hover:text-white' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 ${
              nextBtnEnabled ? 'hover:bg-primary hover:text-white' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <div key={member.name} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group mx-2"
                  >
                    <div className="corporate-card overflow-hidden h-full">
                      {/* Image */}
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Social Links */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={member.linkedin}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <a
                            href={member.twitter}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-primary font-medium text-sm mb-3">
                          {member.title}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors"
                onClick={() => emblaApi && emblaApi.scrollTo(index * 3)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
