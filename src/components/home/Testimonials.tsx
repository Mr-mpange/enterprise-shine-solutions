import { motion } from "framer-motion";
import { Star, Quote, Play } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { VideoModal } from "@/components/ui/video-embed";
import happyClients from "@/assets/happy-clients.jpg";

const testimonials = [
  {
    name: "John Mwangi",
    company: "ABC Manufacturing Ltd",
    role: "Operations Manager",
    content: "Their fire safety services are exceptional. Professional team, thorough inspection, and quick installation. We feel much safer now.",
    rating: 5,
    hasVideo: true,
    videoId: "dQw4w9WgXcQ",
  },
  {
    name: "Sarah Hassan",
    company: "Tech Solutions Tanzania",
    role: "CEO",
    content: "Outstanding fumigation service! They handled our office pest problem efficiently and with minimal disruption to our operations.",
    rating: 5,
    hasVideo: false,
  },
  {
    name: "Michael Ochieng",
    company: "Grand Hotel Dar",
    role: "Facilities Director",
    content: "We've been using their cleaning services for 3 years. Consistently reliable, professional, and high-quality work every time.",
    rating: 5,
    hasVideo: true,
    videoId: "jNQXAC9IVRw",
  },
];

const Testimonials = () => {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; videoId: string }>({
    isOpen: false,
    videoId: "",
  });

  return (
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
              Client Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it – hear from businesses that trust us with their service needs.
          </p>
        </motion.div>

        {/* Happy Clients Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={happyClients} 
              alt="Happy clients" 
              className="w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Video Testimonial Button */}
                  {testimonial.hasVideo && testimonial.videoId && (
                    <button
                      onClick={() => setVideoModal({ isOpen: true, videoId: testimonial.videoId! })}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 fill-primary" />
                      </div>
                      <span className="text-sm font-medium">Watch Video Testimonial</span>
                    </button>
                  )}

                  <div className="border-t border-border pt-4">
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        videoId={videoModal.videoId}
        platform="youtube"
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, videoId: "" })}
      />
    </section>
  );
};

export default Testimonials;
