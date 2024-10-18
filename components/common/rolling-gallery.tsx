"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (autoplay && !isPaused && inView) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, images.length, inView]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      ref={ref}
      className="relative h-[300px] w-full overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 left-0 h-full w-24 z-10 bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="absolute top-0 right-0 h-full w-24 z-10 bg-gradient-to-l from-gray-900 to-transparent"></div>
      <div
        ref={containerRef}
        className="flex h-full items-center transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((url, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={url}
              alt={`gallery image ${i + 1}`}
              className="h-[180px] w-[320px] rounded-[15px] border-4 border-white object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingGallery;
