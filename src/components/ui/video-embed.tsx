import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "./button";

interface VideoEmbedProps {
  videoId: string;
  platform: "youtube" | "vimeo";
  title?: string;
  thumbnail?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}

export const VideoEmbed = ({
  videoId,
  platform,
  title,
  thumbnail,
  aspectRatio = "16:9",
}: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  };

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    if (platform === "youtube") {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return undefined;
  };

  const aspectClasses = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  };

  return (
    <div className={`relative w-full ${aspectClasses[aspectRatio]} rounded-xl overflow-hidden shadow-xl`}>
      {!isPlaying ? (
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          {getThumbnailUrl() ? (
            <img
              src={getThumbnailUrl()}
              alt={title || "Video thumbnail"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
            >
              <Play className="w-10 h-10 text-primary fill-primary ml-1" />
            </motion.div>
          </div>

          {/* Title */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
            </div>
          )}
        </div>
      ) : (
        <iframe
          src={getEmbedUrl()}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};

interface VideoModalProps {
  videoId: string;
  platform: "youtube" | "vimeo";
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal = ({
  videoId,
  platform,
  isOpen,
  onClose,
}: VideoModalProps) => {
  if (!isOpen) return null;

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={getEmbedUrl()}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </motion.div>
    </motion.div>
  );
};
