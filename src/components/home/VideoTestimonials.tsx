import { motion } from "framer-motion";
import { VideoEmbed } from "@/components/ui/video-embed";

const videos = [
  {
    id: "dQw4w9WgXcQ", // Replace with actual video IDs
    platform: "youtube" as const,
    title: "Fire Safety Training Success Story",
    description: "See how we helped ABC Manufacturing implement comprehensive fire safety protocols.",
  },
  {
    id: "jNQXAC9IVRw", // Replace with actual video IDs
    platform: "youtube" as const,
    title: "Commercial Fumigation Process",
    description: "Our professional approach to pest control for hotels and restaurants.",
  },
  {
    id: "M7lc1UVf-VE", // Replace with actual video IDs
    platform: "youtube" as const,
    title: "Uniform Design & Production",
    description: "From concept to delivery - our tailoring excellence showcased.",
  },
];

const VideoTestimonials = () => {
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
              Video Showcase
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See Our Work in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how we deliver exceptional services across all our divisions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-4"
            >
              <VideoEmbed
                videoId={video.id}
                platform={video.platform}
                title={video.title}
              />
              <div>
                <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
