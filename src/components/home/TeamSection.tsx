import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="corporate-card overflow-hidden">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
