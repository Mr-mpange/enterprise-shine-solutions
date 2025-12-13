import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "./button";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightbox = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/10 w-12 h-12"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
          </motion.div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-50 text-white hover:bg-white/10 w-14 h-14 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-50 text-white hover:bg-white/10 w-14 h-14 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </motion.div>
            </>
          )}

          {/* Image Container with smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative max-w-[90vw] max-h-[85vh] perspective-1000"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                layoutId={`gallery-image-${currentIndex}`}
              />
              
              {/* Caption with slide-up animation */}
              <AnimatePresence>
                {currentImage.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg"
                  >
                    <p className="text-white text-center font-medium text-lg">
                      {currentImage.title}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Image Counter */}
          {images.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}

          {/* Thumbnails with hover effects */}
          {images.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2 px-4"
            >
              {images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-white opacity-100 shadow-lg shadow-white/20"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GalleryImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export const GalleryImage = ({
  src,
  alt,
  title,
  className = "",
  onClick,
}: GalleryImageProps) => {
  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileHover={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <ZoomIn className="w-12 h-12 text-white drop-shadow-lg" />
        </motion.div>
      </motion.div>
      {title && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white text-sm font-medium">{title}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
